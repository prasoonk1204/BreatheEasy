import React, { useEffect, useRef } from 'react';

const FloatingParticles = ({ count = 30, speed = 1 }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Check if dark mode
    const isDarkMode = () => document.documentElement.classList.contains('dark');

    // Particle class with varied sizes
    class Particle {
      constructor() {
        this.reset();
        this.y = Math.random() * canvas.height;
        this.opacity = Math.random() * 0.5 + 0.2;
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = -10;
        
        // Different size categories for variety: small, medium, large bubbles
        const sizeCategory = Math.random();
        if (sizeCategory < 0.6) {
          // 60% small particles
          this.size = Math.random() * 3 + 1;
        } else if (sizeCategory < 0.85) {
          // 25% medium bubbles
          this.size = Math.random() * 5 + 4;
        } else {
          // 15% large bubbles
          this.size = Math.random() * 8 + 8;
        }
        
        // Speed based on size (larger = slower for realistic physics)
        this.speedY = (Math.random() * 0.3 + 0.2) * (6 / this.size);
        this.speedX = (Math.random() * 0.4 - 0.2) * (4 / this.size);
        this.opacity = Math.random() * 0.4 + 0.3;
        
        // Different colors based on theme
        if (isDarkMode()) {
          // Darker theme - subtle greens
          const colors = [
            'rgba(16, 185, 129, ', // emerald-500
            'rgba(52, 211, 153, ', // emerald-400
            'rgba(20, 184, 166, ', // teal-500
            'rgba(94, 234, 212, ', // teal-300
          ];
          this.color = colors[Math.floor(Math.random() * colors.length)];
        } else {
          // Light theme - vibrant greens
          const colors = [
            'rgba(16, 185, 129, ', // emerald-500
            'rgba(34, 197, 94, ', // green-500
            'rgba(20, 184, 166, ', // teal-500
            'rgba(52, 211, 153, ', // emerald-400
            'rgba(134, 239, 172, ', // green-300
          ];
          this.color = colors[Math.floor(Math.random() * colors.length)];
        }
      }

      update() {
        this.y += this.speedY * speed;
        this.x += this.speedX * speed;
        
        // Subtle floating motion
        this.x += Math.sin(this.y * 0.01) * 0.3;

        // Reset when particle goes off screen
        if (this.y > canvas.height + 10 || this.x < -10 || this.x > canvas.width + 10) {
          this.reset();
        }
      }

      draw() {
        // Main bubble with gradient glow
        ctx.beginPath();
        const gradient = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, this.size
        );
        gradient.addColorStop(0, `${this.color}${this.opacity * 0.8})`);
        gradient.addColorStop(0.4, `${this.color}${this.opacity * 0.6})`);
        gradient.addColorStop(0.7, `${this.color}${this.opacity * 0.3})`);
        gradient.addColorStop(1, `${this.color}0)`);
        
        ctx.fillStyle = gradient;
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();

        // Bubble shine/highlight effect (top-left)
        ctx.beginPath();
        const highlightGradient = ctx.createRadialGradient(
          this.x - this.size * 0.3, this.y - this.size * 0.3, 0,
          this.x - this.size * 0.3, this.y - this.size * 0.3, this.size * 0.5
        );
        highlightGradient.addColorStop(0, `rgba(255, 255, 255, ${this.opacity * 0.6})`);
        highlightGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        
        ctx.fillStyle = highlightGradient;
        ctx.arc(this.x - this.size * 0.3, this.y - this.size * 0.3, this.size * 0.4, 0, Math.PI * 2);
        ctx.fill();

        // Bright center core
        ctx.beginPath();
        ctx.fillStyle = `${this.color}${this.opacity * 1.2})`;
        ctx.arc(this.x, this.y, this.size * 0.25, 0, Math.PI * 2);
        ctx.fill();

        // Outer ring for bubble effect (optional, for larger bubbles)
        if (this.size > 6) {
          ctx.beginPath();
          ctx.strokeStyle = `${this.color}${this.opacity * 0.4})`;
          ctx.lineWidth = 1;
          ctx.arc(this.x, this.y, this.size * 0.9, 0, Math.PI * 2);
          ctx.stroke();
        }
      }
    }

    // Initialize particles
    const initParticles = () => {
      particles = [];
      for (let i = 0; i < count; i++) {
        particles.push(new Particle());
      }
    };
    initParticles();

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    // Reinitialize particles when theme changes
    const observer = new MutationObserver(() => {
      particles.forEach(particle => particle.reset());
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
    };
  }, [count, speed]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.6 }}
    />
  );
};

export default FloatingParticles;
