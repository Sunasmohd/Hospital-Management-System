
const MyBookings = () => {
  return (
    <table className="table table-striped">
    <thead>
        <tr>
            <th>Patient</th>
            <th>Doctor</th>
            <th>Hospital</th>
            <th>Status</th>
            <td>View</td>
        </tr>
    </thead>
    <tbody>


        <tr>
            <td>a</td>
            <td>b</td>
            <td>c</td>
            <td>d</td>
            <td><a className="badge bg-primary text-decoration-none" href="{% url 'myapp_booking2' u.id %}">View</a></td>
        </tr>


    </tbody>
</table>
  )
}

export default MyBookings