"use client"
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Camera, MessageCircle, Send, Loader2, Apple, Brain, Heart, TrendingUp, X, Utensils, AlertTriangle, CheckCircle, Sparkle } from 'lucide-react';
import Link from 'next/link';

const DashboardPage = () => {
  const [activeTab, setActiveTab] = useState('analyze');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { type: 'bot', message: 'Hi! I\'m your nutrition assistant. Ask me anything about food, health, or nutrition!' }
  ]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isChatting, setIsChatting] = useState(false);
  const fileInputRef = useRef(null);

  // Function to format and beautify analysis results
  const formatAnalysisResult = (text) => {
    if (!text) return null;

    const sections = text.split('\n\n').filter(section => section.trim());
    
    return sections.map((section, index) => {
      const lines = section.split('\n').filter(line => line.trim());
      const title = lines[0];
      const content = lines.slice(1);

      // Determine section type based on keywords
      let sectionType = 'general';
      let icon = Brain;
      let bgColor = 'bg-slate-50';
      let iconColor = 'text-slate-500';

      if (title.toLowerCase().includes('nutrition') || title.toLowerCase().includes('calories') || title.toLowerCase().includes('macro')) {
        sectionType = 'nutrition';
        icon = Utensils;
        bgColor = 'bg-emerald-50';
        iconColor = 'text-emerald-600';
      } else if (title.toLowerCase().includes('risk') || title.toLowerCase().includes('danger') || title.toLowerCase().includes('warning')) {
        sectionType = 'risk';
        icon = AlertTriangle;
        bgColor = 'bg-red-50';
        iconColor = 'text-red-600';
      } else if (title.toLowerCase().includes('alternative') || title.toLowerCase().includes('healthy') || title.toLowerCase().includes('recommend')) {
        sectionType = 'recommendation';
        icon = CheckCircle;
        bgColor = 'bg-green-50';
        iconColor = 'text-green-600';
      }

      const IconComponent = icon;

      return (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className={`${bgColor} rounded-xl p-6 border border-opacity-20`}
        >
          <div className="flex items-start space-x-3">
            <div className={`mt-1 ${iconColor}`}>
              <IconComponent className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-slate-800 mb-3">{title}</h3>
              {content.length > 0 && (
                <div className="space-y-2">
                  {content.map((line, lineIndex) => {
                    const cleanLine = line.trim();
                    if (cleanLine.startsWith('•') || cleanLine.startsWith('-')) {
                      return (
                        <div key={lineIndex} className="flex items-start space-x-2">
                          <span className="text-slate-400 mt-1">•</span>
                          <span className="text-slate-700 text-sm flex-1">{cleanLine.substring(1).trim()}</span>
                        </div>
                      );
                    } else if (cleanLine.includes(':')) {
                      const [key, value] = cleanLine.split(':').map(s => s.trim());
                      return (
                        <div key={lineIndex} className="flex justify-between items-center py-1">
                          <span className="text-slate-600 font-medium text-sm">{key}:</span>
                          <span className="text-slate-800 text-sm">{value}</span>
                        </div>
                      );
                    } else {
                      return (
                        <p key={lineIndex} className="text-slate-700 text-sm leading-relaxed">
                          {cleanLine}
                        </p>
                      );
                    }
                  })}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      );
    });
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = async () => {
    if (!imageFile) return;

    setIsAnalyzing(true);
    const formData = new FormData();
    formData.append('file', imageFile);

    try {
      const response = await fetch('/api/analyze-image', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (data.result?.candidates?.[0]?.content?.parts?.[0]?.text) {
        setAnalysisResult(data.result.candidates[0].content.parts[0].text);
      } else {
        setAnalysisResult('Sorry, I couldn\'t analyze this image. Please try with a clearer food image.');
      }
    } catch (error) {
      setAnalysisResult('Error analyzing image. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const sendChatMessage = async () => {
    if (!currentMessage.trim()) return;

    const userMessage = currentMessage;
    setChatMessages(prev => [...prev, { type: 'user', message: userMessage }]);
    setCurrentMessage('');
    setIsChatting(true);

    try {
      const response = await fetch('/api/chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await response.json();
      setChatMessages(prev => [...prev, { 
        type: 'bot', 
        message: data.answer || 'Sorry, I couldn\'t process that. Please try again.' 
      }]);
    } catch (error) {
      setChatMessages(prev => [...prev, { 
        type: 'bot', 
        message: 'Sorry, there was an error. Please try again.' 
      }]);
    } finally {
      setIsChatting(false);
    }
  };

  const clearImage = () => {
    setImageFile(null);
    setImagePreview(null);
    setAnalysisResult(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const tabVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.2 } }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-cyan-50 to-teal-50">
      {/* Header */}
      <motion.header 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white shadow-sm border-b border-slate-200"
      >
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full flex items-center justify-center"
              >
                <Sparkle className="w-5 h-5 text-white" />
              </motion.div>
              <div>
                <h1 className="text-2xl font-bold text-slate-800">FoodTrient</h1>
                <p className="text-sm text-slate-600">AI-Powered Nutrition Analysis</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2 text-sm text-slate-600">
                <Heart className="w-4 h-4 text-red-500" />
                <span>Healthy Living</span>
              </div>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Navigation Tabs */}
      <div className="max-w-6xl mx-auto px-6 pt-8">
        <div className="flex space-x-1 bg-white rounded-xl p-1 shadow-sm border border-slate-200 mb-8">
          {[
            { id: 'analyze', label: 'Food Analysis', icon: Camera },
            { id: 'chat', label: 'Nutrition Chat', icon: MessageCircle }
          ].map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center space-x-2 py-3 px-6 rounded-lg font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-800 hover:bg-slate-50'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <tab.icon className="w-5 h-5" />
              <span>{tab.label}</span>
            </motion.button>
          ))}
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'analyze' && (
            <motion.div
              key="analyze"
              variants={tabVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            >
              {/* Upload Section */}
              <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
                <h2 className="text-xl font-semibold text-slate-800 mb-6 flex items-center">
                  <Upload className="w-5 h-5 mr-2 text-emerald-500" />
                  Upload Food Image
                </h2>
                
                {!imagePreview ? (
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-slate-300 rounded-xl p-12 text-center cursor-pointer hover:border-emerald-400 hover:bg-emerald-50 transition-all"
                  >
                    <Camera className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                    <p className="text-slate-600 mb-2">Click to upload a food image</p>
                    <p className="text-sm text-slate-500">PNG, JPG, GIF up to 10MB</p>
                  </motion.div>
                ) : (
                  <div className="relative">
                    <img
                      src={imagePreview}
                      alt="Food preview"
                      className="w-full h-64 object-cover rounded-xl border border-slate-200"
                    />
                    <button
                      onClick={clearImage}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />

                {imageFile && (
                  <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    onClick={analyzeImage}
                    disabled={isAnalyzing}
                    className="w-full mt-6 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white py-3 px-6 rounded-xl font-medium hover:from-emerald-600 hover:to-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center space-x-2"
                  >
                    {isAnalyzing ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Analyzing...</span>
                      </>
                    ) : (
                      <>
                        <Brain className="w-5 h-5" />
                        <span>Analyze Nutrition</span>
                      </>
                    )}
                  </motion.button>
                )}
              </div>

              {/* Results Section */}
              <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
                <h2 className="text-xl font-semibold text-slate-800 mb-6 flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-cyan-500" />
                  Analysis Results
                </h2>
                
                {analysisResult ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="prose prose-slate max-w-none"
                  >
                    <div className="space-y-6">
                      {formatAnalysisResult(analysisResult)}
                    </div>
                  </motion.div>
                ) : (
                  <div className="text-center py-12">
                    <Brain className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                    <p className="text-slate-500">Upload and analyze a food image to see detailed nutrition information</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {activeTab === 'chat' && (
            <motion.div
              key="chat"
              variants={tabVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden"
            >
              {/* Chat Header */}
              <div className="bg-gradient-to-r from-emerald-500 to-cyan-500 p-6">
                <h2 className="text-xl font-semibold text-white flex items-center">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Nutrition Assistant
                </h2>
                <p className="text-emerald-100 text-sm mt-1">Ask me anything about nutrition, diet, and healthy eating</p>
              </div>

              {/* Chat Messages */}
              <div className="h-96 overflow-y-auto p-6 space-y-4">
                <AnimatePresence>
                  {chatMessages.map((msg, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                          msg.type === 'user'
                            ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-white'
                            : 'bg-slate-100 text-slate-800'
                        }`}
                      >
                        <p className="text-sm whitespace-pre-wrap">{msg.message}</p>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
                
                {isChatting && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start"
                  >
                    <div className="bg-slate-100 text-slate-800 px-4 py-3 rounded-2xl">
                      <div className="flex items-center space-x-2">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span className="text-sm">Thinking...</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Chat Input */}
              <form onSubmit={(e) => { e.preventDefault(); sendChatMessage(); }} className="border-t border-slate-200 p-6">
                <div className="flex space-x-4">
                  <input
                    type="text"
                    value={currentMessage}
                    onChange={(e) => setCurrentMessage(e.target.value)}
                    placeholder="Ask about nutrition, recipes, diet tips..."
                    className="flex-1 px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    onKeyPress={(e) => e.key === 'Enter' && sendChatMessage()}
                    disabled={isChatting}
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={sendChatMessage}
                    disabled={isChatting || !currentMessage.trim()}
                    onSubmit={(e) => {
                      e.preventDefault();
                      sendChatMessage();
                    }}
                    className="bg-gradient-to-r from-emerald-500 to-cyan-500 text-white px-6 py-3 rounded-xl hover:from-emerald-600 hover:to-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    <Send className="w-5 h-5" />
                  </motion.button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-16 py-8 text-center text-slate-500 text-sm"
      >
        <p>Developed by <Link href="https://github.com/chiragRane-Projects" className='text-xl font-bold'>Chirag Rane</Link> • Made with ❤️ for healthy living</p>
      </motion.footer>
    </div>
  );
};

export default DashboardPage;