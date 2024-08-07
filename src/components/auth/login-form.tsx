"use client";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { LoginFormValues } from "@/lib/types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginFormSchema } from "@/lib/schemas";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import PasswordInput from "./password-input";
import Link from "next/link";
import { useState, useTransition } from "react";
import { login } from "@/actions/auth/action";

function LoginForm() {
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  // handle form submission
  const onSubmit = (data: LoginFormValues) => {
    startTransition(async () => {
      const result = await login(data);
      if (result) {
        setError(result.error);
      }
    });
  };

  return (
    <Form {...form}>
      <form
        className="space-y-5"
        onSubmit={form.handleSubmit(onSubmit)}>
        {!isPending && error && (
          <div className="text-center text-red-800 py-2 rounded-md bg-red-100">
            {error}
          </div>
        )}

        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <Input
                {...field}
                placeholder="Enter username"
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <PasswordInput
                placeholder="Enter password"
                {...field}
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className="flex w-full"
          disabled={isPending}>
          Submit
        </Button>
        <p className="text-gray-600">
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="text-blue-500 hover:underline">
            Signup
          </Link>
        </p>
      </form>
    </Form>
  );
}
export default LoginForm;
