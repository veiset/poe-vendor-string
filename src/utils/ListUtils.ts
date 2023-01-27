export function distinctByKey<T>(list: T[], key: keyof T): T[] {
    return Array.from(new Map(list.map(item => [item[key], item])).values()) as T[];
}

export function distinct<T>(list: T[]): T[] {
    return Array.from(new Set(list));
}