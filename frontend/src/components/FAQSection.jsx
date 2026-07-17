import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqData = [
  {
    question: "What mobile app development services do you offer?",
    answer:
      "We design and build custom iOS and Android mobile solutions built to deliver premium user experiences. From concept design to App Store submissions, we handle the full life-cycle, including offline-first sync, secure biometric login, and secure cloud integrations.",
  },
  {
    question: "What is the average cost and timeline for developing software?",
    answer:
      "Every project is unique, but our average timeline is 6 to 12 weeks. We transition your goals into structured sprints, mapping your ideas to concrete milestones with direct developer Slack access and transparent reporting.",
  },
  {
    question: "Do you offer ongoing maintenance and support services?",
    answer:
      "Yes, we provide comprehensive project maintenance and support services post-launch. Our services include:",
    bullets: [
      "Regular app updates and feature enhancements",
      "Bug fixing and performance optimization",
      "Security patches and data backup",
      "User feedback analysis and implementation of improvements",
    ],
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0); // Default open the third item as shown in the screenshot

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-white text-slate-900 border-t border-slate-100 px-6 py-24 relative z-20 overflow-hidden">
      {/* Background radial glows for premium feel */}
      <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] bg-blue-500/5 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-[350px] h-[350px] bg-orange-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header with watermark */}
        <div className="relative flex flex-col items-center justify-center text-center mb-16 select-none">
          {/* Watermark FAQ Background */}
          <span className="absolute text-[80px] sm:text-[110px] md:text-[140px] font-black text-slate-100/70 tracking-widest uppercase z-0 -translate-y-2">
            FAQs
          </span>
          <h2 className="relative text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight z-10">
            Frequently Asked Questions
          </h2>
        </div>

        {/* FAQ List */}
        <div className="border-t border-slate-200">
          {faqData.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={idx} className="border-b border-slate-200">
                {/* Accordion Trigger */}
                <button
                  onClick={() => toggleFAQ(idx)}
                  className="w-full flex justify-between items-center py-6 text-left font-bold text-sm sm:text-base md:text-lg text-slate-800 hover:text-orange-500 transition-colors duration-200 focus:outline-none cursor-pointer group"
                >
                  <span className="pr-4 leading-snug">{item.question}</span>
                  <span className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full border border-slate-100 bg-slate-50 group-hover:border-orange-200 group-hover:bg-orange-50 transition-colors duration-200">
                    {isOpen ? (
                      <Minus className="w-4 h-4 text-slate-600 group-hover:text-orange-500 transition-colors" />
                    ) : (
                      <Plus className="w-4 h-4 text-slate-600 group-hover:text-orange-500 transition-colors" />
                    )}
                  </span>
                </button>

                {/* Accordion Content */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{
                        height: "auto",
                        opacity: 1,
                        transition: {
                          height: { duration: 0.3, ease: "easeOut" },
                          opacity: { duration: 0.25, delay: 0.05 },
                        },
                      }}
                      exit={{
                        height: 0,
                        opacity: 0,
                        transition: {
                          height: { duration: 0.25, ease: "easeIn" },
                          opacity: { duration: 0.2 },
                        },
                      }}
                      className="overflow-hidden"
                    >
                      <div className="pb-8 text-xs sm:text-sm md:text-base text-slate-600 leading-relaxed max-w-3xl">
                        <p>{item.answer}</p>

                        {item.bullets && (
                          <ul className="mt-4 space-y-3 pl-4">
                            {item.bullets.map((bullet, bulletIdx) => (
                              <li
                                key={bulletIdx}
                                className="flex items-start gap-2.5"
                              >
                                <span className="text-orange-500 mt-1.5 shrink-0 block w-1.5 h-1.5 rounded-full bg-orange-500" />
                                <span>{bullet}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
