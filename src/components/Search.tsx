import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Loader2 } from 'lucide-react'
import useIssuesStore from '@/store'
import { useState } from 'react'
import { BreadCrumbs } from './BreadCrumbs'
import { extendIssuesWithStatus, validateGithubUrl } from '@/utils'
import { fetchIssues } from '@/api'
import { AlertCircle } from "lucide-react"
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

export function Search() {
  const currentRepoUrl = useIssuesStore((state) => state.currentRepoUrl)
  const setCurrentRepoUrl = useIssuesStore((state) => state.setCurrentRepoUrl)
  const setIssuesByStore = useIssuesStore((state) => state.setIssuesByStore)

  const [inputValue, setInputValue] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async () => {
    setError(null)
    setIsLoading(true)
    const isGutHubUrl = validateGithubUrl(inputValue)

    if (!isGutHubUrl) {
      setError('Invalid GitHub URL')
      setIsLoading(false)
      return
    }

    const data = await fetchIssues(inputValue)    

  if (!data) {
      setError("The network's response was out of order. Check that the entered data is correct")
      setIsLoading(false)
      return
    }

    if (data.length === 0) {
      setError("The list of issues is empty")
      setInputValue('')
      setIsLoading(false)
      return
    }

    if (data) {
      setInputValue('')
      setCurrentRepoUrl(inputValue)
      setIssuesByStore(extendIssuesWithStatus(data))
    }

    setIsLoading(false)
  }

  return (
    <>
      <div className="flex w-full gap-2">
        <Input
          className="w-4/5"
          type="search"
          name="search-repo-issues"
          placeholder="Enter repository URL"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <Button className="w-1/6" onClick={handleSubmit} type="submit" disabled={isLoading}>
          {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
          Load issues
        </Button>
      </div>
      {error && (
        <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          {error}
        </AlertDescription>
      </Alert>
      )}
      <BreadCrumbs currentRepoUrl={currentRepoUrl} />
    </>
  )
}
