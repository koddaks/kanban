import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function InputWithButton() {
  return (
    <div className="flex justify-center w-full items-center space-x-2 pb-8 m-0 mx-auto">
      <Input className='max-w-96' type="search" placeholder="Enter repository URL" />
      <Button type="submit">Load issues</Button>
    </div>
  )
}
