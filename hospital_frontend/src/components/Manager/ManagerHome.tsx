import StatusRow from "../Admin/StatusRow"
import styled from 'styled-components'

const Grid = styled.div`
    display:grid;
    grid-template-columns : 1fr 1fr 1fr;
    margin-top:30px;
    grid-gap : 10px;
`

const ManagerHome = () => {
  return (
    <>




<div className="container-fluid">

    {/* {% include 'status_row2.html' %} */}
    <Grid>
        <StatusRow term="Manager Name"></StatusRow>
        <StatusRow term="Bookings"></StatusRow>
        <StatusRow term="Doctors"></StatusRow>
    </Grid>

    <div className="row mt-3">
        <div className="col-md-5 py-2">
            <h5>MANAGER DETAILS</h5>
            <div className="card card-body">
                <div className="row">
                    <div className="col-md-6">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Hospital</th>
                                </tr>
                            </thead>
                            <tbody>
    
                                {/* {% for h in user_hospital %} */}
    
                                <tr>
                                    <td><a href="{% url 'myapp_hospitald' h.id %}"></a></td>
                                </tr>
    
                                {/* {% endfor %} */}
    
                            </tbody>
                        </table>
    
                    </div>
                    <div className="col-md-6">
                        <table className="table">
                            <thead>
                                <tr className="">
                                    <th className="d-flex justify-content-between">Doctors <a  href="{% url 'manager_app3' %}">Add Doctors +</a></th>
                                </tr>
                            </thead>
                            <tbody>
    
                                {/* {% for d in user_doctor %} */}
    
                                <tr>
                                    <td><a href="{% url 'myapp_doctord' d.id %}"></a></td>
                                </tr>
    
                                {/* {% endfor %} */}
    
                            </tbody>
                        </table>
    
                    </div>
                </div>
            </div>

        </div>
        
        <div className="col-md-7 py-2">
            <h5>PATIENT BOOKING DETAILS</h5>


            <div className="card card-body">

                <table className="table table-sm">
                    <tr>
                        <th>Patient</th>
                        <th>Doctor</th>
                        <th>Hospital</th>
                        <th>Status</th>
                        <th>Approve</th>
                        <th>View</th>

                        <th>Update</th>
                        <th>Remove</th>

                    </tr>


                    {/* {% for d in user_display3 %} */}

                    {/* {% for i in d %} */}
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                         <td></td>
                        <td ><a className="badge bg-success text-light m-1" href="{% url 'approve_app' i.id %}">Approve</a></td>
                        <td ><a className="badge bg-primary text-light m-1" href="{% url 'patient_app' i.id %}">View</a></td>
                        
                        <td><a className="badge bg-warning text-light m-1" href="{% url 'update_app' i.id i.hosp_name_id %}">Update</a>
                        </td>
                        <td><a className="badge bg-danger text-light m-1" href="{% url 'delete_app' i.id %}">Delete</a></td>

                    </tr>
                    {/* {% endfor %} */}

                    {/* {% endfor %} */}
                </table>
            </div>
        </div>

    </div>
</div>

    </>
  )
}

export default ManagerHome