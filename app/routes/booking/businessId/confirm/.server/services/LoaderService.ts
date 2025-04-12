import { inject, injectable } from "inversify";
import jwt from "jsonwebtoken";
import type { ILoaderService } from "../interfaces/ILoaderService";
import type { LoaderServiceArgsDTO, LoaderServiceResultDTO } from "../dtos/LoaderServiceDTO";
import type { CreateTokenPayload } from "../../../index/utils/createToken.server";
import { GLOBAL_DI_TYPES } from "~/.server/di_container/GLOBAL_DI_TYPES";
import type { ICourseRepository } from "~/.server/repositories/interfaces/ICourseRepository";
import type { IBusinessRepository } from "~/.server/repositories/interfaces/IBusinessRepository";
import { BusinessNotFoundError } from "~/.server/core/custom_error/errors/repositories/BusinessNotFoundError";
import { CourseNotFoundError } from "~/.server/core/custom_error/errors/repositories/CourseNotFoundError";
import { CUSTOMER_KIND } from "~/constants/CUSTOMER_KIND";

@injectable()
export class LoaderService implements ILoaderService {
  constructor(
    @inject(GLOBAL_DI_TYPES.BusinessRepository) private businessRepository: IBusinessRepository,
    @inject(GLOBAL_DI_TYPES.CourseRepository) private courseRepository: ICourseRepository,
  ){}
  async execute({ businessId, token }: LoaderServiceArgsDTO): Promise<LoaderServiceResultDTO> {
    const decoded = jwt.verify(token, process.env.TOKEN_KEY as string) as CreateTokenPayload;

    const business = await this.businessRepository.fetch({ id: businessId });
    const course = await this.courseRepository.fetch({ id: decoded.course });

    if (!business) {
      throw new BusinessNotFoundError('Business not found.');
    }
    if (!course) {
      throw new CourseNotFoundError('Course not found.');
    }

    const date = `${new Date(decoded.date).toLocaleDateString()} ${decoded.time}`;

    return {
      fullName: decoded.name,
      email: decoded.email,
      businessName: business.name,
      dateTime: date,
      courseName: `${course.name} (${course.time_duration}min)`,
      customerKind: decoded.kind === CUSTOMER_KIND.SINGLE ? 'Bar Sheet' : 'Table Sheet',
      numberOfGuests: Number(decoded.guests),
    };
  }
}