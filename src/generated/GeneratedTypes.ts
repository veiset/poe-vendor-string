export interface Token<T> {
  id: number,
  regex: string,
  rawText: string,
  generalizedText: string,
  options: T,
}
export interface TokenOptimization {
  ids: number[],
  regex: string,
  weight: number,
  count: number,
}
export interface Regex<T> {
  tokens: Token<T>[],
  optimizationTable: {[ids: string]: TokenOptimization },
}