import { BreadCrumbs } from '@/components/BreadCrumbs'
import { InputWithButton } from '@/components/InputWithButton'
import { KanbanBoard } from '@/components/KanbanBoard'
import useIssuesStore from '@/store'
import { extractOwnerAndRepo } from '@/utils'

export function Main() {
  const currentRepoUrl = useIssuesStore((state) => state.currentRepoUrl)
  const currentOwnerAndRepo = extractOwnerAndRepo(currentRepoUrl)
  
  return (
    <main>
      <InputWithButton />
      <BreadCrumbs owner={currentOwnerAndRepo?.owner} repo={currentOwnerAndRepo?.repo} />
      <KanbanBoard />
    </main>
  )
}
