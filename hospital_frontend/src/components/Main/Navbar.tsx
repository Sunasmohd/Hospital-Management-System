import { Link, Outlet } from 'react-router-dom'
import useHamburger from '../../store/HamburgerState'
import Hamburger from '../Icons/Hamburger'
import './Navbar.css'

const Navbar = () => {
  const token = localStorage.getItem('token')
  const isOpen = useHamburger(s=>s.isOpen)
  return (
    <>
      <section className="nav-main">
        <section className="nav-first-section">
            <h1>DOCBOOK</h1>
        </section>
        <section className="nav-second-section">
            <ul>
              <li><Link to='/appoinment'>Appoinment</Link></li>
              <li><Link to='/hospitals'>Hospitals</Link></li>
              <li><Link to='/doctors'>Doctors</Link></li>
              <li><Link to='/departments'>Departments</Link></li>
              <li><Link to='/'>About Us</Link></li>
            </ul>
        </section>
        <section className="nav-third-section">
          <ul>
            <li><Link to='/'>Helpline</Link></li>
              
            { token ?  <li className='login-nav'><Link to='/login' onClick={() => 
            {localStorage.removeItem('token')
            if(localStorage.getItem('token') === null){
              window.location.reload()
              window.location.href = '/login'
            }
          
          }}
            >Logout</Link></li> : <>
              <li className='login-nav'><Link to='/login'>Login</Link></li>
            <li className='signup-nav'><Link to='/register'>Sign Up</Link></li></> }
          </ul>
        </section>
        
        <section className="nav-mobile-section">
            <Hamburger></Hamburger>
        </section>
      </section>
      <section className={`option-container ${isOpen ? 'open' : 'close'}`} >
        <section className="nav-mobile-option-section" >
          <ul>
                <li><a href="/appoinment">Appoinment</a></li>
                <li><a href="/">Helpline</a></li>
                { token ?  <li className='login-nav'><a href="/login"
                onClick={() => 
                  {localStorage.removeItem('token')
                  if(localStorage.getItem('token') === null){
                    window.location.reload()
                    window.location.href = '/login'
                  }}}
                >Logout</a></li>:<>
                  <li className='login-nav'><a href="/login">Login</a></li>
                <li className='signup-nav'><a href="/register">Sign Up</a></li>
                </> }
                <li><a href="/hospitals">Hospitals</a></li>
                <li><a href="/doctors">Doctors</a></li>
                <li><a href="/departments">Departments</a></li>
                <li><a href="/">About Us</a></li>
              </ul>
          </section>
      </section>
      <Outlet></Outlet>
    </>
  )
}

export default Navbar