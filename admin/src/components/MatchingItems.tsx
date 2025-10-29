
import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api";
import { motion } from "framer-motion";

interface Item {
  _id: string;
  title?: string;
  description?: string;
  location?: string;
  occurredAt?: string;
  image?: string;
  reporterName?: string;
  reporterEmail?: string;
}

interface Match {
  _id: string;
  lostItem?: Item;
  foundItem?: Item;
  confidence: number;
  createdAt: string;
}

const MatchingItems: React.FC = () => {
  const queryClient = useQueryClient();

  const { data: matches, isLoading, isError } = useQuery({
    queryKey: ["matches"],
    queryFn: async () => {
      const res = await api.get("/api/admin/matches");
      return res.data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/api/admin/items/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["matches"] });
    },
  });

  if (isLoading) return (
    <div className="flex items-center justify-center p-8">
      <div className="text-white text-lg backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6">
        Loading matches...
      </div>
    </div>
  );
  
  if (isError) return (
    <div className="flex items-center justify-center p-8">
      <div className="text-red-400 text-lg backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6">
        Error fetching matches
      </div>
    </div>
  );

  return (
    <motion.div
      className="p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-blue-400 bg-clip-text text-transparent mb-6">
        💫 Matching Items
      </h2>

      {/* Glassmorphism Table Container */}
      <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-white/10">
            <thead className="bg-white/5">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-bold text-indigo-300 uppercase tracking-wider">Lost Item</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-indigo-300 uppercase tracking-wider">Found Item</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-indigo-300 uppercase tracking-wider">Match Confidence</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-indigo-300 uppercase tracking-wider">Matched On</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-indigo-300 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-white/10">
              {matches?.length > 0 ? (
                matches.map((match: Match) => (
                  <tr key={match._id} className="hover:bg-white/5 transition-colors duration-200">
                    {/* Lost Item */}
                    <td className="px-6 py-4 min-w-[250px]">
                      {match.lostItem ? (
                        <div className="space-y-2">
                          {match.lostItem.image && (
                            <img
                              src={match.lostItem.image}
                              alt={match.lostItem.title}
                              className="w-20 h-20 object-cover rounded-lg border border-white/20 shadow-lg"
                            />
                          )}
                          <p className="font-medium text-white">{match.lostItem.title || "Untitled"}</p>
                          <p className="text-gray-300 text-sm">{match.lostItem.description || "No description"}</p>
                          <p className="text-gray-400 text-sm">
                            📍 {match.lostItem.location || "Unknown location"}
                          </p>
                          <p className="text-gray-400 text-sm">
                            👤 {match.lostItem.reporterName || "Anonymous"} (
                            {match.lostItem.reporterEmail || "N/A"})
                          </p>
                        </div>
                      ) : (
                        <span className="text-gray-400 italic">Lost item deleted</span>
                      )}
                    </td>

                    {/* Found Item */}
                    <td className="px-6 py-4 min-w-[250px]">
                      {match.foundItem ? (
                        <div className="space-y-2">
                          {match.foundItem.image && (
                            <img
                              src={match.foundItem.image}
                              alt={match.foundItem.title}
                              className="w-20 h-20 object-cover rounded-lg border border-white/20 shadow-lg"
                            />
                          )}
                          <p className="font-medium text-white">{match.foundItem.title || "Untitled"}</p>
                          <p className="text-gray-300 text-sm">{match.foundItem.description || "No description"}</p>
                          <p className="text-gray-400 text-sm">
                            📍 {match.foundItem.location || "Unknown location"}
                          </p>
                          <p className="text-gray-400 text-sm">
                            👤 {match.foundItem.reporterName || "Anonymous"} (
                            {match.foundItem.reporterEmail || "N/A"})
                          </p>
                        </div>
                      ) : (
                        <span className="text-gray-400 italic">Found item deleted</span>
                      )}
                    </td>

                    {/* Confidence */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-3 py-2 rounded-full text-base font-bold ${
                        match.confidence >= 80 
                          ? 'bg-green-500/20 text-green-300 border border-green-500/30' 
                          : match.confidence >= 60 
                          ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30'
                          : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                      }`}>
                        {match.confidence || 0}%
                      </span>
                    </td>

                    {/* Matched On */}
                    <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                      {new Date(match.createdAt).toLocaleDateString()}
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 whitespace-nowrap space-y-2">
                      <div className="flex flex-col space-y-2">
                        {match.lostItem && (
                          <button
                            onClick={() => deleteMutation.mutate(match.lostItem!._id)}
                            className="px-3 py-2 text-sm font-medium text-white bg-gradient-to-r from-red-500 to-pink-600 rounded-lg hover:from-red-600 hover:to-pink-700 transition-all shadow-lg disabled:opacity-50"
                            disabled={deleteMutation.isPending}
                          >
                            Delete Lost
                          </button>
                        )}
                        {match.foundItem && (
                          <button
                            onClick={() => deleteMutation.mutate(match.foundItem!._id)}
                            className="px-3 py-2 text-sm font-medium text-white bg-gradient-to-r from-red-500 to-pink-600 rounded-lg hover:from-red-600 hover:to-pink-700 transition-all shadow-lg disabled:opacity-50"
                            disabled={deleteMutation.isPending}
                          >
                            Delete Found
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center py-12">
                    <div className="text-gray-400 text-lg mb-2">No matches found</div>
                    <div className="text-gray-500 text-sm">Matching items will appear here automatically</div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};

export default MatchingItems;