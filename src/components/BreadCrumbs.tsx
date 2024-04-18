import React, { useState, useEffect } from 'react'
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
import { extractOwnerAndRepo } from '@/utils'

export function BreadCrumbs() {
  const repoList = useIssuesStore((state) => state.repoList)
  const setCurrentRepoUrl = useIssuesStore((state) => state.setCurrentRepoUrl)

  const currentRepoUrl = useIssuesStore((state) => state.currentRepoUrl)
  const ownerAndRepoData = extractOwnerAndRepo(currentRepoUrl)
  const [activeOwner, setActiveOwner] = useState<string>('')
  const [activeRepo, setActiveRepo] = useState<string>('')

  useEffect(() => {
    if (ownerAndRepoData?.owner && ownerAndRepoData?.repo) {
      setActiveOwner(ownerAndRepoData?.owner)
      setActiveRepo(ownerAndRepoData?.repo)
    }
  }, [currentRepoUrl])



  function handleSetCurrentRepoUrl(link: string) {
    setCurrentRepoUrl(link)
  }

  const owners = repoList.reduce<Record<string, RepoInfo[]>>((acc, curr) => {
    if (!acc[curr.owner]) {
      acc[curr.owner] = []
    }
    acc[curr.owner].push(curr)
    return acc
  }, {})

  return (
    <Breadcrumb>
      <BreadcrumbList>        
        {Object.keys(owners).map((owner) => (
          <React.Fragment key={owner}>
            <BreadcrumbItem className={activeOwner === owner ? 'text-blue-700' : ''}>
              <DropdownMenu>
                <DropdownMenuTrigger type="button" className="flex items-center gap-1">
                  {owner}
                  <ChevronDown className="h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {owners[owner].map((repo) => (
                    <DropdownMenuItem
                      key={repo.repoUrl}                     
                      className={
                        activeOwner === owner && activeRepo === repo.repo ? 'bg-slate-300 rounded-sm' : ''
                      }
                      onClick={() => handleSetCurrentRepoUrl(repo.repoUrl)}
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
        <BreadcrumbItem>
          <BreadcrumbLink href={ownerAndRepoData?.ownerUrl} target='_blank'>Link to owner: <span className="text-blue-600">{ownerAndRepoData?.owner}</span></BreadcrumbLink>
          <BreadcrumbSeparator>
          <Slash />
        </BreadcrumbSeparator>
          <BreadcrumbLink href={ownerAndRepoData?.repoUrl} target='_blank'>Link to repository: <span className="text-blue-600">{ownerAndRepoData?.repo}</span></BreadcrumbLink>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}
