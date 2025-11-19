import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { loginSchema, type loginValue, login } from "@/services/auth/auth.service" // ✅ IMPORT login
import { zodResolver } from "@hookform/resolvers/zod"
import React from "react"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { useMutation } from "@tanstack/react-query"
import secureLocalStorage from "react-secure-storage";
import { useNavigate } from "react-router-dom"


export function LoginFormAdmin({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {

  const form = useForm<loginValue>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      role: "admin",
    }
  });

  const navigate = useNavigate();

  // ✅ GUNAKAN SERVICE YANG SUDAH ADA
  const {isPending, mutateAsync} = useMutation({
    mutationFn: login
  })

  const onSubmit = async (val: loginValue) => {
    try {
      const response = await mutateAsync(val)
      secureLocalStorage.setItem('SESSION_KEY', response.data);
      

      navigate('/admin');
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className={cn("flex flex-col gap-6", className)} {...props}>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Login</CardTitle>
              <CardDescription>
                Enter your email below to login to your account
              </CardDescription>
            </CardHeader>

            <CardContent>
              <div className="flex flex-col gap-6">

                {/* EMAIL */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="Enter email..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* PASSWORD */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="Enter password..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* SUBMIT */}
                <Button isLoading={isPending} type="submit" className="w-full">
                  Login
                </Button>

              </div>
            </CardContent>
          </Card>
        </div>
      </form>
    </Form>
  )
}