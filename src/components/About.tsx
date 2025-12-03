import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { GraduationCap, School, BookOpen } from 'lucide-react';

// Institution images are in the public folder

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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
    <section id="about" className="py-12 sm:py-16 lg:py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="space-y-8 sm:space-y-12 lg:space-y-16"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center">
            <h2 className="text-4xl md:text-5xl font-poppins font-bold mb-4">
              About <span className="bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">Me</span>
            </h2>
            <p className="text-lg text-text-secondary max-w-3xl mx-auto font-inter">
              I am motivated by curiosity and a desire to make a difference. I enjoy solving problems and learning new things every day.
              I am committed to personal growth, teamwork, and creating meaningful results through dedication and hard work. Building
              something valuable and making a positive impact inspires me to keep moving forward.

            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-stretch">
            {/* My Journey */}
            <motion.div variants={itemVariants} className="flex">
              <motion.div
                className="space-y-8 p-6 rounded-xl bg-gradient-to-br from-secondary/15 to-accent/15 border border-secondary/30 hover:border-accent/50 transition-all duration-300 w-full flex flex-col"
                whileHover={{ y: -2, scale: 1.01 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <motion.h3
                  className="text-2xl font-poppins font-bold text-center mb-6 relative bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  ✨ My Journey
                  <motion.div
                    className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-1 bg-gradient-to-r from-secondary to-accent rounded-full mt-2"
                    initial={{ width: 0 }}
                    animate={{ width: 80 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                  ></motion.div>
                </motion.h3>

                <motion.div className="space-y-6 flex-1">
                  <motion.p
                    className="text-gray-100 font-inter leading-8 text-justify tracking-normal text-lg"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                  >
                    My journey began with a curiosity about how things work and a
                    desire to create something useful. I started by experimenting
                    with C and Java, building small projects and simple websites
                    using HTML and JavaScript. As I continued, I discovered the
                    excitement of coding and found a passion for software development.
                  </motion.p>

                  <motion.p
                    className="text-gray-100 font-inter leading-8 text-justify tracking-normal text-lg"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 1.0 }}
                  >
                    Over time, I learned to work with modern tools like React, Node.js,
                    and MongoDB, and enjoyed building web applications that solve real
                    problems. Exploring areas like artificial intelligence with Python
                    and machine learning has also motivated me to keep growing my skills.
                  </motion.p>

                  <motion.p
                    className="text-gray-100 font-inter leading-8 text-justify tracking-normal font-semibold text-lg"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 1.2 }}
                  >
                    Through every project, teamwork, and new challenge, I remain inspired
                    to learn more, improve, and make a positive impact through technology.
                  </motion.p>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Education */}
            <motion.div variants={itemVariants} className="flex">
              <motion.div
                className="space-y-6 p-6 rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-600/10 border border-blue-400/30 hover:border-purple-500/50 transition-all duration-300 shadow-lg hover:shadow-xl w-full flex flex-col"
                whileHover={{ y: -2, scale: 1.01 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <motion.h4
                  className="text-2xl font-poppins font-bold text-center relative bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  🎓 Education
                  <motion.div
                    className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mt-2"
                    initial={{ width: 0 }}
                    animate={{ width: 80 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                  ></motion.div>
                </motion.h4>
                <div className="space-y-4">
                  {[
                    {
                      year: '2021 – Present',
                      title: 'Islamic University of Technology',
                      address: 'Gazipur, Dhaka',
                      detail: 'B.Sc in Software Engineering',
                      icon: GraduationCap,
                      image: '/images/iut-image.png',
                      gradient: 'from-emerald-500 to-teal-600',
                      bgGradient: 'from-emerald-500/10 to-teal-600/10',
                      hoverGradient: 'hover:from-emerald-500/20 hover:to-teal-600/20',
                      borderColor: 'border-emerald-400/30 hover:border-teal-500/50',
                    },
                    {
                      year: '2018 – 2020',
                      title: 'Notre Dame College',
                      address: 'Motijheel, Dhaka',
                      detail: 'Higher Secondary Certificate (Science)',
                      icon: School,
                      image: '/images/ndc-image.png',
                      gradient: 'from-blue-500 to-indigo-600',
                      bgGradient: 'from-blue-500/10 to-indigo-600/10',
                      hoverGradient: 'hover:from-blue-500/20 hover:to-indigo-600/20',
                      borderColor: 'border-blue-400/30 hover:border-indigo-500/50',
                    },
                    {
                      year: '2010 – 2018',
                      title: 'Ideal School and College',
                      address: 'Motijheel, Dhaka',
                      detail: 'Secondary School Certificate (Science)',
                      icon: BookOpen,
                      image: '/images/isc-image.png',
                      gradient: 'from-violet-500 to-purple-600',
                      bgGradient: 'from-violet-500/10 to-purple-600/10',
                      hoverGradient: 'hover:from-violet-500/20 hover:to-purple-600/20',
                      borderColor: 'border-violet-400/30 hover:border-purple-500/50',
                    },
                  ].map((edu, index) => {
                    const Icon = edu.icon;
                    return (
                      <motion.div
                        key={index}
                        whileHover={{
                          x: 8,
                          scale: 1.02,
                          boxShadow: "0 10px 30px rgba(0,0,0,0.1)"
                        }}
                        className={`p-5 rounded-xl bg-gradient-to-r ${edu.bgGradient} ${edu.hoverGradient} transition-all duration-300 border ${edu.borderColor} shadow-md hover:shadow-xl backdrop-blur-sm cursor-pointer group`}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 1.0 + index * 0.2 }}
                      >
                        <div className="flex items-start space-x-4">
                          {/* Institution Image */}
                          <motion.div
                            className="relative flex-shrink-0"
                            whileHover={{
                              scale: 1.1,
                              rotate: 3,
                              y: -2
                            }}
                            transition={{ duration: 0.3 }}
                          >
                            <div className={`p-1 rounded-xl bg-gradient-to-r ${edu.gradient} shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                              <div className="w-16 h-16 rounded-lg overflow-hidden bg-white p-1">
                                <img
                                  src={edu.image}
                                  alt={`${edu.title} logo`}
                                  className="w-full h-full object-contain rounded-lg group-hover:brightness-110 transition-all duration-300"
                                />
                              </div>
                            </div>
                            {/* Icon overlay */}
                            <motion.div
                              className={`absolute -bottom-1 -right-1 p-1.5 rounded-lg bg-gradient-to-r ${edu.gradient} shadow-md`}
                              whileHover={{
                                scale: 1.2,
                                rotate: 12
                              }}
                              transition={{ duration: 0.2 }}
                            >
                              <Icon className="h-4 w-4 text-white" />
                            </motion.div>

                            {/* Minimal hover effect - glowing ring */}
                            <motion.div
                              className={`absolute inset-0 rounded-xl bg-gradient-to-r ${edu.gradient} opacity-0 group-hover:opacity-30 transition-opacity duration-300 blur-sm`}
                              initial={{ scale: 0.8 }}
                              whileHover={{ scale: 1.2 }}
                            />
                          </motion.div>

                          <div className="flex-1 space-y-3 min-w-0">
                            <div className="flex items-start justify-between space-x-4">
                              {/* Institution Name and Address */}
                              <div className="flex-1 space-y-1">
                                <h5 className="font-inter font-bold text-gray-100 text-xl leading-tight group-hover:text-white transition-colors duration-300">{edu.title}</h5>
                                <div className="flex items-center justify-between">
                                  <p className="text-gray-300 text-xs font-medium group-hover:text-gray-200 transition-colors duration-300">{edu.address}</p>
                                  {/* Year Badge - Parallel to address */}
                                  <motion.span
                                    className={`font-poppins font-bold text-xs px-3 py-1.5 rounded-full bg-gradient-to-r ${edu.gradient} text-white shadow-sm flex-shrink-0 group-hover:shadow-lg transition-all duration-300`}
                                    whileHover={{
                                      scale: 1.08,
                                      y: -1
                                    }}
                                  >
                                    {edu.year}
                                  </motion.span>
                                </div>
                              </div>
                            </div>

                            {/* Degree Details */}
                            <div className="flex items-center space-x-2">
                              <motion.div
                                className={`w-2 h-2 bg-gradient-to-r ${edu.gradient} rounded-full flex-shrink-0 group-hover:scale-125 transition-transform duration-300`}
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                              ></motion.div>
                              <span className="text-gray-200 font-semibold text-base group-hover:text-white transition-colors duration-300">{edu.detail}</span>
                            </div>

                            {/* Minimal hover indicator */}
                            <motion.div
                              className={`h-0.5 bg-gradient-to-r ${edu.gradient} rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                              initial={{ width: 0 }}
                              whileHover={{ width: "100%" }}
                              transition={{ duration: 0.4 }}
                            />
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Additional decorative elements */}
                <motion.div
                  className="flex justify-center pt-4"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 2.0 }}
                >
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gradient-to-r from-violet-500 to-purple-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>

          {/* Stats */}
          <motion.div
            variants={itemVariants}
            className="pt-8 sm:pt-12 lg:pt-16"
          >
            <div className="relative max-w-5xl mx-auto">
              {/* Minimalist divider */}
              <div className="flex items-center justify-center mb-8 sm:mb-12">
                <motion.div 
                  className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent w-full max-w-xs"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 1.2, delay: 0.5 }}
                ></motion.div>
                <motion.div 
                  className="mx-6 relative"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.8, delay: 0.8, type: "spring" }}
                >
                  <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full shadow-lg shadow-blue-500/25"></div>
                  <div className="absolute inset-0 w-3 h-3 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full animate-ping opacity-20"></div>
                </motion.div>
                <motion.div 
                  className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent w-full max-w-xs"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 1.2, delay: 0.5 }}
                ></motion.div>
              </div>

              {/* Elegant Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                {[
                  { 
                    number: '20+', 
                    label: 'Projects',
                    subtitle: 'Completed',
                    gradient: 'from-rose-400 via-pink-500 to-purple-600',
                    shadowColor: 'shadow-pink-500/20',
                    bgColor: 'bg-gradient-to-br from-rose-500/5 to-purple-600/5'
                  },
                  { 
                    number: '3+', 
                    label: 'Years',
                    subtitle: 'Experience',
                    gradient: 'from-blue-400 via-cyan-500 to-teal-600',
                    shadowColor: 'shadow-blue-500/20',
                    bgColor: 'bg-gradient-to-br from-blue-500/5 to-teal-600/5'
                  },
                  { 
                    number: '11+', 
                    label: 'Technologies',
                    subtitle: 'Mastered',
                    gradient: 'from-violet-400 via-purple-500 to-indigo-600',
                    shadowColor: 'shadow-violet-500/20',
                    bgColor: 'bg-gradient-to-br from-violet-500/5 to-indigo-600/5'
                  },
                ].map((stat, index) => (
                  <motion.div 
                    key={index} 
                    className="relative group"
                    whileHover={{ 
                      y: -12,
                      scale: 1.03,
                      rotateY: 5
                    }}
                    initial={{ opacity: 0, y: 30, rotateX: -15 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{ 
                      duration: 0.8, 
                      delay: 0.6 + index * 0.15,
                      type: "spring",
                      stiffness: 80,
                      damping: 12
                    }}
                    style={{ perspective: "1000px" }}
                  >
                    {/* Floating glow effect */}
                    <div className={`absolute -inset-1 bg-gradient-to-r ${stat.gradient} opacity-0 group-hover:opacity-20 rounded-3xl blur-xl transition-all duration-700 group-hover:blur-2xl`}></div>
                    
                    {/* Main card */}
                    <div className={`relative h-36 sm:h-40 lg:h-44 ${stat.bgGradient} backdrop-blur-xl rounded-3xl border border-white/10 group-hover:border-white/20 transition-all duration-500 ${stat.shadowColor} shadow-xl group-hover:shadow-2xl overflow-hidden`}>
                      {/* Gradient overlay */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                      
                      {/* Content */}
                      <div className="relative h-full flex flex-col items-center justify-center p-6 text-center">
                        {/* Number */}
                        <motion.div 
                          className={`text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent mb-2 sm:mb-3 font-poppins tracking-tight`}
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.3 }}
                        >
                          {stat.number}
                        </motion.div>
                        
                        {/* Label */}
                        <div className="space-y-0.5 sm:space-y-1">
                          <div className="text-white/90 font-semibold text-sm sm:text-base font-inter group-hover:text-white transition-colors duration-300">
                            {stat.label}
                          </div>
                          <div className="text-white/60 text-sm font-medium font-inter group-hover:text-white/80 transition-colors duration-300">
                            {stat.subtitle}
                          </div>
                        </div>
                        
                        {/* Bottom accent line */}
                        <motion.div 
                          className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 h-1 bg-gradient-to-r ${stat.gradient} rounded-full`}
                          initial={{ width: 0 }}
                          whileHover={{ width: "60%" }}
                          transition={{ duration: 0.4, ease: "easeInOut" }}
                        />
                        
                        {/* Floating particles effect */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                          {[...Array(3)].map((_, i) => (
                            <motion.div
                              key={i}
                              className={`absolute w-1 h-1 bg-gradient-to-r ${stat.gradient} rounded-full`}
                              style={{
                                left: `${20 + i * 30}%`,
                                top: `${20 + i * 20}%`,
                              }}
                              animate={{
                                y: [-10, -20, -10],
                                opacity: [0.4, 0.8, 0.4],
                                scale: [0.8, 1.2, 0.8],
                              }}
                              transition={{
                                duration: 2 + i * 0.5,
                                repeat: Infinity,
                                delay: i * 0.3,
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              {/* Decorative elements */}
              <motion.div 
                className="flex justify-center mt-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.5 }}
              >
                <div className="flex space-x-3">
                  {[
                    'from-rose-400 to-pink-600',
                    'from-blue-400 to-cyan-600', 
                    'from-violet-400 to-purple-600',
                    'from-amber-400 to-orange-600'
                  ].map((gradient, i) => (
                    <motion.div
                      key={i}
                      className={`w-1.5 h-1.5 bg-gradient-to-r ${gradient} rounded-full`}
                      animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.6, 1, 0.6],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.2,
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;