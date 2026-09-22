document.addEventListener("DOMContentLoaded", function () {
  const canvas = document.getElementById('bg-canvas');
  
  if (!canvas) {
    console.warn("Background canvas not found!");
    return;
  }

  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];
  
  // Colorful warm palette: Gold, Soft Peach, Soft Sage
  const colors = [
    'rgba(242, 204, 143, ALPHA)', 
    'rgba(224, 122, 95, ALPHA)', 
    'rgba(129, 178, 154, ALPHA)'
  ];

  function resize() {
    width = window.innerWidth; 
    height = window.innerHeight;
    
    // Handle High DPI / Retina displays for crisp particles
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr; 
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);
    
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';

    particles = [];
    
    const numParticles = width < 768 ? 25 : 55;
    
    for(let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 2.5 + 1,          // radius (size)
        d: Math.random() * 0.4 + 0.15,       // speed
        c: colors[Math.floor(Math.random() * colors.length)],
        a: Math.random() * 0.5 + 0.2,        // alpha (opacity)
        offset: Math.random() * 100          // random offset for wavy motion
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);
    
    for(let p of particles) {
      p.y -= p.d;
      
      p.offset += 0.01;
      p.x += Math.sin(p.offset) * 0.3;
      
      if (p.y < -10) { 
        p.y = height + 10; 
        p.x = Math.random() * width; 
      }
      
      ctx.beginPath();
      ctx.fillStyle = p.c.replace('ALPHA', p.a.toFixed(2));
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    }
    requestAnimationFrame(draw);
  }
  
  window.addEventListener('resize', resize);
  resize(); 
  draw();
});