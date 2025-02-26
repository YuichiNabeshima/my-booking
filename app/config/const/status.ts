export const STATUS = {
  SUCCESS: 'success',
  FAILED: 'failed',
  REDIRECT: 'redirect',
} as const;

export type Status = typeof STATUS[keyof typeof STATUS];