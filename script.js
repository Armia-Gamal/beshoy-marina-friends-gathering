/*
  ============================================
  BESH0Y & MARINA — FRIENDS GATHERING
  ============================================

  EVENT:
  25 September 2026 — 5:00 PM

  IMPORTANT:
  Music is NOT forced with autoplay.
  It starts from the user's click on
  "OPEN INVITATION", which is the reliable
  way to satisfy browser audio policies.
*/

const EVENT_DATE = "2026-09-25T17:00:00";


/* =========================================================
   COUNTDOWN
========================================================= */

const countdown = () => {
  const target = new Date(EVENT_DATE).getTime();
  const now = Date.now();

  let diff = target - now;

  if (diff < 0) {
    diff = 0;
  }

  const days = Math.floor(diff / 86400000);

  const hours = Math.floor(
    (diff % 86400000) / 3600000
  );

  const minutes = Math.floor(
    (diff % 3600000) / 60000
  );

  const seconds = Math.floor(
    (diff % 60000) / 1000
  );

  document.getElementById("days").textContent =
    String(days).padStart(2, "0");

  document.getElementById("hours").textContent =
    String(hours).padStart(2, "0");

  document.getElementById("minutes").textContent =
    String(minutes).padStart(2, "0");

  document.getElementById("seconds").textContent =
    String(seconds).padStart(2, "0");
};

countdown();

setInterval(countdown, 1000);


/* =========================================================
   SCROLL REVEAL
========================================================= */

const observer = new IntersectionObserver(
  (entries) => {

    entries.forEach((entry) => {

      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }

    });

  },
  {
    threshold: 0.12
  }
);

document
  .querySelectorAll(".reveal")
  .forEach((element) => {
    observer.observe(element);
  });


/* =========================================================
   FLOATING PETALS
========================================================= */

const petalsContainer =
  document.querySelector(".petals");

for (let i = 0; i < 22; i++) {

  const petal =
    document.createElement("span");

  petal.className = "petal";

  petal.style.left =
    Math.random() * 100 + "vw";

  petal.style.setProperty(
    "--drift",
    Math.random() * 220 - 110 + "px"
  );

  petal.style.animationDuration =
    8 + Math.random() * 9 + "s";

  petal.style.animationDelay =
    -Math.random() * 15 + "s";

  petal.style.transform =
    `rotate(${Math.random() * 360}deg)`;

  petalsContainer.appendChild(petal);
}


/* =========================================================
   MUSIC
========================================================= */

const music =
  document.getElementById("music");

const musicButton =
  document.getElementById("musicButton");

let playing = false;

const updateMusicButton = () => {

  musicButton.innerHTML = playing
    ? '♫ <span>PAUSE</span>'
    : '♫ <span>MUSIC</span>';

};


const startMusic = async () => {

  try {

    await music.play();

    playing = true;

    updateMusicButton();

    return true;

  } catch (error) {

    console.warn(
      "Music could not start:",
      error
    );

    return false;

  }

};


/* =========================================================
   OPEN INVITATION
========================================================= */

const openingScreen =
  document.getElementById("opening-screen");

const openInvitation =
  document.getElementById("openInvitation");


const openTheInvitation = async () => {

  /*
    IMPORTANT:
    Start music BEFORE opening the curtains.

    Because this function is called directly by
    the user's click, browsers allow audio playback.
  */

  await startMusic();


  /*
    Give the audio a tiny moment to begin,
    then open the curtains.
  */

  setTimeout(() => {

    openingScreen.classList.add("is-opening");

    document.body.classList.remove(
      "invitation-locked"
    );

  }, 180);


  /*
    Remove the opening screen from the DOM
    after the animation has completed.
  */

  setTimeout(() => {

    openingScreen.setAttribute(
      "aria-hidden",
      "true"
    );

  }, 1600);

};


openInvitation.addEventListener(
  "click",
  openTheInvitation
);


/* =========================================================
   MUSIC BUTTON AFTER OPENING
========================================================= */

musicButton.addEventListener(
  "click",
  async () => {

    if (!playing) {

      const started =
        await startMusic();

      if (!started) {

        alert(
          "Add your music file at audio/music.mp3 first."
        );

      }

      return;
    }


    music.pause();

    playing = false;

    updateMusicButton();

  }
);


/* =========================================================
   SAFETY:
   If the audio file is missing, don't break the website.
========================================================= */

music.addEventListener(
  "error",
  () => {

    playing = false;

    updateMusicButton();

    console.warn(
      "Music file not found. Expected: audio/music.mp3"
    );

  }
);
