import { z } from "zod";

export const signUpFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long." }),
  name: z.string().min(1, { message: "Name is required." }),
});
