import { useState, useEffect, SetStateAction } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, Github, Play, X } from 'lucide-react';

// FIX 1: Define a type for a single project.
// This ensures that all project objects have a consistent structure.
interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  detailedDescription: string;
  image: string;
  tech: string[];
  github: string;
  live: string;
  gradient: string;
}

// FIX 2: Define a type for the props of the ProjectModal component.
// This resolves the "implicitly has an 'any' type" errors for isOpen, onClose, and project.
interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project | null; // The project can be a Project object or null.
}

// --- Custom Modal Component ---
const ProjectModal = ({ isOpen, onClose, project }: ProjectModalProps) => {
  useEffect(() => {
    // FIX 3: Add a type for the 'event' parameter.
    // KeyboardEvent is the correct type for keyboard-related DOM events.
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  // If the modal isn't open or there's no project data, render nothing.
  if (!isOpen || !project) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-xl flex items-center justify-center p-4 pt-20 z-[50]"
        onClick={onClose}
      >
        {/* Animated background particles */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-3/4 left-3/4 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 100 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 100 }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative max-w-6xl w-full mx-auto bg-gradient-to-br from-gray-900/90 via-gray-800/90 to-gray-900/90 border border-purple-500/20 rounded-3xl shadow-2xl backdrop-blur-2xl outline-none overflow-hidden z-[60] mt-4"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Decorative border gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-cyan-500/20 rounded-3xl blur-sm"></div>
          <div className="absolute inset-[1px] bg-gradient-to-br from-gray-900/95 via-gray-800/95 to-gray-900/95 rounded-3xl"></div>

          <div className="relative max-h-[80vh] overflow-y-auto scrollbar-thin scrollbar-thumb-purple-500/30 scrollbar-track-transparent">
            {/* Hero Image Section */}
            <div className="relative h-80 overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
              />
              {/* Multi-layer gradients for depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-900/30 via-transparent to-blue-900/30"></div>

              {/* Floating close button */}
              <motion.button
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.3 }}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="absolute top-6 right-6 p-4 rounded-full bg-black/90 backdrop-blur-md text-white hover:bg-red-500/40 hover:text-red-400 transition-all duration-300 border-2 border-white/30 hover:border-red-400/60 shadow-2xl z-[70]"
                style={{ zIndex: 70, position: 'absolute' }}
              >
                <X className="h-6 w-6" />
              </motion.button>

              {/* Project title overlay */}
              <div className="absolute bottom-6 left-8 right-8">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="flex items-end justify-between"
                >
                  <div>
                    <h3 className="text-5xl font-bold text-white mb-2 drop-shadow-2xl" style={{ fontFamily: "'Poppins', sans-serif" }}>
                      {project.title}
                    </h3>
                    <motion.span
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4, duration: 0.4 }}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500/80 to-blue-500/80 backdrop-blur-md text-white rounded-full text-sm font-semibold border border-white/20 shadow-lg"
                    >
                      <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                      {project.category.toUpperCase()}
                    </motion.span>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-10 space-y-10">
              {/* Action Buttons - Moved before Description */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="flex flex-wrap gap-4 pt-2"
              >
                <motion.a
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  target="_blank"
                  rel="noopener noreferrer"
                  href={project.live}
                  className="group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl blur-sm group-hover:blur-none transition-all duration-300"></div>
                  <div className="relative inline-flex items-center space-x-3 px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl font-semibold text-white shadow-lg hover:shadow-purple-500/30 transition-all duration-300 border border-purple-400/30 text-sm">
                    <ExternalLink className="h-4 w-4" />
                    <span style={{ fontFamily: "'Inter', sans-serif" }}>Live Demo</span>
                  </div>
                </motion.a>

                <motion.a
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  target="_blank"
                  rel="noopener noreferrer"
                  href={project.github}
                  className="group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-700 to-gray-600 rounded-xl blur-sm group-hover:blur-none transition-all duration-300"></div>
                  <div className="relative inline-flex items-center space-x-3 px-6 py-3 bg-gradient-to-r from-gray-800/80 to-gray-700/80 backdrop-blur-sm rounded-xl font-semibold text-white border-2 border-gray-600/50 hover:border-purple-500/50 transition-all duration-300 hover:bg-gray-700/60 text-sm">
                    <Github className="h-4 w-4" />
                    <span style={{ fontFamily: "'Inter', sans-serif" }}>Source Code</span>
                  </div>
                </motion.a>
              </motion.div>

              {/* Description */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.6 }}
                className="space-y-6"
              >
                <div className="relative">
                  <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-purple-500 to-blue-500 rounded-full"></div>
                  <p className="text-gray-100 leading-relaxed text-lg pl-8" style={{ fontFamily: "'Inter', sans-serif" }}>
                    {project.detailedDescription}
                  </p>
                </div>
              </motion.div>

              {/* Technologies Section */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
                    <span className="w-2 h-2 bg-white rounded-full"></span>
                  </div>
                  <h4 className="text-2xl font-bold text-white" style={{ fontFamily: "'Poppins', sans-serif" }}>
                    Technologies & Tools
                  </h4>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {project.tech.map((tech: string, index: number) => (
                    <motion.div
                      key={tech}
                      initial={{ opacity: 0, scale: 0.8, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ delay: 0.5 + index * 0.1, duration: 0.4 }}
                      whileHover={{ scale: 1.05, y: -5 }}
                      className="group relative"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-xl blur-sm group-hover:blur-none transition-all duration-300"></div>
                      <div className="relative px-6 py-4 bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-xl border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300">
                        <span className="text-white font-medium text-center block" style={{ fontFamily: "'Inter', sans-serif" }}>
                          {tech}
                        </span>
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-full"></div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};


const Projects = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // FIX 5: Provide an explicit type for the useState hook.
  // This tells TypeScript that selectedProject can be a Project object or null.
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [filter, setFilter] = useState('all');

  // Provide the 'Project[]' type to the projects array for type safety.
  const projects: Project[] = [
    {
      id: 1,
      title: '3D Portfolio Website',
      category: 'web',
      description: 'Interactive 3D portfolio with WebGL animations, particle effects, and smooth scroll interactions.',
      detailedDescription: 'A cutting-edge portfolio website featuring Three.js 3D animations, particle systems, and interactive elements. Built with React Three Fiber, featuring smooth scroll animations, dynamic lighting, and responsive 3D scenes.',
      image: '/images/3D_protfolio.png',
      tech: ['React', 'Three.js', 'GSAP', 'WebGL', 'Framer Motion'],
      github: 'https://github.com/MinhajulBhuiyan/Portfolio',
      live: '',
      gradient: 'from-pink-500 to-rose-600',
    },
    {
      id: 2,
      title: 'Prescripto',
      category: 'web',
      description: 'A full-stack Hospital Management System featuring admin, doctor, and patient panels, secure authentication, and integrated machine learning for disease prediction.',
      detailedDescription: 'A full-stack Hospital Management System featuring admin, doctor, and patient panels, secure authentication, and integrated machine learning for disease prediction. This project streamlines hospital resource and patient management with a modern, user-friendly interface.',
      image: '/images/hms_preview.png',
      tech: ['React', 'Node.js', 'Express.js', 'MongoDB', 'Python', 'TensorFlow', 'JWT Authentication', 'CSS'],
      github: 'https://github.com/MinhajulBhuiyan/HMS',
      live: '',
      gradient: 'from-green-500 to-teal-600',
    },
    {
      id: 3,
      title: 'Machine Learning Project Collection',
      category: 'ai',
      description: 'A collection of practical machine learning projects built with Python, Scikit-learn, TensorFlow, and Keras.',
      detailedDescription: 'A collection of practical machine learning projects built with Python, Scikit-learn, TensorFlow, and Keras. This repository features hands-on examples of data preprocessing, model development, and evaluation, covering both classical and deep learning techniques for real-world problems.',
      image: '/images/hand-gesture-rec-ML.png',
      tech: ['Python', 'Scikit-learn', 'TensorFlow', 'Keras'],
      github: 'https://github.com/MinhajulBhuiyan/Machine-Learning-Project',
      live: '',
      gradient: 'from-green-500 to-teal-600',
    },
    {
      id: 4,
      title: 'HomeSeek',
      category: 'web',
      description: 'A property listing platform that allows users to search and filter real estate listings, view properties on interactive maps, and access detailed property pages.',
      detailedDescription: 'HomeSeek is a property listing platform that allows users to search and filter real estate listings, view properties on interactive maps, and access detailed property pages. It includes secure user authentication, profile management, and real-time chat via Socket.IO, providing a streamlined and engaging experience for property seekers and owners alike.',
      image: '/images/real-estate.png',
      tech: ['React', 'Node.js', 'MongoDB', 'Prisma', 'JWT', 'Socket.IO', 'React Router'],
      github: 'https://github.com/MinhajulBhuiyan/HomeSeek',
      live: '',
      gradient: 'from-cyan-500 to-blue-600',
    },
    {
      id: 5,
      title: 'Parkspace',
      category: 'web',
      description: 'This project is a full-stack parking application built using a modern monorepo architecture. It allows users to search for parking spots, manage bookings, and handle user authentication, all through an integrated web interface.',
      detailedDescription: 'This project is a full-stack parking application built using a modern monorepo architecture. It allows users to search for parking spots, manage bookings, and handle user authentication, all through an integrated web interface. The application provides a seamless experience by connecting a robust backend API with a responsive frontend, featuring role management and comprehensive parking management functionality.',
      image: '/images/parkspace.png',
      tech: ['Next.js', 'NestJS', 'TypeScript', 'PostgreSQL', 'MongoDB', 'Authentication'],
      github: 'https://github.com/MinhajulBhuiyan/Parkspace',
      live: '',
      gradient: 'from-orange-500 to-red-600',
    },
    {
      id: 6,
      title: 'Medibot',
      category: 'desktop',
      description: 'Medibot is a Hospital Management System developed in C# using the .NET Framework with a Windows Forms user interface. The application streamlines hospital operations by providing modules for patient management, disease identification, and medicine inventory.',
      detailedDescription: 'Medibot is a Hospital Management System developed in C# using the .NET Framework with a Windows Forms user interface. The application streamlines hospital operations by providing modules for patient management, disease identification, and medicine inventory. It enables efficient tracking of patient records, supports basic disease identification, and helps manage medicine stocks through an intuitive desktop interface.',
      image: '/images/medobot.gif',
      tech: ['C#', '.NET Framework', 'Windows Forms', 'Visual Studio'],
      github: 'https://github.com/MinhajulBhuiyan/Medibot',
      live: '',
      gradient: 'from-purple-500 to-indigo-600',
    },
    {
      id: 7,
      title: 'AnimeInsights',
      category: 'web',
      description: 'AnimeInsights is an online platform where users can discover anime, manage reviews, and engage with the anime community. The system supports secure authentication, community features, and CRUD operations.',
      detailedDescription: 'AnimeInsights is an online platform where users can discover anime, manage reviews, and engage with the anime community. The system supports secure authentication, community features, and CRUD operations, and integrates data from the AniList API. Built with ASP.NET MVC framework for robust web application development.',
      image: '/images/anime-insights.png',
      tech: ['ASP.NET MVC', 'C#', 'CSHTML', 'Oracle SQL Developer', 'AniList API'],
      github: 'https://github.com/MinhajulBhuiyan/AnimeInsights',
      live: '',
      gradient: 'from-pink-500 to-rose-600',
    },
    {
      id: 8,
      title: 'PixelForge',
      category: 'games',
      description: 'Immersive voxel-based exploration game inspired by Minecraft.',
      detailedDescription: 'PixelForge is an immersive and dynamic game project crafted by team-20. Drawing inspiration from the acclaimed Minecraft, our game focuses on delivering a captivating gaming experience centered around voxel-based exploration, creative building, and survival challenges.',
      image: '/images/PixelForge_Game.png',
      tech: ['Unity', 'C#', 'Voxel Engine', 'Game Development'],
      github: 'https://github.com/MinhajulBhuiyan/PixelForge.git',
      live: '',
      gradient: 'from-emerald-500 to-teal-600',
    },

    {
      id: 9,
      title: 'MathHub',
      category: 'desktop',
      description: 'MathHub is a console-based learning platform for math enthusiasts. It offers a variety of mathematical operations and tools, including arithmetic, trigonometry, statistics, graph plotting, matrix manipulation, and physics formulas.',
      detailedDescription: 'MathHub is a console-based learning platform for math enthusiasts. It offers a variety of mathematical operations and tools, including arithmetic, trigonometry, statistics, graph plotting, matrix manipulation, and physics formulas, all accessible through a simple command-line interface. Built with modular architecture using C++ and STL for optimal performance.',
      image: '/images/mathhub.jpg',
      tech: ['C++', 'Console Application', 'STL', 'Modular Architecture', 'Visual Studio Code'],
      github: 'https://github.com/MinhajulBhuiyan/MathHub',
      live: '',
      gradient: 'from-blue-500 to-indigo-600',
    }

  ];

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'web', label: 'Web Apps' },
    { id: 'mobile', label: 'Mobile Apps' },
    { id: 'ai', label: 'AI Projects' },
    { id: 'desktop', label: 'Desktop Software' },
    { id: 'games', label: 'Games' },
  ];

  const filteredProjects = filter === 'all'
    ? projects
    : projects.filter(project => project.category === filter);

  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: "easeOut" } },
    exit: { opacity: 0, y: -30, scale: 0.95, transition: { duration: 0.3, ease: "easeIn" } }
  };

  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-transparent to-blue-900/10"></div>
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          variants={sectionVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="space-y-20"
        >
          {/* Header Section */}
          <motion.div variants={itemVariants} className="text-center space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-full border border-purple-500/20"
            >
              <span className="w-2 h-2 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full animate-pulse"></span>
              <span className="text-purple-300 font-medium" style={{ fontFamily: "'Inter', sans-serif" }}>Portfolio Showcase</span>
            </motion.div>

            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight" style={{ fontFamily: "'Poppins', sans-serif" }}>
              My{' '}
              <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Projects
              </span>
            </h2>

            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
              Discover my journey through innovative solutions, creative designs, and cutting-edge technologies.
              Each project represents a unique challenge conquered with passion and precision.
            </p>
          </motion.div>

          {/* Filter Buttons */}
          <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setFilter(category.id)}
                className={`px-8 py-4 rounded-full font-semibold transition-all duration-300 backdrop-blur-sm ${filter === category.id
                    ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg shadow-purple-500/25 border border-purple-400/50'
                    : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 hover:text-white border border-gray-700/50 hover:border-gray-600/50'
                  }`}
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {category.label}
              </motion.button>
            ))}
          </motion.div>

          {/* Projects Grid */}
          <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            <AnimatePresence mode="wait">
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  layout
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="group relative cursor-pointer w-full h-[520px]"
                  onClick={() => setSelectedProject(project)}
                >
                  <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-900/80 to-gray-800/60 backdrop-blur-lg border border-gray-700/30 hover:border-purple-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/20 h-full flex flex-col">
                    {/* Project Image */}
                    <div className="relative overflow-hidden h-56 flex-shrink-0">
                      <motion.img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                      {/* Enhanced Hover Overlay */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-purple-500/30 to-blue-500/30"
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                      />

                      {/* Category Badge */}
                      <motion.div
                        className="absolute top-4 left-4"
                        whileHover={{ scale: 1.1, y: -2 }}
                        transition={{ duration: 0.2 }}
                      >
                        <span className="px-3 py-1 bg-black/70 backdrop-blur-sm text-purple-300 rounded-full text-xs font-medium border border-purple-500/30">
                          {project.category.toUpperCase()}
                        </span>
                      </motion.div>

                      {/* Floating View Details Button */}
                      <motion.div
                        className="absolute inset-0 flex items-center justify-center"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileHover={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                      >
                        <motion.div
                          className="px-6 py-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-white font-semibold"
                          whileHover={{ scale: 1.1, backgroundColor: "rgba(139, 92, 246, 0.3)" }}
                          whileTap={{ scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                        >
                          <span className="flex items-center gap-2">
                            <ExternalLink className="w-4 h-4" />
                            View Details
                          </span>
                        </motion.div>
                      </motion.div>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                      <div className="space-y-4">
                        <motion.h3
                          className="text-xl font-bold transition-colors duration-300 h-14 flex items-center"
                          style={{ fontFamily: "'Poppins', sans-serif" }}
                          whileHover={{ color: "#a855f7" }}
                          transition={{ duration: 0.2 }}
                        >
                          <span className="line-clamp-2">{project.title}</span>
                        </motion.h3>

                        <div className="h-16">
                          <p className="text-gray-400 text-sm leading-relaxed line-clamp-3" style={{ fontFamily: "'Inter', sans-serif" }}>
                            {project.description}
                          </p>
                        </div>

                        {/* Tech Stack */}
                        <div className="flex flex-wrap gap-2 pt-2 min-h-[2.5rem]">
                          {project.tech.slice(0, 3).map((tech, index) => (
                            <motion.span
                              key={tech}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1, duration: 0.3 }}
                              whileHover={{ scale: 1.05, y: -2 }}
                              className="px-3 py-1 text-xs bg-gray-700/50 text-purple-300 rounded-full border border-gray-600/50 hover:border-purple-500/50 transition-all duration-300"
                              style={{ fontFamily: "'Inter', sans-serif" }}
                            >
                              {tech}
                            </motion.span>
                          ))}
                          {project.tech.length > 3 && (
                            <motion.span
                              className="px-3 py-1 text-xs bg-gray-700/50 text-gray-400 rounded-full border border-gray-600/50"
                              whileHover={{ scale: 1.05, y: -2 }}
                              transition={{ duration: 0.2 }}
                            >
                              +{project.tech.length - 3}
                            </motion.span>
                          )}
                        </div>
                      </div>

                      {/* Enhanced View More Indicator */}
                      <motion.div
                        className="flex items-center justify-between pt-4 mt-auto"
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                      >
                        <motion.span
                          className="text-purple-400 text-sm font-medium transition-colors duration-300"
                          whileHover={{ color: "#c084fc" }}
                        >
                          View Details
                        </motion.span>

                        <motion.div
                          className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 flex items-center justify-center"
                          whileHover={{
                            scale: 1.2,
                            rotate: 15,
                            background: "linear-gradient(to right, rgba(139, 92, 246, 0.4), rgba(59, 130, 246, 0.4))"
                          }}
                          transition={{ duration: 0.3, ease: "easeOut" }}
                        >
                          <motion.div
                            whileHover={{ x: 2 }}
                            transition={{ duration: 0.2 }}
                          >
                            <ExternalLink className="w-4 h-4 text-purple-400" />
                          </motion.div>
                        </motion.div>
                      </motion.div>
                    </div>

                    {/* Gradient Border Effect */}
                    <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${project.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500`}></div>

                    {/* Glow Effect */}
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>

      <ProjectModal
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        project={selectedProject}
      />
    </section>
  );
};

export default Projects;