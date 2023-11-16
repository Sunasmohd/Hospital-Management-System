import { Link, useNavigate } from "react-router-dom";
import "./MainHome.css";
import styled from "styled-components";
import logo from "../../assets/images/abc.png";
import { Navigate} from 'react-router-dom';

const Main = styled.div`
  padding-top: 60px;
  display: flex;
  justify-content:space-between;
`;

const TopContainer = styled.div`
  margin: 0px 50px;
  margin-top: 7px;
  background-image: url(${logo});
  background-size: 180px 300px;
  background-repeat: no-repeat;
  flex: 1;
  height: 55vh;
  @media (max-width: 430px) {
    padding: 80px;
    margin: 0px 15px;
    background-size: 140px 240px;
  }
  
`;

const BottomContainer = styled.div`
  flex: 1;
  margin-top: 70px;
  padding-right: 20px;
  @media(max-width:430px){
    flex: 0;
  }
`;
const Heading = styled.h1`
  font-size: 3rem;
  color: black;
  text-align: center;
  padding-bottom: 5px;
  font-family: Rubik;

  @media (max-width: 850px) {
    font-size: 2.4rem;
  }

  @media(max-width:430px){
    font-size: 2rem;
  }

  @media(max-width:350px){
    font-size: 1.5rem;
  }
`;

const SubHeading = styled.h4`
  color: black;
  font-family: Rubik;
  font-weight: 400;
  text-align: center;
  @media (max-width: 850px) {
    font-size: 1.1rem;
  }
  @media (max-width: 430px) {
    font-size: .8rem;
  }

  @media(max-width:350px){
    font-size: .6rem;
  }
`;


const MainHome = () => {
  const navigate = useNavigate()
  const tok = localStorage.getItem('token')

  // if (tok===null) return <Navigate to='login/' />

  return (
    <>
      <Main className="main">
        <TopContainer className="top-container"></TopContainer>
        <BottomContainer>
          <Heading>Welcome</Heading>
          <SubHeading>We are here to take care of your time</SubHeading>

          <div className="Div">
            <Link
              to="/appoinment"
              className="btn btn-sm btn-dark home-btn-main"
            >
              Take An Appoinment
            </Link>
          </div>
        </BottomContainer>
        
      </Main>
    </>
  );
};

export default MainHome;
