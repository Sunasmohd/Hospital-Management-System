import ModelDetail from '../ModelList/ModelDetail'
import { useParams } from 'react-router-dom'
import useDoctor2 from '../../hooks/useDoctor2'

export interface Hosp2{
  slug:string;
  name:string;
}

export interface Dept2{
  slug:string;
  name:string;
}

const DoctorDetail = () => {

  const {slug} = useParams()
  const slug2 = String(slug)
  const {data} = useDoctor2(slug2)
  console.log(data)
  return (
    <ModelDetail data={data!} information='Working Information' modelHolder='doctor'/>
  )
}

export default DoctorDetail