// Base MatrixRain code from https://danial-kord.github.io/
"use client";

import { useEffect, useRef, useState } from "react";

const FONT_SIZE = 14;
const CHARSET =
  "アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズヅブプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ<>{}[]()/\\|=+-*&^%$#@!?".split(
    "",
  );

type Column = {
  x: number;
  y: number;
  speed: number;
  endY: number;
  len: number;
  swap: number;
  head: string;
  hueShift: number;
  isCollidable: boolean;
};

// --- NEW: Particle type for the bounce physics ---
type SplashParticle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  char: string;
  life: number;
  hueShift: number;
};

type SuperTrail = {
  x: number;
  startX?: number;
  targetX?: number;
  y: number;
  startY?: number;
  targetY?: number;
  startTime: number;
  duration: number;
  len: number;
  life: number;
  originalChar?: string;
  glitchFactor?: number;
  yIndex?: number;
  isReverse?: boolean;
};

export function MatrixRain() {
  const ref = useRef<HTMLCanvasElement>(null);
  const [fps, setFps] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined" || !ref.current) return;
    const canvas = ref.current;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let dpr = Math.min(window.devicePixelRatio || 1, 1.75);
    let w = 0;
    let h = 0;
    let cols: Column[] = [];
    let splashes: SplashParticle[] = []; 
    let superTrails: SuperTrail[] = [];

    // --- NEW: Mouse tracking state ---
    let mouseX = -1000;
    let mouseY = -1000;
    const UMBRELLA_RADIUS = 20; 

    let lastScrollY = typeof window !== 'undefined' ? window.scrollY : 0;
    let isSplashEnabled = false;
    let velocity = 0;
    let scrollProgress = 0;
    let isPaused = false;
    let pauseAlpha = 1.0;

    function rebuildColumns() {
      const count = Math.floor(w / FONT_SIZE);
      cols = Array.from({ length: count }, (_, i) => freshColumn(i, true));
    }

    // --- NEW: Event listeners for pausing/resuming ---
    function handlePause() {
      isPaused = true;
    }

    function handleResume() {
      isPaused = false;
    }

    window.addEventListener("matrix:pause", handlePause);
    window.addEventListener("matrix:resume", handleResume);

    // --- NEW: Event listener for navbar clicks ---

    function handleSpawnTrail(e: any) {
      const { x, y, targetX, targetY, text, reverse } = e.detail;
      const now = performance.now();
      
      if (text) {
        const charWidth = 9; 
        for (let i = 0; i < text.length; i++) {
          superTrails.push({
            x: x + (i * charWidth),
            startX: x + (i * charWidth),
            targetX: targetX !== undefined ? targetX + (i * charWidth) : undefined,
            y: y,
            startY: y,
            targetY: targetY,
            startTime: now,
            duration: 2500, // 2s move + 0.5s hold
            len: 15 + text.length, 
            life: 1.0,
            originalChar: text[i],
            glitchFactor: 0,
            yIndex: i,
            isReverse: reverse
          });
        }
      } else {
        // Fallback for simple clicks
        for (let i = 0; i < 5; i++) {
          superTrails.push({
            x: x + (Math.random() - 0.5) * 40,
            y: y,
            startX: x,
            startY: y,
            targetY: y + 400,
            startTime: now,
            duration: 1500,
            len: 25 + Math.floor(Math.random() * 15),
            life: 1.0
          });
        }
      }
    }

    window.addEventListener("matrix:spawn-trail", handleSpawnTrail);

    function freshColumn(i: number, initial = false): Column {
      return {
        x: i * FONT_SIZE,
        y: initial ? Math.random() * -h * 0.8 : -Math.random() * 240,
        speed: 0.55 + Math.random() * 1.8,
        endY: h * (0.45 + Math.random() * 0.5),
        len: 8 + Math.floor(Math.random() * 26),
        swap: 0.04 + Math.random() * 0.12,
        head: CHARSET[(Math.random() * CHARSET.length) | 0],
        hueShift: Math.random(),
        isCollidable: Math.random() < 0.4,
      };
    }

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
      ctx.fillStyle = "rgba(6, 7, 10, 1)";
      ctx.fillRect(0, 0, w, h);
      rebuildColumns();
    }

    function onScroll() {
      if (!isSplashEnabled) {
        isSplashEnabled = true;
      }
      const sy = window.scrollY;
      const dy = sy - lastScrollY;
      velocity = Math.min(60, velocity + Math.abs(dy));
      lastScrollY = sy;
      const heroEnd = window.innerHeight * 0.6;
      scrollProgress = Math.min(1, Math.max(0, (sy - heroEnd * 0.2) / heroEnd));
    }

    // --- NEW: Mouse tracking listener ---
    function onMouseMove(e: MouseEvent) {
      mouseX = e.clientX;
      mouseY = e.clientY;
    }

    let rafId = 0;
    let lastT = performance.now();
    let frameCount = 0;
    let lastFpsUpdate = performance.now();

    function step(now: number) {
      const dt = Math.min(48, now - lastT) / 16.6667; 
      lastT = now;

      // Update FPS
      frameCount++;
      if (now - lastFpsUpdate > 1000) {
        setFps(frameCount);
        frameCount = 0;
        lastFpsUpdate = now;
      }

      // Update pause alpha
      if (isPaused) {
        pauseAlpha = Math.max(0, pauseAlpha - 0.05 * dt);
      } else {
        pauseAlpha = Math.min(1, pauseAlpha + 0.02 * dt);
      }

      velocity *= Math.pow(0.9, dt);
      const burst = Math.min(1, velocity / 30);
      const speedMul = 1 + burst * 4.0;
      const visibility = (Math.min(1, scrollProgress * 0.85 + burst * 0.6)) * pauseAlpha;

      const trailAlpha = 0.07 + burst * 0.05;
      ctx.fillStyle = `rgba(6, 7, 10, ${trailAlpha})`;
      ctx.fillRect(0, 0, w, h);

      ctx.font = `${FONT_SIZE}px "JetBrains Mono", ui-monospace, monospace`;
      ctx.textBaseline = "top";

      // 1. Process standard columns
      for (let j = 0; j < cols.length; j++) {
        const c = cols[j];
        const distFromEnd = c.endY - c.y;
        const bottomFade = Math.min(1, Math.max(0, distFromEnd / 90));
        const colVis = visibility * bottomFade;

        // --- NEW: Rigid Body Collision Physics ---
        if (isSplashEnabled && !isPaused && c.isCollidable && colVis > 0.1 && c.y > 0) {
          const dx = c.x - mouseX;
          const dy = c.y - mouseY;
          const dist = Math.sqrt(dx * dx + dy * dy);

          // If drop hits the top half of the cursor umbrella
          if (dist < UMBRELLA_RADIUS && dy < 0) {
            // Calculate surface normal
            const nx = dx / dist;
            const ny = dy / dist;
            
            // Downward incoming velocity
            const vIn = c.speed * speedMul * 4.5; 
            
            // Spawn splashing particles
            for (let i = 0; i < 3; i++) {
               // Add slight randomization to normal for organic splash
               const scatterX = nx + (Math.random() - 0.5) * 0.4;
               const scatterY = ny + (Math.random() - 0.5) * 0.4;
               const sLen = Math.sqrt(scatterX * scatterX + scatterY * scatterY);
               const snx = scatterX / sLen;
               const sny = scatterY / sLen;

               // Reflection Math: Vout = Vin - 2(Vin * N)N
               const dotProduct = vIn * sny; 
               const vx = -2 * dotProduct * snx;
               const vy = vIn - 2 * dotProduct * sny;

               splashes.push({
                 x: c.x,
                 y: c.y,
                 vx: vx * 0.7, // Dampen the bounce
                 vy: vy * 0.7,
                 char: CHARSET[(Math.random() * CHARSET.length) | 0],
                 life: 1.0,
                 hueShift: c.hueShift
               });
            }
            // Break the column: reset it to the top so it doesn't pass through
            Object.assign(c, freshColumn(Math.round(c.x / FONT_SIZE), true));
            continue; 
          }
        }

        if (colVis <= 0.02) {
          c.y += c.speed * speedMul * dt;
          maybeReset(c);
          continue;
        }

        if (Math.random() < c.swap) {
          c.head = CHARSET[(Math.random() * CHARSET.length) | 0];
        }

        // Draw Head
        const headR = 180 + Math.floor(c.hueShift * 20);
        const headG = 235 + Math.floor(c.hueShift * 20);
        const headB = 255;
        ctx.fillStyle = `rgba(${headR}, ${headG}, ${headB}, ${0.95 * colVis})`;
        ctx.fillText(c.head, c.x, c.y);

        // Draw Trail
        for (let i = 1; i < c.len; i++) {
          const ty = c.y - i * FONT_SIZE;
          if (ty < -FONT_SIZE) break;
          const t = i / c.len;
          const a = (1 - t) * 0.55 * colVis;
          if (a < 0.025) continue;
          
          const charIndex = (((ty | 0) + i * 7 + (c.x | 0) * 13) >>> 0) % CHARSET.length;
          const ch = CHARSET[charIndex];
          
          const r = 120 + Math.floor(c.hueShift * 40);
          const g = 200 + Math.floor(c.hueShift * 30);
          const b = 255;
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${a})`;
          ctx.fillText(ch, c.x, ty);
        }

        c.y += c.speed * speedMul * dt;
        maybeReset(c);
      }

      // --- NEW: Update and Draw Splashing Particles ---
      for (let i = splashes.length - 1; i >= 0; i--) {
        const p = splashes[i];
        p.vy += 0.35 * dt; // Gravity
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.life -= 0.025 * dt; // Decay

        if (p.life <= 0) {
          splashes.splice(i, 1);
          continue;
        }

        // Frosty iceberg blue for the splash particles
        const r = 180 + Math.floor(p.hueShift * 20);
        const g = 235 + Math.floor(p.hueShift * 20);
        const b = 255;
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${p.life})`;
        ctx.fillText(p.char, p.x, p.y);
      }

      // --- NEW: Process Super Trails (from navbar clicks) ---
      for (let i = superTrails.length - 1; i >= 0; i--) {
        const s = superTrails[i];
        const rawProgress = Math.min(1, (now - s.startTime) / s.duration);
        
        // 0.0 to 0.8 is moving (2 seconds)
        // 0.8 to 1.0 is holding static (0.5 seconds)
        const moveProgress = Math.min(1, rawProgress / 0.8);
        const ease = moveProgress * moveProgress * (3 - 2 * moveProgress);
        
        // Update glitch factor
        if (s.originalChar) {
          // Resolve fully by the time we hit the hold phase
          s.glitchFactor = Math.min(1, moveProgress * 1.5);
        }

        // Calculate viewport positions
        let drawX = s.x;
        let drawY = s.y;

        if (s.startX !== undefined && s.targetX !== undefined) {
          drawX = s.startX + (s.targetX - s.startX) * ease;
        }
        if (s.startY !== undefined && s.targetY !== undefined) {
          drawY = s.startY + (s.targetY - s.startY) * ease;
        }

        const isDone = rawProgress >= 1.0;
        const colVis = s.life * (isDone ? 0 : 1);
        const isWordChar = s.originalChar !== undefined;

        // 1. Trail (Drawn first)
        ctx.font = `${FONT_SIZE}px "JetBrains Mono", ui-monospace, monospace`;
        for (let j = 1; j < s.len; j++) {
          const ty = drawY - j * FONT_SIZE;
          const a = (1 - j / s.len) * 0.8 * colVis;
          if (a < 0.02) break;

          let trailChar = CHARSET[(((ty | 0) + j * 7 + (drawX | 0) * 13) >>> 0) % CHARSET.length];
          if (isWordChar) {
            const trailEase = Math.max(0, moveProgress - (j / s.len) * 0.3);
            if (Math.random() < trailEase) {
              trailChar = s.originalChar!;
            }
          }

          const r = 255;
          const g = 100 + Math.floor(moveProgress * 155);
          const b = Math.floor(moveProgress * 255);
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${a})`;
          ctx.fillText(trailChar, drawX, ty);
        }

        // 2. Head character (Drawn last)
        let headChar = CHARSET[(Math.random() * CHARSET.length) | 0];
        if (isWordChar) {
          const stableProb = moveProgress > 0.3 ? 1.0 : moveProgress / 0.3;
          headChar = Math.random() < stableProb ? s.originalChar! : CHARSET[(Math.random() * CHARSET.length) | 0];
        }

        if (isWordChar) {
           const r = 255;
           const g = 180 + Math.floor(moveProgress * 75);
           const b = 50 + Math.floor(moveProgress * 205);
           
           ctx.font = `bold ${FONT_SIZE + 2}px sans-serif`;
           ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${colVis})`;
           
           if (moveProgress > 0.8) {
             ctx.shadowBlur = 15;
             ctx.shadowColor = "rgba(255, 255, 255, 0.8)";
           }
        } else {
           ctx.font = `${FONT_SIZE}px "JetBrains Mono", ui-monospace, monospace`;
           ctx.fillStyle = `rgba(255, 180, 50, ${colVis})`;
        }
        
        ctx.fillText(headChar, drawX, drawY);
        ctx.shadowBlur = 0;

        if (isDone) {
          superTrails.splice(i, 1);
        }
      }

      if (!reduced) rafId = requestAnimationFrame(step);
    }

    function maybeReset(c: Column) {
      if (c.y - c.len * FONT_SIZE > c.endY) {
        Object.assign(c, freshColumn(Math.round(c.x / FONT_SIZE)));
      }
    }

    function onVisibility() {
      if (document.hidden) {
        cancelAnimationFrame(rafId);
      } else {
        lastT = performance.now();
        if (!reduced) rafId = requestAnimationFrame(step);
      }
    }

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("mousemove", onMouseMove, { passive: true }); // Bound listener
    document.addEventListener("visibilitychange", onVisibility);

    if (reduced) {
      step(performance.now());
    } else {
      rafId = requestAnimationFrame(step);
    }

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("matrix:spawn-trail", handleSpawnTrail);
      window.removeEventListener("matrix:pause", handlePause);
      window.removeEventListener("matrix:resume", handleResume);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <>
      <div className="fixed top-2 left-2 z-[60] font-mono text-[10px] text-cyan-500/50 pointer-events-none">
        {fps} FPS
      </div>
      <canvas
        ref={ref}
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          WebkitMaskImage:
            "linear-gradient(to bottom, #000 0%, #000 55%, rgba(0,0,0,0.6) 80%, transparent 100%)",
          maskImage:
            "linear-gradient(to bottom, #000 0%, #000 55%, rgba(0,0,0,0.6) 80%, transparent 100%)",
        }}
      />
    </>
  );
  }