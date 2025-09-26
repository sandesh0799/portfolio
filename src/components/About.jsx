import React from "react";
import { motion } from "framer-motion";

const AnimatedWrapper = ({ children, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

export default function About() {
  return (
    <section
      id="about"
      className="relative py-12 px-6 bg-gray-100 text-gray-900 overflow-hidden" // reduced padding & removed min-h-screen
    >
      {/* Floating background elements */}
      <motion.div
        className="absolute top-20 right-10 w-32 h-32 bg-gray-300 rounded-full opacity-30"
        animate={{
          y: [0, -20, 0],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-20 left-10 w-24 h-24 bg-gray-300 rounded-full opacity-20"
        animate={{
          y: [0, 15, 0],
          x: [0, 10, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Heading + intro */}
        <AnimatedWrapper delay={0.2}>
          <motion.h2
            className="text-5xl font-extrabold mb-8 text-center"
            whileInView={{ scale: [0.95, 1.02, 1] }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-gray-800">About Me</span>
          </motion.h2>

          <motion.p
            className="text-xl max-w-4xl leading-relaxed text-center mx-auto text-gray-700"
            whileInView={{ opacity: [0, 1] }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            I'm a passionate graphic designer turned frontend developer with a keen eye for
            aesthetics and user experience. I specialize in creating visually stunning
            interfaces that not only look great but also provide intuitive user interactions.
            My journey combines creative design principles with modern web technologies to
            deliver exceptional digital experiences.
          </motion.p>
        </AnimatedWrapper>

        {/* Stats section */}
        <AnimatedWrapper delay={0.6}>
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"> {/* reduced margin-top */}
            {[
              { number: "50+", label: "Projects Completed", icon: "📊" },
              { number: "3+", label: "Years Experience", icon: "🕒" },
              { number: "100%", label: "Client Satisfaction", icon: "⭐" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center p-6 bg-white rounded-lg shadow"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
              >
                <div className="text-4xl mb-2">{stat.icon}</div>
                <motion.div
                  className="text-3xl font-bold text-gray-800 mb-2"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.8,
                    delay: 0.8 + index * 0.1,
                    type: "spring",
                  }}
                >
                  {stat.number}
                </motion.div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </AnimatedWrapper>

        {/* Call to action */}
        <AnimatedWrapper delay={0.8}>
          <div className="text-center mt-12"> {/* reduced margin-top */}
            <motion.a
              href="#contact"
              className="inline-block px-8 py-4 bg-gray-800 text-white font-semibold rounded-lg shadow cursor-pointer"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 12px 24px rgba(0,0,0,0.15)",
              }}
              whileTap={{ scale: 0.95 }}
              animate={{
                boxShadow: [
                  "0 0 0 0 rgba(0,0,0,0.1)",
                  "0 0 0 10px rgba(0,0,0,0)",
                  "0 0 0 0 rgba(0,0,0,0)",
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            >
              Let's Work Together
            </motion.a>
          </div>
        </AnimatedWrapper>
      </div>
    </section>
  );
}
