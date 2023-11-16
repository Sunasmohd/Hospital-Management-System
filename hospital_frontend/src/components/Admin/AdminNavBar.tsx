import { NavLink, Outlet } from 'react-router-dom'
import styled from 'styled-components'

const Li = styled.li`
    font-size : 15px;
`
const FontSet = styled.div`
    font-size:15px;
`

const A = styled.a`
    font-size : 23px;
    font-family: Gilda Display;
`

const AdminNavBar = () => {

  
  return (
    <>


    <nav className="navbar navbar-expand-sm navbar-dark navbar-collapse bg-dark p-3">
        <A className={`navbar-brand logo mx-2`} href="#">DOCBOOK</A>
        <button className="navbar-toggler d-lg-none" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavId" aria-controls="collapsibleNavId"
            aria-expanded="false" aria-label="Toggle navigation"></button>
        <div className="collapse navbar-collapse" id="collapsibleNavId">
            <ul className="navbar-nav me-auto mt-2 mt-lg-0 mx-4">

                
               
                   
                    
                    <Li className="nav-item">
                        <NavLink to='/dashboard' className="nav-link text-light" aria-current="page">Dashboard</NavLink>
                    </Li>
                    
                    <Li className="nav-item">
                        <NavLink to='/hospitals' className="nav-link text-light">Hospitals</NavLink>
                    </Li>
                    <Li className="nav-item">
                        <NavLink to='/doctors' className="nav-link text-light" >Doctors</NavLink>
                    
                    </Li><Li className="nav-item">
                        <NavLink to='/departments' className="nav-link text-light">Departments</NavLink>
                    </Li>
                
                   
                    
                    
                    
                    
                
               
            </ul>
           
           <FontSet><a className="text-light text-capitalize user-name text-decoration-none">Hello,</a></FontSet>
            
                

           <FontSet><a className="text-light p-2 m-4 border border-light logout text-decoration-none">Logout</a></FontSet>
           
            
        </div>
    </nav>
    <Outlet></Outlet>
    

    </>
  )
}

export default AdminNavBar