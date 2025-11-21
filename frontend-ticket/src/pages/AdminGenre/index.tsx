import { DataTable } from '@/components/ui/data-table'
import React from 'react'
import { columns } from './columns'
import { Button } from '@/components/ui/button'
import { Link, useLoaderData } from 'react-router-dom'
import { Plus } from 'lucide-react'
import TitleHeading from '@/components/titleHeading'
import type { Genre } from '@/services/genre/genre.type'

export default function AdminGenre() {
  const genres = useLoaderData() as Genre[]

  return (
    <>
        <TitleHeading title='List Genre' />
        <div>
            <Link to={'/admin/genres/create'}>
              <Button className="mb-3 flex items-center">
                <Plus className="w-4 h-4 mr-2" />
                Add Data
              </Button>
            </Link>
            <DataTable columns={columns} data={genres} />
        </div>
    </>
  )
}