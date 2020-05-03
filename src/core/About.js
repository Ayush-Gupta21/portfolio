import React, {useState, useEffect} from "react"
import { getAbout } from "./helper/aboutapis";

const About = () => {

    const [about, setAbout] = useState("")

    const aboutId = "5ea8386ad16d080d6f3f36dc"

    const getAnAbout = (aboutId) => {
        getAbout(aboutId).then(data => {
            if(data.error){
                console.log(data.error)
            } else{
                setAbout(data)
            }
        })
    }

    useEffect(() => {
        getAnAbout(aboutId)
    }, [])

    const text = about.content
    

    return(
        <p data-scroll id="intro">
             {text} 
             
         </p>

    )
}

export default About;

