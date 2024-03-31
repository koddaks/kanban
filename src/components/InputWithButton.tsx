import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import useIssuesStore from '@/store'

import { useRef } from 'react'

export function InputWithButton() {
  const inputRef = useRef<HTMLInputElement | null>(null)

  const getIssues = useIssuesStore((state) => state.getAllIssues)
  const handleGetIssues = (): void => {
    const inputValue = inputRef?.current?.value
    if (inputValue !== undefined && inputValue !== '') {
      getIssues(inputValue)
    }
  }

  return (
    <div className="m-0 mx-auto flex w-full items-center justify-center space-x-2 pb-8">
      <Input className="max-w-96" ref={inputRef} type="search" placeholder="Enter repository URL" />
      <Button onClick={handleGetIssues} type="submit">
        Load issues
      </Button>
    </div>
  )
}
