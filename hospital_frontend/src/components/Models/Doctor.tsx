import InfiniteScroll from "react-infinite-scroll-component";
import useDoctor from "../../hooks/useDoctor";
import ModelList from "../ModelList/ModelList";
import './Doctor.css'

const Doctor = () => {
  

  const { data:doctorData,hasNextPage,fetchNextPage}  = useDoctor();

  const dataLength = doctorData?.pages.reduce((acc,page) => acc + page.results.length , 0) || 0;


  return (

    <InfiniteScroll dataLength={dataLength} hasMore={!!hasNextPage} next={fetchNextPage} loader={'loading'}>
      <div className="doctor-grid-div">
        {doctorData?.pages.map( page => (
          page.results.map( doc => (
            <ModelList atag={`/doctors/${doc.slug}`} key={doc.id} img={doc.image} title={doc.name} desc={doc.speciality}></ModelList>
          ) )
        ))}
      </div>
    </InfiniteScroll>

  );
};

export default Doctor;
