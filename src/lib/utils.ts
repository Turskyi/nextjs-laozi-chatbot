import clsx, { type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * [cn] stands fro "className"
 */
export function cn(...inputs: ClassValue[]) {
  // [twMerge] is responsible for overriding tailwind classes.
  // [clsx] allows us to pass classes conditionally.
  return twMerge(clsx(inputs));
}
