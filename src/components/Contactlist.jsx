import React, { useState, useEffect } from 'react';
import ContactCard from './ContactCard'; // ✅ import the new component

const Contactlist = ({ contacts, deleteContact }) => {
  const [contactList, setContactList] = useState([]);

  useEffect(() => {
    setContactList(contacts);
  }, [contacts]);

//   const handleDelete = (indexToDelete) => {
//     const updatedList = contactList.filter((_, index) => index !== indexToDelete);
//     setContactList(updatedList);
//   };

  return (
    <ul className="list bg-base-100 rounded-box shadow-md max-w-[1100px] mx-auto">
      <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">Contact List</li>

      {contactList.map((contact, index) => (
        <ContactCard
          key={index}
          contact={contact}
          index={index}
          onDelete={() => deleteContact(contact.id)}
          onEdit={() => window.location.href = `/edit/${contact.id}`}
        />
      ))}
    </ul>
  );
};

export default Contactlist;
