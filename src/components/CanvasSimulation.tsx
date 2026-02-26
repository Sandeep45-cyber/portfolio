import React, { useRef, useEffect } from 'react';

const CanvasSimulation: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set canvas dimensions
        let width = 400;
        let height = 400;

        // Scale for high DPI displays
        const dpr = window.devicePixelRatio || 1;
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        ctx.scale(dpr, dpr);
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;

        let particles: Particle[] = [];
        let animationFrameId: number;
        let mouse = { x: -1000, y: -1000, radius: 100 };

        class Particle {
            x: number;
            y: number;
            vx: number;
            vy: number;
            radius: number;
            baseX: number;
            baseY: number;

            constructor(x: number, y: number) {
                this.x = x;
                this.y = y;
                this.baseX = x;
                this.baseY = y;
                this.vx = (Math.random() - 0.5) * 1;
                this.vy = (Math.random() - 0.5) * 1;
                this.radius = Math.random() * 2 + 1;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                // Bounce off edges
                if (this.x < 0 || this.x > width) this.vx = -this.vx;
                if (this.y < 0 || this.y > height) this.vy = -this.vy;

                // Mouse interaction
                let dx = mouse.x - this.x;
                let dy = mouse.y - this.y;
                let distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < mouse.radius) {
                    const forceDirectionX = dx / distance;
                    const forceDirectionY = dy / distance;
                    const force = (mouse.radius - distance) / mouse.radius;
                    const directionX = forceDirectionX * force * -2;
                    const directionY = forceDirectionY * force * -2;

                    this.vx += directionX;
                    this.vy += directionY;
                }

                // Apply friction
                this.vx *= 0.98;
                this.vy *= 0.98;

                // Pull back to center slightly if drifting too fast
                const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
                if (speed < 0.2) {
                    this.vx += (Math.random() - 0.5) * 0.1;
                    this.vy += (Math.random() - 0.5) * 0.1;
                } else if (speed > 2) {
                    this.vx *= 0.5;
                    this.vy *= 0.5;
                }
            }

            draw() {
                if (!ctx) return;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(100, 255, 218, 0.5)';
                ctx.fill();
                ctx.closePath();
            }
        }

        const init = () => {
            particles = [];
            const numberOfParticles = 80;
            for (let i = 0; i < numberOfParticles; i++) {
                const x = Math.random() * width;
                const y = Math.random() * height;
                particles.push(new Particle(x, y));
            }
        };

        const connect = () => {
            let opacityValue = 1;
            for (let a = 0; a < particles.length; a++) {
                for (let b = a; b < particles.length; b++) {
                    let distance =
                        ((particles[a].x - particles[b].x) * (particles[a].x - particles[b].x)) +
                        ((particles[a].y - particles[b].y) * (particles[a].y - particles[b].y));

                    if (distance < 6000) {
                        opacityValue = 1 - (distance / 6000);
                        if (!ctx) return;
                        ctx.strokeStyle = `rgba(100, 255, 218, ${opacityValue * 0.2})`;
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(particles[a].x, particles[a].y);
                        ctx.lineTo(particles[b].x, particles[b].y);
                        ctx.stroke();
                    }
                }
            }
        };

        const animate = () => {
            if (!ctx) return;
            ctx.clearRect(0, 0, width, height);
            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();
            }
            connect();
            animationFrameId = requestAnimationFrame(animate);
        };

        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
        };

        const handleMouseLeave = () => {
            mouse.x = -1000;
            mouse.y = -1000;
        }

        canvas.addEventListener('mousemove', handleMouseMove);
        canvas.addEventListener('mouseleave', handleMouseLeave);

        init();
        animate();

        return () => {
            cancelAnimationFrame(animationFrameId);
            canvas.removeEventListener('mousemove', handleMouseMove);
            canvas.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="simulation-container"
            style={{ cursor: 'crosshair', borderRadius: '50%' }}
        />
    );
};

export default CanvasSimulation;
