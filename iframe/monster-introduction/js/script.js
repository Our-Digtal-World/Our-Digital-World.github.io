const init = d => {
  const animal_name = Array.from(d.querySelectorAll(".animal-name___slide"));
  const animal_bg = Array.from(d.querySelectorAll(".bg-animal"));

  animal_name.map(el => {
    el.addEventListener("mouseenter", ({ target }) => {
      const line = target.querySelector(".line");
      const promise = () => {
        return new Promise(resolve => {
          line.style.transform = "translatex(100%)";
          line.style.transition = "transform .5s ease-out";
          resolve();
        });
      };

      promise()
        .then(r => {
          return new Promise(resolve => {
            setTimeout(() => {
              line.style.transform = "translatex(-100%)";
              line.style.transition = "none";
              resolve();
            }, 500);
          });
        })
        .then(() => {
          setTimeout(() => {
            line.style.transform = "translatex(-75%)";
            line.style.transition = "transform .5s ease-out";
          }, 20);
        });
    });
  });

  const slide = () => {
    const items = d.querySelectorAll(".slide__item");
    const length = items.length;
    const right = d.querySelector(".right-arrow");
    const left = d.querySelector(".left-arrow");
    let lastIndex = 0;
    let currentIndex = 0;
    let clicked = {
      state: false
    };

    right.onclick = () => {
      if (clicked.state) return;
      lastIndex = currentIndex;
      currentIndex++;
      currentIndex = currentIndex % length;
      changeSlide({ li: lastIndex, ci: currentIndex });
    };

    left.onclick = () => {
      if (clicked.state) return;
      lastIndex = currentIndex;
      currentIndex--;
      currentIndex = currentIndex < 0 ? length - 1 : currentIndex;
      changeSlide({ li: lastIndex, ci: currentIndex });
    };

    window.addEventListener("keyup", ({ keyCode }) => {
      if (keyCode === 37) left.click();
      if (keyCode === 39) right.click();
    });

    const changeSlide = ({ li, ci }) => {
      clicked.state = true;

      new Promise(resolve => {
        items[li].classList.add("animated");
        items[li].classList.remove("show");
        animal_bg[li].classList.add("animated");
        animal_bg[li].classList.remove("show");
        resolve();
      })
        .then(() => {
          return new Promise(resolve => {
            setTimeout(() => {
              items[li].classList.remove("animated");
              animal_bg[li].classList.remove("animated");
              items[li].style.display = "none";
              items[ci].style.display = "flex";
              animal_bg[li].style.display = "none";
              animal_bg[ci].style.display = "block";
              resolve();
            }, 800);
          });
        })
        .then(() => {
          return new Promise(resolve => {
            setTimeout(() => {
              items[ci].classList.add("animated", "show");
              animal_bg[ci].classList.add("animated", "show");
              resolve();
            }, 20);
          });
        })
        .then(() => {
          setTimeout(() => {
            clicked.state = false;
          }, 500);
        });
    };
  };
  slide();
};


// Load images
const images = Array.from(document.querySelectorAll(".bg-animal"));
const imagesLoaded = {
  length: images.length,
  count: 0
};

images.map(x => {
  const newImage = new Image();
  const bg = window.getComputedStyle(x, ":before").backgroundImage;
  const src = bg.replace(/(^url\()|(\)$|[\"\'])/g, "");
  newImage.src = src;
  newImage.addEventListener("load", () => {
    imagesLoaded.count++;
    if (imagesLoaded.count >= imagesLoaded.length) init(document)
  });
});