import { STATUS } from '~/constants/STATUS';

export interface ActionServiceArgsDTO {
  name: string;
  email: string;
  password: string;
}

export interface ActionServiceResultDTO {
  status: typeof STATUS.SUCCESS;
  cookie: string;
}
