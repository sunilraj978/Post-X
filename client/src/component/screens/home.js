import React,{useState,useEffect,useContext} from 'react'

import {UserContext} from '../../App'
import {Link} from 'react-router-dom'


function Home(){

    const[data,setData] = useState([])

    const {state,dispatch} = useContext(UserContext)

    useEffect(()=>{
        fetch("/allPost",{
            method:"get",
            headers:{
                "Authorization": "abcd "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            console.log(result
                )
            setData(result.post)
        })
    },[])

    const LikePost = (id) =>{
        fetch("/Like",{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization": "abcd "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                postId:id
            })
        })
        .then(res=>res.json())
        .then(result=>{
            const newData = data.map(item=>{
                if(item._id == result._id){
                    return result
                }
                else{
                    return item
                }
            })
            setData(newData)
        })
        
    }

    const unLikePost = (id) =>{
        fetch("/unLike",{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization": "abcd "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                postId:id
            })
        })
        .then(res=>res.json())
        .then(result=>{
            
            const newDataa = data.map(item=>{
                
                if(item._id == result._id){
                    return result
                }
                else{
                    return item
                }
            })
            setData(newDataa)
        })
        
    }


    const addComment = (text,postId)=>{
        
        fetch("/comment",{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization": "abcd "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                text,
                postId
            })
        }).then(res=>res.json())
        .then(result=>{
            console.log(result)
            const newData = data.map(item=>{
                
                if(item._id == result._id){
                    return result
                }
                else{
                    return item
                }
            })
            setData(newData)
        })
        
    }


    

    const deletePost = (id)=>{    
        fetch("/delete"+id,{
            method:"delete",
            headers:{
                "Content-Type":"application/json",
                "Authorization": "abcd "+localStorage.getItem("jwt")
            },
        }).then(res=>res.json())
        .then(result=>{
            console.log(result)
            const newDatas = data.filter(item=>{
                return item._id !== result._id
                
            })
            setData(newDatas)
        })
        
    }


    return(
        <div>
            {
                data.map(item=>{
                    return(
                        <div className="card" style={{maxWidth:"680px",margin:"20px auto"}}>
                            <div key={item._id}>
                                <h4 className="brand-logo" style={{display:"flex",justifyContent:"space-between"}}> {
                                    item.postedBy._id == state._id ?
                                    item.postedBy.name
                                    :
                                    <Link to={"/profile/"+item.postedBy._id} > {item.postedBy.name} </Link>
                                } {item.postedBy._id == state._id ?  <i className="material-icons" style={{color:"#f44336 red !important",padding:"10px",cursor:"pointer"}} onClick={()=>{
                                        deletePost(item._id)}}  >delete</i>: "" } </h4>
                                
                                <img src= {item.photo} alt={item.title} style={{height:"460px",width:"660px"}} />
                                <h6>{item.title}</h6>
                                <h6>{item.body}</h6>
                                <i className="material-icons" style={{color:"red",padding:"10px",cursor:"pointer"}}>favorite</i> 
                                
                                   
                                    {
                                    item.Likes.includes(state._id)?  <i className="material-icons" style={{color:"#f44336 red !important",padding:"10px",cursor:"pointer"}} onClick={()=>{
                                        unLikePost(item._id)}}  >thumb_down</i> : <i className="material-icons" style={{color:"#f44336 red",padding:"10px",cursor:"pointer"}}  onClick={()=>{LikePost(item._id)}} >thumb_up</i> 
                                    }
                               
            
                                
                                <h6 style={{paddingLeft:"10px"}}>{item.Likes.length} likes</h6>

                                {
                                    item.comment.map(record=>{
                                    return(
                                        console.log(record),
                                        <h6> <span style={{fontWeight:"bold"}}>{record.postedBy.name}</span> : {record.text} </h6>
                                    )
                                    })
                                }
                                
                                <form onSubmit={(e)=>{
                                    
                                    addComment(e.target[0].value,item._id)
                                }}>
                                <input type="text" placeholder="Add Comment"  ></input>
                                </form>

                            </div>
                        </div>
                    )
                })
            }

            
            
        </div>
    )
}

export default Home