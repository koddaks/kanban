import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'

interface BreadCrumbsProps {
    owner: string
    repo: string
}

export function BreadCrumbs({owner, repo} : BreadCrumbsProps) {
  return (
    <Breadcrumb className='px-[22px]'>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">{owner}</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/">{repo}</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />       
      </BreadcrumbList>
    </Breadcrumb>
  )
}
