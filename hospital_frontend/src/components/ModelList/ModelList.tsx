import { Link } from "react-router-dom";
import styled from "styled-components";


const Div = styled.div`
  padding-top:80px;
  
@media screen and (max-width:400px) {
 
}
`;

const Card = styled.div`
  	width:18rem;
    
@media screen and (max-width:400px) {
    width:12rem;
}
`

interface ModelProps {
  title:string;
  desc:string;
  img?:string;
  atag?:string
}

const ModelList = ({title,desc,img,atag}:ModelProps) => {
  return (
    <>
      
      <Div className="mt-3">
        <Card className="card">
          <Link to={atag!} className="text-dark text-decoration-none">
            <img className="card-img-top" src={img} alt="" />
            <div className="card-body">
              <h4 className="card-title border-1 border-bottom border-secondary mb-2 pb-2">{title}</h4>

              <h6 className="card-text">{desc}</h6>
            </div>
          </Link>
        </Card>
      </Div>
    </>
  );
};

export default ModelList;
