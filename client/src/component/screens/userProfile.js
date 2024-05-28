import React, { useState, useEffect, useContext } from 'react'

import { UserContext } from '../../App'
import { useParams } from 'react-router-dom'

import {useHistory} from 'react-router-dom'


function Profile() {

    const { state, dispatch } = useContext(UserContext)
    const [Profile, setProfile] = useState(null)
    const [names, setName] = useState("")
    const history = useHistory()
    const { userId } = useParams()
    var think = "true"

    console.log(userId)

    useEffect(() => {
        fetch("/user" + userId, {
            headers: {
                method: "get",
                "Authorization": "abcd " + localStorage.getItem("jwt")
            }
        })
            .then(res => res.json())
            .then(result => {
                setProfile(result)
            })
    }, [])


    const followUser = () => {
        fetch("/follow", {
            method: "put",
            headers: {
                "Content-Type":"application/json",
                "Authorization": "abcd " + localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                followId:userId
            })
        })
        .then(res => res.json())
        .then(data => {
            
            console.log(data)
            dispatch({type:"UPDATE",payload:{
                following:data.following,
                followers:data.followers}})

            localStorage.setItem("user",JSON.stringify(data))
            setProfile((prevState)=>{
                return{
                    ...prevState,
                    user:{
                        ...prevState.user,
                        followers:[...prevState.user.followers,data._id],
                        think : "false"
                    }
                }
                
            })
             
            console.log(think)
        })
        
        history.push("/")

    }


    const UnfollowUser = () => {
        fetch("/Unfollow", {
            method: "put",
            headers: {
                "Content-Type":"application/json",
                "Authorization": "abcd " + localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                unfollowId:userId
            })
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            dispatch({type:"UPDATE",payload:{
                following:data.following,
                followers:data.followers}})

            localStorage.setItem("user",JSON.stringify(data))
            setProfile((prevState)=>{
                const newDta = prevState.user.followers.filter(item=>item!=data._id)
                return{
                    ...prevState,
                    user:{
                        ...prevState.user,
                        followers:newDta,
                        think : true
                    }
                }
            })
            
            console.log(think)
            
            
        })
        history.push("/")

    }


    return (
        <div>
            {
                Profile
                    ?
                    <div>
                        <div style={{ maxWidth: "550px", margin: "0 auto", display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                            <div>
                                <img src="https://images.unsplash.com/photo-1546019170-f1f6e46039f5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" alt="hp" style={{ margin: "20px 30px auto", height: "160px", width: "160px", borderRadius: "80px" }} />
                            </div>
                            <div>
                                <div>
                                    <h4>{Profile.user.name}</h4>
                                    <h6>{Profile.user.email}</h6>
                                </div>
                                <div style={{ display: "flex", margin: "0", width: "109%", flexDirection: "row", justifyContent: "space-evenly" }}>
                                    <h6>{Profile.post.length} post </h6><br/>
                                    <h6>{Profile.user.followers.length} followers</h6><br/>
                                    <h6>{Profile.user.following.length} following</h6>
                                
                                </div>
                                

                                    <button  className="btn waves-effect waves-light" onClick={()=>{
                                        followUser()}}  >Follow
                                        <i className="material-icons right">send</i>
                                        </button> 
                                        ::
                                   <button className="btn waves-effect waves-light" onClick={()=>{
                                    UnfollowUser()}}  >Unfollow
                                    <i className="material-icons right">send</i>
                                    </button>
                                    
                                        
                                        
                                

                            </div>
                        </div>
                        <hr style={{ width: "500px", marginTop: "30px" }} />

                        <div className="gallery">
                            {
                                Profile.post.map(item => {
                                    return (
                                        <img key={item._id} src={item.photo} alt="hp" style={{ margin: "20px 30px auto", height: "160px", width: "160px" }} />
                                    )
                                })
                            }

                        </div>
                    </div>
                    :
                    <div>
                        <img src="https://gifimage.net/wp-content/uploads/2017/09/animated-loading-gif-transparent-background-12.gif" alt="plt" style={{ height: "150px", width: "150px", marginTop: "80px", marginLeft: "670px" }} />
                        <h4 style={{ height: "150px", width: "150px", marginTop: "80px", marginLeft: "690px" }} >loading....</h4>
                    </div>

            }

        </div>
    )
}

export default Profile