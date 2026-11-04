const c = document.querySelector('canvas');
const ctx = c.getContext('2d');
const W = c.width, H = c.height;
let t = 0;

function textPoints() {
  const g = new OffscreenCanvas(W, H)
    .getContext('2d');
  g.font = 'bold 170px Poppins';
  g.textAlign = 'center';
  g.fillStyle = '#ffc93c';
  g.fillText('HAPPY', W / 2, H * 0.42);
  g.fillText('DIWALI 🪔', W / 2, H * 0.57);
  const d = g.getImageData(0, 0, W, H).data;
  const pts = [];
  for (let y = 0; y < H; y += 8)
    for (let x = 0; x < W; x += 8) {
      const i = (y * W + x) * 4;
      if (d[i + 3] > 99) pts.push({ x, y,
        c: `rgb(${d.slice(i, i + 3)})` });
    }
  return pts;
}

function loop() {
  ctx.fillStyle = 'rgba(6, 4, 22, 0.25)';
  ctx.globalCompositeOperation = 'source-over';
  ctx.fillRect(0, 0, W, H);
  ctx.globalCompositeOperation = 'lighter';
  if (++t % 30 === 0)
    launch(W * (0.1 + 0.8 * Math.random()));
  if (t === 240) launch(W / 2, true);
  for (const r of rockets) {
    r.y += r.vy; r.vy += 0.2;
    dot(r.x, r.y, 4, r.color, 1);
    if (r.vy > -1) {
      r.dead = true;
      burst(r, r.big && textPoints());
    }
  }
  rockets = rockets.filter(r => !r.dead);
  sparks.forEach(move);
  sparks = sparks.filter(
    p => p.to || p.age < 80);
  requestAnimationFrame(loop);
}
loop();
