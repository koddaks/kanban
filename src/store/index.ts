import { create } from 'zustand';

interface StoreState {
  count: number;
  increaseCount: (by: number) => void;
}

const useStore = create<StoreState>()((set) => ({
  count: 0,
  increaseCount: (by) => set((state) => ({ count: state.count + by })),
}));

export default useStore;
