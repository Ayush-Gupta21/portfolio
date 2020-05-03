import React from "react"
import { API } from "../../backend";

const ImageHelper = ({portfolio}) => {
    
    const imageUrl = `${API}/portfolio/photo/${portfolio._id}`

    return(
        <img  src={imageUrl}  alt="can't load" />
    )
    // className="card-img-top"
}

export default ImageHelper;