import React, { useRef, useEffect } from 'react';

const CanvasSimulation: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        if (!ctx) return;

        let width = 400;
        let height = 400;
        const dpr = window.devicePixelRatio || 1;
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        ctx.scale(dpr, dpr);
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;

        let particles: Particle[] = [];
        let animationFrameId: number;
        let mouse = { x: -1000, y: -1000, radius: 32 };

        class Particle {
            x: number;
            y: number;
            vx: number;
            vy: number;
            baseX: number;
            baseY: number;
            color: string;

            constructor(x: number, y: number, color: string) {
                // Start slightly randomized for an initial assembly effect
                this.x = x + (Math.random() - 0.5) * 50;
                this.y = y + (Math.random() - 0.5) * 50;
                this.baseX = x;
                this.baseY = y;
                this.vx = 0;
                this.vy = 0;
                this.color = color;
            }

            update() {
                // Calculate distance from mouse
                let dx = mouse.x - this.x;
                let dy = mouse.y - this.y;
                let distance = Math.sqrt(dx * dx + dy * dy);

                let forceDirectionX = dx / distance;
                let forceDirectionY = dy / distance;

                const maxDistance = mouse.radius;
                let force = (maxDistance - distance) / maxDistance;

                if (distance < maxDistance) {
                    // Repel from mouse
                    this.vx -= forceDirectionX * force * 3;
                    this.vy -= forceDirectionY * force * 3;
                } else {
                    // Spring back to base position
                    this.vx -= (this.x - this.baseX) * 0.1;
                    this.vy -= (this.y - this.baseY) * 0.1;
                }

                // Add friction so they settle
                this.vx *= 0.8;
                this.vy *= 0.8;

                this.x += this.vx;
                this.y += this.vy;
            }

            draw() {
                if (!ctx) return;
                ctx.fillStyle = this.color;
                // Draw as a small horizontal dash to mimic the reference image style
                ctx.fillRect(this.x, this.y, 4, 1.5);
            }
        }

        const init = () => {
            particles = [];

            const image = new Image();

            image.onload = () => {
                // Use an offscreen canvas to scale down the image to fit the 400x400 container
                // This gets us the "pixelated" data array we need for particles
                const offscreenCanvas = document.createElement('canvas');
                const offCtx = offscreenCanvas.getContext('2d');
                if (!offCtx) return;

                // Scale width to ~100px so we get enough particles but not too many that it lags
                const targetWidth = 100;
                const scale = targetWidth / image.width;
                const targetHeight = image.height * scale;

                offscreenCanvas.width = targetWidth;
                offscreenCanvas.height = targetHeight;
                offCtx.drawImage(image, 0, 0, targetWidth, targetHeight);

                const imageData = offCtx.getImageData(0, 0, targetWidth, targetHeight);
                const data = imageData.data;

                // Map 1 offscreen pixel to visible pixels
                const step = 2; // Check every 2nd pixel (lower number = denser particles)
                const drawScale = 400 / targetWidth; // Multiplier to fill the 400px canvas

                // Adjust offsets to perfectly center the portrait
                const offsetX = (width - (targetWidth * drawScale)) / 2;
                const offsetY = (height - (targetHeight * drawScale)) / 2;

                for (let y = 0; y < targetHeight; y += step) {
                    for (let x = 0; x < targetWidth; x += step) {
                        const index = (y * targetWidth + x) * 4;
                        const r = data[index];
                        const g = data[index + 1];
                        const b = data[index + 2];
                        const alpha = data[index + 3];

                        // Brightness filter: Ignore solid white backgrounds and fully transparent areas
                        const brightness = (r + g + b) / 3;

                        if (alpha > 128 && brightness < 240) {
                            const posX = (x * drawScale) + offsetX;
                            const posY = (y * drawScale) + offsetY;

                            // Map brightness to opacity (darker areas = more solid particle)
                            const opacity = Math.max(0.3, 1 - (brightness / 255));
                            const color = `rgba(100, 255, 218, ${opacity})`; // Theme accent color

                            particles.push(new Particle(posX, posY, color));
                        }
                    }
                }
                console.log(`Generated ${particles.length} particles from image. targetWidth: ${targetWidth}, targetHeight: ${targetHeight}`);
            };

            image.onerror = (err) => {
                console.error("Failed to load image for particle simulation", err);
            };

            image.src = "/EFA56684-B7A0-4837-99CD-5FE31E7A55AD.PNG"; // User's profile photo
        };

        const animate = () => {
            if (!ctx) return;
            ctx.clearRect(0, 0, width, height);
            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();
            }
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
