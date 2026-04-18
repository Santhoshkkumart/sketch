import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageTransition from "../components/PageTransition";
import { EncryptedText } from "../components/ui/encrypted-text";
import { BackgroundBeams } from "../components/ui/background-beams";

export default function Join() {
  const formRef = useRef(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    year: "",
    department: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // TODO: Replace with your actual EmailJS credentials
      // await emailjs.sendForm(
      //   "your_service_id",
      //   "your_template_id",
      //   formRef.current,
      //   "your_public_key"
      // );
      
      // Simulate submission for demo
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSubmitted(true);
    } catch (error) {
      console.error("Failed to send:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputClasses =
    "w-full bg-white/5 border border-white/10 text-white rounded-lg px-4 py-3 focus:border-white/40 focus:outline-none focus:ring-0 placeholder:text-neutral-600 transition-colors duration-200";

  return (
    <PageTransition>
      <div className="relative min-h-screen bg-neutral-950 flex items-center justify-center overflow-hidden py-24 md:py-32">
        <BackgroundBeams />

        <div className="relative z-10 w-full max-w-xl mx-auto px-4 sm:px-6">
          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-10 md:mb-12 text-center"
          >
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold">
              <EncryptedText
                text="Be Part of SKETCH"
                encryptedClassName="text-neutral-500"
                revealedClassName="text-white text-3xl sm:text-4xl md:text-6xl font-bold font-sans"
                revealDelayMs={50}
                animateOn="load"
              />
            </h1>
          </motion.div>

          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="glass rounded-2xl p-6 sm:p-8 md:p-12"
              >
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                  {/* Full Name */}
                  <div>
                    <label className="block text-neutral-400 text-sm mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      required
                      className={inputClasses}
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-neutral-400 text-sm mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      required
                      className={inputClasses}
                    />
                  </div>

                  {/* Year */}
                  <div>
                    <label className="block text-neutral-400 text-sm mb-2">
                      Year
                    </label>
                    <select
                      name="year"
                      value={formData.year}
                      onChange={handleChange}
                      required
                      className={inputClasses}
                    >
                      <option value="" disabled>
                        Select your year
                      </option>
                      <option value="1st Year">1st Year</option>
                      <option value="2nd Year">2nd Year</option>
                      <option value="3rd Year">3rd Year</option>
                      <option value="4th Year">4th Year</option>
                    </select>
                  </div>

                  {/* Department Preference */}
                  <div>
                    <label className="block text-neutral-400 text-sm mb-2">
                      Department Preference
                    </label>
                    <select
                      name="department"
                      value={formData.department}
                      onChange={handleChange}
                      required
                      className={inputClasses}
                    >
                      <option value="" disabled>
                        Select a department
                      </option>
                      <option value="R&D">R&D</option>
                      <option value="Design">Design</option>
                      <option value="O & PR">O & PR</option>
                      <option value="Marketing">Marketing</option>
                    </select>
                  </div>

                  {/* Why join */}
                  <div>
                    <label className="block text-neutral-400 text-sm mb-2">
                      Why do you want to join?
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about yourself and why you'd be a great fit..."
                      rows={4}
                      required
                      className={inputClasses + " resize-none"}
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full border border-white/30 bg-transparent text-white py-3 rounded-lg hover:bg-white hover:text-black transition-all duration-300 text-sm font-medium tracking-wide disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? "Sending..." : "Send Application"}
                  </button>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="glass rounded-2xl p-8 sm:p-12 md:p-16 text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-6"
                >
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </motion.div>
                <h2 className="text-white text-2xl font-bold mb-3">
                  Application received.
                </h2>
                <p className="text-neutral-400 text-sm">
                  We'll review your application and get back to you soon.
                  Welcome to the journey.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </PageTransition>
  );
}
