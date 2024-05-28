import React, { useState, useEffect, useContext } from 'react'

import { UserContext } from '../../App'



function Profile() {

    const { state, dispatch } = useContext(UserContext)
    const [img, setImage] = useState([])
    const [names, setName] = useState("")

    useEffect(() => {
        fetch("/myPost", {
            headers: {
                method: "get",
                "Authorization": "abcd " + localStorage.getItem("jwt")
            }
        })
            .then(res => res.json())
            .then(result => {
                console.log(result)
                setImage(result.myPost);
                setName(result.myPost)
            })
    }, [])

    return (
        <div >
            <div style={{ maxWidth: "550px", margin: "0 auto", display: "flex", flexDirection: "row", justifyContent: "space-between" }}>

                <div>
                    {
                        state ? state.ProfilePic ?
                            <img src={state ? state.ProfilePic : ""} alt="hp" style={{ margin: "20px 30px auto", height: "160px", width: "160px", borderRadius: "80px" }} />
                            :
                            <img src={state ? state.user.ProfilePic : ""} alt="hp" style={{ margin: "20px 30px auto", height: "160px", width: "160px", borderRadius: "80px" }} />
                            :
                            ""
                    }
                </div>
                <div>
                    <div>

                        {
                            state ? state.name ?
                                <h4>{state ?state.name : "" }</h4>
                                : <h4>{state ? state.user.name ? state.user.name : "" : ""}</h4>
                                :
                                ""
                        }

                    </div>
                    <div style={{ display: "flex", margin: "0", width: "109%", flexDirection: "row", justifyContent: "space-evenly" }}>
                        <h6>{img.length} post </h6><br />
                        {
                            state ? state.followers ?
                                <h6>{state ? state.followers ? state.followers.length : "" : ""} followers</h6>
                                : <h6>{state ? state.user.followers? state.user.followers.length : "" : ""} followers</h6>
                                :
                                ""
                        }
                        {
                            state ? state.following ?
                                <h6>{state ? state.following ? state.following.length : "" : ""} following </h6>
                                : <h6>{state ? state.user.following ? state.user.following.length : "" : ""} following </h6>
                                :
                                ""
                        }

                    </div>

                </div>
            </div>
            <hr style={{ width: "500px", marginTop: "30px" }} />

            <div className="gallery">
                {
                    img.map(item => {
                        return (
                            <img key={item._id} src={item.photo} alt="hp" style={{ margin: "20px 30px auto", height: "160px", width: "160px" }} />
                        )
                    })
                }

            </div>

        </div>
    )
}

export default Profile