// particles.js: rockets & sparks used by fireworks.js
let rockets = [], sparks = [];
const hues = [45, 25, 320, 130, 190];

function launch(x, big) {
  const hue = hues[Math.random() * 5 | 0];
  rockets.push({ x, y: H, big,
    vy: big ? -18 : -12 - Math.random() * 9,
    color: `hsl(${hue}, 100%, 62%)` });
}

function burst(r, pts) {
  const n = pts ? pts.length : 140;
  for (let i = 0; i < n; i++) {
    const a = Math.random() * Math.PI * 2;
    const s = Math.random() * 10 + 2;
    sparks.push({ x: r.x, y: r.y, age: 0,
      vx: Math.cos(a) * s, vy: Math.sin(a) * s,
      color: pts ? pts[i].c : r.color,
      to: pts && pts[i] });
  }
}

function dot(x, y, size, color, alpha) {
  ctx.globalAlpha = Math.max(alpha, 0);
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, size, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalAlpha = 1;
}

function move(p) {
  p.age++;
  p.vx *= 0.96; p.vy *= 0.96;
  if (p.to) { // fly home to its pixel of HAPPY DIWALI 🪔
    const k = Math.min(p.age / 90, 1) * 0.08;
    p.x += p.vx + (p.to.x - p.x) * k;
    p.y += p.vy + (p.to.y - p.y) * k;
    const tw = 0.6 + 0.4 * Math.sin(t * 0.15 + p.x);
    dot(p.x, p.y, 6, p.color, 0.15 * tw);
    dot(p.x, p.y, 2.2, p.color, tw);
  } else { // normal spark: gravity + fade out
    p.vy += 0.07;
    p.x += p.vx; p.y += p.vy;
    dot(p.x, p.y, 3, p.color, 1 - p.age / 80);
  }
}
