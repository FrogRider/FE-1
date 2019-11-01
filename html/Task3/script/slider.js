/*jshint esversion: 6 */
// By Dmitriy Kashmenskiy
// Simple slider for HTML Task 3 project

$(document).ready(function() {
  let slideIndex = 2;
  setTimeout(initSlider, 4000);

  function removeSlide() {
    $('.slider__item').css('position', 'relative');
    $('.slider__item')[0].remove();
  }

  function initSlider() {
    // add new slider element
    $('.slider').append(`
      <figure class="slider__item slider__item--new">
        <img src="img/pumpkin-${slideIndex}.jpg" alt="Slider Image ${slideIndex}">
        <figcaption>Slider Image ${slideIndex}</figcaption>
      </figure>
    `);

    // animate new slide so it enters the page from the left
    $('.slider__item--new').animate({
      left: '0'
    }, 2000);

    slideIndex++;
    if(slideIndex > 3) {
      slideIndex = 1;
    }

    // remove previous slide and loop the slider
    setTimeout(removeSlide, 2000);
    setTimeout(initSlider, 6000);
  }
});
