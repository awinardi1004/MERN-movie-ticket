import type { baseResponse } from './../../types/response';
import { z } from "zod";
import type { LoginResponse } from "./auth.type";
import { globalInstance } from '@/lib/axios';

export const authSchema = z.object({
    name: z.string().min(5),
    email: z.string().email(),
    password: z.string().min(5),
    role: z.enum(["admin", "customer"]),
});

export const loginSchema = authSchema.omit({name: true});
export type loginValue = z.infer<typeof loginSchema>;
export const login = async (
  data: loginValue
): Promise<baseResponse<LoginResponse>> => {
  return globalInstance.post('/auth/login', data).then(res => res.data);
};
