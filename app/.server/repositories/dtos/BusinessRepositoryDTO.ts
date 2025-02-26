export interface BusinessRepositoryDTO {
  id: number;
  name: string;
  email: string;
  password: string;
  support_single: boolean;
  support_group: boolean;
  capacity_of_group: number;
}
