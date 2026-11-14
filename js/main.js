/* Pengisian data, interaksi, countdown, galeri, audio, dan mode preview. */
(function () {
  "use strict";

  const data = window.invitationData;
  if (!data) return;

  const byId = (id) => document.getElementById(id);
  const setText = (id, value) => {
    const element = byId(id);
    if (element) element.textContent = value;
  };
  const setMany = (entries) => {
    Object.entries(entries).forEach(([id, value]) => setText(id, value));
  };
  const getPath = (object, path) => path.split(".").reduce((value, key) => value && value[key], object);
  const make = (tag, className, text) => {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (text !== undefined) element.textContent = text;
    return element;
  };

  function populateStaticContent() {
    document.title = data.meta.title;
    document.querySelector('meta[name="description"]').setAttribute("content", data.meta.description);
    const favicon = document.createElement("link");
    favicon.rel = "icon";
    favicon.href = data.meta.favicon;
    favicon.type = "image/svg+xml";
    document.head.appendChild(favicon);

    document.querySelectorAll("[data-bind]").forEach((element) => {
      element.textContent = getPath(data, element.dataset.bind) || "";
    });
    document.querySelectorAll("[data-asset]").forEach((image) => {
      const path = getPath(data.assets, image.dataset.asset);
      if (path) image.src = path;
    });

    setMany({
      skipLink: data.navigation.skipCover,
      coverEyebrow: data.cover.eyebrow,
      coverTitle: data.cover.title,
      coverDate: data.cover.date,
      coverIntro: data.cover.intro,
      guestGreeting: data.guest.greeting,
      guestName: data.guest.name,
      guestNote: data.guest.note,
      openLabel: data.cover.button,
      openHint: data.cover.buttonHint,
      monogramLeft: data.cover.monogramLeft,
      monogramRight: data.cover.monogramRight,
      coverNumber: data.cover.number,
      sceneEyebrow: data.scene.eyebrow,
      sceneTitle: data.scene.title,
      sceneSubtitle: data.scene.subtitle,
      sceneSaveDate: data.scene.saveTheDate,
      sceneDate: data.scene.date,
      skipScene: data.scene.skip,
      replayScene: data.scene.replay,
      motionNotice: data.scene.reducedMotion,
      heroEyebrow: data.hero.eyebrow,
      heroTitle: data.hero.names,
      heroDate: data.hero.date,
      heroInvitation: data.hero.invitation,
      heroScroll: data.hero.scroll,
      heroWatermark: data.hero.watermark,
      sealDay: data.hero.sealDay,
      sealMonth: data.hero.sealMonth,
      sealYear: data.hero.sealYear,
      countdownEyebrow: data.countdown.eyebrow,
      countdownTitle: data.countdown.title,
      countdownDescription: data.countdown.description,
      daysLabel: data.countdown.days,
      hoursLabel: data.countdown.hours,
      minutesLabel: data.countdown.minutes,
      secondsLabel: data.countdown.seconds,
      countdownComplete: data.countdown.completed,
      quoteArabic: data.quote.arabic,
      quoteText: data.quote.text,
      quoteCitation: data.quote.citation,
      profilesEyebrow: data.profiles.eyebrow,
      profilesTitle: data.profiles.title,
      profilesIntro: data.profiles.intro,
      eventsEyebrow: data.events.eyebrow,
      eventsTitle: data.events.title,
      eventsIntro: data.events.intro,
      calendarHint: data.events.calendarHint,
      giftsEyebrow: data.gifts.eyebrow,
      giftsTitle: data.gifts.title,
      giftsIntro: data.gifts.intro,
      galleryEyebrow: data.gallery.eyebrow,
      galleryTitle: data.gallery.title,
      galleryIntro: data.gallery.intro,
      galleryCaption: data.gallery.video.caption,
      galleryMeta: data.gallery.video.meta,
      galleryDescription: data.gallery.video.description,
      closingEyebrow: data.closing.eyebrow,
      closingTitle: data.closing.title,
      closingMessage: data.closing.message,
      closingSignoff: data.closing.signoff,
      closingNames: data.closing.names,
      backToCover: data.closing.backToCover,
      footerText: data.closing.footer
    });

    byId("coverPhoto").alt = data.cover.photoAlt;
    byId("scenePhoto").alt = data.scene.photoAlt;
    byId("heroPhoto").alt = data.hero.photoAlt;
    byId("countdownTimer").setAttribute("aria-label", data.countdown.ariaLabel);
    byId("invitationNav").setAttribute("aria-label", data.navigation.label);
    byId("navReplay").setAttribute("aria-label", data.scene.replayLong);
    byId("navReplay").title = data.scene.replayLong;
  }

  function buildNavigation() {
    const container = byId("navLinks");
    data.navigation.items.forEach((item) => {
      const link = make("a", "nav-link", item.label);
      link.href = `#${item.id}`;
      link.dataset.section = item.id;
      container.appendChild(link);
    });
  }

  function buildProfiles() {
    const grid = byId("profilesGrid");
    data.profiles.people.forEach((person, index) => {
      const article = make("article", "profile-card reveal");
      const photo = make("div", "profile-photo");
      const image = make("img");
      image.src = data.assets.portraits[person.key];
      image.alt = person.imageAlt;
      image.loading = "lazy";
      photo.appendChild(image);
      article.appendChild(photo);
      article.appendChild(make("p", "profile-role", person.role));
      article.appendChild(make("h3", "profile-name", person.name));
      article.appendChild(make("p", "profile-parent-prefix", person.parentPrefix));
      article.appendChild(make("p", "profile-parents", `${person.father} & ${person.mother}`));
      article.appendChild(make("p", "profile-city", person.city));
      grid.appendChild(article);

      if (index === 0) {
        const connector = make("div", "profile-connector reveal", data.profiles.connector);
        connector.setAttribute("aria-hidden", "true");
        grid.appendChild(connector);
      }
    });
  }

  function createEventIcon(type) {
    const wrapper = make("span", "event-icon");
    const key = type.toLowerCase().includes("resepsi") ? "resepsi" : "akad";
    const icon = data.events.icons[key];
    const image = make("img");
    image.src = icon.src;
    image.alt = icon.alt;
    wrapper.appendChild(image);
    return wrapper;
  }

  function createVectorMap(visual) {
    const m = visual.mapLabels;
    return `<svg class="location-map-svg" viewBox="0 0 640 480" role="img" aria-label="${visual.alt}">
      <title>${visual.alt}</title>
      <defs><g id="mapMosque"><path d="M-15 12V-2H15V12M-19 12H19M-11-2C-11-15 11-15 11-2M0-13V-19M-3-19H3" fill="none" stroke="#77877e" stroke-width="2" stroke-linecap="round"/></g><g id="mapShop"><path d="M-14 0L0-12L14 0V13H-14V0ZM-17 0H17M-5 13V5H5V13" fill="none" stroke="#77877e" stroke-width="2" stroke-linejoin="round"/></g></defs>
      <rect width="640" height="480" rx="8" fill="#f4f0e7"/>
      <path d="M40 170H580M350 20V450M40 420L600 350M60 250H275M425 250H580M60 95H245M450 95H580M160 170V420M495 170V345" fill="none" stroke="#d4c9b6" stroke-width="25" stroke-linecap="round"/>
      <path d="M40 170H580M350 20V450M40 420L600 350M60 250H275M425 250H580M60 95H245M450 95H580M160 170V420M495 170V345" fill="none" stroke="#fffdf7" stroke-width="19" stroke-linecap="round"/>
      <g fill="#53605a" font-family="Georgia,serif"><text x="320" y="155" text-anchor="middle" font-size="15" letter-spacing="2">${m.mainRoad}</text><text x="365" y="320" text-anchor="middle" font-size="14" letter-spacing="1.4" transform="rotate(-90 365 320)">${m.verticalRoad}</text><text x="315" y="408" text-anchor="middle" font-size="13" letter-spacing="1.2" transform="rotate(-7 315 408)">${m.diagonalRoad}</text><text x="88" y="54" font-size="11" fill="#77877e">${m.mosqueLeft}</text><text x="456" y="54" font-size="11" fill="#77877e">${m.mosqueRight}</text><text x="462" y="312" font-size="11" fill="#77877e">${m.shop}</text></g>
      <g transform="translate(110 72)"><use href="#mapMosque"/></g><g transform="translate(510 72)"><use href="#mapMosque"/></g><g transform="translate(510 285)"><use href="#mapShop"/></g><g transform="translate(112 260)"><use href="#mapMosque"/></g><text x="64" y="285" font-family="Georgia,serif" font-size="11" fill="#77877e">${m.landmark}</text>
      <path class="location-route" d="${visual.routeD}" fill="none" stroke="#b38a4d" stroke-width="5" stroke-linecap="round"/>
      <circle class="location-pin-pulse" cx="350" cy="110" r="12" fill="none" stroke="#b38a4d" stroke-width="2"/>
      <g class="location-home-pin" transform="translate(350 110)"><path d="M0-27C-16-27-25-16-25-3C-25 14 0 36 0 36S25 14 25-3C25-16 16-27 0-27Z" fill="#8b4f55" stroke="#fff8ee" stroke-width="2"/><path d="M0-16C-7-16-12-11-12-5C-12 1 0 15 0 15S12 1 12-5C12-11 7-16 0-16Z" fill="#f7eee6"/><path d="M0-8C-4-8-7-5-7-1C-7 3 0 9 0 9S7 3 7-1C7-5 4-8 0-8Z" fill="#b38a4d"/></g>
      <text x="350" y="45" text-anchor="middle" font-family="Georgia,serif" font-size="16" font-weight="bold" fill="#51443f">${m.home}</text><text x="350" y="64" text-anchor="middle" font-family="Arial,sans-serif" font-size="10" letter-spacing="1" fill="#77877e">${m.homeSubtitle}</text>
      <circle class="location-route-marker" cx="0" cy="0" r="7" fill="#b38a4d" stroke="#fffaf0" stroke-width="3"/>
      <g transform="translate(52 444)"><path d="M0-5L12 0L0 5L3 0Z" fill="#b38a4d"/><text x="20" y="4" font-family="Arial,sans-serif" font-size="11" letter-spacing="1" fill="#77877e">${m.route}</text></g>
    </svg>`;
  }

  function buildEvents() {
    const grid = byId("eventsGrid");
    data.events.items.forEach((event) => {
      const article = make("article", "event-card reveal");
      article.appendChild(make("p", "event-type", event.type));
      article.appendChild(createEventIcon(event.type));
      article.appendChild(make("h3", "event-title", event.title));
      article.appendChild(make("p", "event-date", event.date));
      article.appendChild(make("p", "event-time", event.time));
      article.appendChild(make("p", "event-venue", event.venue));
      article.appendChild(make("p", "event-address", event.address));
      const link = make("a", "button button-outline");
      link.href = event.mapsUrl;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.appendChild(document.createTextNode(data.events.mapsButton));
      link.appendChild(make("span", "maps-new-tab", data.events.mapsNewTab));
      article.appendChild(link);
      grid.appendChild(article);
    });

    const visual = data.events.locationVisual;
    byId("locationMapWrap").innerHTML = createVectorMap(visual);
    byId("locationQrImage").src = visual.qrSrc;
    byId("locationQrImage").alt = visual.qrAlt;
    byId("locationVisualCaption").textContent = visual.caption;
    byId("locationVisualLink").href = visual.fullSrc;
    byId("locationVisualLink").setAttribute("aria-label", visual.linkLabel);
    document.querySelector(".location-route-marker").style.offsetPath = `path("${visual.routeD}")`;
    byId("locationMapsButton").href = visual.mapsUrl;
    byId("locationMapsButton").textContent = visual.mapsButton;
  }

  function fallbackCopy(text) {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.readOnly = true;
    textarea.setAttribute("aria-hidden", "true");
    textarea.style.position = "fixed";
    textarea.style.top = "0";
    textarea.style.left = "-9999px";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    textarea.setSelectionRange(0, text.length);
    let copied = false;
    try {
      copied = document.execCommand("copy");
    } catch (error) {
      copied = false;
    }
    textarea.remove();
    return copied;
  }

  async function copyGiftNumber(method, button, status) {
    window.clearTimeout(status.resetTimer);
    button.disabled = true;
    let copied = false;

    if (navigator.clipboard && typeof navigator.clipboard.writeText === "function") {
      try {
        await navigator.clipboard.writeText(method.number);
        copied = true;
      } catch (error) {
        copied = false;
      }
    }
    if (!copied) copied = fallbackCopy(method.number);

    button.disabled = false;
    status.classList.toggle("is-success", copied);
    status.classList.toggle("is-error", !copied);
    status.textContent = copied ? data.gifts.copied : data.gifts.copyFailed;
    status.resetTimer = window.setTimeout(() => {
      status.textContent = "";
      status.classList.remove("is-success", "is-error");
    }, 3000);
  }

  function buildGifts() {
    const grid = byId("giftsGrid");
    data.gifts.methods.forEach((method) => {
      const card = make("article", "gift-card reveal");
      card.dataset.gift = method.key;
      const methodTitle = make("h3", "gift-method");
      const logo = make("img");
      logo.src = method.logo;
      logo.alt = method.logoAlt;
      methodTitle.appendChild(logo);
      card.appendChild(methodTitle);
      card.appendChild(make("p", "gift-number-label", method.numberLabel));
      card.appendChild(make("p", "gift-number", method.number));
      const account = make("p", "gift-account");
      account.appendChild(make("span", "", `${data.gifts.accountNameLabel} `));
      account.appendChild(document.createTextNode(method.accountName));
      card.appendChild(account);
      const button = make("button", "button button-outline gift-copy", data.gifts.copyButton);
      button.type = "button";
      button.dataset.copyNumber = method.number;
      button.setAttribute("aria-label", `${data.gifts.copyButton} ${method.name}`);
      const status = make("p", "gift-status");
      status.setAttribute("role", "status");
      status.setAttribute("aria-live", "polite");
      status.setAttribute("aria-atomic", "true");
      button.addEventListener("click", () => copyGiftNumber(method, button, status));
      card.appendChild(button);
      card.appendChild(status);
      grid.appendChild(card);
    });
  }

  function setupGallery() {
    const video = byId("galleryVideo");
    const source = byId("galleryVideoSource");
    const toggle = byId("galleryToggle");
    const status = byId("galleryStatus");
    const labels = data.gallery.video;
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    video.muted = true;
    video.defaultMuted = true;
    video.loop = true;
    video.playsInline = true;
    video.setAttribute("playsinline", "");
    video.setAttribute("webkit-playsinline", "");
    video.poster = labels.poster;
    source.src = labels.src;
    byId("galleryCouple").src = data.gallery.couple.src;
    byId("galleryCouple").alt = data.gallery.couple.alt;

    const updateToggle = () => {
      const playing = !video.paused && !video.ended;
      toggle.textContent = playing ? labels.pause : labels.play;
      toggle.setAttribute("aria-label", playing ? labels.pauseLong : labels.playLong);
      toggle.setAttribute("aria-pressed", String(playing));
      status.textContent = motionQuery.matches && !playing
        ? labels.reducedMotion
        : playing ? labels.playing : labels.paused;
    };

    const startPlayback = async () => {
      try {
        await video.play();
      } catch (error) {
        video.autoplay = false;
        updateToggle();
      }
    };

    const applyMotionPreference = () => {
      if (motionQuery.matches) {
        video.autoplay = false;
        video.pause();
        video.currentTime = 0;
        updateToggle();
        status.textContent = labels.reducedMotion;
      } else {
        status.textContent = labels.ready;
        video.autoplay = true;
        startPlayback();
      }
    };

    toggle.addEventListener("click", () => {
      if (video.paused) {
        video.autoplay = true;
        startPlayback();
      } else {
        video.autoplay = false;
        video.pause();
      }
    });
    video.addEventListener("play", updateToggle);
    video.addEventListener("pause", updateToggle);
    video.addEventListener("error", () => {
      video.autoplay = false;
      toggle.disabled = true;
      status.textContent = labels.unavailable;
    });
    motionQuery.addEventListener("change", applyMotionPreference);
    video.load();
    applyMotionPreference();
  }

  function startCountdown() {
    const target = new Date(data.couple.weddingDateISO).getTime();
    const timer = byId("countdownTimer");
    const complete = byId("countdownComplete");
    let interval;

    const update = () => {
      const distance = target - Date.now();
      if (!Number.isFinite(target) || distance <= 0) {
        timer.hidden = true;
        complete.hidden = false;
        if (interval) window.clearInterval(interval);
        return;
      }
      const totalSeconds = Math.floor(distance / 1000);
      const days = Math.floor(totalSeconds / 86400);
      const hours = Math.floor((distance % 86400000) / 3600000);
      const minutes = Math.floor((distance % 3600000) / 60000);
      const seconds = totalSeconds % 60;
      setText("days", String(days).padStart(3, "0"));
      setText("hours", String(hours).padStart(2, "0"));
      setText("minutes", String(minutes).padStart(2, "0"));
      setText("seconds", String(seconds).padStart(2, "0"));
      timer.setAttribute("aria-label", `${data.countdown.ariaLabel}: ${days} ${data.countdown.days}, ${hours} ${data.countdown.hours}, ${minutes} ${data.countdown.minutes}`);
    };

    update();
    interval = window.setInterval(update, 1000);
  }

  function setupReveals() {
    const elements = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -30px" });
    elements.forEach((element) => observer.observe(element));
  }

  function setupActiveNavigation() {
    if (!("IntersectionObserver" in window)) return;
    const links = document.querySelectorAll(".nav-link");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.forEach((link) => {
          const active = link.dataset.section === entry.target.id;
          link.classList.toggle("is-active", active);
          if (active) link.setAttribute("aria-current", "location");
          else link.removeAttribute("aria-current");
        });
      });
    }, { rootMargin: "-35% 0px -55%", threshold: 0 });
    data.navigation.items.forEach((item) => observer.observe(byId(item.id)));
  }

  const audio = byId("backgroundAudio");
  const audioButton = byId("audioToggle");
  let audioAvailable = false;

  function updateAudioButton() {
    const playing = !audio.paused && !audio.ended;
    audioButton.classList.toggle("is-muted", !playing);
    const label = playing ? data.navigation.audioPlaying : data.navigation.audioAvailable;
    audioButton.setAttribute("aria-label", label);
    audioButton.title = label;
  }

  function setupAudio() {
    audioButton.hidden = true;
    audioButton.disabled = true;
    if (!data.audio.enabled || !data.audio.src) return;

    audio.src = data.audio.src;
    audio.loop = data.audio.loop;
    audio.volume = data.audio.volume;
    audio.preload = "metadata";
    audio.addEventListener("canplay", () => {
      audioAvailable = true;
      audioButton.disabled = false;
      audioButton.hidden = false;
      updateAudioButton();
    });
    audio.addEventListener("error", () => {
      audioAvailable = false;
      audioButton.hidden = true;
      audioButton.disabled = true;
    });
    audio.addEventListener("play", updateAudioButton);
    audio.addEventListener("pause", updateAudioButton);
    audioButton.addEventListener("click", async () => {
      if (!audioAvailable) return;
      if (!audio.paused) {
        audio.pause();
        return;
      }
      try {
        await audio.play();
      } catch (error) {
        audioButton.title = data.navigation.audioError;
        audioButton.setAttribute("aria-label", data.navigation.audioError);
      }
    });
    audio.load();
  }

  function playAudioAfterGesture() {
    if (!audioAvailable || !audio.paused) return;
    audio.play().catch(() => {
      // Autoplay yang ditolak browser bukan error aplikasi; kontrol tetap dapat dipakai.
      updateAudioButton();
    });
  }

  populateStaticContent();
  buildNavigation();
  buildProfiles();
  buildEvents();
  buildGifts();
  setupGallery();
  startCountdown();
  setupReveals();
  setupActiveNavigation();
  setupAudio();

  const scene = new window.InvitationScene(data, {
    onFinish: () => {
      const hadSceneFocus = byId("scene").contains(document.activeElement);
      showContent();
      if (hadSceneFocus) byId("invitation").focus({ preventScroll: true });
    }
  });

  function showContent() {
    byId("cover").hidden = true;
    byId("invitation").hidden = false;
    byId("footer").hidden = false;
    byId("invitationNav").hidden = false;
    document.body.classList.remove("is-locked");
  }

  function openInvitation(withScene = true) {
    window.scrollTo(0, 0);
    showContent();
    playAudioAfterGesture();
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (withScene && !reducedMotion) {
      scene.show();
      byId("skipScene").focus({ preventScroll: true });
    } else {
      byId("invitation").focus({ preventScroll: true });
    }
  }

  function showCover() {
    if (scene.active) scene.skip();
    if (!audio.paused) audio.pause();
    byId("cover").hidden = false;
    byId("invitation").hidden = true;
    byId("footer").hidden = true;
    byId("invitationNav").hidden = true;
    document.body.classList.add("is-locked");
    window.scrollTo(0, 0);
    byId("openInvitation").focus({ preventScroll: true });
  }

  byId("openInvitation").addEventListener("click", () => openInvitation(true));
  byId("navReplay").addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "auto" });
    scene.show({ hold: window.matchMedia("(prefers-reduced-motion: reduce)").matches });
    byId("skipScene").focus({ preventScroll: true });
  });
  byId("backToCover").addEventListener("click", showCover);
  byId("skipLink").addEventListener("click", (event) => {
    event.preventDefault();
    openInvitation(false);
  });
  byId("navLinks").addEventListener("click", () => {
    if (scene.active) scene.skip();
  });

  const previewMode = new URLSearchParams(window.location.search).get("preview");
  if (previewMode === "open") {
    openInvitation(false);
  } else if (previewMode === "scene") {
    showContent();
    scene.show({ hold: true });
  }
})();
