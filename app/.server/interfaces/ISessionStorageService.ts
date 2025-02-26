import type { Session } from "react-router";

export interface ISessionStorageService {
  getSession(cookieHeader?: string): Promise<Session>;
  commitSession(session: Session): Promise<string>;
  destroySession(session: Session): Promise<string>;
}
