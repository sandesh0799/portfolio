import { motion, useAnimation } from "framer-motion";

const heroVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { delay: 0.3, duration: 0.8, ease: "easeOut" },
  },
};

const bounceTransition = {
  y: {
    duration: 0.6,
    yoyo: Infinity,
    ease: "easeOut",
  },
};

const floatTransition = {
  y: {
    duration: 4,
    yoyo: Infinity,
    ease: "easeInOut",
  },
  x: {
    duration: 6,
    yoyo: Infinity,
    ease: "easeInOut",
  },
};

const rotateTransition = {
  rotate: {
    duration: 8,
    repeat: Infinity,
    ease: "linear",
  },
};

export default function Home() {
  const bgControls = useAnimation();

  const handleHoverStart = () => {
    bgControls.start({
      filter: "blur(48px)",
      opacity: 0.6,
      transition: { duration: 0.5, ease: "easeOut" },
    });
  };

  const handleHoverEnd = () => {
    bgControls.start({
      filter: "blur(24px)",
      opacity: 0.4,
      transition: { duration: 0.5, ease: "easeOut" },
    });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center px-8 text-gray-900 bg-gray-50 overflow-hidden"
    >
      {/* Animated Gradient Blurred Background */}
      <motion.div
        className="absolute inset-0 -z-10 rounded-lg"
        style={{
          background:
            "linear-gradient(270deg, #00d2ff, #3a0ca3, #00bfa6, #4dd0e1)",
          backgroundSize: "800% 800%",
          filter: "blur(24px)",
          opacity: 0.4,
        }}
        animate={bgControls}
        initial={{
          backgroundPosition: "0% 50%",
          filter: "blur(24px)",
          opacity: 0.4,
        }}
      />
      
      {/* Separate animated background for gradient movement */}
      <motion.div
        className="absolute inset-0 -z-10 rounded-lg"
        style={{
          background:
            "linear-gradient(270deg, #00d2ff, #3a0ca3, #00bfa6, #4dd0e1)",
          backgroundSize: "800% 800%",
          filter: "blur(24px)",
          opacity: 0.2,
        }}
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Bouncing Ball */}
      <motion.div
        className="absolute rounded-full bg-cyan-600 opacity-70"
        style={{
          width: 40,
          height: 40,
          bottom: 60,
          left: "10%",
          zIndex: 1,
          filter: "drop-shadow(0 5px 5px rgba(0, 0, 0, 0.2))",
        }}
        animate={{ y: ["0%", "-50%", "0%"] }}
        transition={bounceTransition}
      />

      {/* Floating Pencil */}
      <motion.div
        className="absolute opacity-80"
        style={{
          top: "20%",
          right: "15%",
          zIndex: 1,
        }}
        animate={{
          y: ["-20px", "20px", "-20px"],
          rotate: [0, 10, -10, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <svg width="60" height="60" viewBox="0 0 24 24" fill="none">
          <path
            d="M17.5 2.5L21.5 6.5L7.5 20.5L3.5 16.5L17.5 2.5Z"
            stroke="#0f172a"
            strokeWidth="2"
            fill="#ec4899"
          />
          <path
            d="M13.5 6.5L17.5 10.5"
            stroke="#0f172a"
            strokeWidth="2"
          />
        </svg>
      </motion.div>

      {/* Floating Color Palette */}
      <motion.div
        className="absolute opacity-90"
        style={{
          top: "15%",
          left: "8%",
          zIndex: 1,
        }}
        animate={{
          y: ["10px", "-15px", "10px"],
          x: ["-5px", "10px", "-5px"],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <svg width="50" height="50" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="#0f172a" strokeWidth="2" fill="none"/>
          <circle cx="12" cy="8" r="2" fill="#ec4899"/>
          <circle cx="16" cy="12" r="2" fill="#3b82f6"/>
          <circle cx="12" cy="16" r="2" fill="#06b6d4"/>
          <circle cx="8" cy="12" r="2" fill="#8b5cf6"/>
        </svg>
      </motion.div>

      {/* Rotating Geometric Shapes */}
      <motion.div
        className="absolute opacity-70"
        style={{
          bottom: "25%",
          right: "8%",
          zIndex: 1,
        }}
        animate={{ rotate: [0, 360] }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <svg width="80" height="80" viewBox="0 0 100 100">
          <polygon
            points="50,10 90,90 10,90"
            fill="#9333ea"
            opacity="0.8"
          />
        </svg>
      </motion.div>

      {/* Floating Design Tools */}
      <motion.div
        className="absolute opacity-80"
        style={{
          bottom: "35%",
          left: "12%",
          zIndex: 1,
        }}
        animate={{
          y: ["-10px", "15px", "-10px"],
          rotate: [0, 5, -5, 0],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <svg width="45" height="45" viewBox="0 0 24 24" fill="none">
          <rect x="3" y="3" width="18" height="18" rx="2" stroke="#0f172a" strokeWidth="2" fill="#e0f2fe"/>
          <path d="M9 9h6v6H9z" fill="#3b82f6" opacity="0.8"/>
          <circle cx="7.5" cy="7.5" r="1.5" fill="#ec4899"/>
        </svg>
      </motion.div>

      {/* Animated Bezier Curve */}
      <motion.div
        className="absolute opacity-90"
        style={{
          top: "60%",
          right: "20%",
          zIndex: 1,
        }}
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 10, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <svg width="70" height="40" viewBox="0 0 100 50">
          <path
            d="M10,40 Q30,10 50,25 Q70,40 90,10"
            stroke="#0891b2"
            strokeWidth="3"
            fill="none"
            strokeDasharray="5,5"
          />
          <circle cx="10" cy="40" r="3" fill="#0891b2"/>
          <circle cx="50" cy="25" r="3" fill="#0891b2"/>
          <circle cx="90" cy="10" r="3" fill="#0891b2"/>
        </svg>
      </motion.div>

      {/* Creative Spark Particles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-3 h-3 bg-cyan-300 rounded-full opacity-90"
          style={{
            top: `${20 + i * 8}%`,
            left: `${15 + i * 9}%`,
            zIndex: 1,
          }}
          animate={{
            scale: [0, 1.2, 0],
            opacity: [0, 0.9, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 0.4,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Floating Typography Element */}
      <motion.div
        className="absolute opacity-60 font-bold text-6xl text-gray-800"
        style={{
          top: "40%",
          left: "5%",
          zIndex: 1,
        }}
        animate={{
          y: ["5px", "-10px", "5px"],
          opacity: [0.6, 0.8, 0.6],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        Aa
      </motion.div>

      {/* Grid Pattern */}
      <motion.div
        className="absolute opacity-40"
        style={{
          bottom: "10%",
          right: "25%",
          zIndex: 1,
        }}
        animate={{
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <svg width="60" height="60" viewBox="0 0 60 60">
          {[...Array(4)].map((_, i) => (
            <g key={i}>
              <line x1={i * 20} y1="0" x2={i * 20} y2="60" stroke="#475569" strokeWidth="1.5"/>
              <line x1="0" y1={i * 20} x2="60" y2={i * 20} stroke="#475569" strokeWidth="1.5"/>
            </g>
          ))}
        </svg>
      </motion.div>

      {/* Main Content */}
      <motion.div
        className="max-w-xl text-center relative z-50"
        initial="hidden"
        animate="visible"
        variants={heroVariants}
      >
        <h1 className="text-6xl font-extrabold mb-4 tracking-tight">
          Crafting Visual Stories
        </h1>
        <p className="text-lg text-gray-700 mb-8 leading-relaxed">
          I'm a passionate Graphic Designer focused on creating compelling and
          modern visuals that elevate brands and engage audiences.
        </p>
        <motion.a
          href="#portfolio"
          className="inline-block px-8 py-3 bg-cyan-600 text-white rounded-md font-semibold shadow-lg transition relative z-50"
          whileHover={{
            scale: 1.05,
            boxShadow: "0 10px 20px rgba(6, 182, 212, 0.5)",
          }}
          whileTap={{ scale: 0.95 }}
          onHoverStart={handleHoverStart}
          onHoverEnd={handleHoverEnd}
        >
          View Portfolio
        </motion.a>
      </motion.div>
    </section>
  );
}
