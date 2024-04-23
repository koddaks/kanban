import  { useState, useEffect } from 'react'
import {
  Breadcrumb,
  BreadcrumbItem,  
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

  const owners = Object.keys(
    repoList.reduce<Record<string, RepoInfo[]>>((acc, curr) => {
      if (!acc[curr.owner]) {
        acc[curr.owner] = []
      }
      acc[curr.owner].push(curr)
      return acc
    }, {})
  )


  const [filteredRepos, setFilteredRepos] = useState<RepoInfo[]>([])

 
  useEffect(() => {
    if (activeOwner) {      
      const reposForOwner = repoList.filter((repo) => repo.owner === activeOwner)    
      
      setCurrentRepoUrl(reposForOwner[0].repoUrl)
      setFilteredRepos(reposForOwner)      
      setActiveRepo(reposForOwner[0].repo)
      
    }
  }, [repoList, activeOwner])

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <DropdownMenu>
            <DropdownMenuTrigger type="button" className="flex items-center gap-1">
              {activeOwner}
              <ChevronDown className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {owners.map((owner) => (
                <DropdownMenuItem
                  key={owner}
                  className={activeOwner === owner ? 'rounded-sm bg-slate-300' : ''}
                  onClick={() => setActiveOwner(owner)}
                >
                  {owner}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <Slash />
        </BreadcrumbSeparator>
        {activeOwner && (
          <BreadcrumbItem>
            <DropdownMenu>
              <DropdownMenuTrigger type="button" className="flex items-center gap-1">
                {activeRepo}
                <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {filteredRepos.map((repo) => (
                  <DropdownMenuItem
                    key={repo.repoUrl}
                    className={activeRepo === repo.repo ? 'rounded-sm bg-slate-300' : ''}
                    onClick={() => handleSetCurrentRepoUrl(repo.repoUrl)}
                  >
                    {repo.repo}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </BreadcrumbItem>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
