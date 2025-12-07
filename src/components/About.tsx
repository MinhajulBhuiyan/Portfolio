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
                {/* Decorative horizontal line (desktop width matches card row) */}
                <div
                  className="absolute left-1/2 transform -translate-x-1/2 top-[4.5rem] hidden md:block h-1 bg-gradient-to-r from-emerald-500/60 via-blue-500/60 to-zinc-500/55 opacity-60 rounded-full w-[86vw] md:w-[1266px] lg:w-[1266px]"
                ></div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 mt-4 items-stretch">
                  {EDUCATION.map((edu, index) => {
                    return (
                      <motion.div
                        key={`${edu.title}-${edu.year}`}
                        className="flex flex-col items-center text-center md:items-stretch"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 + index * 0.12 }}
                      >
                        {/* Icon / Image Circle */}
                        <div className={`relative z-10 w-20 sm:w-24 md:w-32 h-20 sm:h-24 md:h-32 rounded-full bg-transparent p-2 flex items-center justify-center mb-6 shadow-md mx-auto ${index === 0 ? 'md:-translate-x-8 lg:-translate-x-10' : index === 2 ? 'md:translate-x-8 lg:translate-x-10' : ''}`}>
                          <img src={edu.image} alt={`${edu.title} logo`} className="w-full h-full object-contain rounded-full" />
                          {/* subtle left/right offsets for first/last logos */}
                        </div>

                        {/* Content Card */}
                        <div className={`w-full max-w-[20rem] sm:max-w-[22rem] md:max-w-[24rem] min-h-[10.5rem] sm:min-h-[11.5rem] md:min-h-[13rem] lg:min-h-[13rem] mx-auto h-full flex flex-col justify-between ${edu.cardBg} ${edu.cardBorder} rounded-xl p-4 sm:p-5 md:p-7 backdrop-blur-sm transition-all duration-300 ease-in-out ${index === 0 ? 'md:-translate-x-4 lg:-translate-x-6 xl:-translate-x-10' : index === 2 ? 'md:translate-x-4 lg:translate-x-6 xl:translate-x-10' : ''}`}>
                          <div className="inline-flex items-center mb-3 px-2 py-0.5 rounded-full bg-white/90 text-gray-900 text-sm font-medium uppercase tracking-wide border border-white/10 mx-auto">
                            <span className="w-2 h-2 rounded-full bg-gray-400 mr-2 flex-shrink-0" aria-hidden="true"></span>
                            <span className="leading-none">{edu.year}</span>
                          </div>
                          <h4 className="text-xl sm:text-xl md:text-xl font-bold text-white mb-1">{edu.title}</h4>
                          <div className="text-sm md:text-sm text-gray-400 mb-2">{edu.address}</div>
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

              <div className="relative max-w-full md:max-w-7xl mx-auto px-4 md:px-0">
                {/* vertical timeline line (md+) */}
                <div className="hidden md:block absolute left-1/2 top-6 bottom-6 w-0.5 bg-gradient-to-b from-white/10 via-white/5 to-white/10"></div>

                <div className="mt-6 space-y-8">
                  {WORK_EXPERIENCE.map((job, index) => {
                    const gradientClass = job.cardBg && job.cardBg.includes('bg-gradient-to-br')
                      ? job.cardBg.replace('bg-gradient-to-br', 'bg-gradient-to-b')
                      : (job.cardBg || 'bg-white/10');

                    const isLeft = index % 2 === 0;

                    const Card = (
                      <div className={`${gradientClass} ${job.cardBorder} rounded-xl p-2 sm:p-3 md:p-4 backdrop-blur-sm transition-all duration-300 ease-in-out w-full max-w-[22rem] sm:max-w-[28rem] md:max-w-[36rem] lg:max-w-[44rem] mx-auto min-h-[10.5rem] sm:min-h-[11.5rem] md:min-h-[13rem] lg:min-h-[13rem] h-full flex flex-col justify-between`}>
                        <div className="space-y-1 md:space-y-2">
                          <div className="flex items-start justify-between">
                            <div className="min-w-0 flex items-start">
                              <div>
                                <h4 className="text-xl md:text-lg font-bold text-white leading-tight md:truncate">{job.company}</h4>
                                <div className="text-base md:text-sm text-gray-100 mt-0 md:mt-1 font-semibold md:truncate">{job.title}</div>
                              </div>
                            </div>

                          </div>

                          <div className="text-sm md:text-xs text-gray-300 uppercase tracking-wide">{job.department}</div>

                          <div className="text-sm md:text-xs text-gray-400 mb-2">{job.location}</div>
                        </div>
                      </div>
                    );

                    return (
                      <motion.div
                        key={`${job.title}-${job.year}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.15 + index * 0.12 }}
                        className="relative"
                      >
                        <div className="md:grid md:grid-cols-3 md:items-center md:gap-4">
                          {/* left column (card on md if isLeft) */}
                          <div className={`md:flex md:justify-end md:pr-0 md:-mr-12 ${isLeft ? 'md:block' : 'md:invisible'}`}>
                            <div className="w-full md:max-w-[72rem]">
                              {/* small screens: show single date badge above the card, then image + card stacked */}
                              <div className="md:hidden">
                                <div className="flex flex-col items-center">
                                  <div className="mb-2">
                                    <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/90 text-gray-900 text-sm font-semibold uppercase tracking-wide border border-white/10">
                                      <span className="sr-only">Date</span>
                                      <span className="leading-none">{job.year}</span>
                                    </div>
                                  </div>
                                  <div className="flex items-center space-x-4">
                                    <img src={job.image} alt={`${job.company} logo`} className="w-16 h-16 rounded-full object-contain flex-shrink-0" />
                                    {Card}
                                  </div>
                                </div>
                              </div>

                              {/* md+: render image separate and to the left of the card */}
                              <div className="hidden md:flex md:items-center md:justify-end">
                                <div className="flex items-center space-x-6">
                                  <img src={job.image} alt={`${job.company} logo`} className="w-20 h-20 lg:w-24 lg:h-24 rounded-full object-contain flex-shrink-0" />
                                  <div>{isLeft ? Card : null}</div>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* center column: icon + connector */}
                          <div className="hidden md:flex items-center justify-center md:col-span-1">
                            <div className="relative flex flex-col items-center">
                              {/* Year badge centered on the timeline (dot removed) */}
                              <div className="mt-1">
                                <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/90 text-gray-900 text-base font-semibold uppercase tracking-wide border border-white/10">
                                  <span className="sr-only">Date</span>
                                  <span className="leading-none">{job.year}</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* right column (card on md if !isLeft) */}
                          <div className={`md:flex md:justify-start md:pl-0 md:-ml-12 ${!isLeft ? 'md:block' : 'md:invisible'}`}>
                            <div className="w-full md:max-w-[72rem]">
                              {/* small screens: show image + card stacked/inline (left column handles md:hidden) */}
                              <div className="md:hidden">{/* small screens handled above in the first column */}</div>

                              {/* md+: render image separate and to the right of the card */}
                              <div className="hidden md:flex md:items-center md:justify-start">
                                <div className="flex items-center space-x-6">
                                  <div>{!isLeft ? Card : null}</div>
                                  <img src={job.image} alt={`${job.company} logo`} className="w-20 h-20 lg:w-24 lg:h-24 rounded-full object-contain flex-shrink-0" />
                                </div>
                              </div>
                            </div>
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