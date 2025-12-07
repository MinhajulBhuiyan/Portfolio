import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
// lucide icons removed for this section (icons intentionally omitted)

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

  // Per-card education data with color classes (kept minimal and local)
  const EDUCATION = [
    {
      year: '2021 – Present',
      title: 'Islamic University of Technology',
      address: 'Gazipur, Dhaka',
      detail: 'B.Sc in Software Engineering',
      image: '/images/iut-image.png',
      cardBg: 'bg-gradient-to-br from-emerald-400/20 to-green-600/20',
      cardBorder: 'border border-emerald-400/20',
      
    },
    {
      year: '2018 – 2020',
      title: 'Notre Dame College',
      address: 'Motijheel, Dhaka',
      detail: 'Higher Secondary Certificate (Science)',
      image: '/images/ndc-image.png',
      cardBg: 'bg-gradient-to-br from-blue-400/20 to-indigo-600/20',
      cardBorder: 'border border-blue-400/20',
      
    },
    {
      year: '2010 – 2018',
      title: 'Ideal School and College',
      address: 'Motijheel, Dhaka',
      detail: 'Secondary School Certificate (Science)',
      image: '/images/isc-image.png',
      cardBg: 'bg-gradient-to-br from-zinc-400/20 to-zinc-600/20',
      cardBorder: 'border border-zinc-400/20',
      
    },
  ];

  // Real work experience data
  const WORK_EXPERIENCE = [
    {
      year: 'Mar 2026 – Present',
      title: 'Associate Software Engineer',
      company: 'Data Limited',
      department: 'Research & Development',
      location: 'Navana Tower, 8th Floor, 45 Gulshan Avenue, Gulshan-1, Dhaka 1212.',
      image: '/images/data-limited.png',
      cardBg: 'bg-gradient-to-br from-indigo-400/20 to-blue-600/20',
      cardBorder: 'border border-indigo-400/20',
      
    },
    {
      year: 'Oct 2025 – Feb 2026',
      title: 'Intern',
      company: 'Data Limited',
      department: 'Research & Development',
      location: 'Navana Tower, 8th Floor, 45 Gulshan Avenue, Gulshan-1, Dhaka 1212.',
      image: '/images/data-limited.png',
      cardBg: 'bg-gradient-to-br from-emerald-400/20 to-green-600/20',
      cardBorder: 'border border-emerald-400/20',
      
    },
  ];

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
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-poppins font-bold mb-4">
              About <span className="bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">Me</span>
            </h2>
            <p className="text-base sm:text-lg text-text-secondary max-w-3xl mx-auto font-inter">
              I am motivated by curiosity and a desire to make a difference. I enjoy solving problems and learning new things every day.
              I am committed to personal growth, teamwork, and creating meaningful results through dedication and hard work. Building
              something valuable and making a positive impact inspires me to keep moving forward.

            </p>
          </motion.div>

          {/* Education Roadmap - horizontal */}
          <motion.div variants={itemVariants}>
            <motion.div
              className="max-w-7xl mx-auto px-4 py-6 rounded-2xl bg-transparent backdrop-blur-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <motion.h3
                className="text-2xl sm:text-3xl md:text-5xl font-poppins font-bold text-center mb-8 md:mb-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <span className="inline-flex items-center justify-center">
                  <span className="bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">Education</span>
                </span>
              </motion.h3>

              {/* Education roadmap with minimal, clean cards */}

              {/* Timeline grid (demo-like structure): icon/image above, year, title, address, detail */}
              <div className="relative">
                {/* Decorative horizontal line (adjusted to intersect image centers) */}
                <div className="absolute left-1/2 transform -translate-x-1/2 top-[4.5rem] w-full max-w-[75rem] h-1 bg-gradient-to-r from-emerald-500/60 via-blue-500/60 to-zinc-500/55 opacity-60 hidden md:block rounded-full"></div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 mt-4">
                  {EDUCATION.map((edu, index) => {
                    return (
                      <motion.div
                        key={`${edu.title}-${edu.year}`}
                        className="flex flex-col items-center text-center"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 + index * 0.12 }}
                      >
                        {/* Icon / Image Circle */}
                        <div className={`relative z-10 w-20 sm:w-24 md:w-32 h-20 sm:h-24 md:h-32 rounded-full bg-transparent p-2 flex items-center justify-center mb-6 shadow-md`}>
                          <img src={edu.image} alt={`${edu.title} logo`} className="w-full h-full object-contain rounded-full" />
                          {/* badge removed per request */}
                        </div>

                        {/* Content Card */}
                          <div className={`w-full max-w-[24rem] mx-auto ${edu.cardBg} ${edu.cardBorder} rounded-xl p-4 sm:p-5 md:p-7 backdrop-blur-sm transition-all duration-300 ease-in-out`}>
                          <div className="inline-flex items-center mb-3 px-2 py-0.5 rounded-full bg-white/90 text-gray-900 text-sm font-medium uppercase tracking-wide border border-white/10">
                            <span className="w-2 h-2 rounded-full bg-gray-400 mr-2 flex-shrink-0" aria-hidden="true"></span>
                            <span className="leading-none">{edu.year}</span>
                          </div>
                          <h4 className="text-xl font-bold text-white mb-1">{edu.title}</h4>
                          <div className="text-sm text-gray-400 mb-2">{edu.address}</div>
                          <div className="text-base text-gray-300 font-medium">{edu.detail}</div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={itemVariants}
            className="pt-4 sm:pt-6 lg:pt-2"
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

              
              {/* Decorative elements removed per request */}
            </div>
          </motion.div>

          {/* Work Experience (below the divider) */}
          <motion.div variants={itemVariants}>
            <motion.div
              className="max-w-7xl mx-auto px-4 py-6 rounded-2xl bg-transparent backdrop-blur-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
                <motion.h3
                className="text-2xl sm:text-3xl md:text-5xl font-poppins font-bold text-center mb-6 md:mb-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <span className="inline-flex items-center justify-center">
                  <span className="bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">Work Experience</span>
                </span>
              </motion.h3>

              <div className="relative max-w-full md:max-w-3xl mx-auto px-4 md:px-0">
                <div className="space-y-4 mt-3">
                  {WORK_EXPERIENCE.map((job, index) => {
                    const gradientClass = job.cardBg && job.cardBg.includes('bg-gradient-to-br')
                      ? job.cardBg.replace('bg-gradient-to-br', 'bg-gradient-to-b')
                      : (job.cardBg || 'bg-white/10');

                    return (
                      <motion.div
                        key={`${job.title}-${job.year}`}
                        className="relative flex flex-col md:flex-row md:items-stretch gap-4"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                      >
                        {/* Logo separate from the rounded card; responsive sizes */}
                        <div className="flex-shrink-0 self-start md:self-start md:self-center">
                          <div className="w-12 sm:w-16 md:w-24 h-12 sm:h-16 md:h-24 md:aspect-square bg-transparent p-0 flex items-center justify-center">
                            <img src={job.image} alt={`${job.company} logo`} className="w-full h-full object-contain" />
                          </div>
                        </div>

                        {/* Content Card */}
                        <div className={`${job.cardBg} ${job.cardBorder} rounded-xl p-3 sm:p-4 md:p-5 backdrop-blur-sm transition-all duration-300 ease-in-out flex-1`}>
                          {/* Content stack with consistent vertical gaps */}
                          <div className="space-y-1 md:space-y-2">
                            <div className="flex items-start justify-between">
                              <div className="min-w-0">
                                <h4 className="text-2xl md:text-3xl font-bold text-white leading-tight md:truncate">{job.company}</h4>
                                <div className="text-lg md:text-xl text-gray-100 mt-0 md:mt-1 font-semibold md:truncate">{job.title}</div>
                              </div>
                              <div className="ml-4 flex-shrink-0">
                                <div className="inline-flex items-center px-2 py-0.5 rounded-full bg-white/90 text-gray-900 text-sm font-medium uppercase tracking-wide border border-white/10">
                                  <span className="w-2 h-2 rounded-full bg-gray-400 mr-2 flex-shrink-0" aria-hidden="true"></span>
                                  <span className="leading-none">{job.year}</span>
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center justify-between">
                              <div className="text-sm md:text-base text-gray-300 uppercase tracking-wide">{job.department}</div>
                            </div>

                            <div className="text-sm md:text-base text-gray-300 font-medium leading-relaxed break-words">{job.location}</div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </motion.div>
          {/* Duplicate minimalist divider below Work Experience (matches design above) */}
          <div className="relative max-w-5xl mx-auto">
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
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;