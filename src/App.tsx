import { Analytics } from "@vercel/analytics/react";
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact from './components/Contact';

function App() {
  return (
    <div className="app">
      <Navbar />
      <main style={{ padding: '0 150px' }}>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Contact />
      </main>

      {/* Left/Right Floating Elements */}
      <div style={{ position: 'fixed', bottom: 0, left: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }} className="side-element">
        <div style={{ width: '1px', height: '90px', backgroundColor: 'var(--text-secondary)' }} />
      </div>

      <div style={{ position: 'fixed', bottom: 0, right: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }} className="side-element">
        <a href="mailto:rvsandeepc@gmail.com" style={{ writingMode: 'vertical-rl', color: 'var(--text-secondary)', fontFamily: 'monospace', fontSize: '12px', letterSpacing: '0.1em', transition: 'var(--transition)' }} className="email-link">
          rvsandeepc@gmail.com
        </a>
        <div style={{ width: '1px', height: '90px', backgroundColor: 'var(--text-secondary)', marginTop: '20px' }} />
      </div>

      <style>
        {`
          .email-link:hover {
            color: var(--accent-color) !important;
            transform: translateY(-5px);
          }
          @media (max-width: 1080px) {
            main {
              padding: 0 100px !important;
            }
          }
          @media (max-width: 768px) {
            main {
              padding: 0 50px !important;
            }
            .side-element {
              display: none !important;
            }
          }
          @media (max-width: 480px) {
            main {
              padding: 0 25px !important;
            }
          }
        `}
      </style>
      <Analytics />
    </div>
  );
}

export default App;
