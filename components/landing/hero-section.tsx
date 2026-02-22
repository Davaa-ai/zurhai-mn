"use client";

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';

interface Config {
    particleCount: number;
    particleColor: string;
    lineColor: string;
    particleRadius: number;
    maxLineDistance: number;
    mouseAttractRadius: number;
    mouseAttractForce: number;
    baseSpeed: number;
}

interface Mouse {
    x: number | null;
    y: number | null;
}

// Particle Class moved outside component
class Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    baseX: number;
    baseY: number;
    canvas: HTMLCanvasElement;
    config: Config;

    constructor(canvas: HTMLCanvasElement, config: Config) {
        this.canvas = canvas;
        this.config = config;
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * config.baseSpeed;
        this.vy = (Math.random() - 0.5) * config.baseSpeed;
        this.baseX = this.x;
        this.baseY = this.y;
    }

    update(mouse: Mouse) {
        if (mouse.x != null && mouse.y != null) {
            const dx = mouse.x - this.x;
            const dy = mouse.y - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < this.config.mouseAttractRadius) {
                const forceDirectionX = dx / distance;
                const forceDirectionY = dy / distance;
                const force = (this.config.mouseAttractRadius - distance) / this.config.mouseAttractRadius;

                this.vx += forceDirectionX * force * this.config.mouseAttractForce;
                this.vy += forceDirectionY * force * this.config.mouseAttractForce;
            }
        }

        this.x += this.vx;
        this.y += this.vy;

        this.vx *= 0.99;
        this.vy *= 0.99;

        if (Math.abs(this.vx) < this.config.baseSpeed) this.vx += (Math.random() - 0.5) * 0.05;
        if (Math.abs(this.vy) < this.config.baseSpeed) this.vy += (Math.random() - 0.5) * 0.05;

        if (this.x < 0) this.x = this.canvas.width;
        if (this.x > this.canvas.width) this.x = 0;
        if (this.y < 0) this.y = this.canvas.height;
        if (this.y > this.canvas.height) this.y = 0;
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.config.particleRadius, 0, Math.PI * 2);
        ctx.fillStyle = this.config.particleColor;
        ctx.fill();
    }
}

const HeroSection = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;

        // Configuration — Light theme: navy/gold particles on ivory
        const config: Config = {
            particleCount: 120,
            particleColor: 'rgba(15, 27, 61, 0.25)',       // Navy dots
            lineColor: 'rgba(184, 149, 47, ',               // Gold lines, opacity dynamic
            particleRadius: 1.5,
            maxLineDistance: 120,
            mouseAttractRadius: 200,
            mouseAttractForce: 0.02,
            baseSpeed: 0.2,
        };

        let particles: Particle[] = [];
        const mouse: Mouse = { x: null, y: null };

        // Resize handler
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        const init = () => {
            resizeCanvas();
            particles = [];
            for (let i = 0; i < config.particleCount; i++) {
                particles.push(new Particle(canvas, config));
            }
        };

        const animate = () => {
            if (!ctx || !canvas) return;

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach(p => {
                p.update(mouse);
                p.draw(ctx);
            });

            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < config.maxLineDistance) {
                        const opacity = 1 - (distance / config.maxLineDistance);
                        ctx.beginPath();
                        ctx.strokeStyle = `${config.lineColor}${opacity * 0.3})`;
                        ctx.lineWidth = 0.5;
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }

                if (mouse.x != null && mouse.y != null) {
                    const dxMouse = particles[i].x - mouse.x;
                    const dyMouse = particles[i].y - mouse.y;
                    const distanceMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

                    if (distanceMouse < config.mouseAttractRadius) {
                        const opacity = (1 - (distanceMouse / config.mouseAttractRadius)) * 0.5;
                        ctx.beginPath();
                        ctx.strokeStyle = `${config.lineColor}${opacity})`;
                        ctx.lineWidth = 1;
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(mouse.x, mouse.y);
                        ctx.stroke();
                    }
                }
            }

            animationFrameId = requestAnimationFrame(animate);
        };

        window.addEventListener('resize', init);

        const handleMouseMove = (e: MouseEvent) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        };

        const handleMouseLeave = () => {
            mouse.x = null;
            mouse.y = null;
        };

        window.addEventListener('mousemove', handleMouseMove);
        document.body.addEventListener('mouseleave', handleMouseLeave);

        init();
        animate();

        return () => {
            window.removeEventListener('resize', init);
            window.removeEventListener('mousemove', handleMouseMove);
            document.body.removeEventListener('mouseleave', handleMouseLeave);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <div className="relative w-full h-screen bg-background overflow-hidden flex items-center justify-center">
            {/* Canvas Layer */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 z-0 pointer-events-none"
            />

            {/* Content Layer */}
            <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 pointer-events-none">
                {/* Section label */}
                <span className="text-primary/80 text-xs font-semibold tracking-[0.25em] uppercase mb-6">
                    ✦ Оддын Зүй Тогтол ✦
                </span>

                <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-foreground mb-6">
                    Оддын <span className="hero-gradient-text italic">Зурхай</span>
                </h1>
                <p className="text-base md:text-lg text-foreground/50 max-w-xl mb-10 leading-relaxed font-serif">
                    Огторгуйн уудмыг математик нарийвчлалаар тайлах нь. Гараг эрхсийн байрлал, оддын огтлолцол дээр суурилсан таны хувь төөргийн алгоритм.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 pointer-events-auto items-center justify-center">
                    <Link href="#zurhai-form" className="px-8 py-3 bg-primary text-primary-foreground font-serif font-semibold rounded-full hover:bg-primary/90 transition-colors duration-300 tracking-wide inline-flex">
                        ✦ Хувь төөргөө тооцоолох
                    </Link>
                    <Link href="#zodiac-signs" className="px-8 py-3 bg-transparent border border-foreground/15 text-foreground/60 font-serif font-semibold rounded-full hover:border-primary/40 hover:text-primary transition-colors duration-300 inline-flex">
                        Оддын зүй тогтол
                    </Link>
                </div>
                <div className="mt-8 pointer-events-auto">
                    <Link href="/blog/neriin-utga" className="inline-flex items-center text-sm md:text-base text-primary/50 hover:text-primary transition-colors font-serif italic border-b border-transparent hover:border-primary/30 pb-0.5">
                        <span className="mr-2">✨</span> Таны нэр ямар далд утгатай вэ? Сая хүний нууц... <span className="ml-1 text-xs">→</span>
                    </Link>
                </div>
            </div>

            {/* Vignette effect for depth — soft ivory vignette */}
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,var(--background)_100%)] z-0 opacity-60" />

            {/* Bottom border */}
            <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-border to-transparent z-20" />
        </div>
    );
};

export default HeroSection;
