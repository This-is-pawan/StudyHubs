import { z } from "zod";

export const sign_up = z.object({
  name: z.string().trim().min(3, "Minimum 3 characters required"),

  email: z
    .string()
    .trim()
    .email("Invalid email address"),

  password: z
    .string()
    .trim()
    .min(6, "Minimum 6 characters required"),
});

export const sign_in = z.object({
  email: z
    .string()
    .trim()
    .email("Invalid email address"),

  password: z
    .string()
    .trim()
    .min(6, "Minimum 6 characters required"),
});