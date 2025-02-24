export function ensureString(value: FormDataEntryValue | null): string | never {
  if (typeof value === 'string') {
    return value;
  }
  throw new Error(`Form data is not a string: ${value}`);
}