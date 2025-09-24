$(document).ready(function () {
  const innerHeight = window.innerHeight;
  let scrollTimeout;
  let lastScrollY = window.scrollY;
  const header = document.querySelector(".header");
  getStartedButtonAction();
  packageSelectionToContactForm();

  window.addEventListener("scroll", function () {
    const currentScrollY = window.scrollY;
    const scrollDelta = currentScrollY - lastScrollY;

    clearTimeout(scrollTimeout);

    if (currentScrollY >= innerHeight) {
      if (scrollDelta > 0) {
        if (!header.classList.contains("hidden")) {
          header.classList.add("overlay");
          header.classList.remove("show", "hidden");

          scrollTimeout = setTimeout(() => {
            header.classList.add("hidden");
            header.classList.remove("show");
          }, 1500);
        }
      } else if (scrollDelta < 0) {
        if (header.classList.contains("hidden")) {
          header.classList.remove("hidden");
          header.classList.add("show", "overlay");
        }

        if (
          header.classList.contains("show") &&
          !header.classList.contains("overlay")
        ) {
          header.classList.add("overlay");
        }
        scrollTimeout = setTimeout(() => {
          header.classList.remove("overlay");
        }, 1000);
      }
    } else {
      header.classList.remove("overlay", "show", "hidden");
    }

    // if (currentScrollY < innerHeight) {
    //   setActiveNav("home");
    // } else if (currentScrollY >= document.querySelector("#AboutUs").offsetTop && currentScrollY < innerHeight * 2) {
    //   setActiveNav("aboutus");
    // } else if (currentScrollY >= document.querySelector("#Services").offsetTop && currentScrollY < innerHeight * 3) {
    //   setActiveNav("services");
    // } else if (currentScrollY >= innerHeight * 3) {
    //   setActiveNav("contact");
    // }

    lastScrollY = currentScrollY;
  });

  AOS.init();
  const target = document.querySelector(".information_button");
  if (target) {
    target.addEventListener("transitionend", function handleTransitionEnd() {
      // Xoá delay sau khi AOS animation xong
      target.style.transitionDelay = "0s";

      // Chỉ chạy 1 lần
      target.removeEventListener("transitionend", handleTransitionEnd);
    });
  }

  //section 1
  const titleSection1 = document.querySelector(".section_1 .information_title");
  if (titleSection1) {
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            Splitting({ target: titleSection1, by: "chars" });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.0 }
    );

    observer.observe(titleSection1);
  }

  //section 2
  const section2 = document.querySelector(".section_2");
  const sectionTitle2 = document.querySelectorAll(".section_2 .section_title");
  const sectionDescription2 = document.querySelectorAll(
    ".section_2 .section_description"
  );

  if (section2) {
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Splitting title
            Splitting({ target: sectionTitle2, by: "chars" });

            // Trigger từng đoạn văn
            sectionDescription2.forEach((elm, index) => {
              setTimeout(() => {
                Splitting({ target: elm, by: "chars" });
                AOS.refreshHard();
              }, index * 1000);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );

    observer.observe(section2);
  }

  //section 3
  const section3 = document.querySelector(".section_3");
  const sectionTitle3 = document.querySelectorAll(".section_3 .section_title");
  const sectionDescription3 = document.querySelectorAll(
    ".section_3 .section_description"
  );

  if (section3) {
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            Splitting({ target: sectionTitle3, by: "chars" });
            Splitting({ target: sectionDescription3, by: "chars" });
          }
        });
      },
      { threshold: 0.4 }
    );

    observer.observe(section3);
  }

  //section 4
  const section4 = document.querySelector(".section_4");
  const sectionTitle4 = document.querySelectorAll(".section_4 .section_title");
  const sectionDescription4 = document.querySelectorAll(
    ".section_4 .section_description"
  );

  if (section4) {
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            Splitting({ target: sectionTitle4, by: "chars" });
            Splitting({ target: sectionDescription4, by: "chars" });
          }
        });
      },
      { threshold: 0.4 }
    );

    observer.observe(section4);
  }

  const listNav = document.querySelectorAll(".nav ul li");
  listNav.forEach((nav) => {
    nav.addEventListener("click", function (e) {
      e.preventDefault();
      const idActive = this.getAttribute("id");
      setActiveNav(idActive);
      $(`section#${idActive}`)[0].scrollIntoView({
        behavior: "smooth",
      });
    });
  });

  const navMobile = document.querySelector(".nav_mobile");
  const listNavMobile = document.querySelectorAll(".nav_mobile-list li");
  listNavMobile?.forEach((nav) => {
    nav.addEventListener("click", function (e) {
      e.preventDefault();
      const idActive = this.getAttribute("id");
      console.log(idActive);
      addScrolling();
      setActiveNavMobile(idActive);
      $(".nav_mobile-list").removeClass("active");
      navMobile.classList.remove("active");
      $(`section#${idActive}`)[0].scrollIntoView({
        behavior: "smooth",
      });
    });
  });
  navMobile.addEventListener("click", function () {
    const navList = document.querySelector(".nav_mobile-list");
    navList.classList.toggle("active");
    navMobile.classList.toggle("active");
    if (navList.classList.contains("active")) {
      removeScrolling();
    } else {
      addScrolling();
    }
  });
  $(document).keyup(function (e) {
    if (e.key === "Escape") {
      $(".nav_mobile-list").removeClass("active");
      addScrolling();
    }
  });

  $("submit-button").click(() => {
    getContactFormData();
  });
});

function removeScrolling() {
  document.body.style.overflow = "hidden";
}

function addScrolling() {
  document.body.style.overflow = "auto";
}

function setActiveNav(idActive) {
  $(".nav #" + idActive).addClass("active");
  $(".nav li")
    .not("#" + idActive)
    .removeClass("active");
}

function setActiveNavMobile(idActive) {
  $(".nav_mobile-list #" + idActive).addClass("active");
  $(".nav_mobile-list li")
    .not("#" + idActive)
    .removeClass("active");
}

function getStartedButtonAction() {
  console.log("getStartedButtonAction");
  const button = document.getElementById("get-started-btn");
  console.log("button", button);
  if (button) {
    button.addEventListener("click", () => {
      console.log("click");

      scrollToContactForm();
    });
  }
}

function packageSelectionToContactForm() {
  const starterPackageBtn = document.getElementById("starter-package-btn");
  const growPackageBtn = document.getElementById("grow-package-btn");
  const scalePackageBtn = document.getElementById("scale-package-btn");
  const packageSelectionRadio = document.getElementsByName(
    "package-selection-radio"
  );

  const setCheckedRadio = (radio) => {
    packageSelectionRadio.forEach((r) => (r.checked = false));
    if (!radio) return;
    radio.checked = true;
  };

  if (starterPackageBtn) {
    starterPackageBtn.addEventListener("click", function () {
      const starterRadio = document.getElementById("starter");
      setCheckedRadio(starterRadio);
      scrollToContactForm();
    });
  }

  if (growPackageBtn) {
    growPackageBtn.addEventListener("click", function () {
      const growRadio = document.getElementById("grow");
      setCheckedRadio(growRadio);
      scrollToContactForm();
    });
  }

  if (scalePackageBtn) {
    scalePackageBtn.addEventListener("click", function () {
      const scaleRadio = document.getElementById("scale");
      setCheckedRadio(scaleRadio);
      scrollToContactForm();
    });
  }
}

function scrollToContactForm() {
  const contactSection = document.querySelector("section#Contact");
  contactSection && contactSection.scrollIntoView({ behavior: "smooth" });
}

function getContactFormData() {
  document
    .querySelector("#contact-form")
    .addEventListener("submit", function (e) {
      e.preventDefault();
      const formData = new FormData(this);
      const data = Object.fromEntries(formData.entries());

      // Handle multi-select addons
      data.addons = formData.getAll("addons");

      return data;
    });
}
