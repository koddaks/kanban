import './App.css'
import useStore from './store'
import { useEffect } from 'react'
import { IssueState } from './types'
import { Main } from './pages/main/main'

const API_URL = 'https://api.github.com/repos/facebook/react'

function App() {
  
  // const repoUrl = 'https://api.github.com/repos/Georgegriff/react-dnd-kit-tailwind-shadcn-ui'
  // const repoUrl = 'https://api.github.com/repos/vuejs/vue'


  const fetchIssuesData = useStore((state) => state.fetchIssuesData)
  const issues = useStore((state) => state.issues)
  console.log(issues);

  useEffect(() => {
    fetchIssuesData(API_URL, IssueState.All)
  }, [API_URL])

  return <Main />
}

export default App
