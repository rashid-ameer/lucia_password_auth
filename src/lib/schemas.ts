import { z } from "zod";
export const signupFormSchema = z.object({
  username: z
    .string()
    .trim()
    .min(1, "Username is required")
    .max(20, "Username can have a maximum of 20 characters"),
  password: z.string().min(8, "Password must have a minimum of 8 characters"),
});

export const loginFormSchema = z.object({
  username: z.string().trim().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});
