import { Calendar, Clock } from 'lucide-react';

import { DAY_OF_WEEK } from '~/constants/DAY_OF_WEEK';
import { BUSINESS_HOURS_KIND } from '~/constants/enums/BUSINESS_HOURS_KIND';
import type { DayOfWeek } from '~/types/enums/DayOfWeek';

import { useBusinessHours } from './useBusinessHours';

export function BusinessHours() {
  const { hoursByDay, business } = useBusinessHours();

  return (
    <>
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Calendar className="h-5 w-5 mr-2 text-primary" />
            Business Hours
          </h2>

          <div className="overflow-x-auto">
            <div className="min-w-[800px]">
              <div className="grid grid-cols-8 gap-2">
                <div className="font-medium text-center py-2">Time</div>
                {hoursByDay.map(({ day }) => (
                  <div
                    key={day}
                    className={`text-center py-2 font-medium ${
                      day === 'SUNDAY' ? 'text-red-600' : day === 'SATURDAY' ? 'text-blue-600' : ''
                    }`}
                  >
                    {DAY_OF_WEEK[day as DayOfWeek]}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-8 gap-2 mb-4">
                <div className="text-center py-1 text-xs">Status</div>
                {hoursByDay.map(({ day, isOpen }) => (
                  <div
                    key={`status-${day}`}
                    className={`text-center py-1 text-xs rounded-md ${
                      !isOpen ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'
                    }`}
                  >
                    {isOpen ? 'Open' : 'Closed'}
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                {Object.keys(BUSINESS_HOURS_KIND).map((kind) => {
                  // Check if any day has this kind of hours
                  const hasKind = hoursByDay.some((day) =>
                    day.hours.some((hour) => hour.hours_kind === kind && hour.is_open),
                  );

                  if (!hasKind) return null;

                  return (
                    <div key={kind} className="grid grid-cols-8 gap-2 items-center">
                      <div className="flex items-center font-medium text-sm">
                        <Clock className="h-4 w-4 mr-1 text-primary" />
                        {BUSINESS_HOURS_KIND[kind as keyof typeof BUSINESS_HOURS_KIND]}
                      </div>

                      {hoursByDay.map(({ day, hours }) => {
                        const hourForKind = hours.find((h) => h.hours_kind === kind && h.is_open);

                        return (
                          <div key={`${day}-${kind}`} className="text-center">
                            {hourForKind && hourForKind.open_time && hourForKind.close_time ? (
                              <div className="flex flex-col items-center space-y-1">
                                <span className="bg-green-100 text-green-800 font-medium px-1.5 py-0.5 rounded text-xs w-full">
                                  {hourForKind.open_time}
                                </span>
                                <span className="text-gray-500 text-xs">-</span>
                                <span className="bg-red-100 text-red-800 font-medium px-1.5 py-0.5 rounded text-xs w-full">
                                  {hourForKind.close_time}
                                </span>
                              </div>
                            ) : (
                              <span className="text-muted-foreground/50 text-xs">-</span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Business hours note */}
          {business?.business_hours_note && (
            <p className="text-sm text-muted-foreground mt-4">{business.business_hours_note}</p>
          )}
        </div>
      </div>
    </>
  );
}
