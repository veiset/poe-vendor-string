export function distinctByKey<T>(list: T[], key: keyof T): T[] {
    return Array.from(new Map(list.map(item => [item[key], item])).values()) as T[];
}

export function distinct<T>(list: T[]): T[] {
    return Array.from(new Set(list));
}

export const groupBy = <T>(array: T[], predicate: (value: T, index: number, array: T[]) => string) =>
    array.reduce((acc, value, index, array) => {
        (acc[predicate(value, index, array)] ||= []).push(value);
        return acc;
    }, {} as { [key: string]: T[] });