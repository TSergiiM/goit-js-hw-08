import Player from '@vimeo/player';
var throttle = require('lodash.throttle');
const iframe = document.querySelector('iframe');
const player = new Vimeo.Player(iframe);
const playedTime = 'videoplayer-current-time';
const currentTime = function (event) {
  localStorage.setItem(playedTime, event.seconds);
};
playerReload();
player.on('timeupdate', throttle(currentTime, 1000));

function playerReload() {
  if (localStorage.getItem(playedTime)) {
    player.setCurrentTime(localStorage.getItem(playedTime));
  }
}
