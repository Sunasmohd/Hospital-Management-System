import "./BookNow.css";
import styled from "styled-components";
import logo from "../../assets/images/h5.jpg";
import useHospital from "../../hooks/useHospital";
import useDoctor from "../../hooks/useDoctor";
import DropDown from "./DropDown";
import useHospManagerStateStore from "../../store/HospManagerState";
import useTiming from "../../hooks/useTiming";
import useToken from "../../hooks/useToken";
import { Navigate } from "react-router-dom";
import useBooking from "../../hooks/useBookings";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {  useEffect } from "react";

const schema = z.object({
  name: z.string().max(20).min(5, { message: "Name is required" }),
  phone: z.number(),
  address: z.string(),
  doctor: z.number(),
  hospital: z.number(),
  timing: z.number(),
  token: z.number(),
});

type NamePhoneAd = z.infer<typeof schema>;

const Row = styled.div`
  width: 100%;
  background-image: linear-gradient(
      rgba(38, 37, 37, 0.218),
      rgba(11, 10, 8, 0.7)
    ),
    url(${logo});
  background-size: cover;
  min-height: 110vh;
  padding-top: 80px;
  @media (max-width: 700px) {
    min-height: 170vh;
  }
`;

const Div = styled.div`
  padding-top: 80px;
  background-color: white;
  border-radius: 5px;
  padding: 35px;
  width: 100%;
  margin-top: 90px;

  @media (max-width: 700px) {
    background-color: transparent;
    margin-top: 30px;
  }
`;

const Label = styled.label`
color: rgb(6, 6, 6);
    padding-top: 8px;
    padding-left: 2px;
    font-weight: 600;
    font-size: 13px;
}`;

const FormContainer = styled.form`
  display: grid;
  grid-template-areas:
    "name name contact contact address address"
    "hosp hosp hosp doc doc doc"
    "timings timings tokens tokens button button";
  background-color: white;
  border-radius: 5px;
  padding: 35px;
  width: 100%;
  column-gap: 20px;
  row-gap: 30px;
  padding: 10px 20px;
  @media (max-width: 700px) {
    grid-template-areas:
      "name name"
      "contact contact"
      "address address"
      "hosp hosp"
      "doc doc"
      "timings timings"
      "tokens tokens"
      "button button";
    padding: 40px;
    background-color: rgb(255, 255, 255);
  }
`;
const Input = styled.input`
  font-size: 14px;
`;
const FormButton = styled.button`
  height: 70px;
  width: 100%;
  color: rgb(255, 255, 255);
  font-size: 15px;
  background-color: rgb(57, 147, 165);
  border-radius: 0px;
  border-radius: 4px;
  grid-area: button;
  @media (max-width: 600px) {
    height: 35px;
  }
`;

const BookNow = () => {
 
  
  const token = localStorage.getItem("token");
  if (!token) return <Navigate to="/" />;
  const { data: hospitalData } = useHospital();
  const { data: doctorData } = useDoctor();
  const { data: timingData } = useTiming();
  const { data: tokenData } = useToken();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    setValue,getValues
  } = useForm<NamePhoneAd>({ resolver: zodResolver(schema) });
  console.log(errors);

  const setHospitalId = useHospManagerStateStore((s) => s.setHospitalId);
  const setDoctorId = useHospManagerStateStore((s) => s.setDoctorId);
  const setTimingId = useHospManagerStateStore((s) => s.setTimingId);
  const setToken = useHospManagerStateStore((s) => s.setToken);
  const hospitalId = useHospManagerStateStore((s) => s.hospParams.hospital_id);
  const doctorId = useHospManagerStateStore((s) => s.hospParams.doctor_id);
  const timingId = useHospManagerStateStore((s) => s.hospParams.timing_id);
  const tokenId = useHospManagerStateStore((s) => s.hospParams.token);
  const setHospSearch = useHospManagerStateStore((s) => s.setHospSearchText);

  const Booking = useBooking();
  console.log(hospitalId, doctorId, timingId, tokenId);

  const FormValues = (data: NamePhoneAd) => {
    
    console.log(data.hospital,data.name)

    Booking.mutate({
      name: data.name,
      phone: data.phone,
      address: data.address,
      hospital: hospitalId!,
      doctor: doctorId!,
      timing: timingId!,
      token: tokenId!,
    });
  };
  
  useEffect(() => {
    if (Booking.error) {
      const keys = Object.keys(Booking.error);
      const arrBook: any = Array(Booking.error);
      const maps = keys.map((k) => {
        setError(
          k === "name"
            ? "name"
            : k === "address"
            ? "address"
            : k === "phone"
            ? "phone"
            : k === "hospital"
            ? "hospital"
            : k === "doctor"
            ? "doctor"
            : k === "timing"
            ? "timing"
            : "token",
          { message: arrBook[0][k][0] }
        );
      });
      console.log(maps);
    }
  }, [Booking.error]);

  return (
    <>
      <Row>
        <Div className="container" >
          <FormContainer 
            className="form-container"
            onSubmit={(e) => {
              e.preventDefault()
              setValue("hospital",hospitalId!)
              setValue("doctor",doctorId!)
              setValue("timing",timingId!)
              setValue("token",tokenId!)
              console.log(getValues())
              handleSubmit(FormValues)()
            }}
          >
            <div className="form-group book-name">
              <Label htmlFor="">NAME</Label>
              <Input
                {...register("name")}
                type="text"
                placeholder="Enter Name"
                className="form-control"
              />
              {errors.name ? (
                <div
                  className="alert alert-danger alert-sm"
                  style={{
                    fontSize: ".8rem",
                    padding: "5px",
                    margin: 0,
                    marginTop: "10px",
                  }}
                >
                  {errors?.name?.message}
                </div>
              ) : null}
            </div>
            <div className="form-group book-contact">
              <Label htmlFor="">PHONE</Label>
              <Input
                {...register("phone", { valueAsNumber: true })}
                type="text"
                placeholder="Enter Phone No"
                className="form-control"
              />
              {errors.phone ? (
                <div
                  className="alert alert-danger alert-sm"
                  style={{
                    fontSize: ".8rem",
                    padding: "5px",
                    margin: 0,
                    marginTop: "10px",
                  }}
                >
                  {errors?.phone?.message}
                </div>
              ) : null}
            </div>
            <div className="form-group book-address">
              <Label htmlFor="">ADDRESS</Label>
              <Input
                {...register("address")}
                type="text"
                placeholder="Enter Address"
                className="form-control"
              />
              {errors.address ? (
                <div
                  className="alert alert-danger alert-sm"
                  style={{
                    fontSize: ".8rem",
                    padding: "5px",
                    margin: 0,
                    marginTop: "10px",
                  }}
                >
                  {errors?.address?.message}
                </div>
              ) : null}
            </div>
            <div className="form-group book-hosp">
              {/* <Select onChange={(e) => setHospitalId(e.target.value)} id="doctorSelect" className="form-select" >
                <Option  value="">Select Hospital</Option>
                {
                    hospitalData?.pages.map((page) =>
                    page.results.map((hosp) => (
                      <Option key={hosp.id} value={hosp.id}>{hosp.name}</Option>
                    ))
                  )
                  }
                  

            </Select> */}

              <DropDown
                setId={setHospitalId}

                value="Please Wait"
                placeHolder2={"Select Hospital"}
                elmnt={() => (
                  <Input
                    className="form-control"
                    style={{ width: "100%", border: "1px solid gray" }}
                    type="text"
                    onChange={(e) => {
                      setHospSearch(e.target.value);
                    }}
                    onKeyDown={(e) =>
                      e.key === "Enter" ? e.preventDefault() : null
                    }
                  />
                )}
                data={() => hospitalData?.pages}
              ></DropDown>

              <Label>HOSPITALS</Label>
              {errors.hospital ? (
                <div
                  className="alert alert-danger alert-sm"
                  style={{
                    fontSize: ".8rem",
                    padding: "5px",
                    margin: 0,
                    marginTop: "10px",
                  }}
                >
                  {errors?.hospital?.message}
                </div>
              ) : null}
            </div>
            <div className="form-group book-doc">
              {/* <Select id="doctorSelect" className="form-select">
                <Option value="">Select Doctor</Option>
                {doctorData?.pages.map((page) =>
                  page.results.map((hosp) => (
                    <Option key={hosp.id} value={hosp.id}>
                      {hosp.name}
                    </Option>
                  ))
                )}
              </Select> */}

              <DropDown
                setId={setDoctorId}
                value="Please Select A Hospital"
                placeHolder2={"Select Doctor"}
                data={() => doctorData?.pages}
              ></DropDown>
              <Label>DOCTORS</Label>
              {errors.doctor ? (
                <div
                  className="alert alert-danger alert-sm"
                  style={{
                    fontSize: ".8rem",
                    padding: "5px",
                    margin: 0,
                    marginTop: "10px",
                  }}
                >
                  {errors?.doctor?.message}
                </div>
              ) : null}
            </div>
            <div className="form-group book-timings">
              {/* <Select id="timingSelect" className="form-select">
                <Option value="">Select Timing</Option>
              </Select> */}
              <DropDown
                setId={setTimingId}
                value="Please Select A Doctor"
                placeHolder2={"Select Timing"}
                data={() => timingData?.pages}
              ></DropDown>
              <Label>TIMINGS</Label>
              {errors.timing ? (
                <div
                  className="alert alert-danger alert-sm"
                  style={{
                    fontSize: ".8rem",
                    padding: "5px",
                    margin: 0,
                    marginTop: "10px",
                  }}
                >
                  {errors?.timing?.message}
                </div>
              ) : null}
            </div>
            <div className="form-group book-tokens">
              <DropDown
                setId={setToken}
                value="Please Select A Date"
                placeHolder2={"Select Token"}
                data={() => tokenData?.pages}
              ></DropDown>
              <Label>TOKENS</Label>
              {errors.token ? (
                <div
                  className="alert alert-danger alert-sm"
                  style={{
                    fontSize: ".8rem",
                    padding: "5px",
                    margin: 0,
                    marginTop: "10px",
                  }}
                >
                  {errors?.token?.message}
                </div>
              ) : null}
            </div>
            <div className="form-group book-button">
              <FormButton className="form-control" >Save</FormButton>
            </div>
         
          </FormContainer>
        </Div>
      </Row>
    </>
  );
};

export default BookNow;

// import React, { useState } from 'react';

// const CustomSelect = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [selectedOption, setSelectedOption] = useState(null);
//   const [searchText, setSearchText] = useState('');
//   const options = ['Option 1', 'Option 2', 'Option 3', 'Option 4'];

//   const toggleDropdown = () => {
//     setIsOpen(!isOpen);
//   };

//   const selectOption = (option:any) => {
//     setSelectedOption(option);
//     setIsOpen(false);
//   };

//   return (
//     <div className="custom-select" style={{paddingTop:'100px'}}>
//       <div
//         className={`select-box ${isOpen ? 'open' : ''}`}
//         onClick={toggleDropdown}
//       >
//         <div className="selected-option">
//           {selectedOption || 'Select an option'}
//         </div>
//         {isOpen && (
//           <div className="options">
//             {options.map((option) => (
//               <div key={option} onClick={() => selectOption(option)}>
//                 {option}
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//       {isOpen && (
//         <input
//           type="text"
//           placeholder="Search..."
//           value={searchText}
//           onChange={(e) => setSearchText(e.target.value)}
//         />
//       )}
//     </div>
//   );
// };

// export default CustomSelect;
