import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function differenceInDays(createdAt: string): string {
  const postDate = new Date(createdAt)

  const currentDate = new Date()

  const differenceInMillis = currentDate.getTime() - postDate.getTime()

  const differenceInDays = Math.floor(differenceInMillis / (1000 * 60 * 60 * 24))
  const dayWord = differenceInDays === 1 ? 'day' : 'days'

  return `${differenceInDays} ${dayWord} ago`
}
