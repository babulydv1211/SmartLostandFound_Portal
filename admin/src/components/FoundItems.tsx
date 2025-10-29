
import React from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import api from '../api'

interface FoundItem {
  _id: string
  title: string
  description: string
  location: string
  occurredAt: string
  image?: string
  reporterName: string
  reporterEmail: string
  matchConfidence?: number
  createdAt: string
}

const FoundItems: React.FC = () => {
  const queryClient = useQueryClient()
  const { data: foundItems, isLoading, error } = useQuery<FoundItem[]>({
    queryKey: ['foundItems'],
    queryFn: async () => {
      const response = await api.get('/api/admin/found-items')
      return response.data
    },
  })

  const deleteMutation = useMutation({
    mutationFn: (id: string) => api.delete(`/api/admin/items/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['foundItems'] })
    },
  })

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      deleteMutation.mutate(id)
    }
  }

  if (isLoading) return (
    <div className="flex items-center justify-center p-8">
      <div className="text-white text-lg backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6">
        Loading found items...
      </div>
    </div>
  )
  
  if (error) return (
    <div className="flex items-center justify-center p-8">
      <div className="text-red-400 text-lg backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6">
        Error loading found items
      </div>
    </div>
  )

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-blue-400 bg-clip-text text-transparent mb-6">
        📦 Found Items
      </h2>

      {/* Glassmorphism Table Container */}
      <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-white/10">
            <thead className="bg-white/5">
              <tr>
                <th className="px-6 py-4 text-left text-base font-bold text-indigo-300 uppercase tracking-wider whitespace-nowrap">Title</th>
                <th className="px-6 py-4 text-left text-base font-bold text-indigo-300 uppercase tracking-wider whitespace-nowrap">Image</th>
                <th className="px-6 py-4 text-left text-base font-bold text-indigo-300 uppercase tracking-wider whitespace-nowrap">Description</th>
                <th className="px-6 py-4 text-left text-base font-bold text-indigo-300 uppercase tracking-wider whitespace-nowrap">Location</th>
                <th className="px-6 py-4 text-left text-base font-bold text-indigo-300 uppercase tracking-wider whitespace-nowrap">Date Found</th>
                <th className="px-6 py-4 text-left text-base font-bold text-indigo-300 uppercase tracking-wider whitespace-nowrap">Reporter</th>
                <th className="px-6 py-4 text-left text-base font-bold text-indigo-300 uppercase tracking-wider whitespace-nowrap">Match Confidence</th>
                <th className="px-6 py-4 text-left text-base font-bold text-indigo-300 uppercase tracking-wider whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {foundItems?.map((item) => (
                <tr key={item._id} className="hover:bg-white/5 transition-colors duration-200">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="font-medium text-white">{item.title}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.image ? (
                      <img
                        src={item.image.startsWith('data:') ? item.image : `${item.image}`}
                        alt={item.title}
                        className="w-16 h-16 object-cover rounded-lg border border-white/20 shadow-lg"
                      />
                    ) : (
                      <div className="w-16 h-16 bg-white/10 rounded-lg flex items-center justify-center border border-white/10">
                        <span className="text-gray-400 text-sm italic">No image</span>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-gray-300 max-w-xs line-clamp-2">{item.description}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-gray-300">{item.location}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-gray-300">
                      {new Date(item.occurredAt).toLocaleDateString()}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-gray-300">
                      <div className="font-medium text-white">{item.reporterName}</div>
                      <div className="text-sm text-gray-400">{item.reporterEmail}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.matchConfidence ? (
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                        item.matchConfidence >= 80 
                          ? 'bg-green-500/20 text-green-300 border border-green-500/30' 
                          : item.matchConfidence >= 60 
                          ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30'
                          : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                      }`}>
                        {item.matchConfidence}%
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-500/20 text-gray-400 border border-gray-500/30">
                        N/A
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-red-500 to-pink-600 rounded-lg hover:from-red-600 hover:to-pink-700 shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
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
        
        {/* Empty State */}
        {(!foundItems || foundItems.length === 0) && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-lg mb-2">No found items yet</div>
            <div className="text-gray-500 text-sm">Items reported as found will appear here</div>
          </div>
        )}
      </div>
    </div>
  )
}

export default FoundItems
