import { ChevronDown } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface DropdownProps {
  items: string[]
  onSelect: (item: string) => void
  label: string
}

export function BreadcrumbDropdown({ items, onSelect, label }: DropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-1">
        {label}
        <ChevronDown className="h-4 w-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        {items.map((item) => (
          <DropdownMenuItem key={item} onClick={() => onSelect(item)}>
            {item}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}