import React, {useState, useEffect} from "react"
import { getAbout } from "./helper/aboutapis";
import { MoonLoader } from "react-spinners";

const About = () => {

    const [about, setAbout] = useState("")
    const [isLoading, setIsLoading] = useState(true)

    const cssOverride = {
        display: "block",
        margin: "50px auto 0",
        borderColor: "black"
    };

    const aboutId = "5ea8386ad16d080d6f3f36dc"

    const getAnAbout = (aboutId) => {
        getAbout(aboutId).then(data => {
            if(data.error){
                console.log(data.error)
            } else{
                setIsLoading(false)
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
             {
                isLoading ? <MoonLoader size={50} loading={isLoading} cssOverride={cssOverride} /> :
                text
             } 
         </p>

    )
}

export default About;

