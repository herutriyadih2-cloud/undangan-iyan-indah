/* Tema surga: video latar hemat cache + ambient SVG/CSS tanpa dependensi. */
(function () {
  "use strict";

  const data = window.invitationData;
  if (!data || !data.theme) return;

  class HeavenTheme {
    constructor(config) {
      this.config = config;
      this.motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      this.visibleSections = new Set();
      this.videos = [];
      this.ambientSections = [];
      this.observer = null;
      this.buildBackgrounds();
      this.buildAmbient();
      this.buildNature();
      this.buildFlowers();
      this.buildSakura();
      this.observeSections();
      this.motionQuery.addEventListener("change", () => this.applyMotionPreference());
      document.addEventListener("visibilitychange", () => this.syncPlayback());
      this.applyMotionPreference();
    }

    buildBackgrounds() {
      this.config.sections.forEach(({ id, variant }) => {
        const section = document.getElementById(id);
        if (!section) return;
        const backdrop = document.createElement("div");
        backdrop.className = `heaven-backdrop heaven-${variant}`;
        backdrop.setAttribute("aria-hidden", "true");

        const video = document.createElement("video");
        video.className = "heaven-video";
        video.dataset.heavenVideo = id;
        video.muted = true;
        video.defaultMuted = true;
        video.loop = true;
        video.playsInline = true;
        video.autoplay = false;
        video.preload = "metadata";
        video.poster = this.config.video.poster;
        video.src = this.config.video.src;
        video.setAttribute("playsinline", "");
        video.setAttribute("webkit-playsinline", "");
        video.setAttribute("tabindex", "-1");
        video.setAttribute("aria-hidden", "true");

        const overlay = document.createElement("div");
        overlay.className = "heaven-overlay";
        backdrop.append(video, overlay);
        section.prepend(backdrop);
        section.dataset.themeVisible = "false";
        this.videos.push({ section, video, id });
      });
      document.body.classList.add("heaven-theme");
    }

    observeSections() {
      if (!("IntersectionObserver" in window)) return;
      this.observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          const id = entry.target.id;
          entry.target.dataset.themeVisible = String(entry.isIntersecting);
          if (entry.isIntersecting) this.visibleSections.add(id);
          else this.visibleSections.delete(id);
        });
        this.syncPlayback();
      }, {
        rootMargin: this.config.playback.rootMargin,
        threshold: this.config.playback.threshold
      });
      this.videos.forEach(({ section }) => this.observer.observe(section));
    }

    syncPlayback() {
      const allowPlayback = !this.motionQuery.matches && !document.hidden;
      this.videos.forEach(({ id, video }) => {
        const shouldPlay = allowPlayback && this.visibleSections.has(id);
        if (shouldPlay) {
          video.autoplay = true;
          const promise = video.play();
          if (promise && typeof promise.catch === "function") {
            promise.catch(() => {
              video.autoplay = false;
            });
          }
        } else {
          video.autoplay = false;
          video.pause();
        }
      });
    }

    applyMotionPreference() {
      document.body.classList.toggle("reduced-motion", this.motionQuery.matches);
      if (this.motionQuery.matches) {
        this.videos.forEach(({ video }) => {
          video.autoplay = false;
          video.pause();
          try {
            video.currentTime = 0;
          } catch (error) {
            // Metadata belum siap; poster tetap menjadi tampilan awal.
          }
        });
      }
      this.syncPlayback();
    }

    buildAmbient() {
      const cloudPath = "M8 62C1 62-4 55 2 49C5 45 10 44 15 45C17 31 29 22 43 25C51 12 70 10 82 20C88 24 92 30 93 37C107 34 119 42 120 53C121 60 115 64 106 64H8Z";
      this.config.ambientSections.forEach((id, sectionIndex) => {
        const section = document.getElementById(id);
        if (!section) return;
        const ambient = document.createElement("div");
        ambient.className = "theme-ambient";
        ambient.setAttribute("aria-hidden", "true");

        for (let index = 0; index < this.config.ambient.clouds; index++) {
          const cloud = document.createElementNS("http://www.w3.org/2000/svg", "svg");
          cloud.setAttribute("viewBox", "0 0 124 72");
          cloud.setAttribute("class", `ambient-cloud ambient-cloud-${index + 1}`);
          cloud.style.setProperty("--cloud-duration", `${26 + sectionIndex * 3 + index * 7}s`);
          const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
          path.setAttribute("d", cloudPath);
          cloud.appendChild(path);
          ambient.appendChild(cloud);
        }

        for (let index = 0; index < this.config.ambient.stars; index++) {
          const star = document.createElement("i");
          star.className = "ambient-star";
          star.style.setProperty("--x", `${8 + ((index * 17 + sectionIndex * 9) % 86)}%`);
          star.style.setProperty("--y", `${9 + ((index * 23 + sectionIndex * 7) % 76)}%`);
          star.style.setProperty("--delay", `${-(index * 0.83 + sectionIndex)}s`);
          star.style.setProperty("--duration", `${3.2 + (index % 3)}s`);
          star.style.setProperty("--size", `${3 + (index % 2) * 2}px`);
          ambient.appendChild(star);
        }

        for (let index = 0; index < this.config.ambient.petals; index++) {
          const petal = document.createElement("b");
          petal.className = "ambient-petal";
          petal.style.setProperty("--x", `${14 + ((index * 29 + sectionIndex * 13) % 76)}%`);
          petal.style.setProperty("--delay", `${-(index * 3.7 + sectionIndex * 2)}s`);
          petal.style.setProperty("--duration", `${16 + index * 3}s`);
          ambient.appendChild(petal);
        }
        section.prepend(ambient);
        this.ambientSections.push({ section, ambient });
      });
    }

    buildNature() {
      const crownPath = "M90 18C65-2 38 9 38 31C14 27 0 45 8 64C-4 83 10 102 31 103C23 126 44 141 62 136C69 157 97 159 110 142C132 151 154 136 150 116C174 108 180 82 162 67C167 43 144 27 125 35C118 15 103 9 90 18Z";
      this.config.natureSections.forEach(({ id, variant }, sectionIndex) => {
        const section = document.getElementById(id);
        if (!section) return;
        const nature = document.createElement("div");
        nature.className = `nature-ambient nature-${variant}`;
        nature.setAttribute("aria-hidden", "true");

        for (let index = 0; index < this.config.nature.trees; index++) {
          const tree = document.createElementNS("http://www.w3.org/2000/svg", "svg");
          tree.setAttribute("viewBox", "0 0 180 280");
          tree.setAttribute("class", `nature-tree nature-tree-${index + 1}`);
          tree.style.setProperty("--x", `${[-12, -5, 92, 102, 108][index]}%`);
          tree.style.setProperty("--scale", String(0.85 + ((index * 11) % 35) / 100));
          tree.style.setProperty("--duration", `${4 + index * 0.9}s`);
          tree.style.setProperty("--delay", `${-(index * 1.7 + sectionIndex)}s`);
          tree.innerHTML = `<path d="M86 274L94 274L99 96L84 96Z" fill="currentColor" opacity=".85"/><path d="M91 155L48 100M94 134L136 77M89 112L66 63M94 185L139 132" fill="none" stroke="currentColor" stroke-width="6" stroke-linecap="round"/><g class="tree-crown"><path d="${crownPath}" fill="currentColor"/><path d="M35 65Q89 29 145 66M45 105Q90 72 139 103" fill="none" stroke="#ffffff" stroke-width="2" opacity=".12"/></g>`;
          nature.appendChild(tree);
        }

        for (let index = 0; index < this.config.nature.birds; index++) {
          const bird = document.createElement("span");
          bird.className = `nature-bird flight-${index % 2 === 0 ? "a" : "b"}`;
          bird.style.setProperty("--y", `${3 + ((index * 2 + sectionIndex) % 5)}%`);
          bird.style.setProperty("--duration", `${17 + index * 4 + sectionIndex * 2}s`);
          bird.style.setProperty("--delay", `${-(index * 5.3 + sectionIndex * 3.7)}s`);
          bird.style.setProperty("--bird-size", `${38 + (index % 3) * 9}px`);
          bird.innerHTML = `<svg viewBox="0 0 64 32"><path class="bird-wing bird-wing-left" d="M30 18C20 3 8 2 2 9C13 11 20 20 30 23Z"/><path class="bird-wing bird-wing-right" d="M34 18C44 3 56 2 62 9C51 11 44 20 34 23Z"/><path d="M28 19Q32 15 36 19L34 25H30Z" fill="currentColor"/><circle cx="34" cy="17" r="2.5" fill="currentColor"/><path d="M36 17L41 18.5L36 20Z" fill="#c5a461"/></svg>`;
          nature.appendChild(bird);
        }
        section.prepend(nature);
      });
    }

    buildFlowers() {
      const placements = [
        { side: "left", vertical: "top", offset: 3, size: 235, angle: -24 },
        { side: "right", vertical: "top", offset: 13, size: 190, angle: 18 },
        { side: "left", vertical: "bottom", offset: -3, size: 285, angle: 8 },
        { side: "right", vertical: "bottom", offset: 1, size: 225, angle: -16 }
      ];
      const petalLanes = [3, 7, 11, 15, 85, 89, 93, 97];
      this.config.flowerSections.forEach((id, sectionIndex) => {
        const section = document.getElementById(id);
        if (!section) return;
        const garden = document.createElement("div");
        garden.className = `flower-garden flower-garden-${id}`;
        garden.setAttribute("aria-hidden", "true");

        placements.slice(0, this.config.flowers.clusters).forEach((placement, index) => {
          const cluster = document.createElement("span");
          cluster.className = `flower-cluster flower-${placement.side}`;
          cluster.style[placement.vertical] = `${placement.offset + (sectionIndex % 2) * 2}%`;
          cluster.style[placement.side] = `${-52 - index * 7}px`;
          cluster.style.setProperty("--size", `${placement.size + (sectionIndex % 3) * 16}px`);
          cluster.style.setProperty("--mobile-size", `${105 + index * 12}px`);
          const sway = document.createElement("span");
          sway.className = "flower-sway";
          sway.style.setProperty("--base-angle", `${placement.angle}deg`);
          sway.style.setProperty("--sway-angle", `${6 + (index % 3) * 2}deg`);
          sway.style.setProperty("--duration", `${3.4 + ((index + sectionIndex) % 4) * 0.8}s`);
          sway.style.setProperty("--delay", `${-(index * 0.9 + sectionIndex * 0.4)}s`);
          const image = document.createElement("img");
          image.src = window.invitationData.assets.floral;
          image.alt = "";
          sway.appendChild(image);
          cluster.appendChild(sway);
          garden.appendChild(cluster);
        });

        petalLanes.slice(0, this.config.flowers.petals).forEach((lane, index) => {
          const petal = document.createElement("i");
          petal.className = "flower-petal";
          petal.style.setProperty("--x", `${lane}%`);
          petal.style.setProperty("--duration", `${5.5 + (index % 4) * 1.2}s`);
          petal.style.setProperty("--delay", `${-(index * 1.15 + sectionIndex * 0.7)}s`);
          petal.style.setProperty("--drift", `${lane < 50 ? 24 : -24}px`);
          petal.style.setProperty("--spin", `${180 + (index % 3) * 60}deg`);
          garden.appendChild(petal);
        });
        section.prepend(garden);
      });
    }

    buildSakura() {
      const placements = [
        { side: "left", vertical: "top", size: 360, offset: -72, angle: -3 },
        { side: "right", vertical: "top", size: 330, offset: -88, angle: 3 },
        { side: "left", vertical: "bottom", size: 430, offset: -92, angle: 2 },
        { side: "right", vertical: "bottom", size: 390, offset: -106, angle: -2 }
      ];
      const lanes = [2, 5, 8, 11, 14, 18, 82, 85, 88, 91, 94, 97];
      const blooms = [
        [282, 68, 1.2], [326, 94, .85], [236, 104, 1], [192, 137, .9],
        [148, 169, 1.15], [111, 205, .8], [93, 250, 1], [172, 205, .75],
        [221, 177, 1.25], [273, 153, .82], [316, 151, 1.1], [351, 124, .72],
        [131, 111, .75], [202, 75, .8], [254, 221, .72]
      ];
      this.config.sakuraSections.forEach((id, sectionIndex) => {
        const section = document.getElementById(id);
        if (!section) return;
        const grove = document.createElement("div");
        grove.className = `sakura-grove sakura-grove-${id}`;
        grove.setAttribute("aria-hidden", "true");

        placements.slice(0, this.config.sakura.branches).forEach((placement, index) => {
          const tree = document.createElementNS("http://www.w3.org/2000/svg", "svg");
          tree.setAttribute("viewBox", "0 0 420 420");
          tree.setAttribute("class", `sakura-tree sakura-${placement.vertical} sakura-${placement.side}`);
          tree.style.width = `${placement.size + (sectionIndex % 2) * 24}px`;
          tree.style[placement.vertical] = `${placement.offset}px`;
          tree.style[placement.side] = `${placement.vertical === "top" ? -72 : -88}px`;
          tree.style.setProperty("--duration", `${4.2 + index * 0.65}s`);
          tree.style.setProperty("--delay", `${-(index + sectionIndex) * 0.7}s`);
          tree.style.setProperty("--angle", `${placement.angle}deg`);
          const bloomUses = blooms.map(([x, y, scale], bloomIndex) =>
            `<use href="#sakuraBloom" class="sakura-bloom bloom-${bloomIndex % 3}" transform="translate(${x} ${y}) scale(${scale})"/>`
          ).join("");
          tree.innerHTML = `<defs><g id="sakuraBloom"><path d="M0-5C-4-11 4-13 6-7C12-9 15-2 9 2C14 7 7 12 2 8C-2 14-9 10-8 4C-14 2-11-5-5-4Z"/><circle r="2.2" fill="#d7b77d"/></g></defs><g class="sakura-crown"><g class="sakura-limbs"><path d="M28 430C63 356 72 276 120 195C157 140 219 104 282 68M82 282C139 242 183 206 221 147M118 201C130 151 139 119 131 74M158 151C212 159 267 156 316 123M205 112C239 103 283 105 326 94M109 218C83 204 57 195 29 193M178 177C170 139 177 105 202 75M236 127C276 125 318 133 351 124"/></g><g class="sakura-blossoms">${bloomUses}</g></g>`;
          grove.appendChild(tree);
        });

        lanes.slice(0, this.config.sakura.petals).forEach((lane, index) => {
          const petal = document.createElement("i");
          petal.className = "sakura-petal";
          petal.style.setProperty("--x", `${lane}%`);
          petal.style.setProperty("--size", `${8 + (index % 3) * 3}px`);
          petal.style.setProperty("--duration", `${5.2 + (index % 4) * 1.1}s`);
          petal.style.setProperty("--delay", `${-(index * 0.93 + sectionIndex * 0.8)}s`);
          petal.style.setProperty("--drift", `${(lane < 50 ? 1 : -1) * (28 + (index % 3) * 12)}px`);
          petal.style.setProperty("--spin", `${300 + (index % 3) * 140}deg`);
          grove.appendChild(petal);
        });
        section.prepend(grove);
      });
    }
  }

  window.heavenTheme = new HeavenTheme(data.theme);
})();
