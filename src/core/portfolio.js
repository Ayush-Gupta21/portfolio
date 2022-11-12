import React, {useState, useEffect} from "react"
import {getAllPortfolios} from "./helper/portfolioapis"
import ImageHelper from "./helper/ImageHelper"
import {Link} from "react-router-dom"
import github from "../images/github.svg"
import { MoonLoader } from "react-spinners"

const Portfolio = () => {

    const [portfolios, setPortfolios] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const cssOverride = {
        display: "block",
        margin: "50px auto 0",
        borderColor: "black",
    };

    const preloadportfolios = () => {
        getAllPortfolios().then(data => {
            if(data.error){
                console.log(data.error)
            } else{
                setIsLoading(false)
                setPortfolios(data)
            }
        })
    }

    useEffect(() => {
        preloadportfolios()
    }, [])

    const openGithub = (github) => {
        window.open(`${github}`)
    }

    const openSite = (site) => {
        window.open(`${site}`)
    }

    return(
        <div>
            <div  style={{  background : "#313D3F"}}>
                <div id="imagecontainerportfolio" className="container">
                    <h1 data-scroll style={{paddingTop: "50px"}} className="text-left text-white">Portfolio</h1>
                    <p id="projects" data-scroll className="text-white" >Here are the projects that i have made recently</p>
                    <p id="scrollbelow" data-scroll  className="text-white" >Just scroll down below</p>
                    <p id="arrowinsideportfolio" data-scroll><i id="arrowdown" className="fa fa-arrow-down text-white"></i></p>
                    {/* <h1 id="hidephp"></h1> */}
                </div>
            </div>
            {
                isLoading ? <MoonLoader size={60} loading={isLoading} cssOverride={cssOverride} /> :
                <div id="portfoliocontainer">
                    <div className="row">
                        {portfolios.map((portfolio, index) => {
                            return(
                                <div data-scroll key={index} id="portfolioimages" className="team-area col-sm-12 col-md-12 col-lg-6">
                                    <div  className="single-team">
                                        <ImageHelper id="image" portfolio={portfolio} />
                                        <div className="team-text">
                                            
                                            <h2>{portfolio.title}</h2>
                                            <p>{portfolio.description}</p>
                                            <p>
                                            <Link onClick={()=>{
                                                openGithub(portfolio.github)
                                            }}
                                            >
                                                <i id="visitgithub" className="fab fa-github"></i>
                                            </Link>
                                            <Link onClick={()=>{
                                                openSite(portfolio.site)
                                            }} 
                                            >
                                                <i id="visitsite"  className="fas fa-arrow-circle-right"></i>
                                            </Link>
                                            </p>
                                        </div>
                                    </div>
                                </div>

                            )
                        })}
                    </div>
                </div>
            }
        </div>
    )

}

export default Portfolio;