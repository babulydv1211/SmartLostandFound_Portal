

import React, { useEffect, useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import api from '../api'
import { useNotifications } from '../contexts/NotificationContext'

interface User {
  _id: string
  name: string
  email: string
  phoneNumber: string
  createdAt: string
}

const Users: React.FC = () => {
  const { updateNotificationCount, incrementNotification } = useNotifications()

  const { data: users, isLoading, error } = useQuery<User[]>({
    queryKey: ['users'],
    queryFn: async () => {
      const response = await api.get('/api/admin/users')
      return response.data
    }
  })

  // Calculate new users count using useMemo to prevent unnecessary recalculations
  const newUsersCount = useMemo(() => {
    if (!users) return 0;
    
    const oneDayAgo = new Date();
    oneDayAgo.setDate(oneDayAgo.getDate() - 1);
    
    return users.filter(user => 
      new Date(user.createdAt) > oneDayAgo
    ).length;
  }, [users]);

  // Update notification count only when newUsersCount actually changes
  useEffect(() => {
    updateNotificationCount('users', newUsersCount);
  }, [newUsersCount, updateNotificationCount]);

  // Manual notification increment function (for testing)
  const addTestNotification = () => {
    incrementNotification('users');
  };

  if (isLoading) return (
    <div className="flex items-center justify-center p-8">
      <div className="text-white text-lg">Loading users...</div>
    </div>
  )
  
  if (error) return (
    <div className="flex items-center justify-center p-8">
      <div className="text-red-400 text-lg">Error loading users</div>
    </div>
  )

  return (
    <div className="p-4 md:p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 md:mb-6 gap-4">
        <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-indigo-400 to-blue-400 bg-clip-text text-transparent">
          👥 Users Management ({users?.length || 0})
        </h2>
        
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {users?.map((user) => (
          <div key={user._id} className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-4">
            <h3 className="font-medium text-white text-lg mb-2">{user.name}</h3>
            <div className="space-y-2 text-sm">
              <div>
                <span className="text-gray-400">Email:</span>
                <p className="text-white">{user.email}</p>
              </div>
              <div>
                <span className="text-gray-400">Phone:</span>
                <p className="text-white">{user.phoneNumber}</p>
              </div>
              <div>
                <span className="text-gray-400">Registered:</span>
                <p className="text-white">{new Date(user.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-white/10">
            <thead className="bg-white/5">
              <tr>
                <th className="px-6 py-4 text-left text-base font-bold text-indigo-300 uppercase tracking-wider">Name</th>
                <th className="px-6 py-4 text-left text-base font-bold text-indigo-300 uppercase tracking-wider">Email</th>
                <th className="px-6 py-4 text-left text-base font-bold text-indigo-300 uppercase tracking-wider">Phone</th>
                <th className="px-6 py-4 text-left text-base font-bold text-indigo-300 uppercase tracking-wider">Registration Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {users?.map((user) => (
                <tr key={user._id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-white font-medium">{user.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-300">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-300">{user.phoneNumber}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Users



