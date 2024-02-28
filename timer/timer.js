"use strict"
class Timer {

  constructor(time) {
    this.time = time;
  }

  play() {
    while(time > 0) {
      setTimeout(function() {
        time--;
      }, 1000);
    }
  }
}