import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function InputWithButton() {
  return (
    <div className="m-0 mx-auto flex w-full items-center justify-center space-x-2 pb-8">
      <Input className="max-w-96" type="search" placeholder="Enter repository URL" />
      <Button type="submit">Load issues</Button>
    </div>
  )
}
