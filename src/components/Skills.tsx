import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// All skill images are now in the public folder

// Define the structure for a single skill
interface Skill {
  name: string;
  level: string;
  description: string;
  image: string; // Image paths for skill icons
}

// Define the structure for skill categories
interface SkillCategory {
  title: string;
  skills: Skill[];
}

// Data for all skill cards, now organized by category
const skillCategories: SkillCategory[] = [
  {
    title: 'Frontend Development',
    skills: [
      { name: 'React', level: 'Competent', description: 'Comfortable with building UIs using hooks and component patterns.', image: '/images/skills/react.png' },
      { name: 'JavaScript', level: 'Competent', description: 'Modern JavaScript (ES6+), DOM, async/await, and modern APIs.', image: '/images/skills/javascript.png' },
      { name: 'Next.js', level: 'Foundation', description: 'Server-side rendering and full-stack React apps with Next.js.', image: '/images/skills/nextjs.png' },
      { name: 'TypeScript', level: 'Foundation', description: 'Applying static typing to improve code reliability.', image: '/images/skills/typescript.png' },
      { name: 'Tailwind CSS', level: 'Intermediate', description: 'Using utility classes for consistent and responsive styling.', image: '/images/skills/tailwind.png' },
      { name: 'Three.js', level: 'Beginner', description: 'Exploring basic 3D graphics and simple scenes.', image: '/images/skills/threejs.png' },
    ],
  },
  {
    title: 'Backend & Database',
    skills: [
      { name: 'Node.js', level: 'Competent', description: 'Developing backend services and simple APIs.', image: '/images/skills/nodejs.png' },
      { name: 'Express.js', level: 'Competent', description: 'Building APIs with routing and middleware.', image: '/images/skills/express.png' },
      { name: 'MySQL', level: 'Intermediate', description: 'Managing relational data and optimizing SQL queries.', image: '/images/skills/mysql.png' },
      { name: 'PostgreSQL', level: 'Intermediate', description: 'Managing relational data with SQL.', image: '/images/skills/postgresql.png' },
      { name: 'MongoDB', level: 'Intermediate', description: 'Handling NoSQL data and basic CRUD operations.', image: '/images/skills/mongodb.png' },
      { name: 'FastAPI', level: 'Beginner', description: 'Developing asynchronous, fast, and type-driven APIs.', image: '/images/skills/fastAPI.png' },
      { name: 'Neo4j', level: 'Beginner', description: 'Working with graph databases and complex relation modeling.', image: '/images/skills/neo4j.png' },
    ]
  },
  {
    title: 'Software Development & Testing',
    skills: [
      { name: 'C#', level: 'Competent', description: 'Developing robust desktop and web applications with .NET technologies.', image: '/images/skills/csharp.png' },
      { name: 'Java', level: 'Intermediate', description: 'Writing and maintaining cross-platform software solutions.', image: '/images/skills/java.png' },
      { name: 'JUnit', level: 'Foundation', description: 'Writing and executing unit tests for Java applications.', image: '/images/skills/junit.png' },
      { name: 'xUnit', level: 'Foundation', description: 'Testing .NET applications to ensure code reliability.', image: '/images/skills/xunit.png' },
      { name: 'Selenium', level: 'Beginner', description: 'Automating browser tests and end-to-end testing.', image: '/images/skills/selenium.png' },
    ]
  },
  {
    title: 'AI & Machine Learning',
    skills: [
      { name: 'Python', level: 'Competent', description: 'Using Python for data tasks and scripting.', image: '/images/skills/python.png' },
      { name: 'LLMs', level: 'Foundation', description: 'Working with LLMs and prompt engineering (GPT, Ollama, Qwen, DeepSeek, Gemini, Claude).', image: '/images/skills/llm.png' },
      { name: 'TensorFlow', level: 'Intermediate', description: 'Experimenting with basic neural network models.', image: '/images/skills/tensorflow.png' },
      { name: 'PyTorch', level: 'Beginner', description: 'Practical experience building and training neural networks with PyTorch.', image: '/images/skills/PyTorch.png' },
      { name: 'Keras', level: 'Intermediate', description: 'Building simple deep learning models.', image: '/images/skills/keras.png' },
      { name: 'Scikit-learn', level: 'Intermediate', description: 'Working with standard machine learning techniques.', image: '/images/skills/scikit-learn.png' },
    { name: 'Pandas & NumPy', level: 'Competent', description: 'Handling and exploring data in Python.', image: '/images/skills/pandas-numpy.png' },
    { name: 'SQLAlchemy', level: 'Beginner', description: 'Basic ORM usage for database integration and data pipelines.', image: '/images/skills/SQLAlchemy.png' },
    
    ]
  },
  {
    title: 'Mobile Development',
    skills: [
      { name: 'React Native', level: 'Beginner', description: 'Building cross-platform mobile apps using React Native and Expo.', image: '/images/skills/react-native.png' },
      { name: 'SQLite', level: 'Beginner', description: 'Lightweight SQL database commonly used in mobile apps.', image: '/images/skills/sqlite.png' },
      { name: 'Firebase', level: 'Beginner', description: 'Realtime database, authentication, and hosting for mobile apps.', image: '/images/skills/firebase.png' },
    ]
  },
  {
    title: 'Softwares and Tools',
    skills: [
      { name: 'VS Code', level: 'Competent', description: 'Using as a code editor for multiple languages.', image: '/images/skills/vscode.png' },
      { name: 'IntelliJ IDEA', level: 'Competent', description: 'Editing and managing Java projects.', image: '/images/skills/intellij.png' },
      { name: 'Git & GitHub', level: 'Foundation', description: 'Managing version control and collaborating on projects.', image: '/images/skills/git-github.png' },
      { name: 'Postman', level: 'Competent', description: 'Testing APIs and managing collections.', image: '/images/skills/postman.png' },
      { name: 'Mermaid', level: 'Foundation', description: 'Visualizing diagrams and flowcharts using Mermaid syntax.', image: '/images/skills/mermaid.png' },
      { name: 'Metabase', level: 'Foundation', description: 'Self-serve analytics and dashboarding for teams.', image: '/images/skills/metabase.png' },
            { name: 'Figma', level: 'Competent', description: 'Exploring basic UI/UX design concepts.', image: '/images/skills/figma.png' },
    ]
  }
];

// Reusable SkillCard component with the 3D flip animation
const SkillCard: React.FC<{ skill: Skill; index: number }> = ({ skill, index }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  // Map skill levels to subtle, diff-like color classes
  const levelColorClass = (level: string) => {
    switch (level) {
      case 'Competent':
        return 'text-green-300 bg-green-500/20 border border-green-400/30';
      case 'Intermediate':
        return 'text-red-300 bg-red-500/20 border border-red-400/30';
      case 'Foundation':
        return 'text-yellow-300/80 bg-yellow-500/20 border border-yellow-400/30';
      case 'Beginner':
        return 'text-indigo-300 bg-indigo-500/20 border border-indigo-400/30';
      default:
        return 'text-white bg-white/5 border border-white/10';
    }
  };

  // Animation variants for the card's appearance
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: index * 0.1 }
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      className="[perspective:1000px] h-44 w-full max-w-[230px] mx-auto"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <div
        className={`relative w-full h-full transition-transform duration-700 ease-in-out [transform-style:preserve-3d] [will-change:transform] ${isFlipped ? '[transform:rotateY(180deg)]' : ''}`}
      >
        {/* Front of the card */}
        <div className="absolute inset-0 [backface-visibility:hidden] bg-gradient-to-br from-gray-900/40 via-gray-800/30 to-gray-900/40 backdrop-blur-lg border border-blue-400/30 rounded-2xl p-6 grid grid-rows-[4.5rem_1fr_3rem] items-center justify-items-center text-center hover:border-blue-500/60 hover:shadow-xl hover:shadow-blue-500/20 transition-all duration-300">
          <div className={`w-16 h-16 flex items-center justify-center p-3 rounded-full bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-cyan-500/20 border border-blue-400/40 transform-gpu transition-transform duration-700 ease-in-out [will-change:transform] ${isFlipped ? 'translate-y-2' : 'translate-y-0'}`}>
            <img src={skill.image} alt={skill.name} className="w-full h-full object-contain filter drop-shadow-lg" />
          </div>
          <h3 className={`text-lg font-poppins font-bold text-white tracking-wide h-12 flex items-center justify-center transform-gpu transition-transform duration-700 ease-in-out ${isFlipped ? 'scale-95' : 'scale-100'}`}>{skill.name}</h3>
          <div
            aria-label={`${skill.level} level`}
            className={`text-sm font-semibold px-3 py-1 rounded-full ${levelColorClass(skill.level)} transform-gpu transition-transform duration-700 ease-in-out ${isFlipped ? 'scale-90' : 'scale-100'}`}
          >
            {skill.level}
          </div>
        </div>

        {/* Back of the card */}
        <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] bg-gray-800/30 backdrop-blur-xl border border-blue-400/30 rounded-2xl p-6 flex flex-col items-center justify-center text-center shadow-xl">
          <div className={`w-12 h-12 mb-3 flex items-center justify-center p-2 rounded-full bg-white/10 border border-white/20 transform-gpu transition-transform duration-700 ease-in-out [will-change:transform] ${isFlipped ? 'translate-y-2' : 'translate-y-0'}`}>
            <img src={skill.image} alt={skill.name} className="w-full h-full object-contain filter brightness-110" />
          </div>
          <h4 className={`text-base font-poppins font-bold text-white mb-2 transform-gpu transition-transform duration-700 ease-in-out ${isFlipped ? 'scale-95' : 'scale-100'}`}>{skill.name}</h4>
          <p className={`text-gray-100 text-sm leading-relaxed font-inter font-medium text-center transform-gpu transition-transform duration-700 ease-in-out ${isFlipped ? 'scale-95' : 'scale-100'}`}>{skill.description}</p>
        </div>
      </div>
    </motion.div>
  );
};


// The main Skills component that combines everything
const Skills = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section id="skills" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="space-y-16"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="mb-12 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 className="text-4xl md:text-5xl font-poppins font-bold mb-3">
                My <span className="bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">Skills</span>
              </h2>
            </motion.div>
            <p className="text-text-secondary max-w-2xl mx-auto">
              A comprehensive showcase of my technical expertise across various domains of modern software development, emerging technologies, and innovative solutions.
            </p>
          </motion.div>

          {/* Skill Categories and Flipping Cards */}
          {skillCategories.map((category, categoryIndex) => (
            <motion.div key={categoryIndex} variants={itemVariants} className="space-y-8">
              {/* Category Header */}
              <div className="text-center">
                <h3 className="text-3xl md:text-4xl font-poppins font-bold mb-2 text-white/95 tracking-tight">
                  {category.title}
                </h3>
                <div className="w-20 h-1 bg-white/10 rounded-full mx-auto mb-2"></div>
                <p className="text-white/60 text-sm font-inter font-medium">
                  {category.skills.length} Technologies
                </p>
              </div>

              {/* Grid of Skill Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 max-w-7xl mx-auto justify-items-center">
                {category.skills.map((skill, skillIndex) => (
                  <SkillCard key={skill.name} skill={skill} index={skillIndex} />
                ))}
              </div>
            </motion.div>
          ))}

          {/* "Always Learning" Section */}
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
                    Always Learning, Always Growing
                  </h3>
                </motion.div>
                
                <p className="text-xl text-gray-300 font-inter leading-relaxed max-w-2xl mx-auto">
                  Technology evolves rapidly, and so do I. I'm constantly exploring new frameworks, languages, and methodologies to stay at the forefront of innovation and deliver cutting-edge solutions.
                </p>
                
                <div className="flex flex-wrap justify-center gap-3 pt-4">
                 {['Federated Learning', 'Flutter', 'DevOps', 'Microservices Architecture', 'React Native', 'Neo4j', 'GraphQL', 'Kubernetes', 'LLMs', 'AR/VR', 'Prompt Engineering'].map((tech, index) => (
                    <span 
                      key={index} 
                      className="px-4 py-2 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-full text-sm font-inter font-semibold text-white border border-blue-400/30 hover:border-blue-400/60 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;