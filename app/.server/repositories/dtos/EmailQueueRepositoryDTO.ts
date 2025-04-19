export interface EmailQueueRepositoryDTO {
  id: number;
  to: string;
  from: string;
  subject: string;
  body: string;
}
