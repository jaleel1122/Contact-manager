import React, { useState } from 'react'
import Header from './components/Header'
import Addcontacts from './components/Addcontacts'
import Contactlist from './components/Contactlist'

const App = () => {
  const [contacts,setcontacts] = useState([])

  function addcontactshandler(contact){
          setcontacts([...contacts, contact]);
          
        }
        console.log(contacts)
  return (
    <>
    <Header/>
    <Addcontacts addcontactshandler={addcontactshandler}/>
    <Contactlist contacts={contacts}/>
    </>
  )
}

export default App
































