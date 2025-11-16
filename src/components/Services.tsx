import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Monitor, Palette, Brain, Database, Smartphone, Server, Cloud, Settings, Briefcase } from 'lucide-react';

const Services = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Clean, professional service offerings
const services = [
  {
    icon: Monitor,
    title: 'Web Development',
    description: 'Enterprise-grade digital solutions',
    features: ['Full-Stack Architecture', 'Cloud Deployment', 'API Integration', 'Performance Optimization', 'Scalable Systems'],
  accentSolid: 'bg-teal-500',
  accentOverlay: 'bg-teal-500/10',
  },
  {
    icon: Smartphone,
    title: 'Mobile Development',
    description: 'Native cross-platform applications',
    features: ['iOS & Android Development', 'App Store Deployment', 'Performance Tuning', 'Offline Functionality', 'Push Notifications'],
  accentSolid: 'bg-emerald-500',
  accentOverlay: 'bg-emerald-500/10',
  },
  {
    icon: Palette,
    title: 'UI/UX Design',
    description: 'User-centered design systems',
    features: ['Interface Design', 'User Research', 'Interactive Prototyping', 'Design Systems', 'Accessibility Compliance'],
  accentSolid: 'bg-pink-500',
  accentOverlay: 'bg-pink-500/10',
  },
  {
    icon: Server,
    title: 'Backend Development',
    description: 'Robust server infrastructure',
    features: ['Microservices Architecture', 'Database Design', 'API Development', 'System Security', 'Performance Optimization'],
  accentSolid: 'bg-amber-500',
  accentOverlay: 'bg-amber-500/10',
  },
  {
    icon: Cloud,
    title: 'Cloud Architecture',
    description: 'Scalable cloud solutions',
    features: ['Infrastructure Design', 'Auto-scaling Solutions', 'Cloud Migration', 'Cost Optimization', 'Disaster Recovery'],
  accentSolid: 'bg-fuchsia-500',
  accentOverlay: 'bg-fuchsia-500/10',
  },
  {
    icon: Brain,
    title: 'AI Integration',
    description: 'Intelligent system automation',
    features: ['Machine Learning Models', 'Predictive Analytics', 'Natural Language Processing', 'AI Automation', 'Model Deployment'],
  accentSolid: 'bg-lime-500',
  accentOverlay: 'bg-lime-500/10',
  },
  {
    icon: Settings,
    title: 'DevOps Engineering',
    description: 'Streamlined development workflows',
    features: ['CI/CD Pipelines', 'Containerization', 'Monitoring Systems', 'Infrastructure as Code', 'Deployment Automation'],
  accentSolid: 'bg-orange-500',
  accentOverlay: 'bg-orange-500/10',
  },
  {
    icon: Database,
    title: 'Database Solutions',
    description: 'High-performance data management',
    features: ['Database Architecture', 'Query Optimization', 'Data Modeling', 'Backup Strategies', 'Performance Monitoring'],
  accentSolid: 'bg-yellow-400',
  accentOverlay: 'bg-yellow-400/10',
  },
  {
    icon: Briefcase,
    title: 'Technical Consulting',
    description: 'Strategic technology guidance',
    features: ['Solution Architecture', 'Technology Strategy', 'System Audits', 'Performance Reviews', 'Best Practices'],
  accentSolid: 'bg-rose-600',
  accentOverlay: 'bg-rose-600/10',
  },
];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.06 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.36 } },
  };

  return (
    <section id="services" className="py-20 relative">
  <div className="max-w-screen-2xl mx-auto px-6 sm:px-8 lg:px-12">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="space-y-16"
        >
          {/* Section Header - Minimal */}
          <motion.div variants={itemVariants} className="text-center space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl font-poppins font-bold mb-4">
                What I <span className="bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">Create</span>
              </h2>
            </motion.div>
            
            <p className="text-lg text-text-secondary max-w-3xl mx-auto font-inter">
              Professional development services focused on delivering quality solutions
            </p>
          </motion.div>

          {/* Services Grid - Minimal Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.title}
                  variants={itemVariants}
                  className="group relative"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  // clamp the animation delay so a long list of items doesn't
                  // create a very long stagger time. This keeps entrance smooth.
                  transition={{ duration: 0.5, delay: Math.min(index * 0.06, 0.6) }}
                >
                  {/* Card */}
                    <div className="relative h-full p-6 rounded-3xl bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.12] transition-all duration-200 hover:shadow-lg overflow-hidden flex flex-col">

                      {/* Glossy border overlay - subtle iOS-like sheen */}
                      <div aria-hidden className="absolute inset-0 pointer-events-none rounded-3xl z-20">
                        {/* Soft border (slightly brighter) */}
                        <div className="absolute inset-0 rounded-3xl border border-white/8 opacity-70"></div>

                        {/* Thin glossy highlight on top edge */}
                        <div className="absolute top-0 left-0 h-1.5 w-full rounded-t-3xl bg-gradient-to-r from-white/30 via-white/10 to-transparent opacity-70 blur-[2px]"></div>

                        {/* Sheen bubble removed for minimal look */}
                      </div>
                        {/* Accent color overlay that appears on hover */}
                        <div className={`absolute inset-0 rounded-3xl ${service.accentOverlay} opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none z-0`}></div>
                    
                    {/* Content wrapper to sit above accent overlay */}
                    <div className="relative z-10 space-y-6 flex-1">
                      {/* Icon and Title */}
                      <div className="flex items-center gap-4 mb-4">
                      <div className={`p-3 rounded-xl ${service.accentSolid} shadow-sm ring-0`}> 
                        <Icon className="h-6 w-6 text-white" strokeWidth={2.2} />
                      </div>
                        <h3 className={`text-xl font-poppins font-semibold text-white transition-colors duration-300 group-hover:text-white`}>
                          {service.title}
                        </h3>
                        {/* Accent underline - subtle color on hover */}
                        <div className={`mt-2 h-0.5 w-12 rounded-full ${service.accentSolid} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                      </div>

                      {/* Description */}
                    <p className="text-white/70 font-inter mb-5 leading-relaxed">
                      {service.description}
                    </p>

                    {/* Features - capsule pills (2 columns visually via wrap) */}
                    <div className="pt-4 border-t border-white/[0.06]">
                      <div className="flex flex-wrap gap-2 mt-3">
                          {service.features.map((feature, i) => (
                            <motion.span
                              key={i}
                              initial={{ opacity: 0, y: 6 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.12 + i * 0.03 }}
                              className={`inline-flex items-center px-3 py-1.5 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-sm text-white/80 font-inter shadow-sm transition-colors duration-200 hover:bg-white/8 hover:border-white/12`}
                            >
                              {feature}
                            </motion.span>
                          ))}
                    </div>
                    </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* CTA Section */}
          <motion.div
            variants={itemVariants}
            className="relative max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="relative p-10 rounded-2xl bg-gradient-to-br from-secondary/10 to-accent/10 border border-secondary/20 text-center backdrop-blur-sm overflow-hidden">
              {/* Glossy overlay for CTA */}
              <div aria-hidden className="absolute inset-0 pointer-events-none rounded-2xl">
                <div className="absolute inset-0 rounded-2xl border border-white/8 opacity-50"></div>
                <div className="absolute top-0 left-0 h-1.5 w-full rounded-t-2xl bg-gradient-to-r from-white/30 via-white/10 to-transparent opacity-60 blur-[1px]"></div>
              </div>
              <div className="space-y-6">
                <h3 className="text-3xl font-poppins font-semibold text-white">
                  Let's Work Together
                </h3>
                
                <p className="text-lg text-text-secondary font-inter max-w-lg mx-auto">
                  Ready to bring your ideas to life? Let's create something amazing together
                </p>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    const element = document.querySelector('#contact');
                    element?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-8 py-4 bg-gradient-to-r from-accent-purple to-accent-pink rounded-lg font-manrope font-semibold text-sm uppercase tracking-wider transition-all duration-300 hover:shadow-lg hover:shadow-accent/25"
                >
                  Get in Touch
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