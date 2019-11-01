/*jshint esversion: 6 */
$('.header__mobile-menu').click(function() {
  $('.header__mobile-dropdown').toggle('fast');
});

$('.header__mobile-dropdown a').click(function() {
  $('.header__mobile-dropdown').css('display', 'none');
});

$('.smiley').click(function() {
  $('.smiley').each(function() {
    $(this).removeClass('smiley--active');
  });
  $(this).addClass('smiley--active');
  $('.feedback__opinion-text').removeClass('feedback__error');
});

$('.feedback__category-item').click(function() {
  $('.feedback__category-item').each(function() {
    $(this).addClass('feedback__onhover');
    $(this).removeClass('feedback__category-item--active');
  });
  $(this).removeClass('feedback__onhover');
  $(this).addClass('feedback__category-item--active');
  $('.feedback__category-text').removeClass('feedback__error');
});

$('.feedback__text').change(function() {
  if($(this).val() != '') {
    $('.feedback__text-par').removeClass('feedback__error');
  }
});

$('.feedback__button-wrapper button').click(function(e) {
  // stop default submit
  e.preventDefault();

  // validate form
  let formValid = true;

  let userMood;
  const activeSmile = $('.smiley--active');
  if(activeSmile.length == 0) {
    formValid = false;
    $('.feedback__opinion-text').addClass('feedback__error');
  } else {
    userMood = getMood($(activeSmile).attr('class').split(' ')[3]);
  }

  let feedbackType;
  const activeType = $('.feedback__category-item--active');
  if(activeType.length == 0) {
    formValid = false;
    $('.feedback__category-text').addClass('feedback__error');
  } else {
    feedbackType = $(activeType).html();
  }

  const feedbackText = $('.feedback__text').val();
  if(feedbackText == '') {
    formValid = false;
    $('.feedback__text-par').addClass('feedback__error');
  }

  if(formValid) {
    alert(`
        Sorry! There is no server to send request to right now.
        But I got information you provided. Take a look:
        Your opinion of my website - "${userMood}"
        Feedback category choice - "${feedbackType}"
        Feedback text - "${feedbackText}"
      `);
  }
});

function getMood(moodClass) {
  switch(moodClass) {
    case 'angry':
      return 'Angry';
    case 'frown':
      return 'Disappointed';
    case 'neutral':
      return 'Nothing special';
    case 'ok':
      return 'Good';
    case 'happy':
      return 'Happy';
    default:
      return 'You had no opinion...';
  }
}

// randomizer for halloween facts on the main page
// facts array looks messy but I don't see other options to store long strings
let factsArray = [
  'The first Jack O’Lanterns were actually made from turnips.',
  'Halloween is the second highest grossing commercial holiday after Christmas.',
  'The word “witch” comes from the Old English wicce, meaning “wise woman”.',
  'Samhainophobia is the fear of Halloween.',
  'Fifty percent of kids prefer to receive chocolate candy for Halloween, compared with 24% who prefer non-chocolate candy and 10% who preferred gum.',
  'The owl is a popular Halloween image. In Medieval Europe, owls were thought to be witches, and to hear an owl\'s call meant someone was about to die.',
  'According to Irish legend, Jack O’Lanterns are named after a stingy man named Jack who, because he tricked the devil several times, was forbidden entrance into both heaven and hell. He was condemned to wander the Earth, waving his lantern to lead people away from their paths.',
  'The largest pumpkin ever measured was grown by Norm Craven, who broke the world record in 1993 with a 836 lb. pumpkin.',
  'Trick-or-treating evolved from the ancient Celtic tradition of putting out treats and food to placate spirits who roamed the streets at Samhain, a sacred festival that marked the end of the Celtic calendar year.',
  'The first known mention of trick-or-treating in print in North America occurred in 1927 in Blackie, Alberta, Canada.',
  '“Halloween” is short for “Hallows’ Eve” or “Hallows’ Evening,” which was the evening before All Hallows’ (sanctified or holy) Day or Hallowmas on November 1.',
  'Black and orange are typically associated with Halloween. Orange is a symbol of strength and endurance and, along with brown and gold, stands for the harvest and autumn. Black is typically a symbol of death and darkness and acts as a reminder that Halloween once was a festival that marked the boundaries between life and death.',
  'Ireland is typically believed to be the birthplace of Halloween.',
  'According to tradition, if a person wears his or her clothes inside out and then walks backwards on Halloween, he or she will see a witch at midnight.',
  'The famous magician Harry Houdini died on October 31, 1926.',
  'Boston, Massachusetts, holds the record for the most Jack O’Lanterns lit at once (30,128).'
];

let factsString = '';
let chosenFacts = [];

// push random fact to an array and remove that item from that array
for(i = 0; i < 5; i++) {
  let randomIndex = Math.floor(Math.random() * (factsArray.length - 1));
  chosenFacts.push(factsArray[randomIndex]);
  factsArray.splice(randomIndex, 1);
}

// generate html and put it into string variable
function createItem(item) {
  factsString += `
    <li>
      <span class="fa-li"><i class="fas fa-ghost"></i></span>
      <span class="fact-text">${item}</span>
    </li>
  `;
}

chosenFacts.forEach(createItem);

// put generated li's inside ul element
$('.block__side-facts').html(factsString);
