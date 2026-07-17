import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";

// Helper component for floating code snippets
function FloatingCodeSnippet({
  code,
  className,
  delay = 0,
  yRange = [10, -10, 10],
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{
        opacity: [0, 0.85, 0.85, 0],
        y: yRange,
        rotate: [0, 2, -2, 0],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        delay: delay,
        ease: "easeInOut",
      }}
      className={`absolute hidden lg:flex flex-col gap-1.5 p-4 rounded-xl bg-slate-900/60 backdrop-blur-md border border-slate-800/80 shadow-2xl font-mono text-[11px] text-slate-300 pointer-events-none select-none z-10 w-60 ${className}`}
    >
      <div className="flex items-center justify-between pb-1.5 border-b border-slate-800/60">
        <div className="flex gap-1">
          <span className="w-2 h-2 rounded-full bg-red-500/60" />
          <span className="w-2 h-2 rounded-full bg-yellow-500/60" />
          <span className="w-2 h-2 rounded-full bg-green-500/60" />
        </div>
        <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider">
          Codenap Engine
        </span>
      </div>
      <pre className="text-blue-400 font-bold">{code}</pre>
    </motion.div>
  );
}

// Helper for floating neural network nodes
function FloatingNeuralNode({ className, delay = 0, size = 180 }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: [0.08, 0.25, 0.08],
        y: [0, -20, 0],
        rotate: [0, 360],
      }}
      transition={{
        duration: 15,
        repeat: Infinity,
        delay: delay,
        ease: "linear",
      }}
      className={`absolute hidden lg:block pointer-events-none select-none z-10 ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line
          x1="20"
          y1="20"
          x2="50"
          y2="35"
          stroke="rgb(59, 130, 246)"
          strokeWidth="0.5"
          strokeDasharray="3 3"
        />
        <line
          x1="50"
          y1="35"
          x2="80"
          y2="20"
          stroke="rgb(59, 130, 246)"
          strokeWidth="0.5"
        />
        <line
          x1="20"
          y1="20"
          x2="30"
          y2="60"
          stroke="rgb(249, 115, 22)"
          strokeWidth="0.5"
        />
        <line
          x1="30"
          y1="60"
          x2="50"
          y2="35"
          stroke="rgb(249, 115, 22)"
          strokeWidth="0.5"
          strokeDasharray="2 2"
        />
        <line
          x1="50"
          y1="35"
          x2="70"
          y2="70"
          stroke="rgb(6, 182, 212)"
          strokeWidth="0.5"
        />
        <line
          x1="80"
          y1="20"
          x2="70"
          y2="70"
          stroke="rgb(6, 182, 212)"
          strokeWidth="0.5"
        />
        <line
          x1="30"
          y1="60"
          x2="70"
          y2="70"
          stroke="rgb(59, 130, 246)"
          strokeWidth="0.5"
        />

        <circle cx="20" cy="20" r="3" fill="rgb(59, 130, 246)">
          <animate
            attributeName="r"
            values="3;5;3"
            dur="3s"
            repeatCount="indefinite"
          />
        </circle>
        <circle cx="80" cy="20" r="3.5" fill="rgb(59, 130, 246)">
          <animate
            attributeName="r"
            values="3.5;2;3.5"
            dur="4s"
            repeatCount="indefinite"
          />
        </circle>
        <circle cx="50" cy="35" r="4" fill="rgb(6, 182, 212)">
          <animate
            attributeName="r"
            values="4;6;4"
            dur="2.5s"
            repeatCount="indefinite"
          />
        </circle>
        <circle cx="30" cy="60" r="3" fill="rgb(249, 115, 22)" />
        <circle cx="70" cy="70" r="4" fill="rgb(59, 130, 246)">
          <animate
            attributeName="r"
            values="4;5.5;4"
            dur="3.5s"
            repeatCount="indefinite"
          />
        </circle>
      </svg>
    </motion.div>
  );
}

export default function HeroSection() {
  return (
    <div className="fixed top-10 left-0 h-screen w-full overflow-hidden z-10 flex flex-col justify-center items-center px-6 pointer-events-auto">
      {/* Glow Effects */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-orange-600/5 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-[20%] right-[-10%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[180px] pointer-events-none" />

      {/* Grid Pattern Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] opacity-35" />

      {/* Floating Background Tech Elements */}
      <FloatingCodeSnippet
        code={`const app = express();\napp.use(cors());\n\n// Fast execution\napp.post('/api/deploy', (req, res) => {\n  res.status(200).send('Done');\n});`}
        className="left-4 xl:left-12 top-[22%] -rotate-3 text-blue-400"
        delay={0}
      />
      <FloatingCodeSnippet
        code={`import { motion } from 'framer-motion';\n\nexport const Card = () => (\n  <motion.div\n    whileHover={{ y: -8 }}\n    className="shadow-xl"\n  />\n);`}
        className="right-4 xl:right-12 top-[28%] rotate-2 text-cyan-400"
        delay={2.5}
      />
      <FloatingCodeSnippet
        code={`// GraphQL Schema\ntype Service {\n  id: ID!\n  title: String!\n  stack: [String]!\n  uptime: Float!\n}`}
        className="left-8 xl:left-20 bottom-[18%] rotate-3 text-blue-400"
        delay={1.2}
        yRange={[12, -12, 12]}
      />
      <FloatingCodeSnippet
        code={`// Tailwind Config v4\n@theme {\n  --color-brand: #f97316;\n  --color-bg-dark: #020617;\n}`}
        className="right-8 xl:right-24 bottom-[20%] -rotate-2 text-orange-400"
        delay={3.8}
        yRange={[8, -8, 8]}
      />

      {/* Floating Neural Networks */}
      <FloatingNeuralNode
        className="left-[18%] top-[15%]"
        delay={0.5}
        size={220}
      />
      <FloatingNeuralNode
        className="right-[16%] top-[18%]"
        delay={2.2}
        size={180}
      />
      <FloatingNeuralNode
        className="left-[22%] bottom-[12%]"
        delay={4}
        size={190}
      />
      <FloatingNeuralNode
        className="right-[20%] bottom-[15%]"
        delay={1.5}
        size={210}
      />

      {/* Hero Content Container */}
      <div className="max-w-4xl mx-auto text-center relative z-20 flex flex-col items-center gap-8">
        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight leading-[0.95] bg-gradient-to-b from-white via-slate-100 to-slate-400 bg-clip-text text-transparent"
        >
          We Architect <br />
          Digital Excellence.
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-base sm:text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed"
        >
          CodeNap designs, engineers, and launches premium web, mobile, and
          cloud software. No templates, no shortcuts. Just high-performance,
          custom-built business systems.
        </motion.p>

        {/* Dual Call To Actions */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center gap-4 mt-4"
        >
          <button
            onClick={() => {
              document
                .getElementById("services-section")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className="group w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white text-slate-950 font-bold transition-all hover:scale-105 active:scale-95 shadow-xl shadow-white/5 cursor-pointer"
          >
            Explore Services
            <ArrowRight className="w-4.5 h-4.5 group-hover:translate-x-1 transition-transform" />
          </button>

          <Link
            to="/contact"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-200 font-semibold transition-all hover:scale-105 active:scale-95 hover:bg-slate-800/80"
          >
            Get a Quote
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
