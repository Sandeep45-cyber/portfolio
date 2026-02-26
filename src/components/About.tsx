import { motion } from 'framer-motion';

const About = () => {
    const containerVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: 'easeOut' },
        },
    };

    const skills = [
        'Python (FastAPI/Flask)', 'TypeScript & React',
        'Agentic AI / GenAI', 'LangChain / Vertex AI',
        'Java & SpringBoot', 'PostgreSQL & BigQuery',
        'Docker & Kubernetes', 'Power BI Dashboards'
    ];

    return (
        <motion.section
            id="about"
            className="section"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
        >
            <h2 className="section-title">
                <span className="accent-text" style={{ marginRight: '10px', fontSize: '18px' }}>01.</span>
                About Me
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 3fr) 2fr', gap: '50px', alignItems: 'flex-start' }}>
                <div style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>
                    <p style={{ marginBottom: '15px' }}>
                        Hello! I'm Sandeep. I'm currently working at <span className="accent-text">AutoZone</span> and recently graduated from <span className="accent-text">Texas A&M University-Commerce</span>. My journey into software engineering stems from a deep passion for learning and building—specifically, turning complex data into intuitive, scalable solutions.
                    </p>
                    <p style={{ marginBottom: '15px' }}>
                        Lately, I've been absolutely captivated by the world of Generative AI. I spend my time designing and building <span className="accent-text">Agentic AI models</span> and <span className="accent-text">RAG pipelines</span>. It's incredibly fun to orchestrate autonomous systems that can reason, retrieve context, and automate massive workflows.
                    </p>
                    <p style={{ marginBottom: '25px' }}>
                        Beyond AI, I have a strong background in traditional data engineering and full-stack development. Whether it's crafting interactive Data Visualizations with <span className="accent-text">Power BI</span>, engineering machine learning models, or building robust backend microservices with <span className="accent-text">Java/SpringBoot</span> and <span className="accent-text">FastAPI</span>, I love bringing ideas to life.
                    </p>

                    <p style={{ marginBottom: '10px', fontFamily: 'monospace', color: 'var(--text-primary)' }}>Here are a few technologies I'm working with:</p>

                    <ul style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(2, minmax(140px, 200px))',
                        gap: '10px 10px',
                        padding: 0,
                        margin: '20px 0 0 0',
                        listStyle: 'none',
                        fontFamily: 'monospace'
                    }}>
                        {skills.map((skill, i) => (
                            <li key={i} style={{ position: 'relative', marginBottom: '10px', paddingLeft: '20px', fontSize: '13px' }}>
                                <span style={{
                                    color: 'var(--accent-color)',
                                    position: 'absolute',
                                    left: 0,
                                    top: '2px',
                                    fontSize: '12px'
                                }}>▹</span>
                                {skill}
                            </li>
                        ))}
                    </ul>
                </div>

                <div style={{ position: 'relative', maxWidth: '300px', margin: '0 auto' }}>
                    <div style={{
                        position: 'absolute',
                        top: '15px',
                        left: '15px',
                        width: '100%',
                        height: '100%',
                        border: '2px solid var(--accent-color)',
                        borderRadius: '4px',
                        zIndex: 0,
                        transition: 'var(--transition)'
                    }} className="image-border"></div>

                    <div style={{
                        width: '100%',
                        aspectRatio: '1 / 1',
                        backgroundColor: 'var(--accent-tint)',
                        borderRadius: '4px',
                        position: 'relative',
                        zIndex: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        overflow: 'hidden',
                        border: '1px solid var(--accent-color)'
                    }}>
                        {/* Image Placeholder */}
                        <img
                            src="/EFA56684-B7A0-4837-99CD-5FE31E7A55AD.PNG"
                            alt="Sandeep"
                            style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(100%) contrast(1.2)', transition: 'var(--transition)' }}
                            onMouseOver={(e) => (e.currentTarget.style.filter = 'none')}
                            onMouseOut={(e) => (e.currentTarget.style.filter = 'grayscale(100%) contrast(1.2)')}
                        />
                    </div>
                </div>
                <style>
                    {`
              .image-border:hover {
                top: 10px !important;
                left: 10px !important;
              }
            `}
                </style>
            </div>
        </motion.section>
    );
};

export default About;
