
export function isValidDatesArray(dates: Date[]): dates is [Date] | [Date, Date] | [] {
  if (dates.length > 2) {
    return false;
  }

  if (dates.some(date => !(date instanceof Date))) {
    return false;
  }

  return true;
}