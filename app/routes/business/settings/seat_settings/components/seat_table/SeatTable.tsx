import { getInputProps } from "@conform-to/react";
import type { FieldMetadata } from "@conform-to/react";
import { EyeOff, Eye, Clock } from "lucide-react"
import { Card, CardContent } from "~/components/ui/card";
import { Button } from "~/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table";
import { Tooltip, TooltipProvider, TooltipContent, TooltipTrigger } from "~/components/ui/tooltip";
import { Input } from "~/components/ui/input";
import { DAY_OF_WEEK } from "~/constants/DAY_OF_WEEK";
import { TIME_SEGMENTS } from "../../constants/TIME_SEGMENTS";
import { formatTimeRange } from "../../utils/formatTimeRange";
import { useSeatTable } from "./useSeatTable";

export const SeatTable = ({ type, field }: { type: "barSeats" | "tableSeats", field: FieldMetadata<{
  [x: string]: { [x: string]: any };
}> }) => {

  const { toggleDayDisabled, toggleTimeDisabled, disabledDays, disabledTimes } = useSeatTable();

  return (
    <Card className="shadow-md py-0">
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <div className="max-h-[700px] overflow-y-auto relative seat-table-wrapper">
            <Table className="border-collapse">
              <TableHeader className="sticky top-0 z-10">
                <TableRow className="bg-muted/50">
                  <TableHead className="w-[150px] border-r">
                    <div className="font-medium text-muted-foreground">Time Slots</div>
                  </TableHead>
                  {Object.values(DAY_OF_WEEK).map((day) => (
                    <TableHead key={day} className="text-center p-0 border-r last:border-r-0 bg-muted/50">
                      <div className="p-2 bg-muted/30 border-b">
                        <div className="font-medium mb-2">{day}</div>
                        <div className="flex items-center gap-2">
                          <Input
                            type="number"
                            min={0}
                            max={99}
                            placeholder="Bulk"
                            className="h-8 text-center bg-background/80 border-muted transition-all hover:border-primary focus:border-primary"
                            disabled={disabledDays[day]}
                            onChange={(e) => {
                              const value = e.target.value;
                              const targets = document.querySelectorAll<HTMLInputElement>(`[data-type=${type}][data-day=${day}]`);
                              targets.forEach((target) => {
                                const time = target.getAttribute('data-time');
                                if (time && !disabledTimes[time]) {
                                  target.value = value;
                                }
                              });
                            }}
                          />
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className={`h-8 w-8 ${disabledDays[day] ? "text-red-500" : "text-muted-foreground"}`}
                                  type="button"
                                  onClick={() => toggleDayDisabled(day)}
                                >
                                  {disabledDays[day] ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                {disabledDays[day] ? "Enable" : "Disable"} all {day} inputs
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </div>
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {Object.values(TIME_SEGMENTS).map((time, index) => (
                  <TableRow key={time} className={index % 2 === 0 ? "bg-background" : "bg-muted/10"}>
                    <TableCell className="font-medium border-r p-0">
                      <div className="p-2 bg-muted/20 h-full flex flex-col justify-center">
                        <div className="mb-2 flex items-center gap-1">
                          <Clock className="h-3 w-3 text-muted-foreground" />
                          <span className="text-sm">{formatTimeRange(time)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Input
                            type="number"
                            min={0}
                            max={99}
                            placeholder="Bulk"
                            className="h-8 text-center bg-background/80 border-muted transition-all hover:border-primary focus:border-primary"
                            name="bulk"
                            disabled={disabledTimes[time]}
                            onChange={(e) => {
                              const value = e.target.value;
                              const targets = document.querySelectorAll<HTMLInputElement>(`[data-type=${type}][data-time=${time}]`);
                              targets.forEach((target) => {
                                const day = target.getAttribute('data-day');
                                if (day && !disabledDays[day]) {
                                  target.value = value;
                                }
                              });
                            }}
                          />
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className={`h-8 w-8 ${disabledTimes[time] ? "text-red-500" : "text-muted-foreground"}`}
                                  type="button"
                                  onClick={() => toggleTimeDisabled(time)}
                                >
                                  {disabledTimes[time] ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                {disabledTimes[time] ? "Enable" : "Disable"} all {formatTimeRange(time)} inputs
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </div>
                    </TableCell>
                    {Object.values(DAY_OF_WEEK).map((day) => {
                      const { key: timeKey, ...timeField } = getInputProps(
                        field.getFieldset()[day].getFieldset()[time],
                        { type: "number" },
                      )
                      return (
                        <TableCell key={timeField.name} className="p-2 border-r last:border-r-0">
                          <Input
                            className={`h-10 text-center font-medium transition-all hover:border-primary focus:border-primary focus:ring-1 focus:ring-primary/20 ${
                              disabledDays[day] || disabledTimes[time] ? "opacity-50 bg-muted/20" : ""
                            }`}
                            data-type={type}
                            data-day={day}
                            data-time={time}
                            min={0}
                            max={99}
                            readOnly={disabledDays[day] || disabledTimes[time]}
                            {...timeField}
                          />
                        </TableCell>
                      )
                    })}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}