import { useState, useEffect } from 'react';
import type { Creator } from '../api/creators';

interface CreatorFormProps {
  initialData?: Creator;
  onSubmit: (creator: Omit<Creator, 'id'>) => void;
  isLoading?: boolean;
}

export const CreatorForm = ({ initialData, onSubmit, isLoading }: CreatorFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    gender: '',
    city: '',
    contentNiche: '',
    instagramFollowers: '',
    instagramAccountType: '',
    instagramProfileUrl: '',
    thumbnail: '',
    image: '' as string | undefined,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        email: initialData.email,
        phoneNumber: initialData.phoneNumber,
        gender: initialData.gender,
        city: initialData.city,
        contentNiche: initialData.contentNiche,
        instagramFollowers: initialData.instagramFollowers,
        instagramAccountType: initialData.instagramAccountType,
        instagramProfileUrl: initialData.instagramProfileUrl,
        thumbnail: initialData.thumbnail,
        image: initialData.image || '',
      });
    }
  }, [initialData]);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.phoneNumber.trim()) newErrors.phoneNumber = 'Phone number is required';
    if (!formData.gender.trim()) newErrors.gender = 'Gender is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.contentNiche.trim()) newErrors.contentNiche = 'Content niche is required';
    if (!formData.instagramFollowers.trim()) newErrors.instagramFollowers = 'Instagram followers is required';
    if (!formData.instagramAccountType.trim()) newErrors.instagramAccountType = 'Instagram account type is required';
    if (!formData.instagramProfileUrl.trim()) newErrors.instagramProfileUrl = 'Instagram profile URL is required';
    if (!formData.thumbnail.trim()) newErrors.thumbnail = 'Profile image is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData as Omit<Creator, 'id'>);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Clear error for this field
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, field: 'thumbnail' | 'image') => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check if file is an image
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file');
      return;
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Image size must be less than 5MB');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      setFormData({
        ...formData,
        [field]: base64String,
      });
    };
    reader.readAsDataURL(file);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto bg-white dark:bg-slate-800 rounded-lg shadow dark:shadow-gray-900 p-8 border border-gray-200 dark:border-slate-700">
      {/* Personal Details Section */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-slate-600 to-transparent"></div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white whitespace-nowrap">Personal Details</h3>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-slate-600 to-transparent"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-base font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter full name"
              className={`w-full px-3 py-2 bg-white dark:bg-slate-700 border rounded-md text-slate-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.name ? 'border-red-500' : 'border-gray-300 dark:border-slate-600'
              }`}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          <div>
            <label htmlFor="email" className="block text-base font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email address"
              className={`w-full px-3 py-2 bg-white dark:bg-slate-700 border rounded-md text-slate-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.email ? 'border-red-500' : 'border-gray-300 dark:border-slate-600'
              }`}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          <div>
            <label htmlFor="phoneNumber" className="block text-base font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Phone Number *
            </label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="e.g., +1 555-0123"
              className={`w-full px-3 py-2 bg-white dark:bg-slate-700 border rounded-md text-slate-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.phoneNumber ? 'border-red-500' : 'border-gray-300 dark:border-slate-600'
              }`}
            />
            {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>}
          </div>

          <div>
            <label htmlFor="gender" className="block text-base font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Gender *
            </label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className={`w-full px-3 py-2 bg-white dark:bg-slate-700 border rounded-md text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.gender ? 'border-red-500' : 'border-gray-300 dark:border-slate-600'
              }`}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender}</p>}
          </div>
        </div>

        {/* City field - full width */}
        <div>
          <label htmlFor="city" className="block text-base font-semibold text-gray-700 dark:text-gray-300 mb-2">
            City *
          </label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="e.g., Los Angeles, CA"
            className={`w-full px-3 py-2 bg-white dark:bg-slate-700 border rounded-md text-slate-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.city ? 'border-red-500' : 'border-gray-300 dark:border-slate-600'
            }`}
          />
          {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
        </div>
      </div>

      {/* Content Details Section */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-slate-600 to-transparent"></div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white whitespace-nowrap">Content Details</h3>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-slate-600 to-transparent"></div>
        </div>
        <div className="space-y-4">
          <div>
            <label htmlFor="contentNiche" className="block text-base font-semibold text-gray-700 dark:text-gray-300 mb-2">
              What category best describes your content niche? *
            </label>
            <input
              type="text"
              id="contentNiche"
              name="contentNiche"
              value={formData.contentNiche}
              onChange={handleChange}
              placeholder="e.g., Lifestyle, Tech, Fashion, Food"
              className={`w-full px-3 py-2 bg-white dark:bg-slate-700 border rounded-md text-slate-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.contentNiche ? 'border-red-500' : 'border-gray-300 dark:border-slate-600'
              }`}
            />
            {errors.contentNiche && <p className="text-red-500 text-sm mt-1">{errors.contentNiche}</p>}
          </div>

          {/* Instagram Followers and Account Type in same row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="instagramFollowers" className="block text-base font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Instagram Followers *
              </label>
              <input
                type="text"
                id="instagramFollowers"
                name="instagramFollowers"
                value={formData.instagramFollowers}
                onChange={handleChange}
                placeholder="e.g., 125K"
                className={`w-full px-3 py-2 bg-white dark:bg-slate-700 border rounded-md text-slate-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.instagramFollowers ? 'border-red-500' : 'border-gray-300 dark:border-slate-600'
                }`}
              />
              {errors.instagramFollowers && <p className="text-red-500 text-sm mt-1">{errors.instagramFollowers}</p>}
            </div>

            <div>
              <label htmlFor="instagramAccountType" className="block text-base font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Instagram Account Type *
              </label>
              <select
                id="instagramAccountType"
                name="instagramAccountType"
                value={formData.instagramAccountType}
                onChange={handleChange}
                className={`w-full px-3 py-2 bg-white dark:bg-slate-700 border rounded-md text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.instagramAccountType ? 'border-red-500' : 'border-gray-300 dark:border-slate-600'
                }`}
              >
                <option value="">Select Type</option>
                <option value="Public">Public</option>
                <option value="Private">Private</option>
              </select>
              {errors.instagramAccountType && <p className="text-red-500 text-sm mt-1">{errors.instagramAccountType}</p>}
            </div>
          </div>

          {/* Instagram Profile URL - full width */}
          <div>
            <label htmlFor="instagramProfileUrl" className="block text-base font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Instagram Profile URL *
            </label>
            <input
              type="url"
              id="instagramProfileUrl"
              name="instagramProfileUrl"
              value={formData.instagramProfileUrl}
              onChange={handleChange}
              placeholder="instagram.com/username"
              className={`w-full px-3 py-2 bg-white dark:bg-slate-700 border rounded-md text-slate-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.instagramProfileUrl ? 'border-red-500' : 'border-gray-300 dark:border-slate-600'
              }`}
            />
            {errors.instagramProfileUrl && <p className="text-red-500 text-sm mt-1">{errors.instagramProfileUrl}</p>}
          </div>
        </div>
      </div>

      {/* Media Section */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-slate-600 to-transparent"></div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white whitespace-nowrap">Profile Image</h3>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-slate-600 to-transparent"></div>
        </div>
        <div className="max-w-2xl">
          <label htmlFor="thumbnail" className="block text-base font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Profile Image *
          </label>
          <div className={`border-2 rounded-lg p-4 ${
            errors.thumbnail ? 'border-red-500' : 'border-gray-300 dark:border-slate-600'
          }`}>
            <div className="flex flex-col gap-3">
              {/* Upload File */}
              <div className="w-full">
                <input
                  type="file"
                  id="thumbnail"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, 'thumbnail')}
                  className="w-full px-3 py-2.5 bg-white dark:bg-slate-700 border-2 border-dashed rounded-lg text-slate-900 dark:text-white cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                />
              </div>

              {/* OR Separator */}
              <div className="flex items-center gap-2 text-gray-500 dark:text-slate-400 font-medium">
                <div className="flex-1 h-px bg-gray-300 dark:bg-slate-600"></div>
                <span className="text-sm px-2">OR</span>
                <div className="flex-1 h-px bg-gray-300 dark:bg-slate-600"></div>
              </div>

              {/* URL Input */}
              <div className="w-full">
                <input
                  type="text"
                  name="thumbnail"
                  value={formData.thumbnail}
                  onChange={handleChange}
                  placeholder="Paste image URL here"
                  className="w-full px-3 py-2.5 bg-white dark:bg-slate-700 border border-gray-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
          
          {errors.thumbnail && <p className="text-red-500 text-sm mt-2">{errors.thumbnail}</p>}
          
          {/* Preview */}
          {formData.thumbnail && (
            <div className="mt-4">
              {formData.thumbnail.startsWith('data:image') || formData.thumbnail.startsWith('http') || formData.thumbnail.startsWith('https') ? (
                <div>
                  <img src={formData.thumbnail} alt="Preview" className="w-32 h-32 rounded-lg object-cover border-2 border-gray-300 dark:border-slate-600 shadow-md" />
                  <p className="text-sm text-green-600 dark:text-green-400 mt-2">✓ Image loaded successfully</p>
                </div>
              ) : null}
            </div>
          )}
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-3.5 px-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2 group"
      >
        {isLoading ? (
          <>
            <span className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></span>
            Submitting...
          </>
        ) : initialData ? (
          <>
            <i className="ph ph-check-circle text-lg group-hover:rotate-12 transition-transform"></i>
            Update Creator
          </>
        ) : (
          <>
            <i className="ph ph-plus-circle text-lg group-hover:rotate-90 transition-transform"></i>
            Add Creator
          </>
        )}
      </button>
    </form>
  );
};

