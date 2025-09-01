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
            <div className="flex justify-center mt-10">
                <fieldset className="fieldset bg-base-200 border-base-400 rounded-box w-full max-w-xl border p-6">
                    <legend className="fieldset-legend text-3xl text-center">Add Contacts</legend>
                    <div className="mx-auto">
                        <div className="form-control mb-3">
                            <label className="label p-1">Name :</label>
                            <input 
                                type="text" 
                                className="input input-bordered" 
                                placeholder="Name" 
                                onChange={(e) => setINformation({...information, name: e.target.value})} 
                                value={information.name} 
                            />
                        </div>

                        <div className="form-control mb-3">
                            <label className="label p-1">E-mail :</label>
                            <input 
                                type="text" 
                                className="input input-bordered" 
                                placeholder="E-mail"
                                onChange={(e) => setINformation({...information, email: e.target.value})} 
                                value={information.email} 
                            />
                        </div>

                        <div className="form-control mb-3">
                            <label className="label p-1">P.NO :</label>
                            <input 
                                type="text" 
                                className="input input-bordered" 
                                placeholder="Phone Number"
                                onChange={(e) => setINformation({...information, phone: e.target.value})} 
                                value={information.phone} 
                            />
                        </div>

                        {/* Image Section */}
                        <div className="form-control mb-3">
                            <label className="label p-1">Image :</label>
                            
                            {/* Image URL Input */}
                            <input 
                                type="url" 
                                className="input input-bordered mb-2" 
                                placeholder="Image URL (optional)"
                                onChange={handleImageUrlChange}
                                value={information.image}
                            />
                            
                            {/* File Upload */}
                            <div className="flex items-center gap-2 mb-2">
                                <input 
                                    type="file" 
                                    accept="image/*"
                                    onChange={handleFileUpload}
                                    className="file-input file-input-bordered file-input-sm w-full"
                                />
                            </div>

                            {/* Image Preview */}
                            {imagePreview && (
                                <div className="flex items-center gap-2 mb-2">
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

                        <div className="flex justify-center mt-4">
                            <button className="btn btn-primary btn-wide" onClick={handleAdd}>Add</button>
                        </div>
                    </div>
                </fieldset>
            </div>
        </>
    )
}

export default Addcontacts
