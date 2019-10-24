import React, { Component } from "react";

function getTimeRemaining(endtime) {
    var t = Date.parse(endtime) - Date.parse(new Date());
    var seconds = Math.floor((t / 1000) % 60);
    var minutes = Math.floor((t / 1000 / 60) % 60);
    var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
    var days = Math.floor(t / (1000 * 60 * 60 * 24));
    return {
      'total': t,
      'days': days,
      'hours': hours,
      'minutes': minutes,
      'seconds': seconds
    };
}

function initializeClock(id, endtime) {
    var clock = document.getElementById(id);
    console.log(document)
   /* var daysSpan = clock.querySelector('.days');
    var hoursSpan = clock.querySelector('.hours');*/
    var minutesSpan = clock.querySelector('.minutes');
    var secondsSpan = clock.querySelector('.seconds');
  
    function updateClock() {
      var t = getTimeRemaining(endtime);
/*      daysSpan.innerHTML = t.days;
      hoursSpan.innerHTML = ('0' + t.hours).slice(-2);*/
      minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
      secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);
  
      if (t.total <= 0) {
        clearInterval(timeinterval);
      }
    }
  
    updateClock();
    var timeinterval = setInterval(updateClock, 1000);
}        

class Countdown extends Component {
    
    componentDidMount() {
        //var deadline = new Date(Date.parse(new Date()) + 15 * 24 * 60 * 60 * 1000);
        var deadline = new Date(Date.parse(new Date()) + 60 * 1000);
        console.log(deadline);
        initializeClock('clockdiv', deadline);
    }

    render() {
        return (
            <div class="section no-pad-bot" id="index-banner">
                <div class="container">
                    <br/><br/>
                        <h1 class="header center orange-text">Su solicitud está siendo evaluado por los centros médicos del área</h1>
                        <div id="clockdiv">
                            <div>
                                <span class="minutes"></span>
                                <div class="smalltext">Minutes</div>
                            </div>
                            <div>
                                <span class="seconds"></span>
                                <div class="smalltext">Seconds</div>
                            </div>
                        </div>
                </div>
            </div>
        );
    }
}
            
export default Countdown;