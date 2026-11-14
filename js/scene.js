/* Animasi pembuka 2.5D tanpa library. Dipisahkan agar mudah disetel atau diganti. */
(function () {
  "use strict";

  const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));
  const segment = (value, start, end) => clamp((value - start) / (end - start));
  const smooth = (value) => {
    const t = clamp(value);
    return t * t * (3 - 2 * t);
  };
  const easeOut = (value) => 1 - Math.pow(1 - clamp(value), 3);

  class InvitationScene {
    constructor(data, callbacks = {}) {
      this.data = data;
      this.callbacks = callbacks;
      this.element = document.getElementById("scene");
      this.world = document.getElementById("sceneWorld");
      this.viewport = document.getElementById("sceneViewport");
      this.progressBar = document.getElementById("sceneProgress");
      this.depths = Array.from(this.element.querySelectorAll(".scene-depth"));
      this.portrait = this.element.querySelector(".depth-portrait");
      this.copy = this.element.querySelector(".depth-copy");
      this.florals = this.element.querySelector(".depth-floral");
      this.arches = this.element.querySelector(".depth-middle");
      this.motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      this.active = false;
      this.hold = false;
      this.progress = 0;
      this.pointer = { x: 0, y: 0 };
      this.pointerTarget = { x: 0, y: 0 };
      this.frame = null;
      this.finishTimer = null;
      this.startedAt = 0;

      this.tick = this.tick.bind(this);
      this.onPointerMove = this.onPointerMove.bind(this);
      this.onKeyDown = this.onKeyDown.bind(this);
      this.onWheel = this.onWheel.bind(this);

      document.getElementById("skipScene").addEventListener("click", () => this.skip());
      document.getElementById("replayScene").addEventListener("click", () => this.play());
    }

    show(options = {}) {
      window.clearTimeout(this.finishTimer);
      this.element.classList.remove("is-finishing");
      this.element.hidden = false;
      this.active = true;
      this.hold = Boolean(options.hold);
      this.progress = this.hold ? 0.84 : 0;
      this.addListeners();
      this.render(this.progress);

      if (this.hold) {
        this.drawFrameOnly();
      } else {
        this.play();
      }
    }

    play() {
      if (!this.active) {
        this.show({ hold: this.motionQuery.matches });
        return;
      }

      window.cancelAnimationFrame(this.frame);
      window.clearTimeout(this.finishTimer);
      this.element.classList.remove("is-finishing");
      this.hold = this.motionQuery.matches;
      this.progress = this.hold ? 0.84 : 0;
      this.startedAt = performance.now();
      this.render(this.progress);

      if (this.hold) {
        document.getElementById("motionNotice").hidden = false;
        this.drawFrameOnly();
      } else {
        document.getElementById("motionNotice").hidden = true;
        this.frame = window.requestAnimationFrame(this.tick);
      }
    }

    tick(now) {
      if (!this.active || this.hold) return;
      const duration = this.data.motion.sceneDurationMs;
      this.progress = clamp((now - this.startedAt) / duration);
      this.pointer.x += (this.pointerTarget.x - this.pointer.x) * 0.065;
      this.pointer.y += (this.pointerTarget.y - this.pointer.y) * 0.065;
      this.render(this.progress);

      if (this.progress >= 1) {
        this.finish();
      } else {
        this.frame = window.requestAnimationFrame(this.tick);
      }
    }

    render(progress) {
      const p = clamp(progress);
      const dolly = smooth(segment(p, 0, 0.82));
      const cameraScale = 1.25 - (0.25 * dolly);
      const driftY = 22 * (1 - easeOut(segment(p, 0, 0.7)));
      const strength = this.data.motion.parallaxStrength;

      this.world.style.transform = `translate3d(0, ${driftY}px, 0) scale(${cameraScale})`;
      this.world.style.filter = `brightness(${0.91 + (0.09 * easeOut(segment(p, 0, 0.45)))})`;

      this.depths.forEach((layer) => {
        const depth = Number(layer.dataset.depth || 0);
        const x = this.pointer.x * strength * depth;
        const y = this.pointer.y * strength * depth * 0.65;
        const layerScale = 1 + ((1 - dolly) * depth * 0.12);
        layer.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${layerScale})`;
      });

      const portraitIn = smooth(segment(p, 0.08, 0.4));
      this.portrait.style.opacity = String(portraitIn);
      this.portrait.style.transform += ` translateY(${45 * (1 - portraitIn)}px)`;

      const copyIn = smooth(segment(p, 0.4, 0.7));
      this.copy.style.opacity = String(copyIn);
      this.copy.style.transform += ` translateY(${30 * (1 - copyIn)}px)`;

      const floralIn = smooth(segment(p, 0, 0.3));
      this.florals.style.opacity = String(0.25 + (0.75 * floralIn));
      const archIn = smooth(segment(p, 0.03, 0.5));
      this.arches.style.opacity = String(0.35 + (0.65 * archIn));
      this.progressBar.style.transform = `scaleX(${p})`;
      this.element.setAttribute("aria-valuenow", String(Math.round(p * 100)));
    }

    drawFrameOnly() {
      this.pointer.x = this.pointerTarget.x;
      this.pointer.y = this.pointerTarget.y;
      this.render(this.progress);
    }

    onPointerMove(event) {
      if (!this.active) return;
      this.pointerTarget.x = clamp((event.clientX / window.innerWidth) * 2 - 1, -1, 1);
      this.pointerTarget.y = clamp((event.clientY / window.innerHeight) * 2 - 1, -1, 1);
      if (this.hold) this.drawFrameOnly();
    }

    onKeyDown(event) {
      if (event.key === "Escape" && this.active) {
        event.preventDefault();
        this.skip();
      }
    }

    onWheel() {
      if (this.active && !this.hold) this.skip();
    }

    addListeners() {
      window.addEventListener("pointermove", this.onPointerMove, { passive: true });
      window.addEventListener("keydown", this.onKeyDown);
      window.addEventListener("wheel", this.onWheel, { passive: true });
    }

    removeListeners() {
      window.removeEventListener("pointermove", this.onPointerMove);
      window.removeEventListener("keydown", this.onKeyDown);
      window.removeEventListener("wheel", this.onWheel);
    }

    finish() {
      if (!this.active) return;
      window.cancelAnimationFrame(this.frame);
      this.progress = 1;
      this.render(1);
      this.element.classList.add("is-finishing");
      this.finishTimer = window.setTimeout(() => this.hide(), 700);
    }

    skip() {
      if (!this.active) return;
      window.cancelAnimationFrame(this.frame);
      window.clearTimeout(this.finishTimer);
      this.element.classList.add("is-finishing");
      this.finishTimer = window.setTimeout(() => this.hide(), 220);
    }

    hide() {
      this.active = false;
      this.hold = false;
      this.element.hidden = true;
      this.element.classList.remove("is-finishing");
      this.removeListeners();
      if (typeof this.callbacks.onFinish === "function") this.callbacks.onFinish();
    }
  }

  window.InvitationScene = InvitationScene;
})();
