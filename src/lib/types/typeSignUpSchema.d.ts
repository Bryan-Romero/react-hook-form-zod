import { z } from "zod";
import { generateKeysObject } from "../utils/generateKeysObject";

export const signUpSchema = z
  .object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    phoneNumber: z.string().min(1, "Phone number is required"),
    areaCode: z.string().min(1, "Area code is required"),
    country: z.string().min(1, "Country is required"),
    email: z.string().email(),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
    terms: z.boolean(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  })
  .refine((data) => data.terms, {
    message: "You must accept the terms and conditions",
    path: ["terms"],
  });

export type TSignUpSchema = z.infer<typeof signUpSchema>;
