import { ResponseIssue } from '@/types/issues'
import { modifyUrlToApiUrl } from '@/utils'

const queryParams = new URLSearchParams({
  per_page: '20',
  direction: 'desc',
  state: `all`,
})

export const fetchIssues = async (repoUrl: string) => {
  const url = `${modifyUrlToApiUrl(repoUrl)}/issues?${queryParams}`;
  const response = await fetch(url, {
    headers: {
      accept: 'application/vnd.github+json',
    },
  });

  if (!response.ok) {
    throw new Error(`Network response was not ok: ${response.status}`);
  }

  const data: ResponseIssue[] = await response.json();
  return data;
};
