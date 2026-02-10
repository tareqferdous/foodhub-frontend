// const ProfileImage = ({
//   imagePreview,
//   setImagePreview,
//   user,
//   currentRole,
//   providerProfile,
//   getInitials,
//   isEditing,
//   handleImageChange,
// }) => {
//   return (
//     <div className='relative -mt-16 px-6'>
//       <div className='relative inline-block'>
//         <div className='w-32 h-32 rounded-3xl bg-white shadow-2xl overflow-hidden border-4 border-white'>
//           {imagePreview ? (
//             <img
//               src={imagePreview}
//               alt={user.name}
//               className='w-full h-full object-cover'
//               onError={() => setImagePreview("")}
//             />
//           ) : (
//             <div className='w-full h-full bg-gradient-to-br from-[#e10101] to-red-600 flex items-center justify-center'>
//               <span className='text-4xl font-bold text-white'>
//                 {currentRole === "PROVIDER" && providerProfile
//                   ? getInitials(providerProfile.restaurantName)
//                   : getInitials(user.name)}
//               </span>
//             </div>
//           )}
//         </div>

//         {/* Edit Image Button */}
//         {isEditing && (
//           <label className='absolute bottom-0 right-0 w-10 h-10 bg-gradient-to-br from-[#e10101] to-red-600 rounded-xl shadow-lg flex items-center justify-center cursor-pointer hover:scale-110 transition-transform'>
//             <input
//               type='file'
//               accept='image/*'
//               onChange={handleImageChange}
//               className='hidden'
//             />
//             <svg
//               className='w-5 h-5 text-white'
//               fill='none'
//               viewBox='0 0 24 24'
//               stroke='currentColor'>
//               <path
//                 strokeLinecap='round'
//                 strokeLinejoin='round'
//                 strokeWidth={2}
//                 d='M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z'
//               />
//               <path
//                 strokeLinecap='round'
//                 strokeLinejoin='round'
//                 strokeWidth={2}
//                 d='M15 13a3 3 0 11-6 0 3 3 0 016 0z'
//               />
//             </svg>
//           </label>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ProfileImage;
