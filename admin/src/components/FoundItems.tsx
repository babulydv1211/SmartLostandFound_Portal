
import React, { useEffect, useMemo } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import api from '../api'
import { useNotifications } from '../contexts/NotificationContext'

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
  const { updateNotificationCount, incrementNotification } = useNotifications()

  const { data: foundItems, isLoading, error } = useQuery<FoundItem[]>({
    queryKey: ['foundItems'],
    queryFn: async () => {
      const response = await api.get('/api/admin/found-items')
      return response.data
    },
  })

  // Calculate new items count using useMemo to prevent unnecessary recalculations
  const newItemsCount = useMemo(() => {
    if (!foundItems) return 0;
    
    const oneDayAgo = new Date();
    oneDayAgo.setDate(oneDayAgo.getDate() - 1);
    
    return foundItems.filter(item => 
      new Date(item.createdAt) > oneDayAgo
    ).length;
  }, [foundItems]);

  // Update notification count only when newItemsCount actually changes
  useEffect(() => {
    updateNotificationCount('foundItems', newItemsCount);
  }, [newItemsCount, updateNotificationCount]);

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

  // Manual notification increment function (for testing)
  const addTestNotification = () => {
    incrementNotification('foundItems');
  };

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
    <div className="p-4 md:p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 md:mb-6 gap-4">
        <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-indigo-400 to-blue-400 bg-clip-text text-transparent">
          📦 Found Items ({foundItems?.length || 0})
        </h2>
        
        
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {foundItems?.map((item) => (
          <div key={item._id} className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-4">
            <div className="flex justify-between items-start mb-3">
              <h3 className="font-medium text-white text-lg">{item.title}</h3>
              {item.matchConfidence && (
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                  item.matchConfidence >= 80 
                    ? 'bg-green-500/20 text-green-300 border border-green-500/30' 
                    : item.matchConfidence >= 60 
                    ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30'
                    : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                }`}>
                  {item.matchConfidence}%
                </span>
              )}
            </div>

            {item.image && (
              <img
                src={item.image.startsWith('data:') ? item.image : `${item.image}`}
                alt={item.title}
                className="w-full h-48 object-cover rounded-lg mb-3 border border-white/20"
              />
            )}

            <p className="text-gray-300 text-sm mb-3 line-clamp-2">{item.description}</p>
            
            <div className="grid grid-cols-2 gap-2 text-sm mb-3">
              <div>
                <span className="text-gray-400">Location:</span>
                <p className="text-white">{item.location}</p>
              </div>
              <div>
                <span className="text-gray-400">Date:</span>
                <p className="text-white">{new Date(item.occurredAt).toLocaleDateString()}</p>
              </div>
            </div>

            <div className="mb-3">
              <span className="text-gray-400 text-sm">Reporter:</span>
              <p className="text-white text-sm">{item.reporterName}</p>
              <p className="text-gray-300 text-xs">{item.reporterEmail}</p>
            </div>

            <button
              onClick={() => handleDelete(item._id)}
              className="w-full py-2 text-sm font-medium text-white bg-gradient-to-r from-red-500 to-pink-600 rounded-lg hover:from-red-600 hover:to-pink-700 shadow-lg transition-all duration-200 disabled:opacity-50"
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending ? 'Deleting...' : 'Delete Item'}
            </button>
          </div>
        ))}
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-white/10">
            <thead className="bg-white/5">
              <tr>
                <th className="px-4 py-3 md:px-6 md:py-4 text-left text-sm md:text-base font-bold text-indigo-300 uppercase tracking-wider whitespace-nowrap">Title</th>
                <th className="px-4 py-3 md:px-6 md:py-4 text-left text-sm md:text-base font-bold text-indigo-300 uppercase tracking-wider whitespace-nowrap">Image</th>
                <th className="px-4 py-3 md:px-6 md:py-4 text-left text-sm md:text-base font-bold text-indigo-300 uppercase tracking-wider whitespace-nowrap">Description</th>
                <th className="px-4 py-3 md:px-6 md:py-4 text-left text-sm md:text-base font-bold text-indigo-300 uppercase tracking-wider whitespace-nowrap">Location</th>
                <th className="px-4 py-3 md:px-6 md:py-4 text-left text-sm md:text-base font-bold text-indigo-300 uppercase tracking-wider whitespace-nowrap">Date Found</th>
                <th className="px-4 py-3 md:px-6 md:py-4 text-left text-sm md:text-base font-bold text-indigo-300 uppercase tracking-wider whitespace-nowrap">Reporter</th>
                <th className="px-4 py-3 md:px-6 md:py-4 text-left text-sm md:text-base font-bold text-indigo-300 uppercase tracking-wider whitespace-nowrap">Match %</th>
                <th className="px-4 py-3 md:px-6 md:py-4 text-left text-sm md:text-base font-bold text-indigo-300 uppercase tracking-wider whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {foundItems?.map((item) => (
                <tr key={item._id} className="hover:bg-white/5 transition-colors duration-200">
                  <td className="px-4 py-3 md:px-6 md:py-4 whitespace-nowrap">
                    <span className="font-medium text-white text-sm md:text-base">{item.title}</span>
                  </td>
                  <td className="px-4 py-3 md:px-6 md:py-4 whitespace-nowrap">
                    {item.image ? (
                      <img
                        src={item.image.startsWith('data:') ? item.image : `${item.image}`}
                        alt={item.title}
                        className="w-12 h-12 md:w-16 md:h-16 object-cover rounded-lg border border-white/20 shadow-lg"
                      />
                    ) : (
                      <div className="w-12 h-12 md:w-16 md:h-16 bg-white/10 rounded-lg flex items-center justify-center border border-white/10">
                        <span className="text-gray-400 text-xs md:text-sm italic">No image</span>
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3 md:px-6 md:py-4 whitespace-nowrap">
                    <span className="text-gray-300 text-sm max-w-xs line-clamp-2">{item.description}</span>
                  </td>
                  <td className="px-4 py-3 md:px-6 md:py-4 whitespace-nowrap">
                    <span className="text-gray-300 text-sm">{item.location}</span>
                  </td>
                  <td className="px-4 py-3 md:px-6 md:py-4 whitespace-nowrap">
                    <span className="text-gray-300 text-sm">
                      {new Date(item.occurredAt).toLocaleDateString()}
                    </span>
                  </td>
                  <td className="px-4 py-3 md:px-6 md:py-4 whitespace-nowrap">
                    <div className="text-gray-300">
                      <div className="font-medium text-white text-sm">{item.reporterName}</div>
                      <div className="text-xs md:text-sm text-gray-400">{item.reporterEmail}</div>
                    </div>
                  </td>
                  <td className="px-4 py-3 md:px-6 md:py-4 whitespace-nowrap">
                    {item.matchConfidence ? (
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        item.matchConfidence >= 80 
                          ? 'bg-green-500/20 text-green-300 border border-green-500/30' 
                          : item.matchConfidence >= 60 
                          ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30'
                          : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                      }`}>
                        {item.matchConfidence}%
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-500/20 text-gray-400 border border-gray-500/30">
                        N/A
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 md:px-6 md:py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="px-3 py-2 text-xs md:text-sm font-medium text-white bg-gradient-to-r from-red-500 to-pink-600 rounded-lg hover:from-red-600 hover:to-pink-700 shadow-lg transition-all duration-200 disabled:opacity-50"
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



