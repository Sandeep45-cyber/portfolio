import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import CanvasSimulation from './CanvasSimulation';

const Hero = () => {
    const [text, setText] = useState('');
    const [isTypingComplete, setIsTypingComplete] = useState(false);
    const fullText = "hi, sandeep here.";

    useEffect(() => {
        let timeout: ReturnType<typeof setTimeout>;
        if (text.length < fullText.length) {
            timeout = setTimeout(() => {
                setText(fullText.slice(0, text.length + 1));
            }, 70); // Slightly faster for smooth typing
        } else {
            setIsTypingComplete(true);
        }
        return () => clearTimeout(timeout);
    }, [text, fullText]);

    const containerStyles = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        minHeight: '100vh',
        padding: '0',
        maxWidth: '1100px',
        margin: '0 auto',
        gap: '30px'
    };

    const textContainerStyles = {
        display: 'flex',
        flexDirection: 'column' as const,
        justifyContent: 'center',
        alignItems: 'flex-start',
        flex: 1,
    };

    const titleStyles = {
        fontSize: 'clamp(35px, 6vw, 70px)',
        color: 'var(--text-primary)',
        fontWeight: 600,
        margin: '0 0 20px 0',
        lineHeight: 1.1,
    };

    const descStyles = {
        color: 'var(--text-secondary)',
        fontSize: '16px', // Scaled down as requested
        maxWidth: '540px',
        marginBottom: '40px',
        lineHeight: 1.6,
    };

    const cursorStyles = {
        display: 'inline-block',
        width: '8px',
        height: '0.9em',
        backgroundColor: 'var(--accent-color)',
        marginLeft: '5px',
        animation: 'blink 1s step-end infinite',
    };

    return (
        <section id="home" style={containerStyles}>
            <style>
                {`
          @keyframes blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
          }
          @media (max-width: 900px) {
            .hero-canvas-container {
               display: none !important;
            }
          }
        `}
            </style>

            {/* Canvas Simulation (Left Side) */}
            <motion.div
                className="hero-canvas-container"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5 }}
                style={{ flex: 1, display: 'flex', justifyContent: 'center' }}
            >
                <CanvasSimulation />
            </motion.div>

            {/* Text Content (Right Side) */}
            <div style={textContainerStyles}>
                <div style={{ ...titleStyles, display: 'flex', alignItems: 'center' }}>
                    <span style={{ color: 'var(--text-primary)' }}>
                        {text.slice(0, 4)}<span style={{ color: 'var(--accent-color)' }}>{text.slice(4)}</span>
                    </span>
                    <span style={cursorStyles} />
                </div>

                {isTypingComplete && (
                    <>
                        <motion.p
                            style={descStyles}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                        >
                            Based in Texas, I'm a software engineer specializing in building exceptional digital experiences, generative AI agents, and scalable data flows. Currently turning signals into decisions at <span className="accent-text">AutoZone</span>.
                        </motion.p>

                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                        >
                            <a href="mailto:rvsandeepc@gmail.com" className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '10px', width: 'fit-content' }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
                                Say hi!
                            </a>
                        </motion.div>
                    </>
                )}
            </div>
        </section>
    );
};

export default Hero;
