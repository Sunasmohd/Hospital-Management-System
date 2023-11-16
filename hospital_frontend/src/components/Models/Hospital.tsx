import ModelList from "../ModelList/ModelList";
import InfiniteScroll from "react-infinite-scroll-component";
import "./Hospital.css";
import useHospital from "../../hooks/useHospital";



const Hospital = () => {

  const {
    data: hospitalDatas,
    fetchNextPage,
    hasNextPage,
  } = useHospital();


  const dataLength =
    hospitalDatas?.pages.reduce((acc, page) => acc + page.results.length, 0) || 0;

  
    
  return (
    <>
      <InfiniteScroll
        dataLength={dataLength}
        hasMore={!!hasNextPage}
        next={() => fetchNextPage()}
        loader={"loading"}
      >
        <div className="hospital-grid-div">
          {hospitalDatas?.pages.map((page) =>
            page.results.map((hosp) => (
              <ModelList
                atag={`/hospitals/${hosp.slug}`}
                key={hosp.id}
                title={hosp.name}
                desc={hosp.description}
                img={hosp.image}
              />
            ))
          )}
        </div>
      </InfiniteScroll>
    </>
  );
};

export default Hospital;

