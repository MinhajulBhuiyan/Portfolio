import { motion } from 'framer-motion';
import { Heart, Github, Linkedin, Mail, ArrowUp } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = [
    {
      icon: Github,
      href: 'https://github.com/MinhajulBhuiyan',
      label: 'GitHub',
      external: true,
    },
    {
      icon: Linkedin,
      href: 'https://www.linkedin.com/in/minhajul-bhuiyan-11b388218/',
      label: 'LinkedIn',
      external: true,
    },
    {
      icon: Mail,
      href: 'https://mail.google.com/mail/?view=cm&to=minhajul@iut-dhaka.edu',
      label: 'Email',
      external: true,
    },
  ];

  const quickLinks = [
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative bg-gradient-to-br from-primary/90 to-primary/70 backdrop-blur-sm border-t border-secondary/20">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-secondary/5 to-accent/5"></div>
      <div className="absolute top-0 left-0 w-72 h-72 bg-secondary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div className="space-y-4">
              <motion.div whileHover={{ scale: 1.05 }} className="cursor-pointer" onClick={scrollToTop}>
                <span className="text-3xl font-poppins font-bold bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
                  Minhajul Abedin Bhuiyan
                </span>
              </motion.div>
              <p className="text-text-secondary font-inter leading-relaxed">
                Crafting beautiful, interactive digital experiences with modern technologies and creative solutions.
              </p>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <motion.a
                      key={index}
                      href={social.href}
                      target={social.external ? '_blank' : '_self'}
                      rel={social.external ? 'noopener noreferrer' : undefined}
                      whileHover={{ scale: 1.2, y: -2 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 rounded-lg bg-gradient-to-r from-secondary/20 to-accent/20 hover:from-secondary/30 hover:to-accent/30 transition-all duration-300"
                      aria-label={social.label}
                    >
                      <Icon className="h-5 w-5" />
                    </motion.a>
                  );
                })}
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h3 className="text-lg font-poppins font-semibold">Quick Links</h3>
              <ul className="space-y-2">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <motion.button
                      whileHover={{ x: 5 }}
                      onClick={() => scrollToSection(link.href)}
                      className="text-text-secondary hover:text-accent transition-colors duration-300 font-inter"
                    >
                      {link.name}
                    </motion.button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div className="space-y-4">
              <h3 className="text-lg font-poppins font-semibold">Services</h3>
              <ul className="space-y-2 text-text-secondary font-inter">
                <li>Web Development</li>
                <li>UI/UX Design</li>
                <li>AI Integration</li>
                <li>Desktop Application</li>
                <li>Consulting</li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <h3 className="text-lg font-poppins font-semibold">Get In Touch</h3>
              <div className="space-y-2 text-text-secondary font-inter">
                <p>Banasree, Dhaka, 1219</p>
                <p>minhajul@iut-dhaka.edu</p>
                <p>+880 174 724 7276</p>
              </div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-accent-purple to-accent-pink rounded-lg text-sm font-manrope font-semibold cursor-pointer"
                onClick={() => scrollToSection('#contact')}
              >
                <span>Start a Project</span>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="py-6 border-t border-secondary/20">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Bottom bar – attribution */}
            <div className="flex flex-wrap items-center gap-2 text-sm sm:text-base font-inter text-text-secondary">
              <span>© {currentYear}</span>

              {/* brand name */}
              <span className="font-semibold text-text-primary whitespace-nowrap">
                Minhaj&nbsp;Portfolio
              </span>

              {/* dot separator appears on ≥ sm screens */}
              <span className="hidden sm:inline">·</span>

              {/* crafted with … */}
              <span className="italic">Crafted&nbsp;with&nbsp;</span>

              {/* animated heart */}
              <motion.span
                animate={{ scale: [1, 1.25, 1] }}
                transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
                className="inline-flex"
              >
                <Heart className="h-4 w-4 text-gradient-to-r from-rose-500 via-fuchsia-500 to-violet-500 animate-pulse" />
              </motion.span>

              <span className="italic">&nbsp;and&nbsp;relentless&nbsp;curiosity.</span>
            </div>


            {/* Back to Top */}
            <motion.button
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.9 }}
              onClick={scrollToTop}
              className="flex items-center space-x-2 px-4 py-2 bg-secondary/20 hover:bg-secondary/30 rounded-lg transition-all duration-300 group"
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
