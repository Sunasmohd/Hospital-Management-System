
const AllUserDetails = () => {
  return (


<>
<div className="row p-3 mt-4">
	<div className="col-md">
		<div className="card card-body">
			<h5 className="border-1 border-bottom border-gray mb-3 pb-3">Username : <span className="text-uppercase"></span> </h5>
			
			<a className="btn btn-outline-info  btn-sm btn-block" href="">Update User</a>


	
	
	
		</div>
	</div>

	<div className="col-md">
		<div className="card card-body">
			<h5 className="border-1 border-bottom border-gray mb-3 pb-3">Contact Information</h5>

			<h6><span style={{"fontWeight": "bold"}}>Email : </span></h6>
		</div>
	</div>


	<div className="col-md">
		<div className="card card-body">
			<h5  className="border-1 border-bottom border-gray mb-3 pb-3">Total Bookings</h5>
			<h3 className="text-uppercase"></h3>
		</div>
	</div>
	{/* <div className="col-md">
		<div className="card card-body">
			<h5>Role</h5>
			<h3 className="text-uppercase"></h3>
		</div>
	</div> */}

</div>



<div className="row mt-4">
	<div className="col">
		<div className="card card-body">
			<form method="get">
				<input type="text" name="q" id=""/>
				<button className="btn btn-primary btn-sm ms-2" type="submit">Search</button>
			</form>
		</div>
	</div>
</div>
	

<div className="row">
	<div className="col-md">
		<div className="card card-body mt-4">
			<table className="table table-sm table-bordered">

				<tr>
					<th>Patient</th>
					<th>Hospital</th>
					<th>Doctor</th>
					<th>Date Booked</th>
					<th>Status</th>
					<th>Update</th>
					<th>Remove</th>
				</tr>


				<tr>
					<td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>

					<td><a className="btn btn-sm bg-warning"
							href="">Update</a></td>
					<td><a className="btn btn-sm bg-danger" href="{% url 'delete_app' patient.id %}">Cancel</a></td>
						
				</tr>
			</table>
		</div>
	</div>
</div>

{/* <div className="card card-body">
	<div className="row p-3">

		<div className="col-6">
			<table className="table">
				<tr>
					<th>Hospital</th>
				</tr>
				<tr>
					<td></td>
				</tr>

			</table>
		</div>
		<div className="col-6">
			<table className="table">

				<tr>
					<th>Doctors</th>
				</tr>

				<tr>
					<td></td>
				</tr>
			</table>
		</div>
	</div>
</div> */}


</>

  )
}

export default AllUserDetails