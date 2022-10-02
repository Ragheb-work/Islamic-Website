// Explore Button
let exploreButton = document.querySelector(".title .btn"),
  hadithSection = document.querySelector(".hadith");

exploreButton.addEventListener("click", () => {
  hadithSection.scrollIntoView({
    behavior: "smooth",
  });
});
// Explore Button

// Fix Header
let fixedNav = document.querySelector(".header"),
  scrollBtn = document.querySelector(".scroll-btn");
window.addEventListener("scroll", () => {
  // Add Background to nav
  window.scrollY > 100
    ? fixedNav.classList.add("active")
    : fixedNav.classList.remove("active");

  // Show / Hide Btn
  window.scrollY > 350
    ? scrollBtn.classList.add("active")
    : scrollBtn.classList.remove("active");
});

scrollBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// Fix Header

// Get Hadith
let hadithContainer = document.querySelector(".hadith-container"),
  next = document.querySelector(".buttons .next"),
  prev = document.querySelector(".buttons .prev"),
  number = document.querySelector(".buttons .number");

let hadithIndex = 0;
getHadith();

function getHadith() {
  fetch(
    "https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/ara-bukhari.min.json"
  )
    .then((response) => response.json())
    .then((data) => {
      let hadiths = data.hadiths;
      changeHadith();

      // Next Hadith Click
      next.addEventListener("click", () => {
        hadithIndex == hadiths.length ? (hadithIndex = 0) : hadithIndex++;
        changeHadith();
      });

      // Previous Hadith Click
      prev.addEventListener("click", () => {
        hadithIndex == 0 ? (hadithIndex = hadiths.length) : hadithIndex--;
        changeHadith();
      });

      // Change Hadith Function
      function changeHadith() {
        hadithContainer.innerText = hadiths[hadithIndex].text;
        number.innerText = `${hadiths.length} / ${hadithIndex + 1}
        `;
      }
    });
}
// Link Sections
let sections = document.querySelectorAll("section"),
  links = document.querySelectorAll(".header ul li");

links.forEach((link) => {
  link.addEventListener("click", () => {
    document.querySelector(".header ul li.active").classList.remove("active");

    link.classList.add("active");

    let target = link.dataset.filter;
    sections.forEach((section) => {
      if (section.classList.contains(target)) {
        section.scrollIntoView({
          behavior: "smooth",
        });
      }
    });
  });
});
// Link Sections

// Get Quran
let surahsContainer = document.querySelector(".surahs-container");
getQuran();
function getQuran() {
  // fetch surah name
  fetch("https://api.alquran.cloud/v1/meta")
    .then((response) => response.json())
    .then((data) => {
      let surahs = data.data.surahs.references;
      let numberOfSurahs = data.data.surahs.count;
      for (let i = 0; i < numberOfSurahs; i++) {
        surahsContainer.innerHTML += `<div class="surah">
            <p>${surahs[i].name}</p>
             <p>${surahs[i].englishName}</p>
           </div>`;
      }
      let surahTitle = document.querySelectorAll(".surah");
      let popUp = document.querySelector(".surah-popup");
      ayatContainer = document.querySelector(".ayat");
      surahTitle.forEach((title, index) => {
        title.addEventListener("click", () => {
          fetch(`https://api.alquran.cloud/v1/surah/${index + 1}`)
            .then((response) => response.json())
            .then((data) => {
              ayatContainer.innerHTML = "";
              let ayat = data.data.ayahs;
              ayat.forEach((ayah) => {
                popUp.classList.add("active");
                ayatContainer.innerHTML += `
                <p>(${ayah.numberInSurah})- ${ayah.text}</p>
                `;
              });
            });
        });
      });
      let closePopUp = document.querySelector(".close-popup");
      closePopUp.addEventListener("click", () => {
        popUp.classList.remove("active");
      });
    });
}
// Get Quran

// Get Pray Time
let cards = document.querySelector(".cards");
getPrayTime();
function getPrayTime() {
  fetch(
    "https://api.aladhan.com/v1/timingsByCity?city=gafsa&country=tunis&method=8"
  )
    .then((response) => response.json())
    .then((data) => {
      let times = data.data.timings;
      cards.innerHTML = "";
      for (let time in times) {
        console.log(time);
        console.log();
        cards.innerHTML += `
        <div class="card">
           <div class="circle">
             <svg>
              <circle cx="100" cy="100" r="100"></circ>
            </svg>
            <div class="pray-time">${times[time]}</div>
           </div>
           <p>${time}</p>
          </div>
        `;
      }
    });
}
// Get Prayer Time

// Bars Click
let bars = document.querySelector(".bars"),
  sideBar = document.querySelector(".header ul");
bars.addEventListener("click", () => {
  sideBar.classList.toggle("active");
});
// Bars Click
