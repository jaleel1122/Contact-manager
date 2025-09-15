import React, { useState, useEffect, useMemo } from 'react';
import ContactCard from './ContactCard'; // ✅ import the new component

const Contactlist = ({ contacts, deleteContact }) => {
  const [contactList, setContactList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setContactList(contacts);
  }, [contacts]);

//   const handleDelete = (indexToDelete) => {
//     const updatedList = contactList.filter((_, index) => index !== indexToDelete);
//     setContactList(updatedList);
//   };

  const filteredContacts = useMemo(() => {
    if (!searchTerm.trim()) return contactList;
    const query = searchTerm.toLowerCase();

    return contactList.filter((contact) => {
      const name = `${contact.firstName || ''} ${contact.lastName || ''}`.trim() || contact.name || '';
      const email = contact.email || '';
      const phone = String(contact.phone || '');

      return (
        name.toLowerCase().includes(query) ||
        email.toLowerCase().includes(query) ||
        phone.toLowerCase().includes(query)
      );
    });
  }, [contactList, searchTerm]);

  return (
    <ul className="list bg-base-100 rounded-box shadow-sm border border-base-200/60 max-w-6xl w-full mx-auto my-4 px-2 sm:px-0 bg-green-100 ">
      <li className="p-4 pb-2 text-xs opacity-90 tracking-wide flex items-center justify-between">
        <span className='text-black font-semibold'>Contact List</span>
        <span className="text-[10px] opacity-50">{filteredContacts.length} of {contactList.length}</span>
      </li>

     <li className="px-4 pb-4 mt-3">
  <div className="relative group">
    <input
      type="text"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      placeholder="Search by name, email, or phone"
      className="w-full pl-4 pr-12 py-3 rounded-xl text-sm bg-white/70 text-gray-800 
                 placeholder-gray-500 border border-transparent 
                 focus:outline-none focus:ring-2 focus:ring-green-900/70
                 shadow-sm backdrop-blur-sm transition-all duration-300
                 hover:bg-white/80 focus:bg-white"
    />
    <svg
      className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 
                 text-gray-500 group-focus-within:text-green-700 
                 transition-colors duration-300"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  </div>
</li>


      {filteredContacts.map((contact, index) => (
        <ContactCard
          key={contact.id ?? index}
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
