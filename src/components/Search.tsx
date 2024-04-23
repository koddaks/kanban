import { fetchIssues } from '@/api'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import useIssuesStore from '@/store'
import { extendIssuesWithStatus, extractOwnerAndRepoFromUrl, validateGithubUrl } from '@/utils'

import { useState } from 'react'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from 'lucide-react'
import { BreadCrumbs } from './BreadCrumbs'

export function Search() {
  const setCurrentRepoInfo = useIssuesStore((state) => state.setCurrentRepoInfo)
  const setIssuesForRepo = useIssuesStore((state) => state.setIssuesForRepo)
  const [inputValue, setInputValue] = useState('')
  const [error, setError] = useState<string | null>(null)
  const currentRepoInfo = useIssuesStore((state) => state.currentRepoInfo)

  async function handleClick() {
    setError(null)

    const isGutHubUrl = validateGithubUrl(inputValue)

    if (!isGutHubUrl) {
      return setError('Invalid GitHub URL')
    }

    const ownerAndRepo = extractOwnerAndRepoFromUrl(inputValue)

    if (ownerAndRepo) {
      try {
        const issues = await fetchIssues(ownerAndRepo)

        if (!issues?.length) {
          return setError('No issues found')
        }

        const repoInfo = {
          owner: ownerAndRepo.owner,
          repo: ownerAndRepo.repo,
          url: inputValue,
        }

        setCurrentRepoInfo(repoInfo)
        setIssuesForRepo(extendIssuesWithStatus(issues), repoInfo)
      } catch (error) {
        setError('Failed to fetch issues')
      }
    } else {
      setError('Invalid repo URL')
    }
  }

  return (
    <>
      <div className="flex w-full gap-2">
        <Input
          className="w-4/5"          
          type="search"
          name="search-repo-issues"
          placeholder="Enter repository URL"
          onChange={(e) => setInputValue(e.target.value)}
        />
        <Button className="w-1/6" onClick={handleClick} type="submit">
          Load issues
        </Button>
      </div>
      {error && (
        <Alert className="mt-4 w-full" variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      {currentRepoInfo && <BreadCrumbs currentRepoInfo={currentRepoInfo} />}
      
    </>
  )
}
