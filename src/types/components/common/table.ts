export interface ButtonBodyAction {
  label: string
  to?: string
  onClick?: () => void
}

export interface TableHeader {
  name: string
  role: string
  status: string
}

export interface TableRowData {
  name: string
  role: string
  status: string
  actions: ButtonBodyAction[]
}
