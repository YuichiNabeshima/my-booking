export interface EmailLogRepositoryDTO {
  id: number;
  to: string;
  from: string;
  subject: string;
  body: string;
}
