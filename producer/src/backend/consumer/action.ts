export type Action =
    | { name: 'clear' }
    | { name: 'fill'; payload: string };