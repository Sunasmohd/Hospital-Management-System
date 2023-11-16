
const BookingStatus = () => {
  return (
    <div className="d-flex vh-100 flex-column justify-content-center align-items-center text-center vh-100">
    <h1 className="mt-5">Your request is pending.. Please wait..</h1>
    
        <h6 className="mt-2">Your booking time :</h6>

    <h6>Note : Check if the booked doctor is available on the doctor view menu..</h6>

    <button className="btn btn-primary "><a className="px-2 py-1 text-white  text-decoration-none" href=""> View Doctors</a></button>

</div>
  )
}

export default BookingStatus