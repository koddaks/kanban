import React from 'react'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import useIssuesStore from '@/store'
import { RepoInfo } from '@/types'
import { ChevronDown, Slash } from 'lucide-react'

export function BreadCrumbs() {
  const repoList = useIssuesStore((state) => state.repoList)

  const owners = repoList.reduce<Record<string, RepoInfo[]>>((acc, curr) => {
    if (!acc[curr.owner]) {
      acc[curr.owner] = []
    }
    acc[curr.owner].push(curr)
    return acc
  }, {})

  const setCurrentRepoUrl = useIssuesStore((state) => state.setCurrentRepoUrl)

  function handleSetCurrentRepoUrl(link: string) {
    setCurrentRepoUrl(link)
  }

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <Slash />
        </BreadcrumbSeparator>
        {Object.keys(owners).map((owner) => (
          <React.Fragment key={owner}>
            <BreadcrumbItem>
              <DropdownMenu>
                <DropdownMenuTrigger type="button" className="flex items-center gap-1">
                  {owner}
                  <ChevronDown className="h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {owners[owner].map((repo) => (
                    <DropdownMenuItem
                      key={repo.url}
                      onClick={() => handleSetCurrentRepoUrl(repo.url)}
                    >
                      {repo.repo}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <Slash />
            </BreadcrumbSeparator>
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
