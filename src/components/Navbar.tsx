import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Home, User, Briefcase, Code, Mail, GraduationCap } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 100;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

    const navItems = [
      { name: 'Home', href: '#home', icon: Home },
      { name: 'About', href: '#about', icon: User },
      { name: 'Services', href: '#services', icon: Briefcase },
      { name: 'Projects', href: '#projects', icon: Code },
      { name: 'Skills', href: '#skills', icon: GraduationCap },
      { name: 'Contact', href: '#contact', icon: Mail },
    ];

  const [active, setActive] = useState<string>('Home');
  const isScrollingRef = useRef(false);
  const disableTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Scroll to section and set active
  const scrollToSection = (href: string, name?: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
    if (name) {
      setActive(name);
      // Temporarily disable scroll spy so the highlight doesn't jump during smooth scroll
      isScrollingRef.current = true;
      if (disableTimeoutRef.current) clearTimeout(disableTimeoutRef.current);
      disableTimeoutRef.current = setTimeout(() => {
        isScrollingRef.current = false;
      }, 700);
    }
  };

  // prevent body from scrolling while mobile menu is open
  useEffect(() => {
    const prev = document.body.style.overflow;
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = prev || '';
    }

    return () => {
      document.body.style.overflow = prev || '';
    };
  }, [isOpen]);

  // IntersectionObserver-based scroll spy: choose the section closest to the top of the viewport
  useEffect(() => {
    const elements = navItems
      .map((item) => ({ name: item.name, el: document.querySelector(item.href) }))
      .filter((x) => x.el) as { name: string; el: Element }[];

    if (!elements.length) return;

    // Compute rootMargin to ignore the fixed navbar overlay so detection is consistent.
    const navEl = document.querySelector('nav');
    const navHeight = navEl ? (navEl as HTMLElement).offsetHeight : 64;

    const observer = new IntersectionObserver(
      (entries) => {
        // don't update active while we are programmatically scrolling
        if (isScrollingRef.current) return;

        // Prefer the element whose top is nearest to the top (account for nav height).
        const visible = entries.filter((e) => e.isIntersecting);

        let chosen: IntersectionObserverEntry | undefined;
        if (visible.length > 0) {
          chosen = visible.reduce((best, current) => {
            const bestDist = Math.abs(best.boundingClientRect.top - navHeight);
            const currentDist = Math.abs(current.boundingClientRect.top - navHeight);
            return currentDist < bestDist ? current : best;
          }, visible[0]);
        } else {
          // fallback: pick the highest intersection ratio
          chosen = entries.sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        }

        if (chosen && chosen.target && (chosen.target as Element).id) {
          const id = `#${(chosen.target as Element).id}`;
          const found = navItems.find((n) => n.href === id);
          if (found) setActive(found.name);
        }
      },
      { threshold: [0, 0.25, 0.5, 0.75], rootMargin: `-${navHeight}px 0px -40% 0px` }
    );

    elements.forEach((x) => observer.observe(x.el));
    return () => observer.disconnect();
  }, [navItems]);

  return (
  <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
  style={{ overflowX: 'hidden' }} // ✅ Prevent horizontal scroll from nav
  className={`overflow-hidden fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-primary/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="w-full overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-12 md:h-14">
            {/* Logo / Name - visible only on Home */}
              <motion.div
                // minimal hover for the logo: no transform to avoid layout shift
                className="flex-shrink-0 cursor-pointer md:absolute md:left-10 md:top-[50%] md:-translate-y-1/2 transition-opacity duration-150 hover:opacity-95"
              onClick={() => scrollToSection('#home')}
            >
              <span
                className={`text-lg sm:text-xl md:text-2xl font-poppins font-bold bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent transition-opacity duration-150 ${active === 'Home' ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
                aria-hidden={active === 'Home'}
              >
                <span className="hidden sm:inline">Minhajul Abedin Bhuiyan</span>
                <span className="sm:hidden">Minhajul</span>
              </span>
            </motion.div>

            {/* Desktop Menu - iOS-style segmented control on the right */}
            <div className="hidden md:flex md:items-center md:justify-end md:flex-1 md:pr-8 lg:pr-12">
              <div className="relative inline-flex items-center bg-white/6 rounded-full p-1 border border-white/8 backdrop-blur-sm md:absolute md:right-10 md:top-1/2 md:-translate-y-1/2">
                {navItems.map((item) => (
                  <motion.button
                    key={item.name}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => scrollToSection(item.href, item.name)}
                    aria-pressed={active === item.name}
                    className={`group relative z-10 px-3 py-2 text-sm md:text-base font-medium rounded-full transition-colors duration-200 ${active === item.name ? 'text-white' : 'text-white/90 hover:text-white'}`}
                  >
                    {/* Active highlight pill (animates between segments) */}
                    {active === item.name && (
                      <motion.span
                        layoutId="nav-segment"
                        layout
                        initial={false}
                        className="absolute inset-0 rounded-full bg-gradient-to-br from-white/30 to-white/12 backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.45)] pointer-events-none ring-2 ring-white/20 will-change-transform"
                        transition={{ type: 'spring', stiffness: 170, damping: 22 }}
                      />
                    )}

                    {/* Sheen and glossy border for the active item */}
                    <span aria-hidden className={`absolute inset-0 rounded-full pointer-events-none transition-opacity duration-200 ${active === item.name ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                      <span className="absolute inset-0 rounded-full border border-white/10 opacity-80" />
                      <span className="absolute top-0 left-0 h-1 w-full rounded-t-full bg-gradient-to-r from-white/50 via-white/20 to-transparent opacity-90 blur-sm" />
                      <span className="absolute inset-0 rounded-full bg-white/10 opacity-0 group-hover:opacity-50 transition-opacity duration-300" />
                    </span>

                    <span className="relative z-10 text-xs lg:text-sm xl:text-base">{item.name}</span>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className="text-text-secondary hover:text-text-primary focus:outline-none"
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{
          opacity: isOpen ? 1 : 0,
          height: isOpen ? 'auto' : 0,
        }}
        className="md:hidden fixed left-0 right-0 top-12 bottom-0 bg-primary/95 backdrop-blur-md overflow-auto z-50"
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                {navItems.map((item) => {
            const Icon = item.icon;
              return (
                  <motion.button
                    key={item.name}
                    whileHover={{ x: 6 }}
                    onClick={() => scrollToSection(item.href, item.name)}
                    className={`group relative text-white/90 hover:text-white hover:bg-white/4 flex items-center px-3 py-2 rounded-md text-base font-medium w-full text-left transition-colors duration-300 ${active === item.name ? 'text-white' : ''}`}
                  >
                    <span aria-hidden className={`absolute inset-0 rounded-md pointer-events-none transition-opacity duration-300 ${active === item.name ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}> 
                      <div className="absolute inset-0 rounded-md border border-white/12 opacity-60" />
                      <div className="absolute top-0 left-0 h-1 w-full rounded-t-md bg-gradient-to-r from-white/30 via-white/10 to-transparent opacity-60 blur-sm" />
                      <div className="absolute inset-0 rounded-md bg-white/8 opacity-0 group-hover:opacity-40 transition-opacity duration-300" />
                    </span>
                <Icon className="h-5 w-5 mr-3" />
                {item.name}
              </motion.button>
            );
          })}
        </div>
      </motion.div>
    </motion.nav>
  );
};

export default Navbar;
