import './App.css'
import useStore from './store'
import { useEffect } from 'react'
import { IssueState } from './types'
import { Main } from './pages/main/main'

const API_URL = 'https://api.github.com/repos/facebook/react'

function App() {
  const getIssues = useStore((state) => state.getIssues)
  const issues = useStore((state) => state.issues)
  console.log(issues)

  useEffect(() => {
    getIssues(API_URL, IssueState.All)
  }, [API_URL])

  return <Main />
}

export default App
