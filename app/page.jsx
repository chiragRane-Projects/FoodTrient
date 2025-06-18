"use client"

import React from 'react';
import { motion } from 'framer-motion';

// Hero Component
const Hero = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-emerald-300/20 to-teal-300/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-cyan-300/20 to-blue-300/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-teal-400/10 to-emerald-400/10 rounded-full blur-2xl"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <motion.h1 
            className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-slate-800 via-zinc-700 to-slate-900 bg-clip-text text-transparent mb-6"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            Foodtrient
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Discover the hidden nutrition secrets in your food. Upload any image and get instant AI-powered analysis, health insights, and personalized recommendations.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
        >
          <motion.button
            className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-8 py-4 rounded-2xl text-lg font-semibold shadow-2xl hover:shadow-emerald-500/25 transform transition-all duration-300"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            Start Analyzing Food
          </motion.button>
          
          <motion.button
            className="border-2 border-slate-300 text-slate-700 px-8 py-4 rounded-2xl text-lg font-semibold hover:bg-slate-50 transform transition-all duration-300"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            Watch Demo
          </motion.button>
        </motion.div>

        {/* Floating Food Icons */}
        <div className="relative">
          <motion.div
            className="absolute -top-20 left-20 text-6xl"
            animate={{
              y: [-10, 10, -10],
              rotate: [-5, 5, -5],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            🥗
          </motion.div>
          
          <motion.div
            className="absolute -top-16 right-16 text-5xl"
            animate={{
              y: [10, -10, 10],
              rotate: [5, -5, 5],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          >
            🍎
          </motion.div>
          
          <motion.div
            className="absolute top-10 left-1/4 text-4xl"
            animate={{
              y: [-15, 15, -15],
              x: [-5, 5, -5],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          >
            🥑
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-slate-400 rounded-full flex justify-center">
          <motion.div
            className="w-1 h-3 bg-slate-400 rounded-full mt-2"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </div>
  );
};

// Features Component
const Features = () => {
  const features = [
    {
      icon: "📸",
      title: "Image Upload",
      description: "Simply upload any food image and let our AI work its magic",
      gradient: "from-emerald-500 to-teal-600"
    },
    {
      icon: "🔬",
      title: "Nutrition Analysis",
      description: "Get detailed breakdown of calories, macros, vitamins, and minerals",
      gradient: "from-teal-500 to-cyan-600"
    },
    {
      icon: "⚕️",
      title: "Disease Risk Assessment",
      description: "Understand how your food choices impact your health risks",
      gradient: "from-cyan-500 to-blue-600"
    },
    {
      icon: "🤖",
      title: "AI Chatbot",
      description: "Ask questions and get personalized nutrition advice instantly",
      gradient: "from-blue-500 to-indigo-600"
    }
  ];

  return (
    <div className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
            Powerful Features
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Everything you need to make informed decisions about your nutrition
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-white/20"
            >
              <div className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center text-2xl mb-6 shadow-lg`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-4">
                {feature.title}
              </h3>
              <p className="text-slate-600 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

// How It Works Component
const HowItWorks = () => {
  const steps = [
    {
      step: "01",
      title: "Upload Your Food",
      description: "Take a photo or upload an image of any food item",
      icon: "📱"
    },
    {
      step: "02",
      title: "AI Analysis",
      description: "Our advanced AI identifies and analyzes your food",
      icon: "🧠"
    },
    {
      step: "03",
      title: "Get Insights",
      description: "Receive detailed nutrition data and health recommendations",
      icon: "📊"
    },
    {
      step: "04",
      title: "Chat & Learn",
      description: "Ask our AI chatbot any nutrition questions",
      icon: "💬"
    }
  ];

  return (
    <div className="py-24 px-4 bg-gradient-to-r from-slate-50 to-zinc-50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
            How It Works
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Get nutrition insights in four simple steps
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center relative"
            >
              <div className="relative mb-8">
                <div className="w-20 h-20 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full flex items-center justify-center text-3xl mx-auto shadow-2xl">
                  {step.icon}
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-slate-800 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  {step.step}
                </div>
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-4">
                {step.title}
              </h3>
              <p className="text-slate-600">
                {step.description}
              </p>
              
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 -right-4 w-8 h-0.5 bg-gradient-to-r from-emerald-300 to-teal-300" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Footer Component
const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h3 className="text-3xl font-bold mb-4">Ready to start your nutrition journey?</h3>
          <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
            Join thousands of users who are making smarter food choices with Foodtrient
          </p>
          
          <motion.button
            className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-12 py-4 rounded-2xl text-lg font-semibold shadow-2xl hover:shadow-emerald-500/25"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            Get Started Now
          </motion.button>
          
          <div className="mt-12 pt-8 border-t border-slate-700 text-slate-400">
            <p>&copy; 2025 Foodtrient. All rights reserved.</p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      <Hero />
      <Features />
      <HowItWorks />
      <Footer />
    </div>
  );
}

export default App;