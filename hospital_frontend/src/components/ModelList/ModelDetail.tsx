import "./ModelDetail.css";
import { Hosp } from "../../hooks/useHospital";
import { Doc } from "../../hooks/useDoctor";
import { Dept } from "../../hooks/useDepartment";

interface ReusableInfo {
  information?: string;
  modelHolder?: 'hospital' | 'doctor' | 'department';
  data:Hosp | Doc| Dept
}

const hospDesc = (item: any) => item.description
const hospLoc = (item: any) => item.location
const hospEmail = (item: any) => item.email
const hospPhone = (item: any) => item.phone
const hospDoctorSet = (item: any) => item.doctors_set
const docSpec = (item: any) => item.speciality
const docHospital = (item:any) => item.hospital
const docDepartment = (item:any) => item.department
const hospDocImage = (item:any) => item.image


const ModelDetail = ({
  information,
  modelHolder,
  data
}: ReusableInfo) => {
  return (
    <div
      className="page-content page-container main-hospital-detail-container"
      id="page-content"
    >
      <div className="padding">
        <div className="row d-flex flex-row justify-content-center ">
          <div className="col-xl-12 col-md-12">
            <div className="card user-card-full">
              <div className="row m-l-0 m-r-0">
                <div className="col-md-6 col-lg-4 bg-c-lite-green user-profile">
                  <div className="card-block text-left text-dark ppp" style={{padding:"1rem"}}>
                    <div className="m-b-25">
                      {
                        modelHolder !== 'department' && <img
                        src={data && hospDocImage(data)}
                        width={"250rem"}
                        className="img-radius m-2"
                        alt="User-Profile-Image"
                      />
                      }
                    </div>
                    <h3 className="f-w-600 pb-2 b-b-default m-2" >
                      {data?.name}
                    </h3>
                    <h6 className="text-left m-2">{data && hospDesc(data) || data && docSpec(data)}</h6>
                    <a href="#">
                      <button className="btn btn-sm btn-warning m-2">
                        Update
                      </button>
                    </a>
                    <a href="#">
                      <button className="btn btn-sm btn-danger m-2">
                        Delete
                      </button>
                    </a>
                  </div>
                </div>

                <div className="col-md-6 col-lg-8 model-detail-information-container">
                  <div className="card-block bbb">
                    <h4 className="hospital-info m-2">{information}</h4>
                    {modelHolder === 'hospital' && (
                      <div className="row">
                        <div className="col-sm-12 hospital-location">
                          <h6 className="hospital-location-text">LOCATION</h6>
                          <h6 className="text-secondary hospital-location-text-2">
                          { data && hospLoc(data)}
                          </h6>
                        </div>
                      </div>
                    ) } {modelHolder === 'doctor'&&
                      <div className="row">
                        <div className="col-sm-6">
                          <h6 className="doctor-hospital">Hospital</h6>

                         {
                                <a href={`/hospitals/${data && docHospital(data).slug}`} className="text-black">
                                <h6 className="doctor-hospital-value m-2">{data && docHospital(data).name}</h6>
                                </a>
                            
                           
                         }
                        </div>
                        <div className="col-sm-6">
                          <h6 className="doctor-department">Department</h6>

                          <a href={`/departments/${data&&docDepartment(data).slug}`} className="text-black">
                            <h6 className="doctor-department-value m-2 ">{data&&docDepartment(data).name}</h6>
                          </a>
                        </div>
                      </div>
                    }

                    {modelHolder === 'hospital' &&
                  <div>
                    <h6 className="hospital-contact">CONTACT</h6>
                    <div className="row">
                      <div className="col-sm-5 hospital-email">
                        <h6 className="hospital-email-text">Email</h6>
                        <h5 className="hospital-email-text-2">{data && hospEmail(data)}</h5>
                      </div>
                      <div className="col-sm-5 hospital-phone ">
                        <h6 className="hospital-phone-text">Phone</h6>
                        <h5 className="hospital-phone-text-2">{data && hospPhone(data)}</h5>
                      </div>
                    </div>
                  </div>  
                  }
                  </div>

                  {(modelHolder === 'hospital' || modelHolder === 'department') &&
                  <div>
                    <h6 className="mt-4 available-doctors">
                    AVAILABLE DOCTORS
                  </h6>
                  <div className="hospital-doctor-container">
                    {data && hospDoctorSet(data).map((d:Doc) => (
                      <div
                        className="card mt-3"
                        key={d.id}
                        style={{ margin: ".5rem" }}
                      >
                        <a href={`/doctors/${d.slug}`}>
                          <img
                            className="card-img-top"
                            src={d.image}
                            alt=""
                          />
                          <div className="card-body">
                            <h6
                              className="card-title doctor-name"
                            >
                              {d.name}, {d.speciality}
                            </h6>
                            <hr />
                          </div>
                        </a>
                      </div>
                    ))}
                  </div>
                  </div>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelDetail;
