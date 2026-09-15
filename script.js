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

let invitationIsOpening = false;

const finishOpening = () => {

  openingScreen.setAttribute(
    "aria-hidden",
    "true"
  );

  openingScreen.remove();

};

const openTheInvitation = () => {

  /*
    Do not let repeated taps queue multiple animations or audio requests.
  */

  if (invitationIsOpening) {
    return;
  }

  invitationIsOpening = true;
  openInvitation.disabled = true;

  /*
    Start music directly from the visitor's tap so browser audio policies
    still allow it, but never wait for buffering or decoding before showing
    the opening animation. On slower phones, music.play() may take a while
    to resolve.

    startMusic() handles a missing or unsupported audio file itself.
  */

  void startMusic();


  /*
    Open the interface immediately so the tap always gets a prompt response.
  */

  openingScreen.classList.add("is-opening");

  document.body.classList.remove(
    "invitation-locked"
  );



  /*
    Free the overlay and its animations after the curtains finish opening.
  */

  setTimeout(finishOpening, 1600);

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
          "Add your music file at audio/music.m4a first."
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
      "Music file not found. Expected: audio/music.m4a"
    );

  }
);
