import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import useIssuesStore from '@/store'
import { useEffect } from 'react'

export function BreadCrumbs() {
  const currentRepoUrl = useIssuesStore((state) => state.currentRepoUrl)
  const currentOwnerAndRepo = useIssuesStore((state) => state.currentOwnerAndRepo)
  const setCurrentOwnerAndRepo = useIssuesStore((state) => state.setCurrentOwnerAndRepo)
  const { owner, repo } = currentOwnerAndRepo

  useEffect(() => {
    setCurrentOwnerAndRepo()
  }, [currentRepoUrl]) 

  return (
    <Breadcrumb className="px-1">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href={owner?.link} target="_blank">
            {owner?.name}
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href={repo?.link} target="_blank">
            {repo?.name}
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
      </BreadcrumbList>
    </Breadcrumb>
  )
}
