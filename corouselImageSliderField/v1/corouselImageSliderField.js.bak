const ON_SELECTION = "onSelection";
// default values
const IMAGE_HEIGHT = 500,
  SLIDE_TIME = 3000,
  SLIDES_PER_VIEW = 3,
  WORDWRAP_COUNT = 50;
const BANNER_BACKGROUND_COLOR = "#00000080",
  BANNER_TEXT_COLOR = "#FFFFFF",
  BANNER_HEADING_FONT_SIZE = "1.5em",
  BANNER_SUB_HEADING_FONT_SIZE = "0.67em",
  BANNER_DESCRIPTIN_FONT_SIZE = "18px";
const COROUSEL_FONT_SIZE = "18px";
const COROUSEL_ALIGNMENT = {
  LEFT: "left",
  RIGHT: "right",
  CENTER: "center",
};
let dataList = [],
  bannerOptions = {},
  corouselOptions = {},
  imageHeight,
  slideTime,
  slidesPerView;

Appian.Component.onNewValue(function (newValues) {
  dataList = newValues.dataList;
  bannerOptions = newValues.bannerOptions || {};
  corouselOptions = newValues.corouselOptions || {};
  imageHeight = newValues.imageHeight || IMAGE_HEIGHT;
  slideTime = newValues.slideTime || SLIDE_TIME;
  slidesPerView = newValues.slidesPerView || SLIDES_PER_VIEW;
  enableWordwrap = newValues.enableWordwrap;
  wordwrapCount = newValues.wordwrapCount || WORDWRAP_COUNT;

  if (dataList == null || dataList.length == 0) {
    Appian.Component.setValidations(["Required fields are missing"]);
    return;
  }

  Appian.Component.setValidations([]);

  let wrapperContainer = document.getElementById("wrapperContainer");
  let wrapperContainerImage = document.getElementById("wrapperContainerImage");

  // remove all childs
  if (wrapperContainer) {
    // Remove all child elements of the container
    while (wrapperContainer.firstChild) {
      wrapperContainer.removeChild(wrapperContainer.firstChild);
    }
  }
  if (wrapperContainerImage) {
    // Remove all child elements of the container
    while (wrapperContainerImage.firstChild) {
      wrapperContainerImage.removeChild(wrapperContainerImage.firstChild);
    }
  }
  if ($(".slider-nav").hasClass("slick-initialized")) {
    $(".slider-nav").removeClass("slick-initialized slick-slider");
  }
  if ($(".slider-for").hasClass("slick-initialized")) {
    $(".slider-for").removeClass("slick-initialized slick-slider");
  }

  dataList.forEach((item) => {
    // add image
    let swiperSlideImage = document.createElement("div");

    let imageContainer = document.createElement("div");
    imageContainer.className = "image-container";
    imageContainer.style.color = bannerOptions.textColor || BANNER_TEXT_COLOR;

    // add image
    let image = document.createElement("img");
    // image.crossOrigin = "Anonymous";
    image.src = item.imageSrc;
    image.alt = "Avatar";
    image.className = "card-image";
    image.style.setProperty("height", imageHeight + "px", "important");

    imageContainer.appendChild(image);

    // add banner content
    let hasContent = false;
    var containerDiv = document.createElement("div");
    containerDiv.className = "bottom-left";
    containerDiv.style.backgroundColor =
      bannerOptions.backgroundColor || BANNER_BACKGROUND_COLOR;
    // set font alignment
    containerDiv.style.textAlign =
      bannerOptions.alignment && COROUSEL_ALIGNMENT[bannerOptions.alignment]
        ? COROUSEL_ALIGNMENT[bannerOptions.alignment]
        : COROUSEL_ALIGNMENT["CENTER"];

    if (!isEmpty(item.bannerDate)) {
      var dateElement = document.createElement("h6");
      dateElement.style.fontSize =
        bannerOptions.subHeadingFontSize && bannerOptions.subHeadingFontSize > 0
          ? bannerOptions.subHeadingFontSize + "px"
          : BANNER_SUB_HEADING_FONT_SIZE;
      dateElement.textContent = item.bannerDate;
      containerDiv.appendChild(dateElement);
      hasContent = true;
    }

    if (!isEmpty(item.bannerTitle)) {
      var titleElement = document.createElement("h2");
      titleElement.style.fontSize =
        bannerOptions.headingFontSize && bannerOptions.headingFontSize > 0
          ? bannerOptions.headingFontSize + "px"
          : BANNER_HEADING_FONT_SIZE;
      titleElement.textContent = item.bannerTitle;
      containerDiv.appendChild(titleElement);
      hasContent = true;
    }

    if (!isEmpty(item.bannerDescription)) {
      var descriptionElement = document.createElement("p");
      descriptionElement.style.fontSize =
        bannerOptions.descriptionFontSize &&
        bannerOptions.descriptionFontSize > 0
          ? bannerOptions.descriptionFontSize + "px"
          : BANNER_DESCRIPTIN_FONT_SIZE;
      descriptionElement.textContent = item.bannerDescription;
      containerDiv.appendChild(descriptionElement);
      hasContent = true;
    }

    if (hasContent) {
      imageContainer.appendChild(containerDiv);
    }

    imageContainer.addEventListener("click", () => {
      Appian.Component.saveValue(ON_SELECTION, item.id);
      if (item.url) {
        window.open(item.url, "_blank");
      }
    });

    swiperSlideImage.appendChild(imageContainer);
    wrapperContainerImage.appendChild(swiperSlideImage);

    // add content
    let swiperSlide = document.createElement("div");

    let cardContent = document.createElement("div");
    cardContent.className = "container";
    // set font alignment
    cardContent.style.textAlign =
      corouselOptions.alignment && COROUSEL_ALIGNMENT[corouselOptions.alignment]
        ? COROUSEL_ALIGNMENT[corouselOptions.alignment]
        : COROUSEL_ALIGNMENT["CENTER"];

    let title = document.createElement("h4");
    // set title font size
    if (corouselOptions.fontSize && corouselOptions.fontSize > 0) {
      title.style.fontSize = corouselOptions.fontSize + "px";
    } else {
      title.style.fontSize = COROUSEL_FONT_SIZE;
    }
    // modify title text ( truncate )
    let inputTitle = item.title;
    let finalTitle;
    if (enableWordwrap) {
      const subStr = inputTitle.substring(0, wordwrapCount);
      if (subStr.length == inputTitle.length) {
        finalTitle = subStr;
      } else {
        finalTitle = subStr + "...";
        title.title = inputTitle;
      }
    }
    let titleText = document.createTextNode(finalTitle);
    title.appendChild(titleText);

    cardContent.appendChild(title);

    swiperSlide.appendChild(cardContent);

    wrapperContainer.appendChild(swiperSlide);
  });

  // add wrapper container margin
  if (corouselOptions.margin && corouselOptions.margin > 0) {
    wrapperContainer.style.marginTop = corouselOptions.margin + "px";
  } else {
    wrapperContainer.style.marginTop = "0px";
  }

  $(".slider-for").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    asNavFor: ".slider-nav",
    autoplay: true, // Enable autoplay
    autoplaySpeed: slideTime,
  });
  $(".slider-nav").slick({
    slidesToShow: slidesPerView,
    slidesToScroll: 1,
    asNavFor: ".slider-for",
    dots: false,
    centerMode: true,
    focusOnSelect: true,
  });
});

function isEmpty(input) {
  return input == null || input == undefined || input == "";
}
