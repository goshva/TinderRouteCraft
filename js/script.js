'use strict';
function drawAfter() {
  var tinderContainer = document.querySelector('.tinder');
  var allCards = document.querySelectorAll('.tinder--card');
  var nope = document.getElementById('nope');
  var map = document.getElementById('map');
  var love = document.getElementById('love');

  function initCards(card, index) {
    var newCards = document.querySelectorAll('.tinder--card:not(.removed)');

    newCards.forEach(function (card, index) {
      card.style.zIndex = allCards.length - index;
      card.style.transform = 'scale(' + (20 - index) / 20 + ') translateY(-' + 30 * index + 'px)';
      card.style.opacity = (10 - index) / 10;
    });
    //  newCards[0].style.opacity = 0.6;

    tinderContainer.classList.add('loaded');
  }

  initCards();

  allCards.forEach(function (el) {
    var hammertime = new Hammer(el);

    hammertime.on('pan', function (event) {
      el.classList.add('moving');
      if (event.deltaX === 0) return;
      if (event.center.x === 0 && event.center.y === 0) return;

      tinderContainer.classList.toggle('tinder_love', event.deltaX > 0);
      tinderContainer.classList.toggle('tinder_nope', event.deltaX < 0);

      var xMulti = event.deltaX * 0.03;
      var yMulti = event.deltaY / 80;
      var rotate = xMulti * yMulti;

      event.target.style.transform = 'translate(' + event.deltaX + 'px, ' + event.deltaY + 'px) rotate(' + rotate + 'deg)';
    });

    hammertime.on('panend', function (event) {
      if (event.deltaX > 0) {
        saveCoordinates(el);  // Correct function call to save coordinates
      }
      el.classList.remove('moving');
      last_switch_action()
      tinderContainer.classList.remove('tinder_love');
      tinderContainer.classList.remove('tinder_nope');

      var moveOutWidth = document.body.clientWidth;
      var keep = Math.abs(event.deltaX) < 80 || Math.abs(event.velocityX) < 0.5;

      event.target.classList.toggle('removed', !keep);

      if (keep) {
        event.target.style.transform = '';
      } else {
        var endX = Math.max(Math.abs(event.velocityX) * moveOutWidth, moveOutWidth);
        var toX = event.deltaX > 0 ? endX : -endX;
        var endY = Math.abs(event.velocityY) * moveOutWidth;
        var toY = event.deltaY > 0 ? endY : -endY;
        var xMulti = event.deltaX * 0.03;
        var yMulti = event.deltaY / 80;
        var rotate = xMulti * yMulti;

        event.target.style.transform = 'translate(' + toX + 'px, ' + (toY + event.deltaY) + 'px) rotate(' + rotate + 'deg)';
        initCards();
      }
    });
  });
  function createButtonListener(love) {

    return function (event) {
      var cards = document.querySelectorAll('.tinder--card:not(.removed)');
      var moveOutWidth = document.body.clientWidth * 1.5;

      if (!cards.length) return false;
      last_switch_action()


      var card = cards[0];

      card.classList.add('removed');

      if (love) {
        saveCoordinates(card);

        card.style.transform = 'translate(' + moveOutWidth + 'px, -100px) rotate(-30deg)';
      } else {
        card.style.transform = 'translate(-' + moveOutWidth + 'px, -100px) rotate(30deg)';
      }



      initCards();

      event.preventDefault();
    };
  }

  var nopeListener = createButtonListener(false);
  var loveListener = createButtonListener(true);

  nope.addEventListener('click', nopeListener);
  //map.addEventListener('click', genRoute);
  love.addEventListener('click', loveListener);

  function saveCoordinates(card) {
    var coordinates = card.getAttribute('data-coordinates');
    if (coordinates) {
      var savedCoordinates = localStorage.getItem('savedCoordinates');
      savedCoordinates = savedCoordinates ? JSON.parse(savedCoordinates) : [];
      savedCoordinates.push(coordinates);
      localStorage.setItem('savedCoordinates', JSON.stringify(savedCoordinates));
      calculateRouteDistances();
    }
  }

  function phoneMe() {
    window.location.replace("tel:+79620002200")
  }
  function whatsapp() {
    window.location.replace("https://chat.whatsapp.com/DaNtmgQ74GdCixHxdOBAVA")
  }
  function last_switch_action() {
    var cards = document.querySelectorAll('.tinder--card:not(.removed)');
    if (cards.length < 3) {
      document.getElementById('nope').firstChild.className = "fa fa-phone"
      document.getElementById('nope').addEventListener("click", phoneMe);
      document.getElementById('love').firstChild.className = "fa fa-whatsapp"
      document.getElementById('love').addEventListener("click", whatsapp);
      genRoute();
    }
  }
}
