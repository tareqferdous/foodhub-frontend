"use client";

import { useEffect, useState } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  role: "CUSTOMER" | "PROVIDER";
  status: "ACTIVE" | "SUSPENDED";
  createdAt: string;
}

export default function AdminUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [filterRole, setFilterRole] = useState<"ALL" | "CUSTOMER" | "PROVIDER">(
    "ALL",
  );
  const [filterStatus, setFilterStatus] = useState<
    "ALL" | "ACTIVE" | "SUSPENDED"
  >("ALL");

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("http://localhost:5000/api/admin/users", {
          credentials: "include",
        });

        if (response.ok) {
          const result = await response.json();
          if (result.success && result.data) {
            setUsers(result.data);
          }
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleStatusUpdate = async (
    userId: string,
    newStatus: "ACTIVE" | "SUSPENDED",
  ) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/admin/${userId}/status`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ status: newStatus }),
        },
      );

      if (response.ok) {
        setUsers(
          users.map((user) =>
            user.id === userId ? { ...user, status: newStatus } : user,
          ),
        );
      } else {
        alert("Failed to update user status");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update user status");
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const filteredUsers = users.filter((user) => {
    const roleMatch = filterRole === "ALL" || user.role === filterRole;
    const statusMatch = filterStatus === "ALL" || user.status === filterStatus;
    return roleMatch && statusMatch;
  });

  if (isLoading) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-rose-50 flex items-center justify-center'>
        <div className='text-center'>
          <div className='w-16 h-16 border-4 border-[#e10101] border-t-transparent rounded-full animate-spin mx-auto mb-4'></div>
          <p className='text-gray-600'>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-rose-50'>
      <div className='lg:hidden sticky top-0 z-20 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between'>
        <button
          onClick={() => setSidebarOpen(true)}
          className='p-2 text-gray-600 hover:bg-gray-100 rounded-lg'>
          <svg
            className='w-6 h-6'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M4 6h16M4 12h16M4 18h16'
            />
          </svg>
        </button>
        <h1 className='text-lg font-bold text-gray-900'>Users Management</h1>
        <div className='w-10'></div>
      </div>

      <div className='relative z-10 max-w-7xl mx-auto px-6 py-12'>
        {/* Header */}
        <div className='mb-8'>
          <h1 className='text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-[#e10101] to-red-900 bg-clip-text text-transparent mb-2'>
            Users Management
          </h1>
          <p className='text-gray-600'>Total {filteredUsers.length} users</p>
        </div>

        {/* Filters */}
        <div className='bg-white rounded-3xl shadow-lg p-6 mb-6 border border-gray-100'>
          <div className='flex flex-col md:flex-row gap-4'>
            <div className='flex-1'>
              <label className='block text-sm font-semibold text-gray-700 mb-2'>
                Filter by Role
              </label>
              <div className='flex gap-2'>
                {["ALL", "CUSTOMER", "PROVIDER"].map((role) => (
                  <button
                    key={role}
                    onClick={() => setFilterRole(role as any)}
                    className={`px-4 py-2 rounded-xl font-medium transition-all ${
                      filterRole === role
                        ? "bg-gradient-to-r from-[#e10101] to-red-600 text-white shadow-lg"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}>
                    {role}
                  </button>
                ))}
              </div>
            </div>

            <div className='flex-1'>
              <label className='block text-sm font-semibold text-gray-700 mb-2'>
                Filter by Status
              </label>
              <div className='flex gap-2'>
                {["ALL", "ACTIVE", "SUSPENDED"].map((status) => (
                  <button
                    key={status}
                    onClick={() => setFilterStatus(status as any)}
                    className={`px-4 py-2 rounded-xl font-medium transition-all ${
                      filterStatus === status
                        ? "bg-gradient-to-r from-[#e10101] to-red-600 text-white shadow-lg"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}>
                    {status}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className='bg-white rounded-3xl shadow-lg overflow-hidden border border-gray-100'>
          <div className='overflow-x-auto'>
            <table className='w-full'>
              <thead className='bg-gray-50 border-b border-gray-200'>
                <tr>
                  <th className='px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider'>
                    User
                  </th>
                  <th className='px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider'>
                    Email
                  </th>
                  <th className='px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider'>
                    Role
                  </th>
                  <th className='px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider'>
                    Status
                  </th>
                  <th className='px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider'>
                    Joined
                  </th>
                  <th className='px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider'>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className='divide-y divide-gray-200'>
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan={6} className='px-6 py-12 text-center'>
                      <div className='text-5xl mb-3'>👥</div>
                      <p className='text-gray-600'>No users found</p>
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((user) => (
                    <tr
                      key={user.id}
                      className='hover:bg-gray-50 transition-colors'>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        <div className='flex items-center gap-3'>
                          <div className='w-10 h-10 bg-gradient-to-br from-[#e10101] to-red-600 rounded-full flex items-center justify-center text-white font-bold'>
                            {user.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className='font-semibold text-gray-900'>
                              {user.name}
                            </p>
                            <p className='text-xs text-gray-500 font-mono'>
                              {user.id.slice(0, 8)}...
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        <p className='text-sm text-gray-900'>{user.email}</p>
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            user.role === "CUSTOMER"
                              ? "bg-blue-100 text-blue-700 border border-blue-300"
                              : "bg-purple-100 text-purple-700 border border-purple-300"
                          }`}>
                          {user.role}
                        </span>
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            user.status === "ACTIVE"
                              ? "bg-green-100 text-green-700 border border-green-300"
                              : "bg-red-100 text-red-700 border border-red-300"
                          }`}>
                          {user.status}
                        </span>
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-600'>
                        {formatDate(user.createdAt)}
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        {user.status === "ACTIVE" ? (
                          <button
                            onClick={() =>
                              handleStatusUpdate(user.id, "SUSPENDED")
                            }
                            className='bg-red-600 text-white px-4 py-2 rounded-xl text-xs font-semibold hover:bg-red-700 transition-colors'>
                            Suspend
                          </button>
                        ) : (
                          <button
                            onClick={() =>
                              handleStatusUpdate(user.id, "ACTIVE")
                            }
                            className='bg-green-600 text-white px-4 py-2 rounded-xl text-xs font-semibold hover:bg-green-700 transition-colors'>
                            Activate
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
