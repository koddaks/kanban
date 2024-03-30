import './App.css'
import useStore from './store'
import { useEffect } from 'react'
import { IssueState } from './types'
import { Main } from './pages/main/main'

function App() {
  const repoUrl = 'https://api.github.com/repos/facebook/react'
  const fetchRepoData = useStore((state) => state.fetchRepoData)
  const repoData = useStore((state) => state.repoData)
  console.log(repoData)

  useEffect(() => {
    fetchRepoData(repoUrl, IssueState.All)
  }, [repoUrl])

  return <Main />
}

export default App
