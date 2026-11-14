/*
 * PUSAT DATA UNDANGAN
 * Ganti seluruh teks, tanggal, tautan, dan path aset final dari file ini saja.
 * Nama, orang tua, lokasi, dan rekening berasal dari pengguna.
 * Tanggal dan jam sudah dikonfirmasi; foto utama/profil dari pengguna.
 * Video galeri burung dan gunung dibuat orisinal secara prosedural.
 */
window.invitationData = {
  meta: {
    title: "Undangan Pernikahan Iyan None & Indah",
    description: "Undangan pernikahan Iyan None dan Indah. Akad 5 Desember 2026 pukul 08.00–13.00 WIB; resepsi 6 Desember 2026 pukul 13.00 WIB–selesai.",
    favicon: "assets/images/monogram.svg"
  },

  assets: {
    arch: "assets/images/mughal-arch.svg",
    floral: "assets/images/floral-spray.svg",
    couple: "assets/images/couple-heaven.webp",
    portraits: {
      muliansyah: "assets/images/muliansyah-profile.webp",
      indah: "assets/images/indah-profile.webp"
    }
  },

  guest: {
    greeting: "Kepada Yth.",
    name: "Bapak/Ibu/Saudara/i",
    note: "Mohon maaf apabila ada kesalahan penulisan nama atau gelar."
  },

  couple: {
    shortNames: "Iyan None & Indah",
    firstName: "Iyan None",
    secondName: "Indah",
    fullNames: "Iyan None & Indah",
    initials: "I  •  I",
    weddingDateISO: "2026-12-05T08:00:00+07:00",
    dateLong: "Sabtu, 5 Desember 2026",
    dateShort: "06 . 12 . 2026",
    saveTheDate: "Save the Date",
    opening: "Dengan memohon rahmat dan ridha Tuhan Yang Maha Esa, kami bermaksud menyelenggarakan pernikahan kami.",
    closingNames: "Iyan None & Indah"
  },

  cover: {
    eyebrow: "The Wedding Of",
    title: "Iyan None & Indah",
    date: "6 Desember 2026",
    intro: "Sebuah perjalanan menuju hari yang kami nantikan.",
    button: "Buka Undangan",
    buttonHint: "Sentuh untuk memulai perjalanan",
    photoAlt: "Ilustrasi 3D Iyan None dan Indah dengan busana pernikahan putih silver",
    monogramLeft: "I",
    monogramRight: "I",
    number: "06 / 12 / 26"
  },

  scene: {
    eyebrow: "A moment to remember",
    title: "Iyan None & Indah",
    subtitle: "Dua hati, satu perjalanan",
    saveTheDate: "Save the Date",
    date: "06 . 12 . 2026",
    skip: "Lewati",
    replay: "Putar Ulang",
    replayLong: "Putar ulang animasi",
    progress: "Animasi pembuka",
    reducedMotion: "Animasi ditampilkan sebagai gambar diam sesuai preferensi gerak perangkat.",
    photoAlt: "Ilustrasi 3D Iyan None dan Indah dalam bingkai lengkungan Mughal",
    flowerAlt: "",
    endLabel: "Menuju isi undangan"
  },

  navigation: {
    label: "Navigasi undangan",
    skipCover: "Lewati sampul dan buka isi undangan",
    items: [
      { id: "home", label: "Beranda" },
      { id: "couple", label: "Mempelai" },
      { id: "events", label: "Acara" },
      { id: "gallery", label: "Galeri" }
    ],
    audioAvailable: "Putar musik",
    audioPlaying: "Jeda musik",
    audioUnavailable: "Musik belum tersedia",
    audioError: "Audio tidak dapat diputar. Periksa file musik pada konfigurasi."
  },

  hero: {
    eyebrow: "Together with their families",
    names: "Iyan None & Indah",
    date: "6 Desember 2026",
    invitation: "Kami mengundang Anda untuk menjadi bagian dari hari bahagia kami.",
    scroll: "Gulir untuk menjelajah",
    photoAlt: "Ilustrasi 3D Iyan None dan Indah pada undangan pernikahan",
    watermark: "I & I",
    sealDay: "06",
    sealMonth: "DEC",
    sealYear: "26"
  },

  countdown: {
    eyebrow: "Counting down to forever",
    title: "Menuju Hari Bahagia",
    description: "Setiap detik membawa kami lebih dekat kepada Anda di hari istimewa ini.",
    days: "Hari",
    hours: "Jam",
    minutes: "Menit",
    seconds: "Detik",
    completed: "Hari bahagia telah tiba. Terima kasih atas doa dan kehadiran Anda.",
    ariaLabel: "Hitung mundur menuju akad 5 Desember 2026"
  },

  quote: {
    citation: "QS. Ar-Rūm : 21",
    arabic: "وَمِنْ اٰيٰتِهٖٓ اَنْ خَلَقَ لَكُمْ مِّنْ اَنْفُسِكُمْ اَزْوَاجًا لِّتَسْكُنُوْٓا اِلَيْهَا وَجَعَلَ بَيْنَكُمْ مَّوَدَّةً وَّرَحْمَةًۗ اِنَّ فِيْ ذٰلِكَ لَاٰيٰتٍ لِّقَوْمٍ يَّتَفَكَّرُوْنَ",
    text: "“Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang. Sungguh, pada yang demikian itu benar-benar terdapat tanda-tanda (kebesaran Allah) bagi kaum yang berpikir.”"
  },

  profiles: {
    eyebrow: "The bride & groom",
    title: "Kami yang Berbahagia",
    intro: "Dengan penuh syukur, perkenalkan kami dan keluarga tercinta.",
    connector: "&",
    people: [
      {
        key: "muliansyah",
        role: "Mempelai Pria",
        name: "Iyan None",
        shortName: "Iyan None",
        parentPrefix: "Putra ketiga dari",
        fatherLabel: "Bapak",
        father: "Bapak Herli",
        motherLabel: "Ibu",
        mother: "Ibu Ida",
        city: "",
        imageAlt: "Foto mempelai pria Iyan None"
      },
      {
        key: "indah",
        role: "Mempelai Wanita",
        name: "Indah",
        shortName: "Indah",
        parentPrefix: "Putri kelima dari",
        fatherLabel: "Bapak",
        father: "Bapak Jumadi",
        motherLabel: "Ibu",
        mother: "Ibu Maisuna",
        city: "",
        imageAlt: "Foto mempelai wanita Indah"
      }
    ]
  },

  events: {
    eyebrow: "Wedding events",
    title: "Rangkaian Acara",
    intro: "Merupakan kehormatan dan kebahagiaan bagi kami apabila Anda berkenan hadir dan memberikan doa restu.",
    mapsButton: "Buka Google Maps",
    mapsNewTab: "(terbuka di tab baru)",
    calendarHint: "Waktu ditampilkan dalam WIB",
    icons: {
      akad: {
        src: "assets/images/event-akad.svg",
        alt: "Ikon cincin berlian dan ornamen Akad Nikah"
      },
      resepsi: {
        src: "assets/images/event-resepsi.svg",
        alt: "Ikon lengkungan dan lentera perayaan Resepsi"
      }
    },
    items: [
      {
        type: "Akad Nikah",
        title: "Akad Nikah",
        date: "Sabtu, 5 Desember 2026",
        time: "08.00 — 13.00 WIB",
        venue: "Kediaman Mempelai Wanita",
        address: "Jl. Desa Kuala Dua, Gg. Selat Madura (Sungai Adong Darat)",
        mapsUrl: "https://www.google.com/maps/search/?api=1&query=-0.176886%2C109.435799"
      },
      {
        type: "Resepsi",
        title: "Resepsi Pernikahan",
        date: "Minggu, 6 Desember 2026",
        time: "13.00 WIB — Selesai",
        venue: "Kediaman Mempelai Wanita",
        address: "Jl. Desa Kuala Dua, Gg. Selat Madura (Sungai Adong Darat)",
        mapsUrl: "https://www.google.com/maps/search/?api=1&query=-0.176886%2C109.435799"
      }
    ],
    locationVisual: {
      src: "assets/images/location-map.svg",
      fullSrc: "assets/images/location-map.svg",
      qrSrc: "assets/images/location-qr.webp",
      alt: "Denah vektor dan QR lokasi akad serta resepsi di Kediaman Mempelai Wanita",
      qrAlt: "QR asli untuk informasi lokasi akad dan resepsi",
      caption: "Pindai QR atau ikuti rute pada denah untuk menuju lokasi akad dan resepsi. Klik denah untuk melihat ukuran penuh.",
      linkLabel: "Lihat denah vektor lokasi ukuran penuh di tab baru",
      mapsButton: "Buka Titik di Google Maps",
      mapsUrl: "https://www.google.com/maps/search/?api=1&query=-0.176886%2C109.435799",
      mapLabels: {
        mainRoad: "GG. SELAT MADURA",
        verticalRoad: "JL. DESA KUALA DUA",
        diagonalRoad: "ALTER SUPADIO • SUNGAI ASAM",
        mosqueLeft: "Masjid Raudlatul Hidayah",
        mosqueRight: "Masjid Al-Hidayah",
        shop: "Toko Pak Ahmad",
        landmark: "Landmark",
        home: "Kediaman Mempelai Wanita",
        homeSubtitle: "AKAD & RESEPSI",
        route: "RUTE MENUJU LOKASI"
      },
      routeD: "M70 395C150 365 232 336 275 282C310 241 350 211 350 170L350 110"
    }
  },

  gifts: {
    eyebrow: "A token of love",
    title: "Amplop Digital",
    intro: "Doa dan kehadiran Anda adalah hadiah terindah. Jika Anda ingin memberikan tanda kasih, kami menyediakan pilihan berikut.",
    copyButton: "Salin Nomor",
    copied: "Nomor berhasil disalin",
    copyFailed: "Nomor belum dapat disalin. Silakan salin secara manual.",
    accountNameLabel: "a/n",
    methods: [
      {
        key: "bca",
        name: "BCA",
        logo: "assets/images/bca-logo.svg",
        logoAlt: "Logo Bank Central Asia (BCA)",
        numberLabel: "Nomor rekening",
        number: "1711238951",
        accountName: "Muliansah"
      },
      {
        key: "dana",
        name: "DANA",
        logo: "assets/images/dana-logo.png",
        logoAlt: "Logo dompet digital DANA",
        numberLabel: "Nomor DANA",
        number: "0895342263665",
        accountName: "Muliansah"
      }
    ]
  },

  gallery: {
    eyebrow: "Our little moments",
    title: "Galeri Kenangan",
    intro: "Ilustrasi orisinal burung yang terbang melintasi gunung berkabut — sebuah penggambaran perjalanan menuju satu tujuan.",
    video: {
      src: "assets/video/gallery-birds-mountains.mp4",
      poster: "assets/images/gallery-birds-mountains-poster.webp",
      description: "Video ilustrasi burung dan gunung: lima burung mengepakkan sayap melintasi pegunungan berlapis dengan kabut yang bergerak perlahan, matahari emas, dan pohon di foreground.",
      caption: "Terbang pulang, menuju satu tujuan.",
      meta: "ILUSTRASI ORIGINAL • 10 DETIK • TANPA AUDIO",
      play: "Putar",
      pause: "Jeda",
      playLong: "Putar video ilustrasi burung dan gunung",
      pauseLong: "Jeda video ilustrasi burung dan gunung",
      playing: "Video sedang diputar",
      paused: "Video dijeda",
      ready: "10 detik • loop • tanpa audio",
      reducedMotion: "Autoplay nonaktif • tekan Putar untuk memutar video",
      unavailable: "Video tidak dapat dimuat. Poster tetap dapat dilihat."
    },
    couple: {
      src: "assets/images/couple-heaven.webp",
      alt: "Iyan None dan Indah dalam busana pernikahan, berdiri di antara ilustrasi gunung dan burung"
    }
  },

  comments: {
    eyebrow: "Kind words",
    title: "Ucapan & Komentar",
    intro: "Contoh ucapan dari orang-orang terdekat. Seluruh teks berikut adalah contoh, bukan testimoni asli.",
    exampleLabel: "CONTOH UCAPAN",
    previous: "Ucapan sebelumnya",
    next: "Ucapan berikutnya",
    pause: "Jeda otomatis",
    resume: "Lanjutkan otomatis",
    indicatorLabel: "Tampilkan ucapan",
    autoMs: 5500,
    items: [
      {
        category: "Keluarga",
        text: "Semoga Iyan None dan Indah selalu saling menguatkan, berbagi kebahagiaan, dan diberi keluarga yang penuh berkah."
      },
      {
        category: "Sahabat",
        text: "Selamat menempuh perjalanan baru! Semoga setiap hari kalian dipenuhi tawa, kesabaran, dan kenangan indah."
      },
      {
        category: "Tetangga",
        text: "Turut berbahagia untuk kalian berdua. Semoga rumah tangga kalian rukun, hangat, dan menjadi tempat pulang terbaik."
      },
      {
        category: "Rekan Kerja",
        text: "Selamat untuk Iyan None dan Indah. Semoga sukses dalam setiap langkah bersama dan dikelilingi banyak orang baik."
      }
    ]
  },

  rsvp: {
    whatsappNumber: "62895342263665",
    productionUrl: "https://herutriyadih2-cloud.github.io/undangan-iyan-indah/",
    maxNameLength: 60,
    eyebrow: "RSVP & share the joy",
    title: "Konfirmasi Kehadiran & Bagikan Undangan",
    intro: "Kabari kami melalui WhatsApp, lalu bagikan undangan ini kepada keluarga dan sahabat.",
    guestLabel: "Nama Tamu",
    guestPlaceholder: "Contoh: Bapak Andi",
    attendLabel: "Hadir",
    declineLabel: "Tidak Hadir",
    requiredMessage: "Masukkan nama tamu terlebih dahulu.",
    previewLabel: "Pratinjau link undangan",
    copyButton: "Salin Link Undangan",
    copied: "Tautan berhasil disalin",
    copyFailed: "Tautan belum dapat disalin. Silakan salin secara manual.",
    shareLabel: "Bagikan via WhatsApp",
    messageIntro: "Halo Iyan None & Indah, saya",
    eventIntro: "Informasi acara:",
    shareIntro: "Dengan hormat, kami mengundang Anda ke pernikahan Iyan None & Indah."
  },

  closing: {
    eyebrow: "With love & gratitude",
    title: "Terima Kasih",
    message: "Kehadiran dan doa Anda adalah hadiah terindah bagi kami. Sampai jumpa di hari bahagia kami.",
    names: "Iyan None & Indah",
    signoff: "Kami yang berbahagia, beserta keluarga",
    backToCover: "Kembali ke Sampul",
    footer: "Iyan None & Indah • 6 Desember 2026 • Terima kasih atas doa dan kehadiran Anda."
  },

  audio: {
    // Backsound dari pengguna, dipotong mulai detik 13.
    enabled: true,
    src: "assets/audio/backsound-muliansyah-indah.m4a",
    volume: 0.45,
    loop: true
  },

  theme: {
    video: {
      src: "assets/video/heaven-sky.mp4",
      poster: "assets/images/heaven-sky-poster.webp"
    },
    playback: {
      rootMargin: "240px 0px",
      threshold: 0.01
    },
    sections: [
      { id: "cover", variant: "cover" },
      { id: "scene", variant: "scene" },
      { id: "home", variant: "hero" },
      { id: "quote", variant: "quote" },
      { id: "events", variant: "events" },
      { id: "closing", variant: "closing" }
    ],
    ambientSections: ["countdown", "couple", "gifts", "gallery"],
    ambient: {
      clouds: 2,
      stars: 7,
      petals: 4
    },
    natureSections: [
      { id: "home", variant: "hero" },
      { id: "couple", variant: "profiles" },
      { id: "events", variant: "events" }
    ],
    nature: {
      trees: 5,
      birds: 4
    },
    flowerSections: ["home", "couple", "events", "countdown", "gifts", "gallery", "closing"],
    flowers: {
      clusters: 4,
      petals: 8
    },
    sakuraSections: ["home", "couple", "events", "closing"],
    sakura: {
      branches: 4,
      petals: 12
    }
  },

  motion: {
    sceneDurationMs: 7200,
    parallaxStrength: 16
  }
};
