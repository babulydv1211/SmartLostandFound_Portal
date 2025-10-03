
"use client"

import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { Lock, MailCheck, ShieldCheck, Search, Sparkle, Upload, ArrowRight, Star, Clock, Users, Zap, Heart, Target } from "lucide-react"
import { useState, useEffect } from "react"

const highlights = [
  {
    icon: ShieldCheck,
    title: "Secure Reporting",
    description: "Verified student accounts and encrypted submissions keep every report trusted.",
    color: "from-emerald-400 to-green-500",
    borderColor: "border-emerald-500/30",
    iconColor: "text-emerald-400"
  },
  {
    icon: Search,
    title: "Precision Matching",
    description: "AI blends image + text similarity to spot potential reunions in seconds.",
    color: "from-blue-400 to-cyan-500",
    borderColor: "border-blue-500/30",
    iconColor: "text-blue-400"
  },
  {
    icon: MailCheck,
    title: "Instant Alerts",
    description: "When we find a match above 80%, our automation emails both students instantly.",
    color: "from-purple-400 to-pink-500",
    borderColor: "border-purple-500/30",
    iconColor: "text-purple-400"
  },
]

const flowSteps = [
  {
    title: "Report lost or found",
    description: "Share a quick description, upload a photo, and mark where it happened.",
    icon: Upload,
    delay: 0,
    color: "from-blue-500 to-cyan-500"
  },
  {
    title: "AI similarity engine",
    description: "Our CNN + Sentence-BERT stack compares image and text cues across the portal.",
    icon: Search,
    delay: 0.2,
    color: "from-purple-500 to-pink-500"
  },
  {
    title: "Get notified",
    description: "Matched students receive detailed email summaries so items get returned fast.",
    icon: MailCheck,
    delay: 0.4,
    color: "from-green-500 to-emerald-500"
  },
]

const testimonials = [
  {
    quote: "I reported my misplaced tablet at lunch and matched with a found report before the evening lab – the email alert made it effortless.",
    name: "Riya Malhotra",
    role: "Computer Science, Sophomore",
    rating: 5,
    color: "from-orange-400/20 to-red-500/20"
  },
  {
    quote: "The dashboard is so intuitive. I tracked my lost headphones, saw potential matches, and got them back within a day.",
    name: "Jared Fields",
    role: "Electrical Engineering, Senior",
    rating: 5,
    color: "from-violet-400/20 to-purple-500/20"
  },
]

const stats = [
  { value: "2,347+", label: "Items Reunited", icon: Heart, color: "text-red-400", gradient: "from-red-400 to-pink-500" },
  { value: "87%", label: "Success Rate", icon: Target, color: "text-green-400", gradient: "from-green-400 to-emerald-500" },
  { value: "< 4hrs", label: "Average Return Time", icon: Zap, color: "text-yellow-400", gradient: "from-yellow-400 to-orange-500" },
]

function LandingPage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    
    // Simulate loading completion
    const timer = setTimeout(() => setIsLoading(false), 1000)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      clearTimeout(timer)
    }
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full"
          />
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 relative overflow-hidden py-16">
      {/* Enhanced Background Pattern - Same as AuthPage */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-purple-900/30 to-pink-900/30">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_40%_at_50%_50%,rgba(120,119,198,0.2),rgba(255,255,255,0))]"></div>
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:54px_54px]"></div>
        
        {/* Animated Floating Bubbles */}
        <motion.div
          animate={{ y: [0, -40, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-32 h-32 bg-purple-500/20 rounded-full blur-xl"
        />
        <motion.div
          animate={{ y: [0, 50, 0], scale: [1, 0.8, 1] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-1/3 right-1/4 w-24 h-24 bg-pink-500/20 rounded-full blur-xl"
        />
        <motion.div
          animate={{ x: [0, 25, 0], y: [0, -25, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute top-2/3 left-1/3 w-20 h-20 bg-blue-500/20 rounded-full blur-xl"
        />
        <motion.div
          animate={{ x: [0, -30, 0], y: [0, 30, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          className="absolute top-1/3 right-1/3 w-16 h-16 bg-cyan-500/20 rounded-full blur-xl"
        />
      </div>

      {/* Mouse Follow Gradient */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(120, 119, 198, 0.15), transparent 80%)`
        }}
      />

      <div className="relative space-y-20 pb-16">
        {/* Hero Section */}
        <section className="pt-16 sm:pt-24">
          <div className="mx-auto max-w-6xl px-4 md:px-6">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <motion.div
                className="space-y-6"
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <motion.span 
                  className="inline-flex items-center gap-2 rounded-full bg-gray-800/50 backdrop-blur-sm px-4 py-2 text-sm font-medium text-purple-300 border border-purple-500/30"
                  whileHover={{ 
                    scale: 1.05,
                    background: "rgba(139, 92, 246, 0.2)"
                  }}
                  animate={{
                    y: [0, -5, 0],
                  }}
                  transition={{
                    y: {
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }
                  }}
                >
                  <Sparkle size={16} className="text-purple-400 " />
                  AI-Powered Campus Lost & Found
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    className="ml-1"
                  >
                    <Zap size={12} className="text-yellow-400" />
                  </motion.div>
                </motion.span>

                <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                  Never lose your
                  <motion.span 
                    className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
                    animate={{
                      backgroundPosition: ["0%", "100%", "0%"],
                    }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                    }}
                    style={{
                      backgroundSize: "200% 200%",
                    }}
                  >
                    belongings again
                  </motion.span>
                </h1>

                <p className="text-lg text-gray-300 max-w-xl leading-relaxed">
                  Our intelligent platform uses advanced AI to match lost items with found reports across campus. 
                  Get instant notifications when your items are located.
                </p>

                {/* Stats */}
                <motion.div 
                  className="grid grid-cols-3 gap-6 py-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  {stats.map((stat, index) => (
                    <motion.div 
                      key={stat.label} 
                      className="text-center"
                      whileHover={{ 
                        scale: 1.1,
                        y: -5
                      }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                    >
                      <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r ${stat.gradient} mb-3`}>
                        <stat.icon size={24} className="text-white" />
                      </div>
                      <div className="text-2xl font-bold text-white">{stat.value}</div>
                      <div className="text-sm text-gray-400">{stat.label}</div>
                    </motion.div>
                  ))}
                </motion.div>

                <div className="flex flex-col gap-4 sm:flex-row">
                  <motion.div 
                    whileHover={{ scale: 1.05 }} 
                    whileTap={{ scale: 0.95 }}
                    className="relative"
                  >
                    <motion.div
                      animate={{ 
                        backgroundPosition: ["0%", "100%", "0%"],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                      }}
                      className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-[length:200%_200%] rounded-xl p-0.5"
                    >
                      <Link
                        to="/signup"
                        className="inline-flex items-center gap-2 rounded-xl bg-gray-900 px-6 py-3 text-sm font-semibold text-white shadow-2xl shadow-purple-500/20 transition-all hover:bg-gray-800"
                      >
                        🚀 Get Started Free
                        <ArrowRight size={16} />
                      </Link>
                    </motion.div>
                  </motion.div>
                  <motion.div 
                    whileHover={{ scale: 1.05 }} 
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      to="/dashboard"
                      className="inline-flex items-center justify-center rounded-xl bg-gray-800/50 backdrop-blur-sm border border-gray-700 px-6 py-3 text-sm font-semibold text-gray-200 transition-all hover:border-purple-500/50 hover:text-white hover:shadow-lg hover:shadow-purple-500/10"
                    >
                      🎬 Live Demo
                    </Link>
                  </motion.div>
                </div>
              </motion.div>

              {/* Hero Card */}
              <motion.div
                className="relative"
                initial={{ x: 40, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              >
                <motion.div
                  className="relative space-y-6"
                  animate={{ y: [0, -15, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <motion.div
                    className="rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 p-6 text-white shadow-2xl shadow-blue-500/30 border border-blue-400/30"
                    whileHover={{ 
                      scale: 1.02,
                      rotateY: 5
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    style={{
                      transformStyle: 'preserve-3d',
                    }}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-blue-200 text-sm">🎯 AI Match Found</p>
                        <motion.h3 
                          className="mt-1 text-2xl font-bold"
                          animate={{ 
                            textShadow: [
                              "0 0 10px rgba(255, 255, 255, 0.5)",
                              "0 0 20px rgba(255, 255, 255, 0.3)",
                              "0 0 10px rgba(255, 255, 255, 0.5)"
                            ]
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          87% Confidence
                        </motion.h3>
                      </div>
                      <motion.div 
                        className="rounded-xl bg-white/20 p-3 backdrop-blur-sm"
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 3, repeat: Infinity }}
                      >
                        <Upload size={24} className="text-white" />
                      </motion.div>
                    </div>
                    <p className="mt-4 text-blue-200 text-sm leading-relaxed">
                      Found AirPods near Engineering Lab likely match your lost report from 2 hours ago.
                    </p>
                    
                    {/* Animated progress bar */}
                    <motion.div 
                      className="mt-6 h-2 rounded-full bg-white/20 overflow-hidden"
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ delay: 0.5, duration: 1 }}
                    >
                      <motion.div 
                        className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-green-400"
                        initial={{ width: 0 }}
                        animate={{ width: "87%" }}
                        transition={{ delay: 1, duration: 1.5 }}
                      />
                    </motion.div>
                  </motion.div>

                  <motion.div 
                    className="rounded-2xl bg-gray-800/50 backdrop-blur-lg border border-gray-700 p-5 shadow-lg"
                    whileHover={{ 
                      y: -5,
                      scale: 1.02
                    }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="flex items-center gap-3">
                      <motion.div 
                        className="rounded-lg bg-green-500/20 p-2 text-green-400 border border-green-500/30"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <Lock size={20} />
                      </motion.div>
                      <div>
                        <p className="font-semibold text-white">Secure & Private</p>
                        <p className="text-sm text-gray-400">Encrypted reports, verified students only</p>
                      </div>
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-gray-400">
                      <div>Average match time</div>
                      <div className="text-right font-semibold text-green-400">3h 12m</div>
                      <div>Notifications</div>
                      <div className="text-right font-semibold text-blue-400">Instant</div>
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="relative">
          <div className="mx-auto max-w-6xl px-4 md:px-6">
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-white sm:text-4xl">
                Powered by Cutting-Edge Technology
              </h2>
              <p className="mt-3 text-lg text-gray-300 max-w-2xl mx-auto">
                Advanced features that make finding lost items effortless
              </p>
            </motion.div>

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {highlights.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  whileHover={{ 
                    y: -10,
                    scale: 1.05,
                    transition: { type: "spring", stiffness: 300 }
                  }}
                  className="group relative"
                >
                  <motion.div 
                    className="absolute -inset-1 rounded-2xl opacity-0 blur transition-all duration-500 group-hover:opacity-100 group-hover:duration-200"
                    style={{ 
                      background: `linear-gradient(45deg, ${item.color.split(' ')[1].replace('from-', '#')} 0%, transparent 70%)` 
                    }}
                  />
                  
                  <div className={`relative rounded-2xl bg-gray-800/50 backdrop-blur-lg p-6 h-full border ${item.borderColor}`}>
                    <motion.div 
                      className={`inline-flex rounded-xl p-3 mb-4 bg-gradient-to-r ${item.color}/20 border ${item.borderColor}`}
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <item.icon size={24} className={item.iconColor} />
                    </motion.div>
                    <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                    <p className="mt-2 text-gray-300 leading-relaxed">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="relative bg-gray-800/30 backdrop-blur-sm py-16 rounded-3xl mx-4 border border-gray-700/50">
          <div className="mx-auto max-w-6xl px-4 md:px-6">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-3xl font-bold text-white sm:text-4xl">
                    Simple Process, Powerful Results
                  </h2>
                  <p className="mt-3 text-lg text-gray-300">
                    Get your items back in three easy steps with our intelligent matching system
                  </p>
                </motion.div>

                <div className="mt-8 space-y-8">
                  {flowSteps.map((step, index) => (
                    <motion.div
                      key={step.title}
                      className="flex gap-4"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.2 }}
                      whileHover={{ x: 10 }}
                    >
                      <motion.div 
                        className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-800 border border-purple-500/30 text-purple-400 font-semibold text-lg shrink-0"
                        whileHover={{ scale: 1.2, rotate: 360 }}
                        animate={{
                          boxShadow: [
                            "0 0 0 rgba(147, 51, 234, 0.4)",
                            "0 0 20px rgba(147, 51, 234, 0.6)",
                            "0 0 0 rgba(147, 51, 234, 0.4)"
                          ]
                        }}
                        transition={{
                          boxShadow: {
                            duration: 2,
                            repeat: Infinity
                          }
                        }}
                      >
                        {index + 1}
                      </motion.div>
                      <div className="flex-1 pb-8 border-b border-gray-700/50 last:border-b-0">
                        <div className="flex items-center gap-3 mb-2">
                          <step.icon size={20} className="text-purple-400" />
                          <h3 className="text-xl font-semibold text-white">{step.title}</h3>
                        </div>
                        <p className="text-gray-300 leading-relaxed">{step.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Animated Illustration */}
              <motion.div
                className="relative"
                initial={{ opacity: 0, scale: 0.9, rotateY: 10 }}
                whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <motion.div
                  className="rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 p-8 border border-purple-500/30 backdrop-blur-lg"
                  whileHover={{ rotateY: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <motion.div
                    className="text-center"
                    animate={{ y: [0, -15, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <motion.div
                      className="inline-flex rounded-2xl bg-purple-500/20 p-4 mb-6 mx-auto border border-purple-500/30"
                      animate={{ rotate: [0, 5, -5, 0] }}
                      transition={{ duration: 6, repeat: Infinity }}
                    >
                      <Search size={32} className="text-purple-400" />
                    </motion.div>
                    <h3 className="text-2xl font-bold text-white">AI-Powered Matching</h3>
                    <p className="mt-2 text-gray-300">Real-time comparison across all reports</p>
                  </motion.div>
                  
                  {/* Floating elements */}
                  <motion.div
                    className="absolute -top-3 -right-3 h-6 w-6 rounded-full bg-green-400 shadow-lg"
                    animate={{ 
                      y: [0, -15, 0],
                      scale: [1, 1.3, 1]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <motion.div
                    className="absolute -bottom-3 -left-3 h-4 w-4 rounded-full bg-purple-400 shadow-lg"
                    animate={{ 
                      y: [0, 15, 0],
                      scale: [1, 1.4, 1]
                    }}
                    transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                  />
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="relative">
          <div className="mx-auto max-w-6xl px-4 md:px-6">
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-white sm:text-4xl">
                Loved by Students Worldwide
              </h2>
              <p className="mt-3 text-lg text-gray-300">
                Join thousands who've reunited with their belongings
              </p>
            </motion.div>

            <div className="mt-12 grid gap-6 md:grid-cols-2">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.name}
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  whileHover={{ 
                    y: -5,
                    scale: 1.02
                  }}
                  className="group relative"
                >
                  <div className="relative rounded-2xl bg-gray-800/50 backdrop-blur-lg border border-gray-700 p-6">
                    <div className="flex text-yellow-400 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <motion.div
                          key={i}
                          whileHover={{ scale: 1.3, rotate: 15 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <Star size={20} fill="currentColor" />
                        </motion.div>
                      ))}
                    </div>
                    <blockquote className="text-gray-300 text-lg leading-relaxed">"{testimonial.quote}"</blockquote>
                    <div className="mt-6 flex items-center gap-3">
                      <motion.div 
                        className="h-12 w-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold shadow-lg"
                        whileHover={{ scale: 1.2, rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        {testimonial.name.charAt(0)}
                      </motion.div>
                      <div>
                        <p className="font-semibold text-white">{testimonial.name}</p>
                        <p className="text-sm text-gray-400">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative">
          <div className="mx-auto max-w-4xl px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-12 text-white shadow-2xl shadow-blue-500/30 overflow-hidden border border-blue-400/30"
            >
              {/* Animated background elements */}
              <motion.div 
                className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-white/10 blur-2xl"
                animate={{
                  x: [0, 50, 0],
                  y: [0, -30, 0],
                }}
                transition={{
                  duration: 15,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <motion.div 
                className="absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-purple-400/10 blur-2xl"
                animate={{
                  x: [0, -50, 0],
                  y: [0, 30, 0],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              <div className="relative z-10">
                <motion.h2 
                  className="text-3xl font-bold sm:text-4xl"
                  animate={{
                    textShadow: [
                      "0 0 10px rgba(255, 255, 255, 0.5)",
                      "0 0 20px rgba(255, 255, 255, 0.3)",
                      "0 0 10px rgba(255, 255, 255, 0.5)"
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  Ready to Find Your Lost Items?
                </motion.h2>
                <p className="mt-3 text-lg text-blue-100 max-w-2xl mx-auto">
                  Join thousands of students using our platform to reunite with their belongings
                </p>
                
                <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
                  <motion.div 
                    whileHover={{ scale: 1.05 }} 
                    whileTap={{ scale: 0.95 }}
                    className="relative"
                  >
                    <motion.div
                      animate={{ 
                        backgroundPosition: ["0%", "100%", "0%"],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                      }}
                      className="bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 bg-[length:200%_200%] rounded-xl p-0.5"
                    >
                      <Link
                        to="/signup"
                        className="inline-flex items-center gap-2 rounded-xl bg-gray-900 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:bg-gray-800"
                      >
                        🚀 Get Started Free
                        <ArrowRight size={16} />
                      </Link>
                    </motion.div>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link
                      to="/dashboard"
                      className="inline-flex items-center justify-center rounded-xl border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20"
                    >
                      🎯 See Live Demo
                    </Link>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default LandingPage