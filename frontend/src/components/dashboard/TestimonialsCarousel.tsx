
"use client"
import { motion } from "framer-motion"
import { useMemo } from "react"
import type { CommentRecord } from "../../types"
import { Star, Quote, Heart } from "lucide-react"

type TestimonialsCarouselProps = {
  comments: CommentRecord[]
}

const fallbackComments: CommentRecord[] = [
  {
    _id: "1",
    studentName: "Sasha Patel",
    course: "BBA '26",
    message: "Loved how I could track my lost badge status in real time. The notification email felt instant.",
    createdAt: new Date().toISOString(),
  },
  {
    _id: "2",
    studentName: "Miguel Rivera",
    course: "Robotics '25",
    message: "The AI match for my toolkit was eerily accurate. It compared detailed notes from both submissions!",
    createdAt: new Date().toISOString(),
  },
  {
    _id: "3", 
    studentName: "Alex Chen",
    course: "Computer Science '24",
    message: "Found my lost laptop within hours thanks to the AI matching system. Absolutely brilliant!",
    createdAt: new Date().toISOString(),
  },
  {
    _id: "4",
    studentName: "Taylor Johnson",
    course: "Design '25", 
    message: "The community here is amazing. Someone found my sketchbook and reached out immediately!",
    createdAt: new Date().toISOString(),
  }
]

function TestimonialsCarousel({ comments }: TestimonialsCarouselProps) {
  const entries = useMemo(() => (comments.length ? comments : fallbackComments), [comments])

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="group relative"
    >
      {/* Background Glow Effect */}
      <motion.div
        className="absolute -inset-1 rounded-3xl opacity-0 blur transition-all duration-500 group-hover:opacity-100 group-hover:duration-200 bg-gradient-to-r from-blue-500/20 to-purple-500/20"
        initial={false}
      />
      
      <div className="relative rounded-3xl bg-gray-800/40 backdrop-blur-xl border border-white/10 shadow-2xl shadow-blue-500/10 p-8">
        {/* Header */}
        <div className="flex flex-col gap-6 border-b border-white/20 pb-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-3">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 px-4 py-3"
            >
              <Quote className="text-blue-400" size={24} />
              <h2 className="font-display text-3xl font-bold text-white">
                Student Voices
              </h2>
            </motion.div>
            <p className="text-lg text-gray-300 max-w-2xl">
              Real experiences and success stories from our amazing campus community.
            </p>
          </div>
          <motion.span 
            whileHover={{ scale: 1.05 }}
            className="rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 px-4 py-2 text-sm font-semibold text-purple-300 shadow-lg flex items-center gap-2"
          >
            <Heart size={16} className="text-pink-400" />
            {entries.length} success stories
          </motion.span>
        </div>

        {/* Testimonials Grid */}
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {entries.map((entry, index) => (
            <motion.div
              key={entry._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group/card relative"
            >
              {/* Card Glow Effect */}
              <motion.div
                className="absolute -inset-1 rounded-2xl opacity-0 blur transition-all duration-500 group-hover/card:opacity-100 group-hover/card:duration-200 bg-gradient-to-r from-purple-500/20 to-pink-500/20"
                initial={false}
              />
              
              <motion.blockquote
                whileHover={{ 
                  y: -5,
                  scale: 1.02,
                  transition: { type: "spring", stiffness: 300 }
                }}
                className="relative rounded-2xl bg-gray-800/60 backdrop-blur-lg border border-white/10 p-6 shadow-lg shadow-purple-500/10"
              >
                {/* Quote Icon */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.2 }}
                  className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center shadow-lg"
                >
                  <Quote size={16} className="text-white" />
                </motion.div>

                {/* Stars */}
                <motion.div 
                  className="flex gap-1 mb-4"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: index * 0.15 }}
                >
                  {[1, 2, 3, 4, 5].map((star) => (
                    <motion.div
                      key={star}
                      whileHover={{ scale: 1.3, rotate: 15 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Star 
                        size={16} 
                        className="text-yellow-400 fill-yellow-400" 
                      />
                    </motion.div>
                  ))}
                </motion.div>

                {/* Message */}
                <motion.p 
                  className="text-lg leading-relaxed text-gray-200 mb-6"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  "{entry.message}"
                </motion.p>

                {/* Footer */}
                <motion.footer 
                  className="flex items-center gap-4 pt-4 border-t border-white/10"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: index * 0.25 }}
                >
                  <motion.div 
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold shadow-lg"
                  >
                    {entry.studentName.charAt(0)}
                  </motion.div>
                  <div>
                    <p className="font-semibold text-white text-lg">{entry.studentName}</p>
                    <p className="text-gray-400 text-sm">{entry.course}</p>
                  </div>
                </motion.footer>

                {/* Hover Gradient Effect */}
                <motion.div
                  className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300"
                  initial={false}
                />
              </motion.blockquote>
            </motion.div>
          ))}
        </div>

        {/* Footer Note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-center"
        >
          <p className="text-gray-400 text-lg">
            Join thousands of students who've reunited with their belongings 🎉
          </p>
        </motion.div>
      </div>
    </motion.section>
  )
}

export default TestimonialsCarousel