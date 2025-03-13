import { useLoaderData } from "react-router";
import { CardHeader, CardTitle } from "~/components/ui/card"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select"
import type { LoaderResultDTO } from "../../.server/dtos/LoaderResultDTO";
import { isSuccess } from "../../utils/guards/isSuccess";

interface Props {
  view: "day" | "week" | "month";
  setView: (view: "day" | "week" | "month") => void;
}

export function ContentsHeader({ view, setView }: Props) {
  const data = useLoaderData<LoaderResultDTO>();
  const name = isSuccess(data) ? data.businessName : "***";

  return (
    <CardHeader>
      <div className="flex items-center justify-between">
        <div>
          <CardTitle className="text-3xl font-bold">{name}</CardTitle>
          <p className="text-muted-foreground">Booking Manager Dashboard</p>
        </div>
        {/* <Select value={view} onValueChange={(v) => setView(v as "day" | "week" | "month")}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="表示切替" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="day">1日表示</SelectItem>
            <SelectItem value="week">週表示</SelectItem>
            <SelectItem value="month">月表示</SelectItem>
          </SelectContent>
        </Select> */}
      </div>
    </CardHeader>
  );
}