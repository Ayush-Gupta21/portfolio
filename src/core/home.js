import React, {useState}from "react"
import "../styles.css"
import "../responsive.css"
import Typewriter from 'typewriter-effect';
import image from "../images/portfolio.png"
import image1 from "../images/banner-image.png"
import image2 from "../images/about-us.png"
import Portfolio from "./portfolio";
import mongo from"../images/mongo.png"
import react from"../images/react.png"
import node from"../images/nodejs.svg"
import webdev from"../images/webdev.svg"
import webdesign from"../images/webdesign.svg"
import ContactFront from "./ContactFront";
import About from "./About";
import { Link, animateScroll as scroll, Element } from "react-scroll";
import ScrollOut from "scroll-out"

const Home = () => {

    ScrollOut({
        targets: "#servicecard1, #servicecard2, [data-scroll]",
        once: true
    });

    const [addclass, setAddclass] = useState("")
    const [displayhand, setDisplayhand] = useState("none")

    window.addEventListener("scroll", ()=> {
        if(window.scrollY > 100){
            setAddclass("navbar_fixed")
        }else{
            setAddclass("transparent")
        }
        if(window.scrollY > 600){
            setDisplayhand("block")
        } else{
            setDisplayhand("none")
        }
    })

    const [collapsed, setCollapsed] = useState(true)

    const toggleNavbar = () => {
        setCollapsed(!collapsed)
    }
    
    function reportWindowSize() {
         window.addEventListener("resize", ()=>{
             if(window.innerWidth > 1000){
                 setCollapsed(false)
             } else{
                 setCollapsed(true)
             }
         })
      }

    window.onresize = reportWindowSize;
    
    const classOne = collapsed ? 'collapse navbar-collapse' : 'collapse navbar-collapse show';
    const classTwo = collapsed ? 'navbar-toggler navbar-toggler-right collapsed' : 'navbar-toggler navbar-toggler-right';

    return(
        <div>
        <header  className={`header_area ${addclass}`} >
        <div id="navbarcontainer"  className="main-menu container-fluid">
            <nav style={{padding: "0px 0px 0px 2vw"}} className="navbar navbar-expand-lg navbar-light">
                <Link className="navbar-brand" to="#">
                    <img src={image} alt="logo"/>
                    <h3 id="ayush">Ayush</h3>
                </Link>
                <button style={{zIndex: "2"}} onClick={toggleNavbar} className={`${classTwo}`} type="button" data-toggle="collapse" data-target="#navbarNav"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className={`${classOne}`} id="navbarNav">
                    <div className="mr-auto"></div>
                    <ul className="navbar-nav">
                        <li id="navLink" className="nav-item">
                        <Link  className="nav-link"
                                activeClass="active"
                                to="home"
                                spy={true}
                                smooth={true}
                                offset={-500}
                                duration= {700}>HOME</Link>
                        </li>
                        <li id="navLink" className="nav-item">
                        <Link  className="nav-link"
                                activeClass="active"
                                to="about"
                                spy={true}
                                smooth={true}
                                offset={-230}
                                duration= {700}>ABOUT</Link>
                        </li>
                        <li id="navLink" className="nav-item">
                        <Link  className="nav-link"
                                activeClass="active"
                                to="portfolio"
                                spy={true}
                                smooth={true}
                                offset={-150}
                                duration= {700}>PORTFOLIO</Link>
                        </li>
                        <li id="navLink" className="nav-item">
                            <Link  className="nav-link"
                                activeClass="active"
                                to="services"
                                spy={true}
                                smooth={true}
                                offset={-250}
                                duration= {700}>SERVICES</Link>
                        </li>
                        <li id="navLink" className="nav-item">
                        <Link className="nav-link"
                                activeClass="active"
                                to="contact"
                                spy={true}
                                smooth={true}
                                offset={-300}
                                duration= {700}>CONTACT</Link>
                        </li>

                    </ul>
                </div>
            </nav>
        </div>
    </header>

    <Link
    to="home"
    spy={true}
    smooth={true}
    offset={-200}
    duration= {700}
    > <i style={{display: `${displayhand}`}} id="handicon" className="fas fa-hand-point-up"></i></Link>

    <Element id="home">
        <div id="heycontainer" className="container-fluid">
            <div className="row ">
                <div className="col-md-12 col-lg-6 ">
                    <h3 id="hey" className="title-text">Hey</h3>
                    <h1 id="iamayush" className="title-text">I AM AYUSH</h1>
                    <h1 id="typewriter"><Typewriter
                    options={{
                        strings: ['Full Stack Web Developer', 'Web Designer'],
                        autoStart: true,
                        loop: true,
                        delay: 30,
                        deleteSpeed:30
                    }}
                    /></h1>
                    <Link 
                    to="contact"
                    spy={true}
                    smooth={true}
                    offset={0}
                    duration= {0} 
                    className="btn btn-primary" 
                    id="primarybutton">HIRE ME</Link>
                    <button className="btn btn-primary" id="secondarybutton">GET CV</button>
                </div>
                <div className="col-md-12 col-lg-6" >
                    <img id="image2" className="img-fluid" src={image1} alt="load error"/>
                </div>
            </div>
        </div>
    </Element>
    
    <Element id="about">
        <div id="aboutcontainer" className="container">
            <div className="row">
                <div id="imageinabout" className="col-md-12 col-lg-6">
                    <img className="img-fluid" src={image2} alt="can't load"/>
                </div>
                <div className="col-md-12 col-lg-6">
                    <h1 data-scroll id="letmeintroducemyself">Let Me Introduce Myself</h1>
                    <About />
                </div>
            </div>
        </div>
    </Element>
    
    <Element id="portfolio">
        <Portfolio  />
    

    
        {/* <div id="imagecontainerservice"> */}
            <div id="stackcontainer" className="container text-center">
                <h1 data-scroll>MY STACK</h1>
                <p data-scroll>I USE MERN STACK TO DEVELOP WEB APPLICATIONS</p>
                <div data-scroll className="row align-items-center" style={{marginTop: "30px"}} >
                    <div id="stackmongo" className="col-md-3 mr-auto">
                        <img  className="img-fluid" src={mongo} alt="can't load"/>
                    </div>
                    <div id="stackexpress" className="col-md-3">
                        <h5 style={{fontWeight: "50", fontSize: "3vw"}}>Express</h5>
                    </div>
                    <div id="stackreact" className="col-md-3">
                        <img className="img-fluid" src={react} alt="can't load"/>
                    </div>
                    <div id="stacknode" className="col-md-3">
                        <img  className="img-fluid" src={node} alt="can't load"/>
                    </div>
                </div>
            </div>
        {/* </div> */}
        </Element>
    
    <Element id="services">
    <div id="imagecontainerservice">

            <h1 data-scroll className="text-center">SERVICES OFFERED</h1>
            <div id="rowinservice" className="row">
                <div id="servicecard1" className="col-sm-4 col-md-3 card ">
                    <div className="services">
                        <img style={{width: "100px", height: "100px"}} src={webdev} alt="can't load" />
                        <div className="card-body">
                            <h3  className="card-title text-centre">WEB DEVELOPMENT</h3>
                            <p   className="card-text text-centre text-secondary">Functional, Controllabe, User-Friendly Website using MERN Stack</p>
                        </div>
                    </div>
                </div>
                <div id="servicecard2" className=" col-sm-4 col-md-3 card" >
                    <div className="services">
                        <img style={{width: "100px", height: "100px"}} src={webdesign} alt="can't load" />
                        <div className="card-body">
                            <h3  className="card-title text-centre">WEB DESIGNING</h3>
                            <p  className="card-text text-centre text-secondary">Attractive, Responsive, User-Friendly Frontend</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Element>

    
        <ContactFront />
    
    </div>
    )
}

export default Home;