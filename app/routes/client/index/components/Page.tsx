"use client"

import * as React from "react"
import { addDays, format, startOfToday } from "date-fns"
import { ja } from "date-fns/locale"
import { ChevronLeft, ChevronRight, Users } from "lucide-react"

import { Button } from "~/components/ui/button"
import { Calendar } from "~/components/ui/calendar"
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "~/components/ui/hover-card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table"
import { cn } from "~/lib/utils"

// サンプルデータ - 実際のアプリではAPI/データベースから取得
const timeSlots = Array.from({ length: 13 }, (_, i) => `${i + 11}:00`)
const bookings = [
  {
    name: "test test",
    time: "17:00",
    guests: 4,
    status: "confirmed",
    note: "窓際の席希望",
  },
  {
    name: "Yuichi",
    time: "12:00",
    guests: 2,
    status: "pending",
    note: "アレルギー：えび",
  },
]

const today = startOfToday()

export function Page() {
  const [date, setDate] = React.useState<Date>(today)
  const [view, setView] = React.useState<"day" | "week" | "month">("day")

  return (
    <div className="p-6">
      <Card className="max-w-[1200px] mx-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-3xl font-bold">Fat Burger</CardTitle>
              <p className="text-muted-foreground">予約管理ダッシュボード</p>
            </div>
            <Select value={view} onValueChange={(v) => setView(v as "day" | "week" | "month")}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="表示切替" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="day">1日表示</SelectItem>
                <SelectItem value="week">週表示</SelectItem>
                <SelectItem value="month">月表示</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="icon" onClick={() => setDate(addDays(date, -1))}>
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={() => setDate(addDays(date, 1))}>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                  <span className="text-xl font-semibold">{format(date, "yyyy年MM月dd日 (E)", { locale: ja })}</span>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => setDate(today)}>
                    今日
                  </Button>
                  <Button variant="outline" onClick={() => setDate(addDays(today, 1))}>
                    明日
                  </Button>
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(date) => date && setDate(date)}
                    className="rounded-md border"
                  />
                </div>
              </div>
              <div className="grid grid-cols-4 gap-2">
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-2xl font-bold">12</div>
                    <p className="text-muted-foreground">本日の予約</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-2xl font-bold">48</div>
                    <p className="text-muted-foreground">席数</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-2xl font-bold">75%</div>
                    <p className="text-muted-foreground">予約率</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-2xl font-bold">42</div>
                    <p className="text-muted-foreground">本日の来客数</p>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[200px]">予約者名</TableHead>
                    {timeSlots.map((time) => (
                      <TableHead key={time} className="text-center">
                        {time}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {["test test", "Yuichi"].map((name) => (
                    <TableRow key={name}>
                      <TableCell className="font-medium">{name}</TableCell>
                      {timeSlots.map((time) => {
                        const booking = bookings.find((b) => b.name === name && b.time === time)
                        return (
                          <TableCell key={`${name}-${time}`} className="p-0 text-center">
                            {booking ? (
                              <HoverCard>
                                <HoverCardTrigger asChild>
                                  <div
                                    className={cn(
                                      "py-4 cursor-pointer transition-colors",
                                      booking.status === "confirmed"
                                        ? "bg-green-100 dark:bg-green-900/30"
                                        : "bg-yellow-100 dark:bg-yellow-900/30",
                                    )}
                                  >
                                    <Users className="w-4 h-4 mx-auto" />
                                  </div>
                                </HoverCardTrigger>
                                <HoverCardContent className="w-80">
                                  <div className="flex justify-between space-x-4">
                                    <div className="space-y-1">
                                      <h4 className="text-sm font-semibold">{booking.name}</h4>
                                      <p className="text-sm text-muted-foreground">
                                        {booking.guests}名 • {booking.time}
                                      </p>
                                      <p className="text-sm text-muted-foreground">{booking.note}</p>
                                    </div>
                                  </div>
                                </HoverCardContent>
                              </HoverCard>
                            ) : (
                              <div className="py-4">&nbsp;</div>
                            )}
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
    </div>
  )
}

