import React,{useState,useContext} from 'react'
import { Link,useHistory } from 'react-router-dom'
import M from 'materialize-css'
import {UserContext} from '../../App'


function Login(){

    const {state,dispatch} = useContext(UserContext)

    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")

    const history = useHistory()

    const Onto = ()=>{
     fetch("/Login",{
         method:"post",
         headers:{
            "Content-Type":"application/json"
         },
         body:JSON.stringify({
             email,password
         })
     })
     .then((res)=>res.json())
     .then((data)=>{
         if(data.error){
            M.toast({html: data.error ,classes:"#e57373 red lighten-2"})
            return
         }
         else{
            localStorage.setItem("jwt",data.token)
            localStorage.setItem("user",JSON.stringify(data.user))
            dispatch({type:"USER",payload:data.user})
            M.toast({html:"Successfully Login",classes:"#a5d6a7 green lighten-3"})
            history.push("/")
         }
     })       
    }
    
    return(

        <div className="mycart">
            <div className="card auth-cart"> 
                <h1>Instagram</h1>
                <input type="text" placeholder="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                <input type="password" placeholder="password" value={password}  onChange={(e)=>setPassword(e.target.value)} />
                <br /><br />
                <button onClick={()=>Onto()} className="btn login" >Login
                </button>
                <br /><br />
                <hr />
                <p>Don't have an account? <Link className="link" to="/signUp">Sign up</Link> </p>
            </div>
        </div>
        
    )
}

export default Login