import TitleHeading from '@/components/titleHeading'
import type { Genre } from '@/services/genre/genre.type';
import { createMovie, movieSchema, updateMovie, type MovieValues } from '@/services/movie/movie.service';
import type { Movie } from '@/services/movie/movie.type';
import type { Theater } from '@/services/theater/theater.type';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Save } from 'lucide-react';
import { Checkbox } from "@/components/ui/checkbox"

type loaderData = {
    theaters: Theater[];
    genres: Genre[];
    detail: Movie | null;
}

const updateMovieSchema = movieSchema.partial({thumbnail: true});

export default function AdminMovieForm() {
    const { detail, genres, theaters } = useLoaderData()  as loaderData;

    const form = useForm<MovieValues>({
      resolver: zodResolver(detail === null ? movieSchema : updateMovieSchema),
      defaultValues: {
        theaters: detail === null ? [] : detail?.theaters.map((val) => val._id),
        title: detail?.title, 
        available: detail?.available, 
        bonus: detail?.bonus, 
        genre: detail?.genre?._id, 
        description: detail?.description, 
        price: detail?.price ?? undefined,
      }
    });

    const {isPending, mutateAsync} = useMutation({
        mutationFn: (data: FormData) => 
            detail === null ? createMovie(data) : updateMovie(data, detail?._id)
    });

    const selectedTheaters = form.watch("theaters") ?? [];

    const handleChangeTheater = (val: string) => {
        if (!selectedTheaters.includes(val)) {
            const newTheaters = [...selectedTheaters, val];
            form.setValue("theaters", newTheaters);
        }
    }

    const handleRenmoveTheater = (val: string) => {
        const updatedTheaters = selectedTheaters.filter((item) => item !== val);
        form.setValue("theaters", updatedTheaters);
    }

    const navigate = useNavigate()

    const onSubmit = async (val: MovieValues) => {
        try {
            // await mutateAsync(val)

            const formData = new FormData();

            // boolean → string ("1" / "0")
            formData.append("available", val.available ? "true" : "false");

            // basic fields
            formData.append("genre", val.genre);
            formData.append("title", val.title);
            formData.append("price", String(val.price));

            // theaters harus array → kirim dalam bentuk JSON
            formData.append("theaters", JSON.stringify(val.theaters));

            // optional fields
            if (val.thumbnail) {
              formData.append("thumbnail", val.thumbnail);
            }

            if (val.description) {
              formData.append("description", val.description);
            }

            if (val.bonus) {
              formData.append("bonus", val.bonus);
            }

            await mutateAsync(formData);

            navigate('/admin/movies');
            
            toast.success(`Movie data successfully ${detail === null ? "created" : "updated"}`);
        } catch (error) {
            console.log(error)
            toast.error("something went error")
        }
    }

    return (
         <>
      <TitleHeading title={`${detail == undefined ? "Create" : "Update"} data movie`} />

      <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6 w-1/2'>
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                        <Input placeholder="Enter title..." {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="thumbnail"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Thumbnail</FormLabel>
                        <FormControl>
                            <Input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                                if (e.target.files) {
                                field.onChange(e.target.files[0]);
                                }
                            }}
                            />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Price</FormLabel>
                        <FormControl>
                        <Input
                            type="number"
                            placeholder="Enter Price..."
                            onChange={(e) => field.onChange(Number(e.target.value))}
                            value={field.value ?? ""}
                        />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
              <FormField
                control={form.control}
                name="genre"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Genre</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select movie genre" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {genres.map((val) => (
                          <SelectItem key={`${val._id}`} value={val._id}>{val.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="theaters"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Theater</FormLabel>
                    <Select onValueChange={handleChangeTheater} >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select movie genre" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {theaters.map((val, i) => (
                          <SelectItem key={`${val._id + i}`} value={val._id}>{val.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {selectedTheaters.length > 0 && (
                        <div className="inline-flex items-center space-x">
                            {selectedTheaters.map((item, i) => (
                                <Badge onClick={() => handleRenmoveTheater(item)} key={`${item + i}`}>
                                    {theaters.find((val) => val._id === item)?.name}
                                </Badge>
                            ))}
                        </div>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                        <Textarea placeholder="Enter description..." {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="bonus"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Bonus</FormLabel>
                        <FormControl>
                        <Input placeholder="Enter Bonus from by ticket..." {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="available"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                            <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                            <FormLabel>Showing Move</FormLabel>
                        </div>
                        <FormMessage />
                        </FormItem>
                    )}
                />



              <Button isLoading={isPending}>
                  <Save className='w-4 h-4 mr-2' />
                  Submit
              </Button>
          </form>
      </Form>
      </>
    )
}
