const ProfileHeader = ({ currentRole }: { currentRole: string }) => {
  const roleLabel = currentRole
    ? `${currentRole.charAt(0)}${currentRole.slice(1).toLowerCase()}`
    : "User";

  return (
    <div className='mb-8'>
      <div className='flex items-center gap-3 mb-2'>
        <h1 className='text-4xl md:text-5xl font-bold bg-linear-to-r from-gray-900 via-[#e10101] to-red-900 bg-clip-text text-transparent'>
          My Profile
        </h1>
        <span
          className={`px-4 py-1.5 rounded-full text-sm font-bold ${
            currentRole === "CUSTOMER"
              ? "bg-blue-600 text-white"
              : "bg-linear-to-r from-[#e10101] to-red-600 text-white"
          }`}>
          {roleLabel}
        </span>
      </div>
      <p className='text-gray-600'>View and manage your account information</p>
    </div>
  );
};

export default ProfileHeader;
