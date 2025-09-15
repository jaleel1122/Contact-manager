import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Addcontacts = ({addcontactshandler}) => {
    const navigate = useNavigate();

    const [information, setINformation] = useState({
        name: '',
        email: '',
        phone: '',
        image: ''
    });
    
    const [imagePreview, setImagePreview] = useState(null);
    const [imageFile, setImageFile] = useState(null);

    const handleImageUrlChange = (e) => {
        const imageUrl = e.target.value;
        setINformation(prev => ({ ...prev, image: imageUrl }));
        setImagePreview(imageUrl);
        setImageFile(null);
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
            setINformation(prev => ({ ...prev, image: '' })); // Clear URL if file is selected
        }
    };

    const handleAdd = async () => {
        const { name, email, phone } = information;

        if (name && email && phone) {
            let finalImage = information.image;
            
            // If a file is uploaded, convert it to base64 or handle it as needed
            if (imageFile) {
                try {
                    const base64 = await convertFileToBase64(imageFile);
                    finalImage = base64;
                } catch (error) {
                    console.error('Error converting file to base64:', error);
                    finalImage = '';
                }
            }

            const contactWithId = {
                ...information,
                image: finalImage,
                id: Date.now().toString(),
            };

            addcontactshandler(contactWithId);
            setINformation({ name: '', email: '', phone: '', image: '' });
            setImagePreview(null);
            setImageFile(null);
            navigate('/');
        }
    };

    const convertFileToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    };

    const clearImage = () => {
        setImagePreview(null);
        setImageFile(null);
        setINformation(prev => ({ ...prev, image: '' }));
    };

    return (
        <>
            <div className="flex justify-center px-4 mt-6 mb-10 ">
<fieldset
  className="bg-green-100 fieldset bg-base-100 
             rounded-3xl  /* ⬅️ super curvy corners */
             w-full max-w-xl 
             border border-base-200/70 
             shadow-sm transition-colors"
>
<legend
  className="fieldset-legend text-2xl md:text-5xl font-extrabold text-center 
             text-gray-900 drop-shado-[0_2px_4px_rgba(0,0,0,0.5)]
             tracking-wide"
>
  Add Contact
</legend>
                    <div className="mx-auto p-5 md:p-6">
                        <div className="form-control mb-4">
                            <label className="label p-1 text-sm font-medium">Name</label>
                            <input 
                                type="text" 
                                className="input input-bordered w-full pl-4 pr-12 py-3 rounded-xl text-sm bg-white/70 text-gray-800 
                 placeholder-gray-500 border border-transparent 
                 focus:outline-none focus:ring-2 focus:ring-green-900/70
                 shadow-sm backdrop-blur-sm transition-all duration-300
                 hover:bg-white/80 focus:bg-white"
                                placeholder="Enter full name" 
                                onChange={(e) => setINformation({...information, name: e.target.value})} 
                                value={information.name} 
                            />
                        </div>

                        <div className="form-control mb-4">
                            <label className="label p-1 text-sm font-medium">Email</label>
                            <input 
                                type="email" 
                                className="input input-bordered w-full pl-4 pr-12 py-3 rounded-xl text-sm bg-white/70 text-gray-800 
                 placeholder-gray-500 border border-transparent 
                 focus:outline-none focus:ring-2 focus:ring-green-900/70
                 shadow-sm backdrop-blur-sm transition-all duration-300
                 hover:bg-white/80 focus:bg-white" 
                                placeholder="name@example.com"
                                onChange={(e) => setINformation({...information, email: e.target.value})} 
                                value={information.email} 
                            />
                        </div>

                        <div className="form-control mb-4">
                            <label className="label p-1 text-sm font-medium">Phone</label>
                            <input 
                                type="tel" 
                                className="input input-bordered w-full pl-4 pr-12 py-3 rounded-xl text-sm bg-white/70 text-gray-800 
                 placeholder-gray-500 border border-transparent 
                 focus:outline-none focus:ring-2 focus:ring-green-900/70
                 shadow-sm backdrop-blur-sm transition-all duration-300
                 hover:bg-white/80 focus:bg-white" 
                                placeholder="e.g. +1 555 123 4567"
                                onChange={(e) => setINformation({...information, phone: e.target.value})} 
                                value={information.phone} 
                            />
                        </div>

                        {/* Image Section */}
                        <div className="form-control mb-4">
                            <label className="label p-1 text-sm font-medium">Image</label>
                            
                            {/* Image URL Input */}
                            <input 
                                type="url" 
                                className="input input-bordered mb-2 w-full pl-4 pr-12 py-3 rounded-xl text-sm bg-white/70 text-gray-800 
                 placeholder-gray-500 border border-transparent 
                 focus:outline-none focus:ring-2 focus:ring-green-900/70
                 shadow-sm backdrop-blur-sm transition-all duration-300
                 hover:bg-white/80 focus:bg-white" 
                                placeholder="Image URL (optional)"
                                onChange={handleImageUrlChange}
                                value={information.image}
                            />
                            
                            {/* File Upload */}
                            <div className="flex items-center gap-2 mb-2 w-full pl-4 pr-12 py-3 rounded-xl text-sm bg-white/70 text-gray-800 
                 placeholder-gray-500 border border-transparent 
                 focus:outline-none focus:ring-2 focus:ring-green-900/70
                 shadow-sm backdrop-blur-sm transition-all duration-300
                 hover:bg-white/80 focus:bg-white">
                                <input 
                                    type="file" 
                                    accept="image/*"
                                    onChange={handleFileUpload}
                                    className="file-input file-input-bordered file-input-sm w-full bg-transparent border-none"
                                />
                            </div>

                            {/* Image Preview */}
                            {imagePreview && (
                                <div className="flex items-center gap-3 mb-2">
                                    <img 
                                        src={imagePreview} 
                                        alt="Preview" 
                                        className="w-16 h-16 object-cover rounded-box border"
                                    />
                                    <button 
                                        type="button"
                                        onClick={clearImage}
                                        className="btn btn-sm btn-error"
                                    >
                                        Remove
                                    </button>
                                </div>
                            )}
                        </div>

                        <div className="flex gap-3 justify-center mt-2">
                            <button className="btn w-full relative overflow-hidden rounded-xl 
                         bg-gradient-to-r from-lime-900 to-lime-900 
                         text-white font-semibold
                         px-5 py-2 md:px-6 md:py-2.5 shadow-md backdrop-blur-sm
                         hover:from-lime-400 hover:to-emerald-500 hover:text-white
                         hover:shadow-xl hover:-translate-y-0.5 
                         transition-all duration-300" onClick={handleAdd}>Add</button>
                            {/* <button className="btn btn-ghost" type="button" onClick={() => setINformation({ name: '', email: '', phone: '', image: '' })}>Clear</button> */}
                        </div>
                    </div>
                </fieldset>
            </div>
        </>
    )
}

export default Addcontacts
