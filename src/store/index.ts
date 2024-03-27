import { create } from 'zustand'
import { devtools } from 'zustand/middleware'


interface StoreState {
  count: number
  increaseCount: (by: number) => void
}

const useStore = create<StoreState>()(devtools((set) => ({
    count: 0,
    increaseCount: (by) => set((state) => ({ count: state.count + by })),
  })))

export default useStore
