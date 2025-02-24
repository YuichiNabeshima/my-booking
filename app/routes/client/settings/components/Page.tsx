import * as React from "react"
import { Plus, Trash2 } from "lucide-react"

import { Button } from "~/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "~/components/ui/dialog"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs"

interface SeatData {
  [key: string]: {
    [key: string]: number
  }
}

const timeSlots = [
  "11-12",
  "12-13",
  "13-14",
  "14-15",
  "15-16",
  "16-17",
  "17-18",
  "18-19",
  "19-20",
  "20-21",
  "21-22",
  "22-23",
]

const weekDays = ["月", "火", "水", "木", "金", "土", "日"]

export function Page() {
  const [courses, setCourses] = React.useState([
    { name: "super long", duration: 120 },
    { name: "fast", duration: 30 },
    { name: "normal", duration: 60 },
    { name: "long", duration: 90 },
  ])

  const [newCourse, setNewCourse] = React.useState({ name: "", duration: "" })

  const [counterSeats, setCounterSeats] = React.useState<SeatData>(
    timeSlots.reduce(
      (acc, time) => ({
        ...acc,
        [time]: weekDays.reduce((dayAcc, day) => ({ ...dayAcc, [day]: 2 }), {}),
      }),
      {},
    ),
  )

  const [tableSeats, setTableSeats] = React.useState<SeatData>(
    timeSlots.reduce(
      (acc, time) => ({
        ...acc,
        [time]: weekDays.reduce((dayAcc, day) => ({ ...dayAcc, [day]: 4 }), {}),
      }),
      {},
    ),
  )

  const [bulkTimeValue, setBulkTimeValue] = React.useState<{ [key: string]: string }>({})
  const [bulkDayValue, setBulkDayValue] = React.useState<{ [key: string]: string }>({})

  const handleBulkTimeUpdate = (time: string, value: string, type: "counter" | "table") => {
    const numValue = Number.parseInt(value) || 0
    const seats = type === "counter" ? counterSeats : tableSeats
    const setSeats = type === "counter" ? setCounterSeats : setTableSeats

    setSeats({
      ...seats,
      [time]: weekDays.reduce(
        (acc, day) => ({
          ...acc,
          [day]: numValue,
        }),
        {},
      ),
    })
  }

  const handleBulkDayUpdate = (day: string, value: string, type: "counter" | "table") => {
    const numValue = Number.parseInt(value) || 0
    const seats = type === "counter" ? counterSeats : tableSeats
    const setSeats = type === "counter" ? setCounterSeats : setTableSeats

    const updatedSeats = { ...seats }
    timeSlots.forEach((time) => {
      updatedSeats[time] = {
        ...updatedSeats[time],
        [day]: numValue,
      }
    })
    setSeats(updatedSeats)
  }

  const handleSeatUpdate = (time: string, day: string, value: string, type: "counter" | "table") => {
    const numValue = Number.parseInt(value) || 0
    const seats = type === "counter" ? counterSeats : tableSeats
    const setSeats = type === "counter" ? setCounterSeats : setTableSeats

    setSeats({
      ...seats,
      [time]: {
        ...seats[time],
        [day]: numValue,
      },
    })
  }

  const SeatTable = ({ type }: { type: "counter" | "table" }) => {
    const seats = type === "counter" ? counterSeats : tableSeats

    return (
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[120px]">時間</TableHead>
              {weekDays.map((day) => (
                <TableHead key={day} className="text-center w-[80px]">
                  <div className="space-y-2">
                    <div>{day}</div>
                    <Input
                      type="number"
                      min="0"
                      placeholder="一括"
                      className="h-8 text-center"
                      value={bulkDayValue[`${type}-${day}`] || ""}
                      onChange={(e) => {
                        setBulkDayValue({
                          ...bulkDayValue,
                          [`${type}-${day}`]: e.target.value,
                        })
                        handleBulkDayUpdate(day, e.target.value, type)
                      }}
                    />
                  </div>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {timeSlots.map((time) => (
              <TableRow key={time}>
                <TableCell className="font-medium">
                  <div className="space-y-2">
                    <div>{time}</div>
                    <Input
                      type="number"
                      min="0"
                      placeholder="一括"
                      className="h-8 text-center"
                      value={bulkTimeValue[`${type}-${time}`] || ""}
                      onChange={(e) => {
                        setBulkTimeValue({
                          ...bulkTimeValue,
                          [`${type}-${time}`]: e.target.value,
                        })
                        handleBulkTimeUpdate(time, e.target.value, type)
                      }}
                    />
                  </div>
                </TableCell>
                {weekDays.map((day) => (
                  <TableCell key={`${time}-${day}`} className="p-2">
                    <Input
                      type="number"
                      min="0"
                      className="h-8 text-center"
                      value={seats[time][day]}
                      onChange={(e) => handleSeatUpdate(time, day, e.target.value, type)}
                    />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    )
  }

  const handleAddCourse = () => {
    if (newCourse.name && newCourse.duration) {
      setCourses([...courses, { name: newCourse.name, duration: Number.parseInt(newCourse.duration) }])
      setNewCourse({ name: "", duration: "" })
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 p-6">
        <div className="max-w-[1200px] mx-auto space-y-6">
          {/* 基本情報 */}
          <Card>
            <CardHeader>
              <CardTitle>基本情報</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="store-name">店舗名</Label>
                <Input id="store-name" defaultValue="Fat Burger" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">メールアドレス</Label>
                <Input id="email" type="email" defaultValue="fatburger@gmail.com" />
              </div>
            </CardContent>
          </Card>

          {/* コース設定 */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>コース設定</CardTitle>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    コースを追加
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>新規コース追加</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="course-name">コース名</Label>
                      <Input
                        id="course-name"
                        value={newCourse.name}
                        onChange={(e) => setNewCourse({ ...newCourse, name: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="duration">所要時間（分）</Label>
                      <Input
                        id="duration"
                        type="number"
                        value={newCourse.duration}
                        onChange={(e) => setNewCourse({ ...newCourse, duration: e.target.value })}
                      />
                    </div>
                  </div>
                  <Button onClick={handleAddCourse}>追加</Button>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>コース名</TableHead>
                    <TableHead>所要時間（分）</TableHead>
                    <TableHead className="w-[100px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {courses.map((course) => (
                    <TableRow key={course.name}>
                      <TableCell>{course.name}</TableCell>
                      <TableCell>{course.duration}</TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="hover:text-red-500"
                          onClick={() => setCourses(courses.filter((c) => c.name !== course.name))}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* 座席設定 */}
          <Card>
            <CardHeader>
              <CardTitle>座席設定</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="counter" className="space-y-4">
                <TabsList>
                  <TabsTrigger value="counter">カウンター席</TabsTrigger>
                  <TabsTrigger value="table">テーブル席</TabsTrigger>
                </TabsList>
                <TabsContent value="counter" className="space-y-4">
                  <SeatTable type="counter" />
                </TabsContent>
                <TabsContent value="table" className="space-y-4">
                  <SeatTable type="table" />
                </TabsContent>
              </Tabs>
              <div className="mt-4 flex justify-end">
                <Button size="lg">保存</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

