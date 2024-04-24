import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import useIssuesStore from '@/store'

import { useRef } from 'react'
import { BreadCrumbs } from './BreadCrumbs'

export function Search() {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const fetchIssues = useIssuesStore((state) => state.fetchIssues)

  const handleGetIssues = (): void => {
    const inputValue = inputRef?.current?.value
    if (inputValue !== undefined && inputValue !== '') {
      fetchIssues(inputValue)
      if (inputRef.current) {
        inputRef.current.value = ''
      }
    }
  }

  return (
    <>
      <div className="flex w-full gap-2">
        <Input
          className="w-4/5"
          ref={inputRef}
          type="search"
          name="search-repo-issues"
          placeholder="Enter repository URL"
        />
        <Button className="w-1/6" onClick={handleGetIssues} type="submit">
          Load issues
        </Button>
      </div>
      <BreadCrumbs />
    </>
  )
}
