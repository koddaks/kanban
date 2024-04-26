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

import { createIssuesByOwner, extractOwnerAndRepo } from '@/utils'

import { ChevronDown, Link as LinkIcon, Slash } from 'lucide-react'
import { Button } from './ui/button'
import { RepoInfo } from '@/types'

export function BreadCrumbs({ currentRepoUrl }: { currentRepoUrl: string }) {
  const issueList = useIssuesStore((state) => state.issuesByStore)
  const setCurrentRepoUrl = useIssuesStore((state) => state.setCurrentRepoUrl)
  const currentRepoInfo = extractOwnerAndRepo(currentRepoUrl)
  const repoList = Object.keys(issueList).map((repoUrl) => extractOwnerAndRepo(repoUrl))
  const issuesByOwner = createIssuesByOwner(repoList as RepoInfo[])

  const handleSetCurrentRepo = (selectedOwner: string, selectedRepo: string) => {
    const repoInfo = issuesByOwner[selectedOwner]?.[selectedRepo]
    if (repoInfo) {
      setCurrentRepoUrl(repoInfo.repoUrl)
    }
  }

  if (!currentRepoInfo) {
    return null
  }

  return (
    <div className="flex flex-row items-center justify-between">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <DropdownMenu>
              <DropdownMenuTrigger
                disabled={!currentRepoInfo}
                type="button"
                className="flex items-center gap-1"
              >
                {currentRepoInfo.owner}
                <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {Object.keys(issuesByOwner).map((owner) => (
                  <DropdownMenuItem
                    key={owner}
                    className={currentRepoInfo?.owner === owner ? 'rounded-sm bg-slate-300' : ''}
                    onClick={() =>
                      handleSetCurrentRepo(
                        owner,
                        issuesByOwner[owner][Object.keys(issuesByOwner[owner])[0]].repo
                      )
                    }
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
          <BreadcrumbItem>
            <DropdownMenu>
              <DropdownMenuTrigger type="button" className="flex items-center gap-1">
                {currentRepoInfo.repo}
                <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {Object.keys(issuesByOwner[currentRepoInfo.owner]).map((repo) => (
                  <DropdownMenuItem
                    key={repo}
                    className={currentRepoInfo.repo === repo ? 'rounded-sm bg-slate-300' : ''}
                    onClick={() => handleSetCurrentRepo(currentRepoInfo.owner, repo)}
                  >
                    {repo}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex w-1/3 flex-row gap-2">
        <Button variant="link" className="h-6 w-1/2" asChild>
          <a className="flex gap-1" href={currentRepoInfo.ownerUrl} target="_blank">
            <p>{currentRepoInfo.owner}</p>
            <LinkIcon size={16} />
          </a>
        </Button>
        <Button variant="link" className="h-6 w-1/2" asChild>
          <a className="flex gap-1" href={currentRepoInfo.repoUrl} target="_blank">
            <p>{currentRepoInfo.repo}</p>
            <LinkIcon size={16} />
          </a>
        </Button>
      </div>
    </div>
  )
}
