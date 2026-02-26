import { useState, useEffect } from 'react';
import { motion, type Variants } from 'framer-motion';
import { Mail, Github, Linkedin } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navStyles = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'fixed' as const,
    top: 0,
    width: '100%',
    padding: '0 50px',
    height: isScrolled ? '70px' : '100px',
    backgroundColor: isScrolled ? 'rgba(10, 25, 47, 0.85)' : 'transparent',
    backdropFilter: isScrolled ? 'blur(10px)' : 'none',
    transition: 'var(--transition)',
    zIndex: 11,
    boxShadow: isScrolled ? '0 10px 30px -10px rgba(2,12,27,0.7)' : 'none',
  };

  const linkStyles = {
    color: 'var(--text-primary)',
    margin: '0 15px',
    fontSize: '14px',
    fontWeight: 500,
    fontFamily: 'var(--font-sans)',
    textDecoration: 'none',
    transition: 'color 0.3s ease',
  };

  const iconStyles = {
    color: 'var(--text-primary)',
    marginLeft: '20px',
    transition: 'color 0.3s ease',
    display: 'flex',
    alignItems: 'center',
  };

  const navItemVariants: Variants = {
    hidden: { y: -20, opacity: 0 },
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.3,
        ease: 'easeOut',
      },
    }),
  };

  return (
    <nav style={navStyles}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          style={{ marginRight: '30px' }}
        >
          <a href="#home" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
            <span style={{ color: 'var(--text-primary)', fontSize: '18px', fontWeight: 'bold' }}>Sandeep Chinta</span>
          </a>
        </motion.div>

        <ul style={{ display: 'flex', alignItems: 'center', listStyle: 'none', margin: 0, padding: 0 }}>
          {['Home', 'About', 'Experience', 'Projects'].map((item, i) => (
            <motion.li
              key={item}
              custom={i}
              initial="hidden"
              animate="visible"
              variants={navItemVariants}
            >
              <a href={`#${item.toLowerCase()}`} style={linkStyles} className="nav-link">
                {item}
              </a>
            </motion.li>
          ))}
        </ul>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        style={{ display: 'flex', alignItems: 'center' }}
      >
        <a href="mailto:rvsandeepc@gmail.com" style={iconStyles} className="nav-icon" aria-label="Email">
          <Mail size={20} />
        </a>
        <a href="https://github.com/Sandeep45-cyber" target="_blank" rel="noopener noreferrer" style={iconStyles} className="nav-icon" aria-label="GitHub">
          <Github size={20} />
        </a>
        <a href="https://www.linkedin.com/in/chinta-sandeep-80927130b/" target="_blank" rel="noopener noreferrer" style={iconStyles} className="nav-icon" aria-label="LinkedIn">
          <Linkedin size={20} />
        </a>
      </motion.div>
    </nav>
  );
};

export default Navbar;
