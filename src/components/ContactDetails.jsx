import React from 'react'
import { useParams } from 'react-router-dom';

const ContactDetails = ({contacts}) => {
    const { id } = useParams()
    const contact = contacts.find(c => c.id === id)
  if (!contact) {
    return <div className="text-center py-10">Contact not found</div>
  }

  return (
    <div className="px-4 mt-6 mb-10 ">
      <div className="max-w-xl mx-auto">
        <div className="card bg-green-100 bg-base-100 border border-base-200/70 shadow-sm transition-colors">
          <figure className="px-8 pt-8">
            {contact.image ? (
              <img className="size-24 rounded-box border border-base-200 object-cover" src={contact.image} alt={contact.name} />
            ) : (
              <svg className="user-icon size-24 rounded-box border border-base-200" viewBox="0 0 24 24">
                <circle cx="12" cy="8" r="4" />
                <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
              </svg>
            )}
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title text-2xl md:text-3xl">{contact.name}</h2>
            <p className="opacity-80">{contact.email}</p>
            <p className="opacity-80">{contact.phone}</p>
            <div className="card-actions gap-2 mt-2">
              <a className="btn btn-primary shadow-sm hover:shadow-md " href={`tel:${contact.phone}`}>Call</a>
              <button 
                className="btn btn-secondary shadow-sm hover:shadow-md"
                onClick={() => window.location.href = `/edit/${contact.id}`}
              >
                Edit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactDetails