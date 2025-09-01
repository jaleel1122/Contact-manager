import React from 'react'
import { useParams } from 'react-router-dom';

const ContactDetails = ({contacts}) => {
    const { id } = useParams()
    const contact = contacts.find(c => c.id === id)
  if (!contact) {
    return <div className="text-center py-8">Contact not found</div>
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-md mx-auto">
        <div className="card bg-base-100 shadow-lg">
          <figure className="px-10 pt-10">
            {contact.image ? (
              <img className="size-20 rounded-box" src={contact.image} alt={contact.name} />
            ) : (
              <svg className="user-icon size-20 rounded-box" viewBox="0 0 24 24">
                <circle cx="12" cy="8" r="4" />
                <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
              </svg>
            )}
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title text-2xl">{contact.name}</h2>
            <p className="text-gray-600">{contact.email}</p>
            <p className="text-gray-600">{contact.phone}</p>
            <div className="card-actions space-x-2">
              <button className="btn btn-primary">Call Now</button>
              <button 
                className="btn btn-secondary"
                onClick={() => window.location.href = `/edit/${contact.id}`}
              >
                Edit Contact
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactDetails