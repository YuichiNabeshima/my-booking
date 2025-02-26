export const STATUS = {
  SUCCESS: 'SUCCESS',
  FAILED: 'FAILED',
  REDIRECT: 'REDIRECT',
} as const;

export type Status = typeof STATUS[keyof typeof STATUS];