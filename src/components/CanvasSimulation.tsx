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
        let mouse = {
            x: -1000,
            y: -1000,
            radius: 14, // force field outside the cursor collider (smaller interaction)
            colliderRadius: 8, // invisible mouse circle
            outsideBuffer: 18, // keep influence a bit outside the canvas circle
        };

        class Particle {
            x: number;
            y: number;
            vx: number;
            vy: number;
            baseX: number;
            baseY: number;
            color: string;
            trail: Array<{ x: number; y: number }>;

            constructor(x: number, y: number, color: string) {
                // Start slightly randomized for an initial assembly effect
                this.x = x + (Math.random() - 0.5) * 50;
                this.y = y + (Math.random() - 0.5) * 50;
                this.baseX = x;
                this.baseY = y;
                this.vx = 0;
                this.vy = 0;
                this.color = color;
                this.trail = [];
            }

            update() {
                // Calculate distance from mouse
                let dx = mouse.x - this.x;
                let dy = mouse.y - this.y;
                let distance = Math.sqrt(dx * dx + dy * dy);
                if (distance === 0) distance = 0.001;

                let forceDirectionX = dx / distance;
                let forceDirectionY = dy / distance;

                const edgeDistance = Math.max(0, distance - mouse.colliderRadius);
                const maxDistance = mouse.radius + mouse.outsideBuffer;
                const force = Math.max(0, (maxDistance - edgeDistance) / maxDistance);

                if (edgeDistance < maxDistance) {
                    // Repel from mouse
                    this.vx -= forceDirectionX * force * 1.2;
                    this.vy -= forceDirectionY * force * 1.2;
                } else {
                    // Spring back to base position
                    this.vx -= (this.x - this.baseX) * 0.055;
                    this.vy -= (this.y - this.baseY) * 0.055;
                }

                // Add friction so they settle
                this.vx *= 0.9;
                this.vy *= 0.9;

                this.trail.push({ x: this.x, y: this.y });
                if (this.trail.length > 3) {
                    this.trail.shift();
                }

                this.x += this.vx;
                this.y += this.vy;
            }

            draw() {
                if (!ctx) return;

                for (let i = 0; i < this.trail.length; i++) {
                    const point = this.trail[i];
                    const alpha = (i + 1) / this.trail.length;
                    ctx.fillStyle = `rgba(88, 230, 198, ${0.05 + alpha * 0.12})`;
                    ctx.fillRect(point.x - 0.5, point.y, 5.5, 2.2);
                }

                // Slight glow pass for a thicker, playful dash look.
                ctx.fillStyle = 'rgba(88, 230, 198, 0.1)';
                ctx.fillRect(this.x - 1, this.y - 0.5, 7, 3);
                ctx.fillStyle = this.color;
                ctx.fillRect(this.x, this.y, 5, 2);
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
                            const opacity = Math.max(0.08, (1 - (brightness / 255)) * 0.68);
                            const color = `rgba(88, 230, 198, ${opacity})`; // Dimmer accent for closer reference look

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

        const setPointerPosition = (clientX: number, clientY: number) => {
            const rect = canvas.getBoundingClientRect();
            mouse.x = clientX - rect.left;
            mouse.y = clientY - rect.top;
        };

        const handleMouseMove = (e: MouseEvent) => {
            setPointerPosition(e.clientX, e.clientY);
        };

        const handleTouchMove = (e: TouchEvent) => {
            const touch = e.touches[0];
            if (!touch) return;
            setPointerPosition(touch.clientX, touch.clientY);
        };

        const handleTouchStart = (e: TouchEvent) => {
            const touch = e.touches[0];
            if (!touch) return;
            setPointerPosition(touch.clientX, touch.clientY);
        };

        const handleMouseLeave = () => {
            mouse.x = -1000;
            mouse.y = -1000;
        }

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('touchstart', handleTouchStart, { passive: true });
        window.addEventListener('touchmove', handleTouchMove, { passive: true });
        window.addEventListener('touchend', handleMouseLeave, { passive: true });
        window.addEventListener('touchcancel', handleMouseLeave, { passive: true });
        canvas.addEventListener('mouseleave', handleMouseLeave);

        init();
        animate();

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('touchstart', handleTouchStart);
            window.removeEventListener('touchmove', handleTouchMove);
            window.removeEventListener('touchend', handleMouseLeave);
            window.removeEventListener('touchcancel', handleMouseLeave);
            canvas.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="simulation-container"
            style={{ cursor: 'crosshair', borderRadius: '50%', touchAction: 'none' }}
        />
    );
};

export default CanvasSimulation;
