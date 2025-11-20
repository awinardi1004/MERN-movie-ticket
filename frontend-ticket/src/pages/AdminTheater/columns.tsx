import { Badge } from "@/components/ui/badge"
import type { Theater } from "@/services/theater/theater.type";
import type { ColumnDef } from "@tanstack/react-table"
import ActionColum from "./ActionColumn";
// import ActionColum from "./actionColum";

export const columns: ColumnDef<Theater>[] = [
  {
    accessorKey: "name",
    header: "Theater"
  },
  {
    accessorKey: "city",
    header: "City",
    cell: ({row}) => <Badge>{row.original.city}</Badge>
  },
  {
    id: "action",
    cell: ({row}) => {
        const theater = row.original;

        return <ActionColum id={theater._id}/>
    }
  }
]