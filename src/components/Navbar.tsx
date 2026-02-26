import { useState, useEffect } from 'react';
import { motion, type Variants } from 'framer-motion';

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
    margin: '0 20px',
    fontSize: '13px',
    fontWeight: 500,
    fontFamily: 'var(--font-sans)',
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
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        style={{ color: 'var(--accent-color)', fontWeight: 'bold', fontSize: '20px' }}
      >
        <a href="#home" style={{ color: 'var(--accent-color)' }}>SC</a>
      </motion.div>

      <ul style={{ display: 'flex', alignItems: 'center' }}>
        {['About', 'Experience', 'Projects', 'Contact'].map((item, i) => (
          <motion.li
            key={item}
            custom={i}
            initial="hidden"
            animate="visible"
            variants={navItemVariants}
          >
            <a href={`#${item.toLowerCase()}`} style={linkStyles}>
              <span style={{ color: 'var(--accent-color)', marginRight: '5px' }}>{`0${i + 1}.`}</span>
              {item}
            </a>
          </motion.li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
