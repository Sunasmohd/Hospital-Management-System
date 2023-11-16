import StatusRow from './StatusRow'
import style from './Dashboard.module.css'
import AllUserList from '../User/AllUserList'
import PatientBooking from './PatientBooking'



const Dashboard = () => {
  return (
    <>
        <div className={`${style.cont} container-fluid`}>
            <StatusRow term='Total Managers'></StatusRow>
            <StatusRow term='Total Patients'></StatusRow>
            <StatusRow term='Total Hospitals'></StatusRow>
            <StatusRow term='Total Doctors'></StatusRow>
        </div>
        <div className="row container-fluid">
          <AllUserList></AllUserList>
          <PatientBooking></PatientBooking>
        </div>
    </>
  )
}

export default Dashboard