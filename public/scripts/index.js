// logic for mobile menu show and hide
const showMenuBtn = document.getElementById("bar");
const menu = document.getElementById("mobile-menu");
const hideMenuBtn = document.getElementById("hideMenu");

const showAndHide = () => {
  menu.classList.toggle("translate-x-full");
  menu.classList.toggle("translate-x-0");
  menu.classList.toggle("hidden");
};
showMenuBtn.addEventListener("click", showAndHide);
hideMenuBtn.addEventListener("click", showAndHide);

// logic for adding active class to the nav links
const navItems = document.querySelectorAll(".menu-items li a");
const activePage = window.location.pathname;

navItems.forEach((element) => {
  // if (element.href.includes(`${activePage}`) && activePage !== "/") {
  //   // console.log("window", activePage.split(","));
  //   // console.log("href", element.href.split(","));
  //   document.getElementById("active-class").classList.remove("text-green-600");
  //   navItems[0].classList.remove("text-green-600");

  //   element.classList.toggle("text-green-600");
  // }
  if (window.location.href === element.href) {
    document.getElementById("active-class").classList.remove("text-green-600");
    navItems[0].classList.remove("text-green-600");
    element.classList.toggle("text-green-600");
  }

  if (window.location.href === "http://localhost:3000/") {
    navItems[0].classList.add("text-green-600");
  }
});

// Carousel Logic
// 1st version
const carouselItems = document.querySelectorAll(".carousel-items div");
let index = 1;

let intervalId = setInterval(() => {
  carouselItems.forEach((item) => {
    if (item.id == index) {
      item.classList.remove("opacity-0");
      item.classList.add("opacity-100");
    } else {
      item.classList.remove("opacity-100");
      item.classList.add("opacity-0");
    }
  });

  // featured code to implement next and prev button
  // document.getElementById("nextBtn").addEventListener("click", () => {
  //   index++;
  // });
  // document.getElementById("prevBtn").addEventListener("click", () => {
  //   index--;
  // });

  index++;

  if (index === carouselItems.length) {
    index = 1;
  }
}, 4000);
