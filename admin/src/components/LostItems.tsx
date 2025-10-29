
import React from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import api from '../api'

interface LostItem {
  _id: string
  title: string
  description: string
  location: string
  image?: string
  type: string
  reporterName?: string
  reporterEmail?: string
  createdAt: string
}

const LostItems: React.FC = () => {
  const queryClient = useQueryClient()

  const { data: lostItems, isLoading, error } = useQuery<LostItem[]>({
    queryKey: ['lostItems'],
    queryFn: async () => {
      const response = await api.get('/api/admin/lost-items')
      return response.data
    },
  })

  const deleteMutation = useMutation({
    mutationFn: (id: string) => api.delete(`/api/admin/items/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lostItems'] })
    },
  })

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      deleteMutation.mutate(id)
    }
  }

  if (isLoading) return (
    <div className="flex items-center justify-center p-8">
      <div className="text-white text-lg">Loading lost items...</div>
    </div>
  )
  
  if (error) return (
    <div className="flex items-center justify-center p-8">
      <div className="text-red-400 text-lg">Error loading lost items</div>
    </div>
  )

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-blue-400 bg-clip-text text-transparent mb-6">
        🔍 Lost Items
      </h2>

      <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-white/10">
            <thead className="bg-white/5">
              <tr>
                <th className="px-6 py-4 text-left text-base font-bold text-indigo-300 uppercase tracking-wider">Title & Image</th>
                <th className="px-6 py-4 text-left text-base font-bold text-indigo-300 uppercase tracking-wider">Description</th>
                <th className="px-6 py-4 text-left text-base font-bold text-indigo-300 uppercase tracking-wider">Location</th>
                <th className="px-6 py-4 text-left text-base font-bold text-indigo-300 uppercase tracking-wider">Date Lost</th>
                <th className="px-6 py-4 text-left text-base font-bold text-indigo-300 uppercase tracking-wider">Reporter</th>
                <th className="px-6 py-4 text-left text-base font-bold text-indigo-300 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-white/10">
              {lostItems?.map((item) => (
                <tr key={item._id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      {item.image ? (
                        <img
                          src={item.image.startsWith('data:') ? item.image : `${item.image}`}
                          alt={item.title}
                          className="w-12 h-12 object-cover rounded-lg border border-white/20"
                        />
                      ) : (
                        <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center">
                          <span className="text-gray-400 text-lg">📷</span>
                        </div>
                      )}
                      <span className="font-medium text-white">{item.title}</span>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-gray-300 max-w-xs truncate">
                    {item.description}
                  </td>

                  <td className="px-6 py-4 text-gray-300">
                    {item.location}
                  </td>

                  <td className="px-6 py-4 text-gray-300">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </td>

                  <td className="px-6 py-4 text-gray-300">
                    {item.reporterName ?? "Unknown"} ({item.reporterEmail ?? "N/A"})
                  </td>

                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-red-500 to-pink-600 rounded-lg hover:from-red-600 hover:to-pink-700 transition-all shadow-lg"
                      disabled={deleteMutation.isPending}
                    >
                      {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
                    </button>
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

export default LostItems
