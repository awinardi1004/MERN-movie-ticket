import TitleHeading from '@/components/titleHeading'
import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/ui/data-table'
import { Plus } from 'lucide-react'
import { Link, useLoaderData } from 'react-router-dom'
import { columns } from './columns'
import type { Theater } from '@/services/theater/theater.type'

export default function AdminTheater() {
  const theaters = useLoaderData() as Theater[]

  return (
    <>
        <TitleHeading title='List Theater'/>
        <div>
            <Link to={'/admin/theaters/create'}>
              <Button className="mb-3 flex items-center">
                <Plus className="w-4 h-4 mr-2" />
                Add Data
              </Button>
            </Link>
            <DataTable columns={columns} data={theaters} />
        </div>
    </>
  )
}
