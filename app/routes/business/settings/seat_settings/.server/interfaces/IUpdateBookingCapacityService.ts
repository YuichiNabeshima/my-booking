import type { UpdateBookingCapacityServiceArgsDTO } from '../dtos/UpdateBookingCapacityServiceDTO';

export interface IUpdateBookingCapacityService {
  execute(args: UpdateBookingCapacityServiceArgsDTO): Promise<boolean>;
}
