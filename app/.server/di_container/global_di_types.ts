export const GLOBAL_DI_TYPES = {
  Logger: Symbol.for('Logger'),
  TransactionManager: Symbol.for('TransactionManager'),
  SessionStorageManager: Symbol.for('SessionStorageManager'),
  AuthStateChecker: Symbol.for('AuthStateChecker'),
  ImageStorage: Symbol.for('ImageStorage'),

  // Repositories
  BookingRepository: Symbol.for('BookingRepository'),
  BookingCapacityRepository: Symbol.for('BookingCapacityRepository'),
  BusinessRepository: Symbol.for('BusinessRepository'),
  CourseRepository: Symbol.for('CourseRepository'),
  CustomerRepository: Symbol.for('CustomerRepository'),
  MailLogRepository: Symbol.for('MailLogRepository'),
  MailQueRepository: Symbol.for('MailQueRepository'),
  BusinessPictureRepository: Symbol.for('BusinessPictureRepository'),
  BusinessTagRepository: Symbol.for('BusinessTagRepository'),
  BusinessHoursRepostory: Symbol.for('BusinessHoursRepository'),
}
