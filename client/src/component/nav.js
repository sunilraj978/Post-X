import React,{useContext} from 'react'
import {Link,useHistory} from 'react-router-dom'

import {UserContext} from '../App'




const Navbar = () =>{


  const {state,dispatch} = useContext(UserContext)
  

  const history = useHistory()

 

  const renderList = ()=>{
    if(state){
      return[
        <li><Link to="/profile">Profile</Link></li>,
        <li><Link to="/create">createPost</Link></li>,
        <li>
          <button className="waves-effect waves-light btn" 
          onClick={
            ()=>{
              localStorage.clear()
              history.push("/Login")
            }
          }
          >Logout</button>   
        </li>
      ]
    }
    else{
      return[
        <li><Link to="/login">Login</Link></li>,
        <li><Link to="/signUp">SignUp</Link></li>,
        
      ]
    }
  }

    return(
        <nav>
    <div className="nav-wrapper white">
      <Link to={state?"/":"/Login"} className="brand-logo left">Instagram</Link>
      <ul id="nav-mobile" className="right">
       {renderList()}
      </ul>
    </div>
  </nav>
    )
}

export default Navbar