import React,{createContext,useEffect,useReducer,useContext} from 'react';
import Navbar from './component/nav'
import './App.css';
import Home from './component/screens/home'
import Login from './component/screens/login'
import Profile from './component/screens/profile'
import Signup from './component/screens/signup'
import CreatePost from './component/screens/createPost'
import OtherDet from './component/screens/userProfile'
import {BrowserRouter,Route,useHistory,Switch} from 'react-router-dom'
import {reducer,initialstate} from './reducres/userReducer'


//context
export const UserContext = createContext()



const Routing = () =>{



  const history = useHistory()

  const {state,dispatch} = useContext(UserContext)

  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"))
    if(user){
      dispatch({type:"USER",payload:user})
      
    }
    else{
      history.push("/Login")
    }
  },[])

  return(
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>

      <Route path="/login">
        <Login />
      </Route>

      <Route path="/signUp">
        <Signup />
      </Route>

      <Route exact path="/profile">
        <Profile />
      </Route>

      <Route path="/create">
        <CreatePost />
      </Route>

      <Route  path="/profile/:userId">
        <OtherDet />
      </Route>

    </Switch>
  )
}


function App() {

  const [state,dispatch] = useReducer(reducer,initialstate)

  return (
    <UserContext.Provider value={{state,dispatch}}>
      <BrowserRouter>
      
      <Navbar />

      <Routing />
      
      
      </BrowserRouter>
      </UserContext.Provider>
      
  );
}

export default App;
