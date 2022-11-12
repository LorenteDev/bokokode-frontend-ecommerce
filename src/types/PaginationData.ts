import Link from './Link'

interface PaginationData {
  current_page: number,
  first_page_url: string,
  from: number,
  last_page: number,
  last_page_url: string,
  links: Array<Link[]>,
  next_page_url: string,
  path: string,
  per_page: number,
  prev_page_url: number | null,
  to: number,
  total: number
}

export default PaginationData