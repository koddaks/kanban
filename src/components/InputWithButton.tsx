import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import useIssuesStore from '@/store'

import { useRef } from 'react'

export function InputWithButton() {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const getIssues = useIssuesStore((state) => state.getIssues)

  const handleGetIssues = (): void => {
    const inputValue = inputRef?.current?.value
    if (inputValue !== undefined && inputValue !== '') {
      getIssues(inputValue)
      if (inputRef.current) {
        inputRef.current.value = ''
      }
    }
  }

  return (
    <div className="flex w-full gap-2">
      <Input className="w-4/5" ref={inputRef} type="search" name='search-repo-issues' placeholder="Enter repository URL" />
      <Button className="w-1/6" onClick={handleGetIssues} type="submit">
        Load issues
      </Button>
    </div>
  )
}
