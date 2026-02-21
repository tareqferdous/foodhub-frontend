import { CloudCog } from "lucide-react";

interface EditFormData {
  name: string;
  email: string;
  restaurantName: string;
  description: string;
  address: string;
  phone: string;
}

interface ProviderProfile {
  id: string;
  userId: string;
  restaurantName: string;
  description?: string;
  address?: string;
  phone?: string;
  totalMeals?: number;
  totalOrders?: number;
}

interface User {
  id: string;
  name: string;
  email: string;
}

interface EditFormProps {
  isLoadingProfile: boolean;
  isCreatingProfile: boolean;
  setIsCreatingProfile: (value: boolean) => void;
  isEditing: boolean;
  setIsEditing: (value: boolean) => void;
  editForm: EditFormData;
  setEditForm: (value: EditFormData) => void;
  providerProfile: ProviderProfile | null;
  handleCancel: () => void;
  handleSave: () => void;
  currentRole: "CUSTOMER" | "PROVIDER";
  user: User;
}

const EditForm = ({
  isLoadingProfile,
  isCreatingProfile,
  setIsCreatingProfile,
  isEditing,
  setIsEditing,
  editForm,
  setEditForm,
  providerProfile,
  handleCancel,
  handleSave,
  currentRole,
  user,
}: EditFormProps) => {

  return (
    <div className='lg:col-span-2'>
      <div className='bg-white rounded-3xl shadow-xl p-8 border border-gray-100'>
        {/* Loading State for Provider Profile */}
        {isLoadingProfile ? (
          <div className='text-center py-12'>
            <div className='w-12 h-12 border-4 border-[#e10101] border-t-transparent rounded-full animate-spin mx-auto mb-4'></div>
            <p className='text-gray-600'>Loading...</p>
          </div>
        ) : (
          <>
            <div className='flex items-center justify-between mb-8'>
              <h2 className='text-2xl font-bold text-gray-900'>
                {isCreatingProfile
                  ? "Create Restaurant Profile"
                  : currentRole === "PROVIDER"
                    ? "Restaurant Information"
                    : "Profile Information"}
              </h2>

              {!isCreatingProfile && !isEditing && (currentRole === "CUSTOMER" || providerProfile) ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className='flex items-center gap-2 bg-gradient-to-r from-[#e10101] to-red-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:scale-105 active:scale-100 transition-all duration-300'>
                  <svg
                    className='w-5 h-5'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z'
                    />
                  </svg>
                  Edit Profile
                </button>
              ) : isCreatingProfile || isEditing ? (
                <div className='flex gap-3'>
                  <button
                    onClick={handleCancel}
                    className='px-6 py-3 border-2 border-gray-200 rounded-xl font-semibold text-gray-700 hover:border-gray-300 hover:bg-gray-50 transition-all duration-300'>
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className='flex items-center gap-2 bg-gradient-to-r from-[#e10101] to-red-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:scale-105 active:scale-100 transition-all duration-300'>
                    <svg
                      className='w-5 h-5'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'>
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M5 13l4 4L19 7'
                      />
                    </svg>
                    {isCreatingProfile ? "Create Profile" : "Save"}
                  </button>
                </div>
              ) : null}
            </div>

            {/* Show message if provider profile doesn't exist and not in creating mode */}
            {currentRole === "PROVIDER" &&
              !providerProfile &&
              !isCreatingProfile && (
                <div className='bg-gradient-to-br from-orange-50 to-amber-50 border-2 border-orange-200 rounded-2xl p-8 text-center mb-6'>
                  <div className='text-5xl mb-4'>🏪</div>
                  <h3 className='text-2xl font-bold text-gray-900 mb-2'>
                    Create Restaurant Profile
                  </h3>
                  <p className='text-gray-600 mb-6'>
                    Complete your profile by adding your restaurant information
                  </p>
                  <button
                    onClick={() => setIsCreatingProfile(true)}
                    className='bg-gradient-to-r from-[#e10101] to-red-600 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg hover:scale-105 active:scale-100 transition-all duration-300'>
                    Get Started Now
                  </button>
                </div>
              )}

            <div className='space-y-6'>
              {/* Show form fields only when creating or editing, or when viewing existing data */}
              {(isCreatingProfile ||
                isEditing ||
                providerProfile ||
                currentRole === "CUSTOMER") && (
                  <>
                    {/* Provider Specific Fields */}
                    {currentRole === "PROVIDER" && (
                      <>
                        {/* Restaurant Name */}
                        <div>
                          <label className='block text-sm font-semibold text-gray-700 mb-3'>
                            Restaurant Name
                          </label>
                          {isEditing || isCreatingProfile ? (
                            <input
                              type='text'
                              value={editForm.restaurantName}
                              onChange={(e) =>
                                setEditForm({
                                  ...editForm,
                                  restaurantName: e.target.value,
                                })
                              }
                              className='w-full bg-white border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-[#e10101] focus:ring-4 focus:ring-red-100 transition-all duration-300'
                              placeholder='Enter restaurant name'
                              required
                            />
                          ) : (
                            <div className='px-4 py-3 bg-gray-50 rounded-xl border border-gray-200'>
                              <p className='text-gray-900 font-medium'>
                                {providerProfile?.restaurantName || "Not added"}
                              </p>
                            </div>
                          )}
                        </div>

                        {/* Description */}
                        <div>
                          <label className='block text-sm font-semibold text-gray-700 mb-3'>
                            Description
                          </label>
                          {isEditing || isCreatingProfile ? (
                            <textarea
                              value={editForm.description}
                              onChange={(e) =>
                                setEditForm({
                                  ...editForm,
                                  description: e.target.value,
                                })
                              }
                              rows={4}
                              className='w-full bg-white border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-[#e10101] focus:ring-4 focus:ring-red-100 transition-all duration-300 resize-none'
                              placeholder='Write about your restaurant...'
                            />
                          ) : (
                            <div className='px-4 py-3 bg-gray-50 rounded-xl border border-gray-200'>
                              <p className='text-gray-900'>
                                {providerProfile?.description ||
                                  "Description not added"}
                              </p>
                            </div>
                          )}
                        </div>

                        {/* Address */}
                        <div>
                          <label className='block text-sm font-semibold text-gray-700 mb-3'>
                            Address
                          </label>
                          {isEditing || isCreatingProfile ? (
                            <input
                              type='text'
                              value={editForm.address}
                              onChange={(e) =>
                                setEditForm({
                                  ...editForm,
                                  address: e.target.value,
                                })
                              }
                              className='w-full bg-white border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-[#e10101] focus:ring-4 focus:ring-red-100 transition-all duration-300'
                              placeholder='Enter restaurant address'
                            />
                          ) : (
                            <div className='px-4 py-3 bg-gray-50 rounded-xl border border-gray-200'>
                              <p className='text-gray-900'>
                                {providerProfile?.address || "Address not added"}
                              </p>
                            </div>
                          )}
                        </div>
                        {/* Phone */}
                        <div>
                          <label className='block text-sm font-semibold text-gray-700 mb-3'>
                            Phone Number
                          </label>
                          {isEditing || isCreatingProfile ? (
                            <input
                              type='tel'
                              value={editForm.phone}
                              onChange={(e) =>
                                setEditForm({
                                  ...editForm,
                                  phone: e.target.value,
                                })
                              }
                              className='w-full bg-white border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-[#e10101] focus:ring-4 focus:ring-red-100 transition-all duration-300'
                              placeholder='+880 1XXX-XXXXXX'
                            />
                          ) : (
                            <div className='px-4 py-3 bg-gray-50 rounded-xl border border-gray-200'>
                              <p className='text-gray-900'>
                                {providerProfile?.phone ||
                                  "Phone number not added"}
                              </p>
                            </div>
                          )}
                        </div>

                        {/* Divider - only show if not creating profile */}
                        {!isCreatingProfile && (
                          <div className='border-t border-gray-200 pt-6'>
                            <h3 className='text-lg font-bold text-gray-900 mb-4'>
                              Owner Information
                            </h3>
                          </div>
                        )}
                      </>
                    )}

                    {/* Name Field */}
                    {!isCreatingProfile && (
                      <div>
                        <label className='block text-sm font-semibold text-gray-700 mb-3'>
                          {currentRole === "PROVIDER"
                            ? "Owner's Name"
                            : "Full Name"}
                        </label>
                        {isEditing ? (
                          <input
                            type='text'
                            value={editForm.name}
                            onChange={(e) =>
                              setEditForm({
                                ...editForm,
                                name: e.target.value,
                              })
                            }
                            className='w-full bg-white border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-[#e10101] focus:ring-4 focus:ring-red-100 transition-all duration-300'
                            placeholder='Enter your name'
                          />
                        ) : (
                          <div className='px-4 py-3 bg-gray-50 rounded-xl border border-gray-200'>
                            <p className='text-gray-900 font-medium'>
                              {user.name}
                            </p>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Email Field */}
                    {!isCreatingProfile && (
                      <div>
                        <label className='block text-sm font-semibold text-gray-700 mb-3'>
                          Email Address
                        </label>

                        {/* <input
                          type='email'
                          value={editForm.email}
                          onChange={(e) =>
                            setEditForm({
                              ...editForm,
                              email: e.target.value,
                            })
                          }
                          className='w-full bg-white border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-[#e10101] focus:ring-4 focus:ring-red-100 transition-all duration-300'
                          placeholder='Enter your email'
                        /> */}

                        <div className='px-4 py-3 bg-gray-50 rounded-xl border border-gray-200'>
                          <p className='text-gray-900 font-medium'>
                            {user.email}
                          </p>
                        </div>
                        <p className='text-xs text-gray-500 mt-2'>
                          This cannot be changed
                        </p>
                      </div>
                    )}

                    {/* User ID */}
                    {!isCreatingProfile && (
                      <div>
                        <label className='block text-sm font-semibold text-gray-700 mb-3'>
                          User ID
                        </label>
                        <div className='px-4 py-3 bg-gray-50 rounded-xl border border-gray-200'>
                          <p className='text-gray-600 font-mono text-sm break-all'>
                            {user.id}
                          </p>
                        </div>
                        <p className='text-xs text-gray-500 mt-2'>
                          This cannot be changed
                        </p>
                      </div>
                    )}

                    {/* Provider ID */}
                    {!isCreatingProfile &&
                      currentRole === "PROVIDER" &&
                      providerProfile && (
                        <div>
                          <label className='block text-sm font-semibold text-gray-700 mb-3'>
                            Provider ID
                          </label>
                          <div className='px-4 py-3 bg-gray-50 rounded-xl border border-gray-200'>
                            <p className='text-gray-600 font-mono text-sm break-all'>
                              {providerProfile.id}
                            </p>
                          </div>
                          <p className='text-xs text-gray-500 mt-2'>
                            This cannot be changed
                          </p>
                        </div>
                      )}
                  </>
                )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default EditForm;
