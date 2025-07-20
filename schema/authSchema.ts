import { z } from "zod";

export const credAuthSchema = z.object({
  email: z.email(),
  password: z.string().min(6).max(16),
});

export const newUserSchema = z.object({
  name: z.string().min(3).max(50),
  email: z.email(),
  password: z.string().min(6).max(12),
});
