import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code, Palette, Brain, Database } from 'lucide-react';

const Services = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const services = [
    {
      icon: Code,
      title: 'Web Development',
      description: 'I develop websites and web apps using simple tools.',
      features: ['Responsive layouts', 'Clear navigation', 'Forms and interactivity', 'Organized structure'],
      gradient: 'from-cyan-400 via-blue-500 to-purple-600',
      bgGradient: 'from-cyan-500/5 via-blue-500/5 to-purple-600/5',
      borderGradient: 'from-cyan-400/30 to-purple-600/30',
      shadowColor: 'shadow-blue-500/20',
      emoji: '💻'
    },
    {
      icon: Palette,
      title: 'UI/UX Design',
      description: 'I design user interfaces that are clear and easy to use.',
      features: ['Creating wireframes', 'Clean layouts', 'User-friendly buttons and menus', 'Improving user flow'],
      gradient: 'from-pink-400 via-rose-500 to-orange-600',
      bgGradient: 'from-pink-500/5 via-rose-500/5 to-orange-600/5',
      borderGradient: 'from-pink-400/30 to-orange-600/30',
      shadowColor: 'shadow-pink-500/20',
      emoji: '🎨'
    },
    {
      icon: Brain,
      title: 'AI Integration',
      description: 'I experiment with using AI in different projects.',
      features: ['Data analysis', 'Machine learning projects', 'Using open-source AI libraries', 'Exploring AI applications'],
      gradient: 'from-violet-400 via-purple-500 to-indigo-600',
      bgGradient: 'from-violet-500/5 via-purple-500/5 to-indigo-600/5',
      borderGradient: 'from-violet-400/30 to-indigo-600/30',
      shadowColor: 'shadow-purple-500/20',
      emoji: '🤖'
    },
    {
      icon: Database,
      title: 'Backend Solutions',
      description: 'I set up features for web apps that run behind the scenes.',
      features: ['Building APIs', 'Managing data storage', 'User authentication', 'Improving performance'],
      gradient: 'from-emerald-400 via-teal-500 to-cyan-600',
      bgGradient: 'from-emerald-500/5 via-teal-500/5 to-cyan-600/5',
      borderGradient: 'from-emerald-400/30 to-cyan-600/30',
      shadowColor: 'shadow-teal-500/20',
      emoji: '⚡'
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section id="services" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="space-y-16"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center space-y-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 className="text-5xl md:text-6xl font-poppins font-bold mb-6">
                What I <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">Create</span>
              </h2>
              <div className="flex items-center justify-center space-x-4 mb-8">
                <div className="h-px bg-gradient-to-r from-transparent via-blue-400/40 to-transparent w-32"></div>
                <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"></div>
                <div className="h-px bg-gradient-to-r from-transparent via-purple-400/40 to-transparent w-32"></div>
              </div>
            </motion.div>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto font-inter leading-relaxed">
              I work on different types of digital projects and enjoy learning new things through each experience
            </p>
          </motion.div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ 
                    y: -8,
                    scale: 1.02,
                  }}
                  className="group relative cursor-pointer"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: 0.3 + index * 0.1,
                    type: "spring",
                    stiffness: 100
                  }}
                >
                  {/* Floating glow effect */}
                  <div className={`absolute -inset-1 bg-gradient-to-r ${service.gradient} opacity-0 group-hover:opacity-20 rounded-3xl blur-2xl transition-all duration-500`}></div>
                  
                  {/* Main card */}
                  <div className={`relative h-full p-8 rounded-3xl bg-gradient-to-br ${service.bgGradient} backdrop-blur-xl border border-gradient-to-r ${service.borderGradient} hover:border-white/20 transition-all duration-500 ${service.shadowColor} shadow-xl group-hover:shadow-2xl overflow-hidden`}>
                    {/* Background pattern */}
                    <div className="absolute top-0 right-0 w-32 h-32 opacity-5">
                      <div className={`w-full h-full bg-gradient-to-br ${service.gradient} rounded-full blur-3xl`}></div>
                    </div>

                    {/* Header */}
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center space-x-4">
                        {/* Icon container */}
                        <motion.div 
                          className={`p-4 rounded-2xl bg-gradient-to-r ${service.gradient} shadow-lg ${service.shadowColor}`}
                          whileHover={{ 
                            scale: 1.1,
                            rotate: 5
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          <Icon className="h-7 w-7 text-white" />
                        </motion.div>
                        
                        {/* Title */}
                        <div>
                          <h3 className="text-2xl font-poppins font-bold text-white group-hover:text-gray-100 transition-colors duration-300">
                            {service.title}
                          </h3>
                        </div>
                      </div>
                      
                      {/* Emoji */}
                      <motion.div 
                        className="text-3xl opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300"
                        whileHover={{ rotate: 10 }}
                      >
                        {service.emoji}
                      </motion.div>
                    </div>

                    {/* Description */}
                    <p className="text-lg text-gray-300 font-inter leading-relaxed mb-6 group-hover:text-gray-200 transition-colors duration-300">
                      {service.description}
                    </p>

                    {/* Features */}
                    <div className="space-y-3">
                      {service.features.map((feature, featureIndex) => (
                        <motion.div 
                          key={featureIndex} 
                          className="flex items-center space-x-3"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5 + featureIndex * 0.1 }}
                        >
                          <div className={`w-2 h-2 bg-gradient-to-r ${service.gradient} rounded-full flex-shrink-0 group-hover:scale-125 transition-transform duration-300`}></div>
                          <span className="text-gray-400 text-base font-inter group-hover:text-gray-300 transition-colors duration-300">
                            {feature}
                          </span>
                        </motion.div>
                      ))}
                    </div>

                    {/* Bottom accent line */}
                    <motion.div 
                      className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${service.gradient} rounded-b-3xl`}
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.4 }}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* CTA Section */}
          <motion.div
            variants={itemVariants}
            className="relative max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            {/* Background glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-3xl blur-3xl"></div>
            
            <div className="relative p-10 rounded-3xl bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-xl border border-white/10 text-center overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-br from-blue-400/20 to-transparent rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-tl from-pink-400/20 to-transparent rounded-full blur-3xl"></div>
              
              <div className="relative space-y-6">
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.6, delay: 1 }}
                >
                  <h3 className="text-3xl font-poppins font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-6">
                    Ready to Build Something Amazing?
                  </h3>
                </motion.div>
                
                <p className="text-xl text-gray-300 font-inter leading-relaxed max-w-2xl mx-auto">
                  Let's transform your vision into reality with cutting-edge technology
                </p>
                
                <motion.button
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 20px 40px rgba(168, 85, 247, 0.4)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    const element = document.querySelector('#contact');
                    element?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="relative px-10 py-4 bg-gradient-to-r from-blue-500 via-purple-600 to-pink-600 rounded-2xl font-poppins font-semibold text-white shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group"
                >
                  <span className="relative z-10">Let's Collaborate</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;