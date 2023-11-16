import styled from 'styled-components'

const Div = styled.div`
    font-size:15px;
`

const PatientBooking = () => {
  return (
      <Div className="col-md-7">
        <h5>PATIENT BOOKING DETAILS</h5>

        <div className="card card-body">
          <table className="table table-sm">
            <tr>
              <th>User</th>
              <th>Patient</th>
              <th>Doctor</th>
              <th>Hospital</th>
              <th>Date Booked</th>
              <th>View</th>
              <th>Update</th>
              <th>Remove</th>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td>
                <a
                  className="badge bg-primary text-light m-1"
                  href="{% url 'patient_app' patient.id %}"
                >
                  View
                </a>
              </td>
              <td>
                <a
                  className="badge bg-warning text-light m-1"
                  href="{% url 'update_app' patient.id patient.hosp_name_id %}"
                >
                  Update
                </a>
              </td>
              <td>
                <a
                  className="badge bg-danger text-light m-1"
                  href="{% url 'delete_app' patient.id %}"
                >
                  Delete
                </a>
              </td>
            </tr>
          </table>
        </div>
      </Div>
  );
};

export default PatientBooking;
