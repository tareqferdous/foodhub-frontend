"use client";

import EditForm from "@/components/modules/profile/EditForm";
import ProfileHeader from "@/components/modules/profile/ProfileHeader";
import UserInfo from "@/components/modules/profile/UserInfo";
import { authClient } from "@/lib/auth.client";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface User {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image?: string | null;

  createdAt: Date;
  updatedAt: Date;

  role?: "CUSTOMER" | "PROVIDER";
  status?: "ACTIVE" | "BLOCKED";
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

export default function ProfilePage() {
  const { data: session, isPending } = authClient.useSession();
  console.log("session", session);

  const [user, setUser] = useState<User | null>(null);
  const [providerProfile, setProviderProfile] =
    useState<ProviderProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isCreatingProfile, setIsCreatingProfile] = useState(false);
  const [isLoadingProfile, setIsLoadingProfile] = useState(false);
  const [hasFetchedProfile, setHasFetchedProfile] = useState(false);
  const [editForm, setEditForm] = useState({
    name: "",
    email: "",
    restaurantName: "",
    description: "",
    address: "",
    phone: "",
  });
  // const [imagePreview, setImagePreview] = useState("");

  const currentRole = user?.role ?? null;

  // Fetch provider profile
  const fetchProviderProfile = async () => {
    setIsLoadingProfile(true);
    try {
      const response = await fetch(
        `/api/providers/profile`,
        {
          credentials: "include",
        },
      );

      if (response.ok) {
        const data = await response.json();
        setProviderProfile(data.data.providerProfile);
        setEditForm((prev) => ({
          ...prev,
          restaurantName: data?.data?.providerProfile?.restaurantName || "",
          description: data?.data?.providerProfile?.description || "",
          address: data?.data?.providerProfile?.address || "",
          phone: data?.data?.providerProfile?.phone || "",
        }));
      } else if (response.status === 404) {
        // Profile doesn't exist yet
        setProviderProfile(null);
        setIsCreatingProfile(true);
      }
    } catch (error) {
      console.error("Error fetching provider profile:", error);
    } finally {
      setIsLoadingProfile(false);
      setHasFetchedProfile(true);
    }
  };

  // Update user profile (name, email, image)
  const updateUserProfile = async () => {
    try {
      const response = await fetch(
        `/api/profile`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            name: editForm.name,
            email: editForm.email,
            // image: imagePreview,
          }),
        },
      );

      if (response.ok) {
        const data = await response.json();
        // Immediately update local state
        setUser({
          ...user!,
          name: data.name || editForm.name,
          email: data.email || editForm.email,
          // image: data.image || imagePreview,
          updatedAt: data.updatedAt || new Date().toISOString(),
        });
        // Update image preview with server response
        // if (data.image) {
        //   setImagePreview(data.image);
        // }
        return true;
      } else {
        console.error("Failed to update user profile");
        return false;
      }
    } catch (error) {
      console.error("Error updating user profile:", error);
      return false;
    }
  };

  // Create provider profile
  const createProviderProfile = async () => {
    const toastId = toast.loading("Creating provider profile...");
    try {
      const response = await fetch(
        `/api/providers`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            restaurantName: editForm.restaurantName,
            description: editForm.description,
            address: editForm.address,
            phone: editForm.phone,
          }),
        },
      );

      if (response.ok) {
        const data = await response.json();
        // Immediately update local state with created profile
        setProviderProfile({
          id: data.id || "",
          userId: data.userId || user?.id || "",
          restaurantName: data.restaurantName || editForm.restaurantName,
          description: data.description || editForm.description,
          address: data.address || editForm.address,
          phone: data.phone || editForm.phone,
          totalMeals: data.totalMeals || 0,
          totalOrders: data.totalOrders || 0,
        });
        setIsCreatingProfile(false);
        setIsEditing(false);
        setHasFetchedProfile(true);
        window.dispatchEvent(new Event("providerProfileUpdated"));
        toast.success("Provider profile created successfully", { id: toastId });
        return true;
      } else {
        console.error("Failed to create provider profile");
        toast.error("Failed to create provider profile", { id: toastId });
        return false;
      }
    } catch (error) {
      toast.error("Error creating provider profile", { id: toastId });
      console.error("Error creating provider profile:", error);
      return false;
    }
  };

  // Update provider profile
  const updateProviderProfile = async () => {
    const toastId = toast.loading("Updating provider profile...");
    try {
      const response = await fetch(
        `/api/providers`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            restaurantName: editForm.restaurantName,
            description: editForm.description,
            address: editForm.address,
            phone: editForm.phone,
          }),
        },
      );

      if (response.ok) {
        const data = await response.json();
        // Immediately update local state with new data
        setProviderProfile({
          ...providerProfile,
          restaurantName: data?.data?.restaurantName || editForm.restaurantName,
          description: data?.data?.description || editForm.description,
          address: data?.data?.address || editForm.address,
          phone: data?.data?.phone || editForm.phone,
          id: data?.data?.id || providerProfile?.id || "",
          userId: data?.data?.userId || providerProfile?.userId || "",
        });
        setEditForm((prev) => ({
          ...prev,
          restaurantName: data?.data?.restaurantName || "",
          description: data?.data?.description || "",
          address: data?.data?.address || "",
          phone: data?.data?.phone || "",
        }));
        setIsEditing(false);
        window.dispatchEvent(new Event("providerProfileUpdated"));
        toast.success("Provider profile updated successfully", { id: toastId });
        return true;
      } else {
        console.error("Failed to update provider profile");
        toast.error("Failed to update provider profile", { id: toastId });
        return false;
      }
    } catch (error) {
      console.error("Error updating provider profile:", error);
      toast.error("Error updating provider profile", { id: toastId });
      return false;
    }
  };

  // Initialize data from session
  useEffect(() => {
    if (!session?.user) return;

    setUser(session.user);
    // setImagePreview(session.user.image || "");

    // Initialize form with user data
    setEditForm({
      name: session.user.name || "",
      email: session.user.email || "",
      restaurantName: "",
      description: "",
      address: "",
      phone: "",
    });

    // Fetch provider profile if user is a provider
    if ((session.user as User).role === "PROVIDER") {
      fetchProviderProfile();
    } else if ((session.user as User).role !== "PROVIDER") {
      setProviderProfile(null);
    }
  }, [session?.user?.id, session?.user?.name, session?.user?.email]);

  const handleSave = async () => {
    if (!user) return;

    // If creating new provider profile
    if (isCreatingProfile) {
      const success = await createProviderProfile();
      if (!success) {
        alert("প্রোফাইল তৈরি করতে সমস্যা হয়েছে");
      }
      return;
    }

    // Update user profile (name, email, image)
    const userUpdateSuccess = await updateUserProfile();
    if (!userUpdateSuccess) {
      alert("ব্যবহারকারী প্রোফাইল আপডেট করতে সমস্যা হয়েছে");
      return;
    }

    // Update provider profile if user is a provider and has a profile
    if (currentRole === "PROVIDER" && providerProfile) {
      const providerUpdateSuccess = await updateProviderProfile();
      if (!providerUpdateSuccess) {
        alert("প্রোভাইডার প্রোফাইল আপডেট করতে সমস্যা হয়েছে");
      }
    } else {
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    if (!user) return;

    setEditForm({
      name: user.name,
      email: user.email,
      restaurantName: providerProfile?.restaurantName || "",
      description: providerProfile?.description || "",
      address: providerProfile?.address || "",
      phone: providerProfile?.phone || "",
    });
    // setImagePreview(user.image);
    setIsEditing(false);
    setIsCreatingProfile(false);
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Show preview immediately
      const reader = new FileReader();
      reader.onloadend = () => {
        // setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);

      // TODO: Upload image to server if you have image upload endpoint
      // const formData = new FormData();
      // formData.append('image', file);
      // const response = await fetch('http://localhost:5000/api/upload-image', {
      //   method: 'POST',
      //   credentials: 'include',
      //   body: formData,
      // });
      // if (response.ok) {
      //   const { imageUrl } = await response.json();
      //   setImagePreview(imageUrl);
      // }
    }
  };

  const formatDate = (date: string | Date) => {
    return new Date(date).toLocaleDateString("en-BD", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getInitials = (name: string) => {
    if (!name) return "";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  // Loading state
  if (isPending || (currentRole === "PROVIDER" && !hasFetchedProfile)) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-rose-50 flex items-center justify-center'>
        <div className='text-center'>
          <div className='w-16 h-16 border-4 border-[#e10101] border-t-transparent rounded-full animate-spin mx-auto mb-4'></div>
          <p className='text-gray-600'>Loading...</p>
        </div>
      </div>
    );
  }

  // Not logged in state
  if (!user) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-rose-50 flex items-center justify-center'>
        <div className='text-center'>
          <div className='text-5xl mb-4'>🔒</div>
          <h2 className='text-2xl font-bold text-gray-900 mb-2'>
            Login Required
          </h2>
          <p className='text-gray-600'>Please log in first</p>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-rose-50'>
      {/* Background decorative elements */}
      <div className='fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20'>
        <div className='absolute top-20 right-20 w-96 h-96 bg-red-300 rounded-full mix-blend-multiply filter blur-3xl animate-pulse' />
        <div className='absolute bottom-20 left-20 w-96 h-96 bg-orange-300 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000' />
      </div>

      <div className='relative z-10 max-w-6xl mx-auto px-6 py-12'>
        {/* Header */}
        <ProfileHeader currentRole={currentRole!} />

        <div className='grid lg:grid-cols-3 gap-6'>
          {/* Left Column - Profile Card */}
          <div className='lg:col-span-1'>
            <div className='bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100'>
              {/* Gradient Header */}
              <div className='relative h-32 bg-gradient-to-br from-[#e10101] via-red-600 to-rose-600'>
                <div className='absolute inset-0 flex items-center justify-center'>
                  {/* <div className='text-6xl font-bold text-white/20 select-none'>
                    {currentRole === "PROVIDER" && providerProfile
                      ? getInitials(providerProfile.restaurantName)
                      : getInitials(user.name)}
                  </div> */}
                </div>
              </div>

              {/* Profile Image */}
              {/* <ProfileImage
                imagePreview={imagePreview}
                setImagePreview={setImagePreview}
                user={user}
                currentRole={currentRole}
                providerProfile={providerProfile}
                getInitials={getInitials}
                isEditing={isEditing}
                handleImageChange={handleImageChange}
              /> */}

              {/* User Info */}
              <UserInfo
                currentRole={currentRole || "CUSTOMER"}
                user={user}
                providerProfile={providerProfile}
                formatDate={formatDate}
              />
            </div>
          </div>

          {/* Right Column - Edit Form */}
          <EditForm
            isLoadingProfile={isLoadingProfile}
            isCreatingProfile={isCreatingProfile}
            setIsCreatingProfile={setIsCreatingProfile}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            editForm={editForm}
            setEditForm={setEditForm}
            providerProfile={providerProfile}
            handleCancel={handleCancel}
            handleSave={handleSave}
            currentRole={currentRole || "CUSTOMER"}
            user={user}
          />
        </div>
      </div>
    </div>
  );
}
