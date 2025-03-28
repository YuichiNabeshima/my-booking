export const GLOBAL_DI_TYPES = {
  Logger: Symbol.for('Logger'),
  TransactionManager: Symbol.for('TransactionManager'),
  SessionStorageService: Symbol.for('SessionStorageService'),
  AuthRedirectService: Symbol.for('AuthRedirectService'),
  ImageUploaderService: Symbol.for('ImageUploaderService'),
  ImageGetService: Symbol.for('ImageGetService'),
  ImageDeleteService: Symbol.for('ImageDeleteService'),

  // Repositories
  BookingRepository: Symbol.for('BookingRepository'),
  BookingCapacityRepository: Symbol.for('BookingCapacityRepository'),
  BusinessRepository: Symbol.for('BusinessRepository'),
  CourseRepository: Symbol.for('CourseRepository'),
  CustomerRepository: Symbol.for('CustomerRepository'),
  MailLogRepository: Symbol.for('MailLogRepository'),
  MailQueRepository: Symbol.for('MailQueRepository'),
  BusinessPictureRepository: Symbol.for('BusinessPictureRepository'),
}
