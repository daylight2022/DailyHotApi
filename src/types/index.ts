export type GET = {
  url: string
  headers?: Record<string, string | string[]>
  params?: Record<string, string | number>
  timeout?: number
  noCache?: boolean
  ttl?: number
}