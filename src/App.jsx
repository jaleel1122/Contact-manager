import React, { useEffect, useState } from 'react'
import { Routes,Route } from 'react-router-dom'
import api from './api/Contacts.js'
import Header from './components/Header'
import Addcontacts from './components/Addcontacts'
import Contactlist from './components/Contactlist'
import ContactDetails from './components/ContactDetails'
import EditContact from './components/EditContact'
 

const App = () => {

  const LOCAL_STORAGE_KEY = "contacts" ;

  const [contacts,setcontacts] = useState([])

  const retriveContacts = async () => {
    const response = await api.get('/contacts')
    return response.data;
  }

  async function addcontactshandler(contact) {
    try {
      const response = await api.post('/contacts', contact);
      setcontacts(prevContacts => [...prevContacts, response.data]);
      console.log('Contact added:', response.data);
    } catch (error) {
      console.error('Error adding contact:', error);
    }
  }

  async function deleteContact(contactId) {
    try {
      await api.delete(`/contacts/${contactId}`);
      setcontacts(prevContacts => prevContacts.filter(contact => contact.id !== contactId));
      console.log('Contact deleted successfully');
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  }

  async function updateContact(contactId, updatedContact) {
    try {
      const response = await api.put(`/contacts/${contactId}`, updatedContact);
      setcontacts(prevContacts => 
        prevContacts.map(contact => 
          contact.id === contactId ? response.data : contact
        )
      );
      console.log('Contact updated successfully');
    } catch (error) {
      console.error('Error updating contact:', error);
    }
  }



        useEffect(()=>{
          // const retriveContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
          // if (retriveContacts) setcontacts(retriveContacts) 
          async function getAllContacts(){
            const allContacts = await retriveContacts()
            console.log(allContacts)
            if (allContacts) setcontacts(allContacts)
            }
            getAllContacts()
        },[])

        useEffect(()=>{
          // localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts))
        },[contacts])


  return (
    <>
    <Header/>
    <Routes>
      <Route path="/" element={<Contactlist contacts={contacts} deleteContact={deleteContact} updateContact={updateContact}/>} />
      <Route path="/addcontacts" element={<Addcontacts addcontactshandler={addcontactshandler}/>} />
      <Route path='/contact/:id' element={<ContactDetails contacts={contacts}/>}/>
      <Route path='/edit/:id' element={<EditContact contacts={contacts} updateContact={updateContact}/>} />
    </Routes>
    </>
  )
}

export default App
































