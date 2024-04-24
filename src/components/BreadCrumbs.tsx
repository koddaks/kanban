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
import { extractOwnerAndRepo } from '@/utils'

import { ChevronDown, Slash } from 'lucide-react'
import { useEffect, useState } from 'react'


export function BreadCrumbs({currentRepoUrl}: {currentRepoUrl: string}) {
  const setCurrentRepoUrl = useIssuesStore((state) => state.setCurrentRepoUrl);
  const [activeOwner, setActiveOwner] = useState<string>('');
  const [activeRepo, setActiveRepo] = useState<string>('');

  const repoList = useIssuesStore((state) => state.repoList);
  const currentRepoInfo = extractOwnerAndRepo(currentRepoUrl);
  console.log(currentRepoInfo?.repo);

  useEffect(() => {
    if (currentRepoInfo && !activeOwner) {
      setActiveOwner(currentRepoInfo.owner);
      const reposForOwner = repoList.filter((repo) => repo.owner === currentRepoInfo.owner);
      if (reposForOwner.length > 0) {
        setActiveRepo(reposForOwner[0].repo);
      }
    }
  }, [currentRepoInfo, activeOwner, repoList]);

  useEffect(() => {  
    const repoInfo = extractOwnerAndRepo(currentRepoUrl);
    if (repoInfo && repoInfo.owner !== activeOwner) {
      setActiveOwner(repoInfo.owner);
      setActiveRepo(repoInfo.repo);
    }
  }, [currentRepoUrl, activeOwner]);


  useEffect(() => {    
    if(currentRepoInfo) {
      setActiveOwner(currentRepoInfo?.owner);
      setActiveRepo(currentRepoInfo?.repo);
    }     
    
  }, [currentRepoUrl]);

  const issuesByOwner: Record<string, Record<string, RepoInfo>> = {};
  repoList.forEach((repo) => {
    if (!issuesByOwner[repo.owner]) {
      issuesByOwner[repo.owner] = {};
    }
    issuesByOwner[repo.owner][repo.repo] = repo;
  });

  const handleSetCurrentRepo = (selectedRepo: string) => {
    setActiveRepo(selectedRepo);
    const repoInfo = issuesByOwner[activeOwner][selectedRepo];
    if (repoInfo) {
      setCurrentRepoUrl(repoInfo.repoUrl);
    }
  };

  const handleSetCurrentOwner = (selectedOwner: string) => {
    setActiveOwner(selectedOwner);
    const reposForOwner = repoList.filter((repo) => repo.owner === selectedOwner);
    if (reposForOwner.length > 0) {
      setActiveRepo(reposForOwner[0].repo);
      setCurrentRepoUrl(reposForOwner[0].repoUrl);
    }
  };

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
              {Object.keys(issuesByOwner).map((owner) => (
                <DropdownMenuItem
                  key={owner}
                  className={activeOwner === owner ? 'rounded-sm bg-slate-300' : ''}
                  onClick={() => handleSetCurrentOwner(owner)}
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
                {Object.keys(issuesByOwner[activeOwner]).map((repo) => (
                  <DropdownMenuItem
                    key={repo}
                    className={activeRepo === repo ? 'rounded-sm bg-slate-300' : ''}
                    onClick={() => handleSetCurrentRepo(repo)}
                  >
                    {repo}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </BreadcrumbItem>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
