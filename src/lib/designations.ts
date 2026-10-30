export const SECONDARY_DESIGNATIONS = [
  'BAC Chairman',
  'BAC Secretariat',
  'BAC Member 1',
  'BAC Member 2',
  'BAC Member 3',
  'BAC Member 4',
  'BAC Member 5',
  'BAC Member 6',
] as const

export const TERTIARY_DESIGNATIONS = [
  'Committee on Peace and Order',
  'Committee on Health and Sanitation',
  'Committee on Education',
  'Committee on Youth and Sports',
  'Committee on Women and Family',
  'Committee on Agriculture',
  'Committee on Infrastructure',
  'Committee on Environmental Protection',
  'Committee on Livelihood and Socio-Cultural Affairs',
  'Committee on Clean and Green',
  'Committee on Market and Vendors',
  'Committee on Transportation and Communication',
  'Committee on Laws and Ordinances',
  'Committee on Human Rights',
  'Committee on Cooperatives',
  'Committee on Appropriation',
] as const

export function designationFieldKey(designation: string): string {
  return designation.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '')
}
