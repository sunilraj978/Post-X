import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import M from 'materialize-css'


function Signup() {
    const history = useHistory()
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [image,setImage] = useState("")
   const [url,setUrl] = useState("")


    useEffect(()=>{

        if(url){
            fetch("/signUp", {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name, email, password,ProfilePic:url
                })
            }).then(res => res.json())
                .then(data => {
                    if (data.error) {
                        M.toast({ html: data.error, classes: "#e57373 red lighten-2" })
                    }
                    else if (data.message) {
                        M.toast({ html: data.message, classes: "#a5d6a7 green lighten-3" })
                        history.push('/login')
                    }
                })
        }

    },[url])


    const Profilepic = () => {
        const data = new FormData()
        data.append("file", image)
        data.append("upload_preset", "insta-clone")
        data.append("cloud_name", "batmitton")
        fetch("https://api.cloudinary.com/v1_1/batmitton/image/upload", {
            method: "post",
            body: data
        })
            .then(res => res.json())
            .then(data => {
                setUrl(data.url)

            })



    }

    return (
        <div className="mycart">
            <div className="card auth-cart">
                <h1>Instagram</h1>
                <input type="text" placeholder="name" value={name} onChange={(e) => setName(e.target.value)} />
                <input type="text" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <div className="file-field input-field">
                    <div className="btn">
                        <span>Upload Image</span>
                        <input type="file" onChange={(e) => setImage(e.target.files[0])} />
                    </div>
                    <div className="file-path-wrapper">
                        <input className="file-path validate" type="text" />
                    </div>


                </div>
                <br /><br />
                <button className="btn" onClick={() => Profilepic()}  >SignUp
                    </button>
                <br /><br />
                <hr />
                <p>Have an account?  <Link className="link" to="/login">Log in</Link> </p>
            </div>
        </div>

    )
}

export default Signup







//
// 