import type { ReactNode } from 'react'

/** Lightweight, safe rich-text notation for document content. The editor
 * stores plain text; formatting is interpreted at render time. */
export function RichText({ children }: { children: string | undefined }) {
  const parts = (children ?? '').split(/(\*\*[^*]+\*\*|\*[^*]+\*|__[^_]+__|~~[^~]+~~)/g)
  return (
    <>
      {parts.map((part, index): ReactNode => {
        if (part.startsWith('**') && part.endsWith('**')) return <strong key={index}>{part.slice(2, -2)}</strong>
        if (part.startsWith('*') && part.endsWith('*')) return <em key={index}>{part.slice(1, -1)}</em>
        if (part.startsWith('__') && part.endsWith('__')) return <u key={index}>{part.slice(2, -2)}</u>
        if (part.startsWith('~~') && part.endsWith('~~')) return <s key={index}>{part.slice(2, -2)}</s>
        return <span key={index}>{part}</span>
      })}
    </>
  )
}
