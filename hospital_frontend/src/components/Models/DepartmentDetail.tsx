import { useParams } from "react-router-dom"
import useDepartment2 from "../../hooks/useDepartment2"
import ModelDetail from "../ModelList/ModelDetail"

const DepartmentDetail = () => {
  const {slug} = useParams()
  const slug2 = String(slug)
  const {data} = useDepartment2(slug2)
  return (
    <ModelDetail data={data!} modelHolder='department'/>
  )
}

export default DepartmentDetail