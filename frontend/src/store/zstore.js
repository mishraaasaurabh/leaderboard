import { create } from 'zustand'

const UseStore = create((set)=>({
    save: true,
    setSave: (state) => set({ saveState: state }),

    claim: true,
    setClaim: (state)=>set({claim: state})
}))

export default UseStore;