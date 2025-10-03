
"use client"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { Heart, Mail, Phone, MapPin, Twitter, Linkedin, Github, ArrowUp } from "lucide-react"
import { useState, useEffect } from "react"

function SiteFooter() {
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative overflow-hidden border-t border-gray-800 bg-gradient-to-br from-gray-950 via-black to-gray-900 backdrop-blur-lg">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <motion.div 
          className="absolute bottom-10 left-10 h-20 w-20 rounded-full bg-blue-500/5 blur-xl"
          animate={{
            y: [0, -20, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-20 right-20 h-16 w-16 rounded-full bg-cyan-500/5 blur-xl"
          animate={{
            y: [0, 15, 0],
            scale: [1, 0.8, 1],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
      </div>

      {/* Scroll to Top Button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ 
          scale: showScrollTop ? 1 : 0, 
          opacity: showScrollTop ? 1 : 0 
        }}
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-gray-700 to-gray-800 text-white shadow-2xl shadow-gray-500/20 transition-all hover:from-gray-600 hover:to-gray-700 border border-gray-600"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <ArrowUp size={20} />
      </motion.button>

      {/* Main Footer Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-12 md:px-6">
        <div className="grid gap-8 lg:grid-cols-4">
          {/* Brand Section with Logo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1"
          >
            <div className="flex items-center gap-3 mb-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="flex h-26 w-28 items-center justify-center backdrop-blur-sm ml-6 border-red-50"
              >
                <img 
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKoAAACUCAMAAAA02EJtAAAAwFBMVEUAAAD+hgwAgTH/iQwAgTMAWCEAdCz/iwwAhDIAei4AciwAEgcAHwwAaCgAGwsACQQAPhcASRsAVCAwGQIAMhMAiDMoFQFwPAX/jwztgAv2hAvmfQoANxUATx7ZdgqcUwdLKAM/IQNjNQUjEgEPBwCyYAjCaAlbMASShSR8QgaPTAZEgywAKhA2HAKERgYZDQCqiCCnWQhogypbgynWjBnsjRS3hx2DhCafhiHLZwbYhhV1hCgngTDDih3McQoAJA7Uf5OGAAAQeElEQVR4nO1baXuivNeXRXEZp4tVSWgBF1CxLlRxadV+/2/1T1iyALI4be95nmvOizZiOPw4OXtipfKP/tE/+suoX2ZyZ/hdMArQ0C0ze1Bq9heTtSwze2T/d2LtgEmp+Zb9TUAKPFrvlZo/UwffhCSPJlJJ5euA/0qstlTKASDSS9/xNeQooOwtfRWUU5mvoRVUjdI3QcX6Big51NMkuCh9l6FI5d/vT8mWpBsEZAIJzr4eTCZZilDSqYb3SYJkfjWYTHLRE29yPANJuO0dbyWEVFBvs2W0HBL8OTdgqIJwi6ZiWgB0LzC/FM91wjIVbn4avlvSfiTCjl0kU0FxMqb0shZ4pGGs0PxiWGlkYZlKWsaMoaZnGU4fv6oEvz8htBUBPynjQStpP9WyosNFymPxFbSyAqRZNmVsRXGbFZMGQPCZfG8s0H2BCKCTNWcqi1M9i8tSCbCWqiHK0UALn0FUcbxcjmKTVtpcFDeJpGvkMDMDLRIUY/xdSEEgUyajNqCnx9TSBHVRFD0zhvToeUfKSQs5fVOeNRFC/jaVhbaRdxqvDX1NFkXZ4xd3fHyX54CKdQiFQK726huQzkLuEvNEf7G3vGicdww1ZleGdxJPgPH7jhJyu3w91lkgUkSsk9HekF6qJocKQxXPHP4B/BDFucaiskJ+kvbVCYEbIeXN9riTRXnHmbtxRkjFHZd32VsEf8+FjZ4eYf3iRCuSgaDyReryHeMS2OIugHo4MpdMYY7RH7lbF9EqfWmQHYXORUgmqd4mLkIDS5CHau/QldN7LDyZMAILv87BRmslKJe4F9WnIvairMG8J6BKSFPFt0SW2idKBbOSnxJkaoRlMkmZbfFynxmxJqEGWrJL+tClQpTgSxzsEFCkySxzALAGfDDBaeZDXTPgcaQVRZjSrTAIVuUL+i4zmIUUGdwZ4wBU2/wQwKrvRMBC3WtpQZRilS5/6rQMiSAFKIJ2zPgDTYisW2bWewJF3q+6vp15iVxrgN+cOEFB0cw/QuoQTr77mwCox1O3IzbvOSQSHwAMlUarlb7HKqLEbpvo0F8Ki8r1T7CObcoH4FADpvLei3EcQKStJ4++AQ62Iv088ObYU/E2Pjh6B/ED4qFBpfEHWaEdf2P9Q5ZPa4EXrI21lTEjDbsmjzhRB/uIN8Dp+VA4n2TkvvwPVAdu7rwMdMojzPQM3zV9qJyI/FgUSMgnbPAnj6SG+kGOa+pMnYpM+HKIRITbOlo9nXqSqDs9gm/4GRuPC6/WFmuAST4iKW+86FMHoBfZc5m2Az+woc3VIblAsCo3YGVkqlxIRmp4YoCVc9kKWvItQb/cso4W+39eUx3w4TN5pzpDPeINch1ozOrTyyvf3pFEPIvxWgaCsyezTJSbHsgna41cGetTDbjBMhXXbPbXp1iVsltGrJ6yvnkEDwFWNsUaaXuU40eGs0IpDLGyno78A2stMyWQ6V4x2efRGCsopfxAR0+VKaaBcJADuTKLOoRzmbb5kQs4R19OwInLEPrqW6BCQizPmjG2VSZ5uWT45b7wkXwYclhb8gB7evKidLn/Lr4ptPiaCPvgZjUBh/rXMt0MNzOCTBTf1YhTJiXuwP2UxFbnTLNCd3dixD8SAvV5S2t5MbGgcO/OYd4vrZjoCwHWnU6tZem9kdKpr30co7G+X+skx13pu+tIuYijx/PidDIZpOlaMxHWcXdTOb6TfZ6OTv0uODClk+WFFpUelEaMhVyKIF2A/NhhQr+AEtlQAGnhalETUxmlXKonEWdhcYsixHjIQqHAumr8LFNwPvn5EoGHTJjIakn8qKlSJVkA36TOAr0nThOViAnm17HLWDJ1jY44T0WmRdtAFowsne5ourR7udJxWrPxjllcmaQT5vUyejQcZzcVV4aK0hJ5S9XVUPSAuwku4dUZU+G6KIjJe9XNRLC6FI9azNQozHcc23WGyd7uEGznKBKQFzJ0O1htyzaD5RtCQJ63UN/k0xkkX38xWbq2Gzm3ARVVTkbILkB4aaRv17uzB20n3lTt2HAqT4nhO1rlgpPFPvK3FlbzmdC3I+sY62v5I9E1rKyWNvS2u/WZOGKH8emZ1RZ5JdrwwdkHSo42Bw8c46q+hNsT6a4tdbR+0DFwA2KsXyY2CuYEqgNOZ+jECrOFpcH1Zo74y++RCFd6cl3TyKZCJZ3JHvBrY1GWNztPW/JPGx/BLgpaBpbk8nIJTMrSbXTdCp82AmfvGBNp/6ieUVXh895Q7ztkktfrAbbP2BQV4BJpmRjQ/AD1WDk/1NXQdGInU/x3MsJo66rakH9J8yjsNiFbmct/GXld7Wgy0YLrIAzh7hQxFQ9e/KF9SbL75mCopfQkVupsYA4tGE/sJkd1J0YCEA98VGTywWuBgMkZ+d3lif6+j/jKSLIxnbV1VwMQpvZHXAgBcG2+g7Q4wt2GMHzbAv4lab0twEoqjZnljz92Cby3SLLiaQ1tVu9MbbTqLK5suqAvRuML63dGFl0lFBO2wI1Z2yS31GISxqRL6xngfXqSI93acn3GtHYUSya7edQH75Huy6f9FlpJj021NX3baUE1VUjbllwsNe88j5ZtD5kMUM9J2/sasw8ED6dIlXYecNL6YH0mt0sTK232X61uJjaAu4+5bw+nM+1cXHLSoBlJ6fwIh61z/rGGcZ2nxKhiWhxgpK5ejdOLoQu87QGhlVGqEiEUcgq3YZTI9OFaRnfOD1sPWrPrG+2MYaX41gVj/pm7jpWOcdTAdr3f7FV7sTCHTrrts+QKLnJnC0tBN623QNNdM3P+hNGAY+Jbo4A3IzSeONZR06ACNAAuBQrMmQ2ApqkCCs6WMcytRgY0vRdgoi/LGJVQ7DTcaLFY2FqnWBVUGXVsbbBYjArtqo4ZbUy0ByfMe5Tpc+qFG+NWmb00ttKOP8GhSKUyRz1NULAXMlTL7KSxRbMec60W812hajGiZcEzjFqpthmTXgmxoyNMplL2rBcopNnmlWh+bTqjjzEvv2DeouQB2m+B2mGgxva0TIX5iluqzsy1bESW5TrLYdJrG1Fde8dcTBnryZR+NJw5rhVwd5dcKrDSWNvh7ppdgbrQNVT6HKbT6Xq3fdc8TdOO7nDQi1xO5xKm7w8NsfEQXsTj+3D82BBrz3jQY040jRYT56gDzfPeUV2FmB92W8/TzXSosUzQYKFSBRjA9VwOagoUSnFIfJuuz1sVHt3+yK/hwrzopVsX691Hf1ztimj8wIx9rCsXBYteZTw0UCbhnddTnExEzNFovhaoj2AVQJA4qBYLlS7V0iOZOkOn+Wa/FTRdA27I/DP85hONn4Jh4xWNn8Pxpz/LNDR0E3yfvs1PKWxl5rgGG65iKQkTHVgPYIL1RpQpXCyE0/xtfzh7QLdpVlut+193q2jcDscvdFyPVGOl6ReUSk4/fLAcY3HDNuJYZyXwpzjYsCpdaPAzj3B7RpnJHNPmbbo7b989qFvOzMQN41BVWs0QUq1S+R2N2+h6g459broyqwz6jq0BpKXn3fRt43PefByQVh0Z/znjoHKOVWe+4QPraIgqo4h0y5iZxFQNKazUCTy5UvnVEAnsViizevsuWCPa4+2YfcPSCeOjNeNyCYfFo3DukIOadrJwPE7mGSgZD1qSV6HWOai6JOkJLmmM2R1CDJUrnzioRbc6cX/JF1MxqCUOPbPBMwGV/apwZAWhuyBQxQyouA4tutdnspKL6eqFhRpzZJlQBWFRUKrYH17prCeI2XXFULmczOagZh75ZQiHFOwFCklVSRjIdWLtH0HlwrnLvYagFUvtsYbjozdFpOr3zgtCdSQeKmd4vMSLJld+oIa9QlD9eFhMAQYaB0bgD2j0eahFNg0qoa5K/UIK4BtuMc2ypBgY7lszBjWnvg7f3lcpySkkVd8dFjpOlYNlwStyMRVYBlONIlIdacFT841gEIcS27/o6VIca/6WbLhQRhGphglo/hH78SWOJN6WiusHmpGnruHxQ6kM1HwNsJU4kPjmoZGAKuWZVujgWF3NMquQbU7h7iaRxrex+3ENwceeMr1gpP3SrJhZhQe1Myv3sZ2QWHJDoKMl5ghSVofPjG5Awi8iVXJgOcNeBymrn6IzCW32p11NXDpkkxkWi1Zko+H6kZ8+SMWQCBvLlBdCtgWc1F4rc/5SLwZ1QDalFTu1sTpJE6mQtnMxTp+IsuFkMBzZ/MZCoXSFad+AZNDqWakiTfcZVjpWQVIltz8gGUPPnF1Uhis+EVAoCWQtRoEu0/3oTWa6mg4UPT5lCYZJH0A4S9rFMhzHMVxLBxLHFW+BFJIqr2GEpePaOpSuAeV+2sGI9ep8fAuh2HWuCsiSKtsx4zlmPTc9vHWuizWD1axSUKqVFJ+ZS9c2r40r2ppFftZTrAxc3gBVurLXs0r1rZkU1HUFi+srNp6F9Gq8NMuqQHgUo5gCVJZqPkeOss4uTEpiDd+6oFST+V0O98x8wSmlrlEmUVCqWf4wjbuW9QvERLGYzSvaVi4o1XKGK+l5vyB2YGGwROkLQ60kio3rzAtsc82KYqUpUlEF4E5wZxNzvjuD6C+BspnRZK64VLlTB1liKPhLoY5VwKuwaWdxqWK55uurJBT/KUM/T7ASt1tVQqoVnGtkM5fyN+1Z6hkw6+UV/qfq5aAiy83gLanxk1y51HGvpWaSBGZ8ZlZGATCt7GumizL5YaFt+BhYQ5eURCdDkS6J4pBAbWTuBTBkWiDBGvGG1q2/bu9NHA0qTGKpKMCYJHs5v2vdOqZuHUEVwzGC3QqG9W4CKjKv/kVgWSOcdt+8EWhIQ8O6XHREF9udpedkref7kCqVu2j8jMbR5ackVB+uYwecEevEkdNbadTrFTz4UZZWvV7vBu38R//o/xO1fqVb819Hv5rdRq36WWDm72/HkkPtxtNd676dj/Wl+esH4GRRPTiTUn3Nmfer4R9d+C+p9uT/az20cia+PuRM+Ha6v8+f81fQa7XafqwSYobhB+7Ll8BVtFLmR5Pz9Oh2arVrolgjVG/QcaPr/2mSz/Va8zm46zGc1qzL0bfdRvCnmqdHf0LNRzL8VWeE8txFf15E8vmlkXS/DWJpdfwW9e9V51YNn09qvVRfWpXXOrKxajugJob6yEJlHeuvl+rDXUVGr/nbX3vfkfwE1CcZLX3j4RNDfW7Xa+1ms1kjUFuY7h5ZqNVuvVqtPTYe8TEnrADt1x+C2hafsLW81H3Pdd/Gj7yPoD42fX1t1CjUp+5jFYnxXkRQG0/k8k9AbQT6+tINHvssPjBQ2936y8vLQ5uB+tBABonmYgWo3r+2G8GBxp+AWsVQ7x7qIVQUbVsUasvXWk5XW6gifG1/tuv4PrHbfP70D2X+BNRW++H1odb19aCGnldDsAhUZEJxqEhH7p+aqHJFUJ/8Q3ft9g9BRUBqjeb9L6SrrW633eiyChAS7wEqTWRYvuJUkRP73ejWu93uz0D1z/r6zuoFuX3seeJQOQ/w3BZxPMBSfUE1d+UBKcHz0zdDvWtWyfhTxNZx99n0T6rGQsADC/VB9FH5r+n/ecVaLn9zRvPrmY6fg7T1uYb/399hU6Nf3jNQ71r0XpQShCnPK/VbP0Yl063Px1qRMuIvof8j5dmt9D/LMan0XxRXcgAAAABJRU5ErkJggg==" 
                  alt="Smart Lost & Found Logo"
                  className="h-26 w-28 object-contain"
                />
              </motion.div>
              <div>
                <h3 className="text-xl font-bold text-white">
                  {/* Smart Lost & Found */}
                </h3>
                {/* <p className="text-sm text-gray-400">Campus Connect</p> */}
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed text-base ml-6">
              Built for campuses to reunite belongings effortlessly through AI-powered matching and instant notifications.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="mb-4 mt-5 px-2 ml-10 text-lg font-semibold text-white">Quick Links</h4>
            <nav className="space-y-3 px-2 ml-8 ">
              {[
                { href: "#features", label: "Features" },
                { href: "#workflow", label: "How It Works" },
                { href: "#testimonials", label: "Testimonials" },
                { href: "#faq", label: "FAQs" },
              ].map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                >
                  <Link
                    to={link.href}
                    className="group flex items-center gap-2 text-gray-400 transition-all hover:text-blue-400 text-base"
                  >
                    <motion.div
                      className="h-1 w-1 rounded-full bg-blue-500 opacity-0 group-hover:opacity-100"
                      whileHover={{ scale: 1.5 }}
                    />
                    <span>{link.label}</span>
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>

          {/* Support */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h4 className="mb-4  mt-5 px-2 ml-8 text-lg font-semibold text-white">Support</h4>
            <nav className="space-y-3 px-2 ml-5">
              {[
                { href: "#privacy", label: "Privacy Policy" },
                { href: "#terms", label: "Terms of Service" },
                { href: "#feedback", label: "Give Feedback" },
              ].map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.4 }}
                >
                  <Link
                    to={link.href}
                    className="group flex items-center gap-2 text-gray-400 transition-all hover:text-cyan-400 text-base"
                  >
                    <motion.div
                      className="h-1 w-1 rounded-full bg-cyan-500 opacity-0 group-hover:opacity-100"
                      whileHover={{ scale: 1.5 }}
                    />
                    <span>{link.label}</span>
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>

          {/* Contact Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h4 className="mb-4  mt-5 px-2 ml-8 text-lg font-semibold text-white">Contact Info</h4>
            <div className="space-y-3 px-2 ml-8">
              <motion.a
                href="mailto:babulkr1211@gmail.com"
                className="flex items-center gap-3 text-gray-400 transition-all hover:text-blue-400 text-base group"
                whileHover={{ x: 5 }}
              >
                <div className="p-2 bg-blue-500/10 rounded-lg group-hover:bg-blue-500/20 transition-colors">
                  <Mail size={16} className="text-blue-400" />
                </div>
                <span>babulkr1211@gmail.com</span>
              </motion.a>

              <motion.a
                href="tel:+91 234567890"
                className="flex items-center gap-3 text-gray-400 transition-all hover:text-green-400 text-base group"
                whileHover={{ x: 5 }}
              >
                <div className="p-2 bg-green-500/10 rounded-lg group-hover:bg-green-500/20 transition-colors">
                  <Phone size={16} className="text-green-400" />
                </div>
                <span>+91 9876735390</span>
              </motion.a>

              <motion.div
                className="flex items-center gap-3 text-gray-400 text-base group"
                whileHover={{ x: 5 }}
              >
                <div className="p-2 bg-purple-500/10 rounded-lg group-hover:bg-purple-500/20 transition-colors">
                  <MapPin size={16} className="text-purple-400" />
                </div>
                <span>Campus Wide</span>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 border-t border-gray-800 pt-8"
        >
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <motion.p 
              className="flex items-center gap-2 text-gray-400 text-base"
              whileHover={{ scale: 1.02 }}
            >
              © {new Date().getFullYear()} Smart Lost & Found Portal. Made with
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Heart size={16} className="text-red-500" />
              </motion.span>
              for students worldwide.
            </motion.p>
            
            <motion.div 
              className="flex items-center gap-4"
              whileHover={{ scale: 1.02 }}
            >
              {[
                { 
                  icon: Twitter, 
                  href: "https://twitter.com", 
                  color: "hover:text-blue-400",
                  bgColor: "bg-white hover:bg-blue-500/20"
                },
                { 
                  icon: Linkedin, 
                  href: "https://linkedin.com", 
                  color: "hover:text-blue-500",
                  bgColor: "bg-white hover:bg-blue-500/20"
                },
                { 
                  icon: Github, 
                  href: "https://github.com", 
                  color: "hover:text-gray-300",
                  bgColor: "bg-white hover:bg-gray-500/20"
                },
              ].map((social, index) => (
                <motion.a
                  key={social.href}
                  href={social.href}
                  className={`p-2 rounded-lg ${social.bgColor} ${social.color} transition-all duration-300 border border-gray-700`}
                  whileHover={{ scale: 1.2, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.7 }}
                >
                  <social.icon size={18} />
                </motion.a>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}

export default SiteFooter