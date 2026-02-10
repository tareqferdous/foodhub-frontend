const ProfileHeader = ({ currentRole }: { currentRole: string }) => {
  return (
    <div className='mb-8'>
      <div className='flex items-center gap-3 mb-2'>
        <h1 className='text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-[#e10101] to-red-900 bg-clip-text text-transparent'>
          My Profile
        </h1>
        <span
          className={`px-4 py-1.5 rounded-full text-sm font-bold ${
            currentRole === "CUSTOMER"
              ? "bg-blue-600 text-white"
              : "bg-gradient-to-r from-[#e10101] to-red-600 text-white"
          }`}>
          {currentRole === "CUSTOMER" ? "Customer" : "Provider"}
        </span>
      </div>
      <p className='text-gray-600'>View and manage your account information</p>
    </div>
  );
};

export default ProfileHeader;
