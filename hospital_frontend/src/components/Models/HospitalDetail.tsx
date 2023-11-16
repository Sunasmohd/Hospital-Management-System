
import ModelDetail from '../ModelList/ModelDetail'
import useHospital2 from '../../hooks/useHospitals2'
import { useParams } from 'react-router-dom'

const HospitalDetail = () => {

  const {slug} = useParams()
  const slug2 = String(slug)
  const {data} = useHospital2(slug2)
  
  return (
    <ModelDetail data={data!} information='Information' modelHolder='hospital'/>
  )
}

export default HospitalDetail