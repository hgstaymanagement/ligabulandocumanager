import type { FormElement } from './types'

export interface InlineTextInput {
  id: string
  label: string
  elementId: string
}

/**
 * "Rich Text (with fillable blanks)" is the builder's descriptive name for
 * an inline entry area, not copy intended to appear on the finished form.
 * Keep the label in the schema so it remains identifiable to form authors,
 * while letting renderers omit it for respondents and printed documents.
 */
export function hidesEntryLabel(el: Pick<FormElement, 'label'>): boolean {
  return /^rich text\s*\(with fillable blanks\)$/i.test(el.label.trim())
}

/**
 * Elements whose values actually get collected into a submission's flat
 * data object (keyed by element id) — i.e. exactly what a Dynamic Text
 * {{element_id}} placeholder can resolve to, and what the fill-form
 * sidebar renders an input for. Kept in one place so the two can't drift:
 * a field that's fillable but not offered in the Dynamic Text reference
 * (or vice versa) would be a confusing, hard-to-spot inconsistency.
 *
 * Scoped to page 1 for now — the fill-form screen only ever collects
 * values from page 1 today, so listing fields from other pages here would
 * offer placeholders that silently resolve to nothing.
 */
export function getFillableInputElements(elements: FormElement[]): FormElement[] {
  return elements.filter(
    e =>
      e.page === 1 &&
      (e.source === 'input' || e.type === 'checkbox') &&
      e.type !== 'table' &&
      e.type !== 'static_text' &&
      e.type !== 'section_heading'
  )
}

/** Inline blanks from a Rich Text block use [[a descriptive label]]. They
 * render in the document where they occur and are collected in the fill
 * panel just like ordinary form inputs. */
export function getInlineTextInputs(elements: FormElement[]): InlineTextInput[] {
  return elements.flatMap(el =>
    el.type === 'dynamic_text'
      ? (el.tokens ?? [])
          .filter(token => token.type === 'input' && !!token.fieldId)
          .map(token => ({ id: token.fieldId!, label: token.label || token.fieldId!, elementId: el.id }))
      : []
  )
}
