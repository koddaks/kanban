import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button } from './components/ui/button'
import useStore from './store'
import { useEffect } from 'react'
import { SearchState } from './types'

function App() {
  const repoUrl = 'https://api.github.com/repos/facebook/react'

  const count = useStore((state) => state.count)
  const increaseCount = useStore((state) => state.increaseCount)
  const fetchRepoData = useStore((state) => state.fetchRepoData)
  const repoData = useStore((state) => state.repoData)
  console.log(repoData)

  // const closedIssues = repoData.filter((data) => data.state === SearchState.Closed);
  // console.log(closedIssues);

  // const openIssues = repoData.filter((data) => data.state === SearchState.Open);
  // console.log(openIssues);

  const handleIncreaseCount = () => {
    increaseCount(1)
  }

  useEffect(() => {
    fetchRepoData(repoUrl, SearchState.All)   
  }, [repoUrl])

  return (
    <>
      <div className="libraries">
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <Button onClick={handleIncreaseCount}>count is {count}</Button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
    </>
  )
}

export default App
