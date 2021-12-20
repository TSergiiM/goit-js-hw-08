import Player from '@vimeo/player';
const throttle = require('lodash.throttle');
const iframe = document.querySelector('iframe');
const player = new Vimeo.Player(iframe);

const currentTime = function (event) {
  localStorage.setItem('videoplayer-current-time', event.seconds);
};
playerReload();
player.on('timeupdate', throttle(currentTime, 1000));

function playerReload() {
  if (localStorage.getItem('videoplayer-current-time')) {
    player.setCurrentTime(localStorage.getItem('videoplayer-current-time'));
  }
}
