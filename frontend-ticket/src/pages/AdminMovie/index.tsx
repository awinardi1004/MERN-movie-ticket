import TitleHeading from '@/components/titleHeading'
import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/ui/data-table'
import { Plus } from 'lucide-react'
import { columns } from './columns'
import { Link, useLoaderData } from 'react-router-dom'
import type { Movie } from '@/services/movie/movie.type'

export default function AdminMovie() {
  const movies = useLoaderData() as Movie[]

  return (
    <>
        <TitleHeading title='List Movie' />
        <div>
            <Link to={'/admin/movies/create'}>
              <Button className="mb-3 flex items-center">
                <Plus className="w-4 h-4 mr-2" />
                Add Data
              </Button>
            </Link>
            <DataTable columns={columns} data={movies} />
        </div>
    </>
  )
}
