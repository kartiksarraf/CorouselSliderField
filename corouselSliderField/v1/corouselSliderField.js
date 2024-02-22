
const ON_SELECTION = "onSelection";
let dataList = [], sliderOptions = {}, imageHeight = 300;
let wrapperContainer = document.getElementById("wrapperContainer");

Appian.Component.onNewValue(function (newValues) {

  dataList = newValues.dataList;
  sliderOptions = newValues.sliderOptions || {};
  imageHeight = newValues.imageHeight || 300;


  if (dataList == null || dataList.length == 0) {
    Appian.Component.setValidations(["Required fields are missing"]);
    //console.log("Required fields are missing");
    return;
  }

  Appian.Component.setValidations([]);

  // remove all childs
  if (wrapperContainer) {
    // Remove all child elements of the container
    while (wrapperContainer.firstChild) {
      wrapperContainer.removeChild(wrapperContainer.firstChild);
    }
  }


  dataList.forEach(item => {

    let swiperSlide = document.createElement("div");
    swiperSlide.className = "swiper-slide";

    let card = document.createElement("div");
    card.className = "card";

    let image = document.createElement("img");
    // image.crossOrigin = "Anonymous";
    image.src = item.imageSrc;
    image.alt = "Avatar";
    image.className = "card-image";
    image.style.setProperty("height", imageHeight + "px", "important");

    let cardContent = document.createElement("div");
    cardContent.className = "container";

    let title = document.createElement("h4");
    let titleText = document.createTextNode(item.title);
    title.appendChild(titleText);

    let description = document.createElement("p");
    description.className = "card-content";
    let descriptionText = document.createTextNode(item.description);
    description.appendChild(descriptionText);

    cardContent.appendChild(title);
    cardContent.appendChild(description);

    card.appendChild(image);
    card.appendChild(cardContent);

    swiperSlide.appendChild(card);

    swiperSlide.addEventListener("click", () => {
      Appian.Component.saveValue(ON_SELECTION, item.id);
      if(item.url){
        window.open(item.url, '_blank');
      }
    })

    wrapperContainer.appendChild(swiperSlide);

  });


  const progressCircle = document.querySelector(".autoplay-progress svg");
  const progressContent = document.querySelector(".autoplay-progress span");
  let swiper = new Swiper(".mySwiper", {
    ...sliderOptions,
    pagination: {
      el: ".swiper-pagination",
      clickable: true
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev"
    },
    on: {
      autoplayTimeLeft(s, time, progress) {
        progressCircle.style.setProperty("--progress", 1 - progress);
        progressContent.textContent = `${Math.ceil(time / 1000)}s`;
      }
    }
  });
});
