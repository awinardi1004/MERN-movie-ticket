import type { LoginResponse } from '@/services/auth/auth.type';
import { clsx, type ClassValue } from "clsx"
import secureLocalStorage from 'react-secure-storage';
import { twMerge } from "tailwind-merge"

export const SESSION_KEY = "SESSION_KEY";
export const LOCATION_POSSIONS = ["Jakarta", "Bandung", "Bekasi"];

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getSession() {
  const session = secureLocalStorage.getItem(SESSION_KEY) as  LoginResponse;

  if (!session) {
    return null;
  }
  
  return session;
}

export function rupiahFormat (val: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(val)
}
