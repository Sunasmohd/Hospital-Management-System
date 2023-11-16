
const PatientView = () => {
  return (
    <>
      <div className="row p-3 ">
        <div className="col-md px-5">
          <div className="card card-body">
            <h5 className="border-1 border-bottom border-secondary mb-2 pb-2">Patient Name</h5>
            <h3 className="text-uppercase">g</h3>
          </div>
        </div>

        <div className="col-md px-5">
          <div className="card card-body">
            <h5 className="border-1 border-bottom border-secondary mb-2 pb-2">Contact Information</h5>
            <h6>
              <span style={{ fontWeight: "bold" }} >Address :</span> h
            </h6>
            <h6>
              <span style={{ fontWeight: "bold" }}>Phone : </span>i
            </h6>
          </div>
        </div>
      </div>

      <div className="row px-5">
        <div className="col-md">
          <div className="card card-body">
            <table className="table table-bordered table-sm">
              <tr>
                <th>Hospital</th>
                <th>Doctor</th>
                <th>Date Booked</th>
                <th>Status</th>
                <th>Update</th>
                <th>Remove</th>
              </tr>

              <tr>
                <td>a</td>
                <td>b</td>
                <td>c</td>
                <td>d</td>
                <td>
                  <a
                    className="btn btn-info"
                    href=""
                  >
                    Update
                  </a>
                </td>
                <td>
                  <a
                    className="btn btn-danger"
                    href=""
                  >
                    Cancel
                  </a>
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default PatientView;
