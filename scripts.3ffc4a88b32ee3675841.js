function BackgroundFx() {
   let bg_color = '#f0f0f0',
      particle_colors = ['#dddddd'],
      max_particles = 50,
      running = false,
      c = document.getElementById('canvas'),
      ctx = c.getContext('2d');

   let w = window.innerWidth,
      h = window.innerHeight;
   c.width = w;
   c.height = h;

   let paramX = 0,
      paramY = 0,
      rad = (Math.PI / 180);

   let mouseX = 0,
      mouseY = 0,
      particles = [];

   function getColor() {
      let c = particle_colors[Math.floor(Math.random() * particle_colors.length)]
      return c
   }

   function getVelocity() {
      let v = Math.floor(Math.random() * 1.5) + 0.5
      return v
   }

   function getRadius() {
      let r = Math.floor(Math.random() * 60) + 5
      return r
   }

   function createParticle() {
      this.x = mouseX;
      this.y = h + mouseY // ensures shapes appear below viewport
      this.a = -90; //angle
      this.r = getRadius()
      this.vy = getVelocity()
      this.color = getColor()
   }

   function drawParticles() {
      let p, x1, y1, cx1, cy1, cx2, cy2, chord;

      requestAnimFrame(drawParticles);

      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = bg_color;
      ctx.fillRect(0, 0, w, h);

      for (let i = 0; i < particles.length; i++) {
         p = particles[i];
         ctx.beginPath();
         ctx.fillStyle = p.color;
         x1 = p.x + p.r * Math.cos(p.a * rad);
         y1 = p.y + p.r * Math.sin(p.a * rad);
         cx1 = p.x + p.r * Math.cos((p.a + 22.5) * rad);
         cy1 = p.y + p.r * Math.sin((p.a + 22.5) * rad);
         chord = 2 * p.r * Math.sin(22.5 * rad / 2);

         ctx.arc(cx1, cy1, chord, 0, 2 * Math.PI, false);
         ctx.fill();

         p.y -= p.vy;

         if (p.y < 0) {
            p.x = Math.random() * c.width;
            p.y = h + (Math.random() * c.height);
            p.r = getRadius()
            p.vy = getVelocity()
            p.color = getColor()
         }
      }
   }

   window.requestAnimFrame = function () {
      return window.requestAnimationFrame || window.webkitRequestAnimationFrame ||
         window.mozRequestAnimationFrame ||
         function (callback) {
            window.setTimeout(callback, 1000 / 60);
         };
   }();

   window.onresize = function () {
      w = window.innerWidth;
      h = window.innerHeight;
      c.width = w;
      c.height = h;
   }

   function setBackgroundColor(bg) {
      bg_color = bg
      return this
   }

   function SetParticleColors(arr) {
      particle_colors = arr
      return this
   }

   function setMaxParticles(mp) {
      max_particles = mp
      return this
   }

   function Stop() {
      if (running) {
         running = false
         for (let i = 0; i < particles.length; i++) {
            particles[i].x = 0
            particles[i].y = 0
            particles[i].r = 0
            particles[i].vy = 0
         }
         particles = []
      }
      return this
   }

   function Start() {
      if (!running) {
         running = true
         for (let i = 0; i < max_particles; i++) {
            setTimeout(function () {
               mouseX = Math.random() * c.width; //first creation: random x
               mouseY = Math.random() * c.height; //first creation: random y
               particles.push(new createParticle);
            }, i * 15);
         }
         drawParticles()
      }
   }

   return {
      start: Start,
      stop: Stop,
      setParticleColors: SetParticleColors,
      setBackground: setBackgroundColor
   }
}
;function SetWindowTitle(str) {
   var el = document.getElementById('appTitle');
   el.textContent = str || 'Resume'
}

function ScrollToTop() {
   window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
}
;
//# sourceMappingURL=scripts.3ffc4a88b32ee3675841.js.map