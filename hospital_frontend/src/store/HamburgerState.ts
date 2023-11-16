import { create } from "zustand";

interface HamburgerStore{
    isOpen : boolean ;
    setIsOpen : (val : boolean) => void;
}

const useHamburger = create<HamburgerStore>((set)=>({
    isOpen : false,
    setIsOpen : (val) => set(() => ({isOpen:val}))
}))

export default useHamburger