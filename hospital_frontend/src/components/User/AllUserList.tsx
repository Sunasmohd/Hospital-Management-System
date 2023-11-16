import styled from 'styled-components'

const Div = styled.div`
    font-size:15px;
`
const AllUserList = () => {
  return (
        <Div className="col-md-5">
            <h5>ADMIN/MANAGER/USER DETAILS</h5>
            <div className="card card-body">
                <table className="table table-bordered table-sm">
                    <tr>
                        <th>View</th>
                        <th>Users Name</th>
                        <th>Users Group</th>

                    </tr>
                        <tr>
                            <td><a className="badge text-decoration-none bg-primary" href="">View</a></td>
                            <td>a</td>
                            
                            <td>b</td>
                       
                        </tr>
                </table>
            </div>

        </Div>
    
  )
}

export default AllUserList