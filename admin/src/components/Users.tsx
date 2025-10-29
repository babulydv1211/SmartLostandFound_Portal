
import React from 'react'
import { useQuery } from '@tanstack/react-query'
import api from '../api'

interface User {
  _id: string
  name: string
  email: string
  phoneNumber: string
  createdAt: string
}

const Users: React.FC = () => {
  const { data: users, isLoading, error } = useQuery<User[]>({
    queryKey: ['users'],
    queryFn: async () => {
      const response = await api.get('/api/admin/users')
      return response.data
    }
  })

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
    <div className="p-6">
      <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-blue-400 bg-clip-text text-transparent mb-6">
        👥 Users Management
      </h2>

      <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
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