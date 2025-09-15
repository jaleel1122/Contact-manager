import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditContact = ({ contacts, updateContact }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    image: ''
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    const contact = contacts.find(c => c.id === id);
    if (contact) {
      setFormData({
        name: contact.name || '',
        email: contact.email || '',
        phone: contact.phone || '',
        image: contact.image || ''
      });
      setImagePreview(contact.image || null);
    }
  }, [id, contacts]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUrlChange = (e) => {
    const imageUrl = e.target.value;
    setFormData(prev => ({ ...prev, image: imageUrl }));
    setImagePreview(imageUrl);
    setImageFile(null);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
      setFormData(prev => ({ ...prev, image: '' })); // Clear URL if a file is uploaded
    }
  };

  const clearImage = () => {
    setImagePreview(null);
    setImageFile(null);
    setFormData(prev => ({ ...prev, image: '' }));
  };

  const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (err) => reject(err);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let finalImage = formData.image;

    if (imageFile) {
      try {
        const base64 = await convertFileToBase64(imageFile);
        finalImage = base64;
      } catch (error) {
        console.error('Error converting image:', error);
        finalImage = '';
      }
    }

    try {
      await updateContact(id, { ...formData, image: finalImage });
      navigate('/');
    } catch (error) {
      console.error('Error updating contact:', error);
    }
  };

  return (
    <div className="flex justify-center px-4 mt-6 mb-10">
      <fieldset
        className="bg-green-100 fieldset bg-base-100 
                   rounded-3xl 
                   w-full max-w-xl 
                   border border-base-200/70 
                   shadow-sm transition-colors"
      >
        <legend
          className="fieldset-legend text-2xl md:text-5xl font-extrabold text-center 
                     text-gray-900 drop-shado-[0_2px_4px_rgba(0,0,0,0.5)]
                     tracking-wide"
        >
          Edit Contact
        </legend>

        <div className="mx-auto p-5 md:p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div className="form-control mb-4">
              <label className="label p-1 text-sm font-medium">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="input input-bordered w-full pl-4 pr-12 py-3 rounded-xl text-sm bg-white/70 text-gray-800 
                           placeholder-gray-500 border border-transparent 
                           focus:outline-none focus:ring-2 focus:ring-green-900/70
                           shadow-sm backdrop-blur-sm transition-all duration-300
                           hover:bg-white/80 focus:bg-white"
                placeholder="Enter full name"
              />
            </div>

            {/* Email */}
            <div className="form-control mb-4">
              <label className="label p-1 text-sm font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="input input-bordered w-full pl-4 pr-12 py-3 rounded-xl text-sm bg-white/70 text-gray-800 
                           placeholder-gray-500 border border-transparent 
                           focus:outline-none focus:ring-2 focus:ring-green-900/70
                           shadow-sm backdrop-blur-sm transition-all duration-300
                           hover:bg-white/80 focus:bg-white"
                placeholder="name@example.com"
              />
            </div>

            {/* Phone */}
            <div className="form-control mb-4">
              <label className="label p-1 text-sm font-medium">Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="input input-bordered w-full pl-4 pr-12 py-3 rounded-xl text-sm bg-white/70 text-gray-800 
                           placeholder-gray-500 border border-transparent 
                           focus:outline-none focus:ring-2 focus:ring-green-900/70
                           shadow-sm backdrop-blur-sm transition-all duration-300
                           hover:bg-white/80 focus:bg-white"
                placeholder="e.g. +1 555 123 4567"
              />
            </div>

            {/* Image Section */}
            <div className="form-control mb-4">
              <label className="label p-1 text-sm font-medium">Image</label>

              {/* Image URL */}
              <input
                type="url"
                value={formData.image}
                onChange={handleImageUrlChange}
                className="input input-bordered mb-2 w-full pl-4 pr-12 py-3 rounded-xl text-sm bg-white/70 text-gray-800 
                           placeholder-gray-500 border border-transparent 
                           focus:outline-none focus:ring-2 focus:ring-green-900/70
                           shadow-sm backdrop-blur-sm transition-all duration-300
                           hover:bg-white/80 focus:bg-white"
                placeholder="Image URL (optional)"
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

            {/* Buttons */}
            <div className="flex gap-3 justify-center mt-2">
              <button
                type="submit"
                className="btn w-[200px] relative overflow-hidden rounded-xl 
                           bg-gradient-to-r from-lime-900 to-lime-900 
                           text-white font-semibold
                           px-5 py-2 md:px-6 md:py-2.5 shadow-md backdrop-blur-sm
                           hover:from-lime-400 hover:to-emerald-500 hover:text-white
                           hover:shadow-xl hover:-translate-y-0.5 
                           transition-all duration-300"
              >
                Update Contact
              </button>
              <button
                type="button"
                onClick={() => navigate('/')}
                className="btn btn-ghost"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </fieldset>
    </div>
  );
};

export default EditContact;
