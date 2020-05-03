import React, {useState} from "react"
import image from "../images/portfolio.png"
import { Link, withRouter } from "react-router-dom"
import { signout } from "../auth/helper/authapis";


const currentTab = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "black", fontSize: "20px",  };
  } else {
    return { color: "grey", fontSize: "20px" };
  }
};

const Base = ({history}) => {
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
        <nav className="navbar navbar-expand-lg navbar-light bg-light" style={{backgroundColor: "#e3f2fd"}}>
            <img className="navbar-brand" src={image} alt="none" />
            <button onClick={toggleNavbar} className={`${classTwo}`} type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className={`${classOne}`} id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <Link id="navoption" style={currentTab(history, "/dashboard")} className="nav-link" to="/dashboard">Manage Portfolio <span className="sr-only">(current)</span></Link>
                    </li>
                    <li className="nav-item">
                        <Link id="navoption" style={currentTab(history, "/dashboard/contacts")} className="nav-link" to="/dashboard/contacts">Manage Contacts</Link>
                    </li>
                    <li className="nav-item">
                        <Link id="navoption" style={currentTab(history, "/dashboard/aboutme")} className="nav-link" to="/dashboard/aboutme">About Me</Link>
                    </li>
                    <li className="nav-item">
                        <Link style={{marginLeft:"650px", fontSize: "20px"}} className="nav-link btn btn-light" to="/">Check</Link>
                    </li>
                    <li className="nav-item">
                        <button onClick={() => {signout(() => {
                            history.push("/")
                        })}} style={{fontSize: "20px"}} className="nav-link btn btn-light" >Signout</button>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default withRouter(Base);