import { Button } from "@/components/ui/button";
import { deleteMovie } from "@/services/movie/movie.service";
import { useMutation } from "@tanstack/react-query";
import { Edit, Trash } from "lucide-react";
import { Link, useRevalidator } from "react-router-dom";
import { toast } from "sonner";

interface ActionColumProps {
  id: string;
}

export default function ActionColum({ id }: ActionColumProps) {

  const {isPending, mutateAsync} = useMutation({
    mutationFn: () => deleteMovie(id)
  })

  const revalidator = useRevalidator()

  const handleDelete = async () => {
    try {
      await mutateAsync()

      revalidator.revalidate()
      toast.success("Data successfuly deleted")
    } catch (error) {
      console.log(error)
      toast.error("Someting went wrong")
    }
  }



  return (
    <div className="inline-flex items-center gap-4 p-5">
      <Link to={`/admin/movies/edit/${id}`}>
        <Button size="sm" variant="secondary">
          <Edit className="w-4 h-5 mr-2" />
          Edit
        </Button>
      </Link>
      <Button isLoading={isPending} onClick={handleDelete} size="sm" variant="destructive">
        <Trash className="w-4 h-5 mr-2"/>
        Delete
      </Button>
    </div>
  );
}
