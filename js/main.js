$(document).ready(function () {
  const innerHeight = window.innerHeight;
  let scrollTimeout;
  let lastScrollY = window.scrollY;
  const header = document.querySelector(".header");

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
          }, 1000);
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
        }, 500);
      }
    } else {
      header.classList.remove("overlay", "show", "hidden");
    }

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
    console.log("section 1");
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            console.log("====================================");
            console.log("section 1");
            console.log("====================================");
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
  console.log('====================================');
  console.log(sectionTitle2);
  console.log('====================================');
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
});
