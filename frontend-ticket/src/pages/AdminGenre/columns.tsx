import { Badge } from "@/components/ui/badge"
import type { Genre } from "@/services/genre/genre.type"
import type { ColumnDef } from "@tanstack/react-table"
import ActionColum from "./actionColum";

export const columns: ColumnDef<Genre>[] = [
  {
    accessorKey: "name",
    header: "Genre",
    cell: ({row}) => <Badge>{row.original.name}</Badge>
  },
  {
    id: "action",
    cell: ({row}) => {
        const genre = row.original;

        return <ActionColum id={genre._id} />
    }
  }
]