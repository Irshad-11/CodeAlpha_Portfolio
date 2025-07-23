import React, { useState, useEffect } from "react";

import { motion } from "framer-motion";
import { FaSpinner, FaGithub, FaLinkedin, FaFacebook, FaEnvelope } from "react-icons/fa";

const images = [
  "https://i.pinimg.com/1200x/72/2d/41/722d410fd57badf142ae2237338a5530.jpg",
  "https://i.pinimg.com/1200x/0e/20/4d/0e204d80ee22b396a946fec0c6af637d.jpg",
  "https://i.pinimg.com/1200x/f6/be/a4/f6bea4edaa5042aac1a2f5b7555ea17a.jpg",
  "https://i.pinimg.com/1200x/69/4f/bf/694fbfd327c78a76e3b36eb7f86d2497.jpg",
  "https://i.pinimg.com/originals/43/5e/7b/435e7bc5b3c116403bff08a9882a50a2.jpg",
  "https://i.pinimg.com/1200x/a4/92/63/a4926349eca5b66ce5d2a698596e22c7.jpg",
];

export default function ContactMe() {
  const [currentImage, setCurrentImage] = useState(0);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentImage((prev) => (prev + 1) % images.length);
        setIsAnimating(false);
      }, 300);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.message.trim()) newErrors.message = "Message is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSending(true);
      setTimeout(() => {
        setIsSending(false);
        setIsSent(true);
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setIsSent(false), 2000);
      }, 2000);
    }
  };

  return (
    <section id="contactme" className="py-16 dark-theme text-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Mobile: form on top of low-opacity image with dark overlay */}
          <div className="lg:hidden relative h-[700px]">
            <div className="relative w-full h-full rounded-xl overflow-hidden">
              <motion.img
                src={images[currentImage]}
                alt="Background"
                className="absolute inset-0 w-full h-full object-cover opacity-30"
                initial={{ opacity: 0, x: 50 }} // starts off to the right
                animate={{ opacity: isAnimating ? 0 : 0.3, x: isAnimating ? 0 : 0 }} // slide in to center
                transition={{ duration: 0.6 }}
              />
              <div className="absolute inset-0 bg-black/30 p-6 flex flex-col justify-center items-center text-center">
                <h2 className="text-3xl font-bold text-[#22c55e] mb-6">Get in Touch</h2>
                <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    className="w-full p-3 bg-[#2d2d2d]/80 border-l-4 border-[#22c55e] rounded text-white"
                  />
                  {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your Email"
                    className="w-full p-3 bg-[#2d2d2d]/80 border-l-4 border-[#22c55e] rounded text-white"
                  />
                  {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your Message"
                    className="w-full p-3 bg-[#2d2d2d]/80 border-l-4 border-[#22c55e] rounded text-white h-64"
                  />
                  {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}

                  <button
                    type="submit"
                    disabled={isSending}
                    className="w-full py-3 bg-[#22c55e] text-white rounded flex items-center justify-center"
                  >
                    {isSending ? (
                      <FaSpinner className="send-animate mr-2" />
                    ) : isSent ? (
                      "Message Sent!"
                    ) : (
                      "Send Message"
                    )}
                  </button>

                  {isSent && (
                    <p className="text-green-500 text-center confirmation">Message sent successfully!</p>
                  )}
                </form>
              </div>
            </div>

            {/* Dots */}
            <div className="flex justify-center mt-4 hidden lg:block">
              {images.map((_, index) => (
                <span
                  key={index}
                  className={`dot mx-1 ${currentImage === index ? "active" : ""}`}
                  onClick={() => setCurrentImage(index)}
                />
              ))}
            </div>
          </div>


          {/* Desktop: Side-by-Side */}
          <div className="hidden lg:block">
            <div className="w-full h-[600px] relative">
              <div className="absolute inset-0">
                {images.map((img, index) => (
                  <motion.img
                    key={index}
                    src={img}
                    alt={`Slide ${index + 1}`}
                    className={`w-full h-full object-cover rounded-2xl absolute ${currentImage === index ? "block" : "hidden"} magnetic ${isAnimating ? "active" : ""}`}
                    initial={{ opacity: 0, x: 50 }} // starts off to the right
                    animate={{ opacity: isAnimating ? 0 : 1, x: isAnimating ? 0 : 0 }} // slide in to center
                    transition={{ duration: 0.6 }}
                  />
                ))}
              </div>
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {images.map((_, index) => (
                  <span
                    key={index}
                    className={`dot ${currentImage === index ? "active" : ""}`}
                    onClick={() => setCurrentImage(index)}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="hidden lg:block">
            <h2 className="text-3xl font-bold text-[#22c55e] text-center mb-6">Get in Touch</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                className="w-full p-3 bg-[#2d2d2d] border-l-4 border-[#22c55e] rounded text-white"
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
                className="w-full p-3 bg-[#2d2d2d] border-l-4 border-[#22c55e] rounded text-white"
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your Message"
                className="w-full p-3 bg-[#2d2d2d] border-l-4 border-[#22c55e] rounded text-white h-72"
              />
              {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}
              <button
                type="submit"
                disabled={isSending}
                className="w-full py-3 bg-[#22c55e] text-white rounded flex items-center justify-center"
              >
                {isSending ? (
                  <FaSpinner className="send-animate mr-2" />
                ) : isSent ? (
                  "Message Sent!"
                ) : (
                  "Send Message"
                )}
              </button>
              {isSent && <p className="text-green-500 text-center confirmation">Message sent successfully!</p>}
            </form>
            <div className="mt-6 text-center">
              <p className="text-gray-400">Better connect with me directly</p>
              <div className="flex space-x-4 justify-center mt-2">
                <a href="https://github.com" className="text-[#22c55e] transition-all duration-300 hover:text-[#94d8ad]">
                  <FaGithub size={20} />
                </a>
                <a href="https://linkedin.com" className="text-[#22c55e] transition-all duration-300 hover:text-[#94d8ad]">
                  <FaLinkedin size={20} />
                </a>
                <a href="https://facebook.com" className="text-[#22c55e] transition-all duration-300 hover:text-[#94d8ad]">
                  <FaFacebook size={20} />
                </a>
                <a href="mailto:irshadrisad@gmail.com" className="text-[#22c55e] transition-all duration-300 hover:text-[#94d8ad]">
                  <FaEnvelope size={20} />
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
