import type { Session } from 'react-router';

export interface ISessionStorageManager {
  getSession(cookieHeader?: string): Promise<Session>;
  commitSession(session: Session): Promise<string>;
  destroySession(session: Session): Promise<string>;
}
