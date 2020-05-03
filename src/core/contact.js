import React, {useState, useEffect} from "react"
import Base from "../dashboard/base"
import { getContacts, deleteContact } from "../core/helper/contactapis"
import { Link } from "react-router-dom"
import { isAuthenticated } from "../auth/helper/authapis"
import ModalWindow from "./ModalWindow"

const Contacts = () => {

    const {token} = isAuthenticated()

    const [contacts, setContacts] = useState([])
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)

    const [isOpen, setIsOpen] = useState(false);

    const [index, setIndex] = useState("")
    const [contact, setContact] = useState("")

    const showModal = (contact, index) => {
        setContact(contact);
        setIndex(index);
        setIsOpen(true);
    };

    const hideModal = () => {
        setIsOpen(false);
        setContact("");
        setIndex("");
    };
    
    const preloadContacts = () => {
        getContacts("ayush", token).then(data => {
            if(data.error){
                console.log(data.error)
            } else{
                setContacts(data)
                setSuccess(false)
                setError(false)
            }
        })
    }

    useEffect(() => {
        preloadContacts()
    }, [])

    const deleteOnSubmit = (contactId) => {
        deleteContact(contactId, "ayush", token)
        .then(data => {
            if(data.error){
                setError(true)
            } else{
                setSuccess(true)
                setTimeout(preloadContacts, 2000)
            }
        })
    }


    const successMessage = () => {
        return(
            <div className="alert alert-success mt-3"
        style={{display: success ?  "" : "none"}}>
            <h4>Deleted Successfully</h4>
        </div>
        )
    }

    const errorMessage = () => (
        <div className="alert alert-danger mt-3"
        style={{display: error ? "" : "none"}}>
            <h4>{error}</h4>
        </div>
    )

    return(
        <div>
            <Base />
            <h2 className="text-center" style={{marginBottom: "50px"}}>People Wanted To Connect</h2>
            <div className="container" >
            <ModalWindow key={index} contact = {contact} isOpen={isOpen} hideModal={hideModal}/>
                {successMessage()}
                {errorMessage()}
                <div className="row">
                    {contacts.map((contact, index) => {
                        var message = contact.message;
                        var substring = `${message.substring(0, 30)} .... `
                        return(
                            <div key={index} id="dashboardcards" className="card col-md-4">
                                <div className="card-body" >
                                    <h5 className="card-title">{contact.name}</h5>
                                    <h6 className="card-subtitle mb-2 text-muted">{contact.email}</h6>
                                    <p className="card-text">{substring}</p>
                                    <button
                                    style={{marginLeft: "150px", marginRight: "10px"}} 
                                    className="btn btn-sm btn-primary"
                                    data-toggle="modal" data-target="#exampleModalCenter"
                                    onClick={()=>showModal(contact, index)}
                                    >Read More</button>
                                    <button onClick={() => {deleteOnSubmit(contact._id)}} className="btn btn-sm btn-danger">Delete</button>
                                </div>
                          </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Contacts;