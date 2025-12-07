import { motion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Social links and quick links removed — footer simplified per request

  return (
    <footer className="relative bg-transparent backdrop-blur-sm border-t border-secondary/20">
      {/* Background Elements removed for a minimal footer */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Bottom Section (reduced vertical padding) */}
        <div className="py-2 border-t border-secondary/20">
          <div className="relative flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Bottom bar – attribution */}
            <div className="text-center text-sm sm:text-base text-text-secondary md:absolute md:left-1/2 md:-translate-x-1/2">
              <p className="m-0 font-inter">© {currentYear} Minhaj Portfolio. All rights reserved.</p>
            </div>


            {/* Back to Top */}
            <motion.button
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.9 }}
              onClick={scrollToTop}
              className="flex items-center space-x-2 px-4 py-2 bg-secondary/20 hover:bg-secondary/30 rounded-lg transition-all duration-300 group md:order-first"
            >
              <span className="text-text-secondary group-hover:text-text-primary font-inter">Back to Top</span>
              <ArrowUp className="h-4 w-4 text-accent group-hover:translate-y-[-2px] transition-transform duration-300" />
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;