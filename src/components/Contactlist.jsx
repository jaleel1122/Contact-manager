import axios from 'axios'
import React from 'react'
import { useState,useEffect } from 'react'

const Contactlist = ({contacts}) => {
    const [ContactList,setContactList] = useState([])
    useEffect(() => {
      axios.get('https://dummyjson.com/users')
       .then((response) => {
        console.log(response.data.users);
        setContactList(response.data.users);
      })
    }, [])
    useEffect(() => {
    setContactList(contacts);
    }, [contacts]);

    function handleDelete(indexToDelete){
        const updatedList = ContactList.filter((_, index) => index !== indexToDelete)
        setContactList(updatedList)
    }

  return (
    <>
        <ul className="list bg-base-100 rounded-box shadow-md max-w-[1100px] mx-auto">
            <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">Contact List</li>
            {ContactList.map((contact,index) => (
                <div key={index}>
                    <li className="list-row">
                        <div className="text-4xl font-thin opacity-30 tabular-nums">{String(index+1).padStart(2, '0')}</div>
                        <div>
                            {contact.image ? (
                                <img className="size-10 rounded-box" src={contact.image} alt="contact" />
                            ) : (
                                <svg className="user-icon size-10 rounded-box" viewBox="0 0 24 24">
                                    <circle cx="12" cy="8" r="4" />
                                    <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
                                </svg>
                            )}
                        </div>
                        <div className="list-col-grow">
                        <div>
                            {contact.firstName || contact.lastName
                            ? <div>{contact.firstName} {contact.lastName}</div>
                            : <div>{contact.name}</div>
                            }
                        </div>
                        <div className="text-xs uppercase font-semibold opacity-60">{contact.email}</div>
                        <div className="text-xs uppercase font-semibold opacity-60">{contact.phone}</div>
                        </div>
                        <button className="btn btn-square btn-ghost" onClick={() => handleDelete(index)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                                </svg>
                        </button>
                    </li>
        
                </div>
            ))}
      </ul>     
    </>
  )
}

export default Contactlist