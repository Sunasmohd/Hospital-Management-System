import { create } from "zustand"

interface HospManagerState{
  hospital_id? : number
  doctor_id? : number
  timing_id? : number,
  token? : number
  hospSearchText? : string
}

interface HospManagerStateStore{
  hospParams : HospManagerState
  setHospitalId : (hospital_id:number) => void
  setDoctorId : (doctor_id:number) => void
  setTimingId : (timing_id:number) => void
  setToken : (token:number) => void
  setHospSearchText : (hospSearchText:string) => void
  
}

const useHospManagerStateStore = create<HospManagerStateStore>((set) => ({
  hospParams : {},
  setHospitalId : (hospital_id) => set(() => ({hospParams : {hospital_id}})),
  setDoctorId : (doctor_id) => set((store) => ({hospParams : { hospital_id: store.hospParams.hospital_id,doctor_id}})),
  setTimingId : (timing_id) => set((store) => ({hospParams : {hospital_id: store.hospParams.hospital_id,doctor_id: store.hospParams.doctor_id,timing_id}})),
  setToken : (token) => set((store) => ({hospParams : {...store.hospParams,token}})),
  setHospSearchText : (hospSearchText) => set(() => ({hospParams : {hospSearchText}})),
}))

export default useHospManagerStateStore