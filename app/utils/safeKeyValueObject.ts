export function safeKeyValueObject<T extends Record<string, U>, U>(schema: T) {
  const names = Object.keys(schema) as (keyof typeof schema)[];
  return names.reduce((acc, key) => {
    acc[key] = key;
    return acc;
  }, {} as { [K in typeof names[number]]: K });
}