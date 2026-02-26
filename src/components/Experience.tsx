import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Experience = () => {
    const [activeTab, setActiveTab] = useState(0);

    const jobs = [
        {
            company: 'AutoZone',
            title: 'Software Engineer',
            range: 'Aug 2024 – Present',
            url: 'https://www.autozone.com/',
            duties: [
                'Developed generative AI applications using Python and FastAPI on GCP, building agentic AI solutions that automated workflows and reduced manual processing time by 40%.',
                'Designed and built cloud infrastructure using Terraform (IaC), managing configurations across dev, staging, and prod on GCP with Cloud Run and Cloud Functions.',
                'Leveraged LangChain and Vertex AI to build complex AI workflows, integrating LLM-powered services with REST APIs handling ~50K daily requests.',
                'Maintained CI/CD using Jenkins and GitHub Actions, reducing deployment time from 45 to 12 minutes across 200+ releases.',
                'Led by example in paired programming and TDD, cross-training engineers on Java and SpringBoot to standardize cloud-native AI practices.'
            ]
        },
        {
            company: 'Accenture',
            title: 'Software Engineer',
            range: 'Jun 2022 – Dec 2022',
            url: 'https://www.accenture.com/',
            duties: [
                'Engineered backend microservices using Python (FastAPI, Flask) and Java on GCP, processing 8K+ daily records with consistent PostgreSQL and BigQuery transactions.',
                'Built ML orchestration pipelines using Airflow, enabling batch and near-real-time AI inference across distributed GCP infrastructure.',
                'Orchestrated containerized deployments using Docker and Kubernetes (GKE) with Terraform, reducing environment setup time from 3 hours to 20 minutes.',
                'Automated CI/CD using Cloud Build and Git workflows, increasing release frequency by 50% across Agile sprints.',
            ]
        },
        {
            company: 'Genpact',
            title: 'Associate Software Engineer',
            range: 'May 2021 – May 2022',
            url: 'https://www.genpact.com/',
            duties: [
                'Delivered backend services and REST APIs using Python and Node.js, supporting enterprise apps with ML model integration for predictions.',
                'Examined and inspected code across the full stack, resolving bugs and reducing production defects by 45%.',
                'Created 20+ reusable frontend components with React and TypeScript, improving development velocity by 30%.',
                'Innovated data processing workflows using Python (Pandas) and SQL, building automated ETL pipelines for accurate business reporting.'
            ]
        },
    ];

    return (
        <motion.section
            id="experience"
            className="section"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
        >
            <h2 className="section-title">
                <span className="accent-text" style={{ marginRight: '10px', fontSize: '18px' }}>02.</span>
                Where I've Worked
            </h2>

            <div style={{ display: 'flex', minHeight: '340px', marginTop: '40px' }} className="exp-container">

                {/* Left Tabs */}
                <div style={{ width: 'max-content', position: 'relative', borderLeft: '2px solid #233554', paddingLeft: 0 }}>
                    {/* Active Tab Indicator */}
                    <div
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: '-2px',
                            width: '2px',
                            height: '42px',
                            backgroundColor: 'var(--accent-color)',
                            transform: `translateY(${activeTab * 42}px)`,
                            transition: 'transform 0.25s cubic-bezier(0.645, 0.045, 0.355, 1)',
                        }}
                    />

                    <ul style={{ display: 'flex', flexDirection: 'column' }}>
                        {jobs.map((job, i) => (
                            <li key={i}>
                                <button
                                    onClick={() => setActiveTab(i)}
                                    style={{
                                        width: '100%',
                                        textAlign: 'left',
                                        padding: '0 20px 0 20px',
                                        height: '42px',
                                        backgroundColor: activeTab === i ? 'var(--accent-tint)' : 'transparent',
                                        color: activeTab === i ? 'var(--accent-color)' : 'var(--text-secondary)',
                                        borderLeft: 'none',
                                        fontSize: '13px',
                                        transition: 'var(--transition)',
                                        whiteSpace: 'nowrap',
                                        fontFamily: 'monospace'
                                    }}
                                    className="tab-button"
                                >
                                    {job.company}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Right Content */}
                <div style={{ width: '100%', paddingLeft: '30px' }}>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            transition={{ duration: 0.25 }}
                        >
                            <h3 style={{ fontSize: '20px', fontWeight: 500, color: 'var(--text-primary)', marginBottom: '5px' }}>
                                {jobs[activeTab].title} <span className="accent-text">@ <a href={jobs[activeTab].url} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-color)' }}>{jobs[activeTab].company}</a></span>
                            </h3>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '13px', marginBottom: '25px', fontFamily: 'monospace' }}>
                                {jobs[activeTab].range}
                            </p>
                            <ul>
                                {jobs[activeTab].duties.map((duty, i) => (
                                    <li key={i} style={{ position: 'relative', marginBottom: '10px', paddingLeft: '30px', color: 'var(--text-secondary)', fontSize: '15px' }}>
                                        <span style={{
                                            color: 'var(--accent-color)',
                                            position: 'absolute',
                                            left: 0,
                                            top: '5px',
                                        }}>▹</span>
                                        {duty}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
            <style>
                {`
          @media (max-width: 600px) {
            .exp-container {
              flex-direction: column;
            }
            .exp-container > div:first-child {
              width: 100% !important;
              border-left: none !important;
              border-bottom: 2px solid #233554;
              margin-bottom: 30px;
            }
            .exp-container ul {
              flex-direction: row !important;
              overflow-x: auto;
            }
            .exp-container > div:first-child > div:first-child {
              width: 120px !important;
              height: 2px !important;
              left: 0 !important;
              top: auto !important;
              bottom: '-2px' !important;
              transform: translateX(calc(var(--active-tab) * 120px)) !important;
            }
            .tab-button {
              padding: 0 15px !important;
              text-align: center !important;
              min-width: 120px;
            }
          }
        `}
            </style>
        </motion.section>
    );
};

export default Experience;
