import React from 'react';
import { User, Mail, Phone, Calendar, MapPin, Package, Upload } from 'lucide-react';

const DonationForm = ({
  formData,
  handleInputChange,
  handleFileUpload,
  handleFileChange,
  handleSubmit,
  fadeIn
}) => {
  return (
    <div className={`bg-white rounded-lg shadow-lg p-8 transition-all duration-1000 delay-500 ease-out ${fadeIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
      {/* العنوان */}
      <div className="text-center mb-8">
        <Package className="w-10 h-10 mx-auto mb-4 text-gray-600" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Donate Your Items</h2>
        <p className="text-gray-600">Fill out this form to donate items you no longer need. We'll arrange pickup and ensure they reach those who need them most.</p>
      </div>

      {/* الحقول */}
      <div className="space-y-6">
        {/* الاسم والإيميل */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <User className="inline w-4 h-4 mr-1" />
              Full Name *
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Mail className="inline w-4 h-4 mr-1" />
              Email Address *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
            />
          </div>
        </div>

        {/* الهاتف والتاريخ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Phone className="inline w-4 h-4 mr-1" />
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Calendar className="inline w-4 h-4 mr-1" />
              Preferred Pickup Date
            </label>
            <input
              type="date"
              name="pickupDate"
              value={formData.pickupDate}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
            />
          </div>
        </div>

        {/* العنوان */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <MapPin className="inline w-4 h-4 mr-1" />
            Address *
          </label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            required
            rows="3"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all resize-none"
            placeholder="Please provide your complete address for pickup"
          ></textarea>
        </div>

        {/* التصنيفات والحالة */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Item Category *</label>
            <select
              name="itemCategory"
              value={formData.itemCategory}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
            >
              <option value="">Select a category</option>
              <option value="clothing">Clothing & Accessories</option>
              <option value="electronics">Electronics</option>
              <option value="furniture">Furniture</option>
              <option value="books">Books & Educational Materials</option>
              <option value="toys">Toys & Games</option>
              <option value="household">Household Items</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Item Condition *</label>
            <select
              name="condition"
              value={formData.condition}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
            >
              <option value="">Select condition</option>
              <option value="excellent">Excellent</option>
              <option value="good">Good</option>
              <option value="fair">Fair</option>
              <option value="needs-repair">Needs Minor Repair</option>
            </select>
          </div>
        </div>

        {/* الوصف والملاحظات */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Item Description *</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
            rows="4"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all resize-none"
            placeholder="Please describe the items you'd like to donate (quantity, size, specific details, etc.)"
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Additional Notes</label>
          <textarea
            name="additionalNotes"
            value={formData.additionalNotes}
            onChange={handleInputChange}
            rows="3"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all resize-none"
            placeholder="Any special instructions or requirements for pickup"
          ></textarea>
        </div>

        {/* رفع الصور */}
        <div className="bg-gray-50 p-6 rounded-lg border-2 border-dashed border-gray-300">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <Upload className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-600 mb-4">Upload photos of your items to help us better understand what you're donating</p>
            <button
              type="button"
              onClick={handleFileUpload}
              className="inline-flex items-center px-6 py-3 text-white font-medium rounded-lg transition-all duration-300 hover:scale-105"
              style={{ backgroundColor: '#38af44' }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#2d8f37'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#38af44'}
            >
              <span className="text-xl mr-2">+</span>
              Add Photos
            </button>
            <input
              id="fileInput"
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
        </div>

                {/* زر الإرسال */}
        <button
          type="button"
          onClick={handleSubmit}
          className="w-full py-4 px-6 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-300"
          style={{ backgroundColor: '#38af44' }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#2d8f37';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = '#38af44';
          }}
        >
          Submit Donation Request
        </button>
      </div>
    </div>
  );
};

export default DonationForm;
