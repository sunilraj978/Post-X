import React,{useState,useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import M from 'materialize-css'



const CreatePost = ()=>{

    const his = useHistory()
    const [title,setTitle] = useState("")
    const [body ,setBody] = useState("")
    const [image,setImage] = useState("")
   const [url,setUrl] = useState("")
   

   useEffect(()=>{
    if(url){
        fetch("/createPost",{
            method:"post",
            headers:{
                "Content-Type":"application/json",
                "Authorization": "abcd "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                title,
                body,
                pic:url
                
            })
        })
        .then(res=>res.json())
        .then(data=>{
            if(data.msg){
                M.toast({html:data.msg,classes:"#e57373 red lighten-2"})
                return
            }
            else{
                M.toast({html:"Post Created Successfully",classes:"#a5d6a7 green lighten-3"})
                his.push("/")
            }
        })
    }
},[url])


    const postDetails = ()=>{
        const data = new FormData()
        data.append("file",image)
        data.append("upload_preset","insta-clone")
        data.append("cloud_name","batmitton")
        fetch("https://api.cloudinary.com/v1_1/batmitton/image/upload",{
            method:"post",
            body:data
        })
        .then(res=>res.json())
        .then(data=>{
            setUrl(data.url)
            
        })
      
        
        
    }

    return(
        <div className="card"  style={{maxWidth:"540px",padding:"20px",margin:"30px auto"}}>
            <h4>CreatePost</h4>
            <input type="text" placeholder="title"  value={title} onChange={(e)=>setTitle(e.target.value)} />
            <input type="text" placeholder="body"  value={body} onChange={(e)=>setBody(e.target.value)} />
            <div className="file-field input-field">
            <div className="btn">
                <span>Upload Image</span>
                <input type="file"  onChange={(e)=>setImage(e.target.files[0])} />
                </div>
                <div className="file-path-wrapper">
                    <input  className="file-path validate" type="text"/>
                    </div>

                  
                    </div>
                   <div style={{width:"200px",margin:"20px auto auto"}}>
                   <button style={{width:"200px"}}  className="btn" onClick={()=>postDetails()} >Submit
                </button>
                   </div>
                    </div>
    )
}


export default CreatePost