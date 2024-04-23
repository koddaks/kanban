import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { BreadcrumbDropdown } from '@/components/BreadcrumbDropdown'
import useIssuesStore from '@/store'
import { RepoInfo } from '@/types'

export function BreadCrumbs({ currentRepoInfo }: { currentRepoInfo: RepoInfo }) {

  const { issuesByOwner, setCurrentRepoInfo } = useIssuesStore()

  const owners = Object.keys(issuesByOwner)
  const repos =  issuesByOwner[currentRepoInfo.owner] ?? {}

  function handleOwnerSelection(owner: string) {
    const firstRepo = Object.keys(issuesByOwner[owner])[0]
    const repoUrl = `https://github.com/${owner}/${firstRepo}`
    setCurrentRepoInfo({
      owner: owner,
      repo: firstRepo,
      url: repoUrl,
    })
  }

  function handleRepoSelection(repo: string) {
    const repoUrl = `https://github.com/${currentRepoInfo.owner}/${repo}`
    setCurrentRepoInfo({
      owner: currentRepoInfo?.owner,
      repo: repo,
      url: repoUrl,
    })
  }

  return (
    <Breadcrumb className="md:py-4">
      <BreadcrumbList>
        <BreadcrumbItem>
          {owners.length > 1 ? (
            <BreadcrumbDropdown
              items={owners}
              onSelect={handleOwnerSelection}
              label={currentRepoInfo.owner}
            />
          ) : (
            currentRepoInfo.owner
          )}
        </BreadcrumbItem>
        <BreadcrumbSeparator />

        <BreadcrumbPage>
          {Object.keys(repos).length > 1 ? (
            <BreadcrumbDropdown
              items={Object.keys(repos)}
              onSelect={handleRepoSelection}
              label={currentRepoInfo.repo}
            />
          ) : (
            currentRepoInfo.repo
          )}
        </BreadcrumbPage>
      </BreadcrumbList>
    </Breadcrumb>
  )
}
