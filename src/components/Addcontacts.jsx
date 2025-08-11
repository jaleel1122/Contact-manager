import React, { useState } from 'react'

const Addcontacts = ({addcontactshandler}) => {

    const [information,setINformation] = useState({name:'',email:'',phone:''})
    
    const handleAdd = () => {
    const { name, email, phone } = information;
    if (name && email && phone) {
        addcontactshandler(information)
      setINformation({ name: '', email: '', phone: '' });
    }
  };

  return (
    <>
      <div className="flex justify-center mt-10">
        <fieldset className="fieldset bg-base-200 border-base-400 rounded-box w-full max-w-xl border p-6">
          <legend className="fieldset-legend text-3xl text-center ">Add Contacts</legend>
            <div className="mx-auto">
          <div className="form-control mb-3">
            <label className="label p-1">Name :</label>
            <input type="text" className="input input-bordered" placeholder="Name" 
            onChange={(e)=>setINformation({...information, name : e.target.value})} value={information.name} />
          </div>

          <div className="form-control mb-3">
            <label className="label p-1">E-mail :</label>
            <input type="text" className="input input-bordered" placeholder="E-mail"
            onChange={(e)=>setINformation({...information, email : e.target.value})} value={information.email} />
          </div>

          <div className="form-control mb-3">
            <label className="label p-1">P.NO :</label>
            <input type="text" className="input input-bordered" placeholder="Phone Number"
            onChange={(e)=>setINformation({...information, phone : e.target.value})} value={information.phone} />
          </div>
          <div className="flex justify-center mt-4">
            <button className="btn btn-primary btn-wide " onClick={handleAdd}>Add</button>
          </div>
            </div>
        </fieldset>
      </div>
    </>
  )
}

export default Addcontacts
