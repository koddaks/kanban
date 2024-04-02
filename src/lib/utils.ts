import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getTimeStringSinceIssueOpened(createdAt: string): string {
  const postDate = new Date(createdAt)

  const currentDate = new Date()

  const differenceInMillis = currentDate.getTime() - postDate.getTime()

  const differenceInDays = Math.floor(differenceInMillis / (1000 * 60 * 60 * 24))
  const dayWord = differenceInDays === 1 ? 'day' : 'days'

  return `${differenceInDays} ${dayWord} ago`
}

export function modifyGithubUrl(originalUrl: string) {
  return originalUrl.replace(/github\.com/, 'api.github.com/repos')
}

export function extractOwnerAndRepo(url: string) {
  const regex = /github\.com\/([^/]+)\/([^/]+)/
  const matches = url.match(regex)

  if (matches && matches.length === 3) {
    const owner = matches[1]
    const repo = matches[2]
    return { owner, repo }
  } else {
    return null
  }
}
