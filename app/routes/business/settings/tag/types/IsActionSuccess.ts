import type { STATUS } from '../constants/STATUS';
import type { Tag } from './Tag';

export interface IsActionSuccess {
  status: typeof STATUS.SUCCESS;
  Tags: Tag[];
}
