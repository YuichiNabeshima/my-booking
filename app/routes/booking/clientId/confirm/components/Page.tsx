import { CalendarDays, Mail, Store, Users } from "lucide-react"
import { Button } from "~/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card"

export function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-2xl">Would you like to confirm your booking?</CardTitle>
          <CardDescription>Please review your booking details below</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Booking details</h3>
              <div className="grid gap-4">
                <div className="grid grid-cols-3 items-center">
                  <div className="font-medium">Name</div>
                  <div className="col-span-2">Yuichi</div>
                </div>
                <div className="grid grid-cols-3 items-center">
                  <div className="font-medium flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Email
                  </div>
                  <div className="col-span-2">test_restaurant@sample.com</div>
                </div>
                <div className="grid grid-cols-3 items-center">
                  <div className="font-medium flex items-center gap-2">
                    <Store className="h-4 w-4" />
                    Store
                  </div>
                  <div className="col-span-2">Fat Burger</div>
                </div>
                <div className="grid grid-cols-3 items-center">
                  <div className="font-medium flex items-center gap-2">
                    <CalendarDays className="h-4 w-4" />
                    Date
                  </div>
                  <div className="col-span-2">2024/12/25 11:30</div>
                </div>
                <div className="grid grid-cols-3 items-center">
                  <div className="font-medium">Course</div>
                  <div className="col-span-2">normal (60min)</div>
                </div>
                <div className="grid grid-cols-3 items-center">
                  <div className="font-medium">Type of seat</div>
                  <div className="col-span-2">Table seat</div>
                </div>
                <div className="grid grid-cols-3 items-center">
                  <div className="font-medium flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Number of people
                  </div>
                  <div className="col-span-2">1</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex gap-4">
          <Button className="flex-1" size="lg">
            Submit
          </Button>
          <Button variant="outline" className="flex-1" size="lg">
            Cancel
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

