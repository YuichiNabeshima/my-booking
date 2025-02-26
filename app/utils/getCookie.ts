export function getCookie(cookieHeader: string | null, name: string): string | null {
  if (!cookieHeader) return null;

  const cookies = Object.fromEntries(
    cookieHeader
      .split("; ")
      .map((c) => c.split("="))
      .map(([key, ...value]) => [key, value.join("=")])
  );

  return cookies[name] || null;
}
