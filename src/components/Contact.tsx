import { motion } from 'framer-motion';

const Contact = () => {
    return (
        <motion.section
            id="contact"
            className="section"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '100px 0' }}
        >
            <p className="accent-text" style={{ fontFamily: 'monospace', fontSize: '16px', marginBottom: '10px' }}>
                04. What's Next?
            </p>

            <h2 style={{ fontSize: 'clamp(40px, 5vw, 60px)', color: 'var(--text-primary)', margin: '0 0 20px 0', fontWeight: 600 }}>
                Get In Touch
            </h2>

            <p style={{ color: 'var(--text-secondary)', fontSize: '18px', maxWidth: '600px', marginBottom: '50px' }}>
                Currently looking for new opportunities! Whether you have a question, a potential job opening, or just want to say hi, my inbox is always open. I'll do my best to get back to you!
            </p>

            <a href="mailto:rvsandeepc@gmail.com" className="btn-primary" style={{ padding: '15px 30px', fontSize: '16px' }}>
                Say Hello
            </a>

            <div style={{ marginTop: '150px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: '30px', marginBottom: '30px' }}>
                    {/* Social Icons Placeholder */}
                    <a href="https://github.com/Sandeep45-cyber" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-secondary)' }} className="social-icon">
                        GitHub
                    </a>
                    <a href="https://www.linkedin.com/in/chinta-sandeep-80927130b/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-secondary)' }} className="social-icon">
                        LinkedIn
                    </a>
                </div>
                <p style={{ fontFamily: 'monospace', fontSize: '12px', color: 'var(--text-secondary)' }}>
                    Built by Rama Venkata Sandeep Chinta. Inspired by Gazi Jarin.
                </p>
            </div>

            <style>
                {`
          .social-icon {
            font-family: monospace;
            font-size: 14px;
            transition: var(--transition);
          }
          .social-icon:hover {
            color: var(--accent-color) !important;
            transform: translateY(-3px);
          }
        `}
            </style>
        </motion.section>
    );
};

export default Contact;
