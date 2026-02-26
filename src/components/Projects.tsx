import { motion } from 'framer-motion';
import { Folder, Github, ExternalLink } from 'lucide-react';

const Projects = () => {
    const projects = [
        {
            title: 'Social-Media-App',
            description: 'A backend social media app built with FastAPI and PostgreSQL. It includes core CRUD operations for creating, reading, updating, and deleting posts.',
            tech: ['Python', 'FastAPI', 'PostgreSQL'],
            github: 'https://github.com/Sandeep45-cyber/Social-Media-App',
        },
        {
            title: 'consumer-financial-complaints-dashboards',
            description: 'An interactive, multi-tab operations dashboard, visualising 555,957 consumer complaints filed with the U.S. Consumer Financial Protection Bureau (CFPB).',
            tech: ['HTML', 'Data Viz', 'Dashboards'],
            github: 'https://github.com/Sandeep45-cyber/consumer-financial-complaints-dashboards',
        },
        {
            title: 'Credit-card-fraud-detection',
            description: '(Masters Project) Credit card fraud detection using machine learning on highly imbalanced transaction data. Compares Logistic Regression, Random Forest, XGBoost, and CatBoost.',
            tech: ['Python', 'Scikit-Learn', 'Machine Learning'],
            github: 'https://github.com/csci595-research-lit-spring-2024/Credit-card-fraud-detection',
        },
        {
            title: 'nextjs-firebase-youtube-clone',
            description: 'A full-stack YouTube-style skeleton built with Next.js, Firebase, and Google Cloud with authenticated video uploads via signed URLs.',
            tech: ['TypeScript', 'Next.js', 'Firebase', 'GCP'],
            github: 'https://github.com/Sandeep45-cyber/nextjs-firebase-youtube-clone',
        },
        {
            title: 'Online-Book-Store-web-application',
            description: 'Full-stack Online Book Store built with Node.js, Express, MongoDB, and Handlebars. Features user/admin modules, cart flow, and Cloudinary uploads.',
            tech: ['Node.js', 'Express', 'MongoDB'],
            github: 'https://github.com/Sandeep45-cyber/Online-Book-Store-web-application',
        },
        {
            title: 'fashion-mnist-cnn-keras',
            description: 'CNN image classification project using Keras on the Fashion-MNIST dataset, with model training, evaluation, and prediction workflows.',
            tech: ['Python', 'Keras', 'Deep Learning'],
            github: 'https://github.com/Sandeep45-cyber/fashion-mnist-cnn-keras',
        },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.5, ease: 'easeOut' }
        }
    };

    return (
        <motion.section
            id="projects"
            className="section"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={containerVariants}
        >
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '40px' }}>
                <h2 className="section-title">
                    <span className="accent-text" style={{ marginRight: '10px', fontSize: '20px' }}>03.</span>
                    Other Noteworthy Projects
                </h2>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: '15px',
                position: 'relative',
            }}>
                {projects.map((project, i) => (
                    <motion.div
                        key={i}
                        variants={itemVariants}
                        style={{
                            backgroundColor: '#112240',
                            padding: '2rem 1.75rem',
                            borderRadius: '4px',
                            display: 'flex',
                            flexDirection: 'column',
                            boxShadow: '0 10px 30px -15px rgba(2,12,27,0.7)',
                            transition: 'var(--transition)',
                            position: 'relative',
                            cursor: 'pointer',
                        }}
                        className="project-card"
                        whileHover={{ y: -7 }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '35px' }}>
                            <Folder size={40} color="var(--accent-color)" strokeWidth={1} />
                            <div style={{ display: 'flex', gap: '15px' }}>
                                {project.github && (
                                    <a href={project.github} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-primary)' }}>
                                        <Github size={20} className="hover-icon" />
                                    </a>
                                )}
                                <a href={project.github} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-primary)' }}>
                                    <ExternalLink size={20} className="hover-icon" />
                                </a>
                            </div>
                        </div>

                        <h3 style={{ fontSize: '22px', color: 'var(--text-primary)', marginBottom: '10px', transition: 'var(--transition)' }} className="project-title">
                            <a href={project.github} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' }}>
                                {project.title}
                            </a>
                        </h3>

                        <p style={{ color: 'var(--text-secondary)', fontSize: '15px', marginBottom: '20px', flexGrow: 1 }}>
                            {project.description}
                        </p>

                        <ul style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', padding: 0, margin: 0, listStyle: 'none', fontFamily: 'monospace', fontSize: '12px', color: 'var(--text-secondary)' }}>
                            {project.tech.map((t, idx) => (
                                <li key={idx}>{t}</li>
                            ))}
                        </ul>
                    </motion.div>
                ))}

                <style>
                    {`
            .project-card:hover .project-title {
              color: var(--accent-color) !important;
            }
            .hover-icon {
              transition: var(--transition);
            }
            .hover-icon:hover {
              color: var(--accent-color);
            }
          `}
                </style>
            </div>
        </motion.section>
    );
};

export default Projects;
