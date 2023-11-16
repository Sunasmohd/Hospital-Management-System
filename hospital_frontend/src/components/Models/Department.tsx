import InfiniteScroll from 'react-infinite-scroll-component';
import useDepartment from '../../hooks/useDepartment';
import ModelList from '../ModelList/ModelList'
import './Department.css'

const Department = () => {
  const {
    request: {
    data : deptData,
    fetchNextPage,
    hasNextPage,}
  } = useDepartment();


  const dataLength =
  deptData?.pages.reduce((acc, page) => acc + page.results.length, 0) || 0;


  return (
    <>
      <InfiniteScroll
        dataLength={dataLength}
        hasMore={!!hasNextPage}
        next={() => fetchNextPage()}
        loader={"loading"}
      >
        <div className="dept-grid-div">
          {deptData?.pages.map((page) =>
            page.results.map((dept) => (
              <ModelList
                atag={`/departments/${dept.slug}`}
                key={dept.id}
                title={dept.name}
                desc={dept.description}
              />
            ))
          )}
        </div>
      </InfiniteScroll>
    </>
  );
}

export default Department