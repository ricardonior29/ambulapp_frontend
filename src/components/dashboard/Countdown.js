import React, { Component } from "react";
import Header from "../layout/Header";

function getTimeRemaining(endtime) {
    var t = Date.parse(endtime) - Date.parse(new Date());
    var seconds = Math.floor((t / 1000) % 60);
    var minutes = Math.floor((t / 1000 / 60) % 60);
   // var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
    //var days = Math.floor(t / (1000 * 60 * 60 * 24));
    return {
        'total': t,
        /*'days': days,
        'hours': hours,*/
        'minutes': minutes,
        'seconds': seconds
    };
}

function initializeClock(id, endtime) {
    var clock = document.getElementById(id);
    var secondsSpan = clock.querySelector('.seconds');

    function updateClock() {
        var t = getTimeRemaining(endtime);
        secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

        if (t.total <= 0) { //terminacion del conteo
            clearInterval(timeinterval);
            //redirect
            return true;
        }
    }

    var timeout = updateClock();
    var timeinterval = setInterval(updateClock, 1000);
    return timeout;
}

class Countdown extends Component {
    constructor() {
        super();
        this.state = {
          timeout: false
        }
    }

    componentDidMount() {
        //var deadline = new Date(Date.parse(new Date()) + 15 * 24 * 60 * 60 * 1000);
        var deadline = new Date(Date.parse(new Date()) + 59 * 1000);
        var finish = initializeClock('clockdiv', deadline);
        console.log(finish)
        if(finish)
        {
            this.setState({timeout: true})
        }
    }

    componentDidUpdate() {
        console.log('cambio')
    }

    onTimeout = e => {
        
        if(this.state.timeout)
        {
            console.log('redirigiendo')
            this.props.history.push('/ruta')
        }
    };

    

    render() {
        return (
            <div >
                <div className="container">
                    <br /><br />
                    <Header />
                    <div id="clockdiv" onChange={this.onTimeout}>
                        <div>
                            <p className="smalltext">Su solicitud está siendo evaluada por los centros médicos de la zona.</p>
                            <div className="preloader-wrapper big active">
                                <div className="spinner-layer spinner-blue-only">
                                    <div className="circle-clipper left">
                                        <div className="circle"></div>
                                    </div><div className="gap-patch">
                                        <div className="circle"></div>
                                    </div><div className="circle-clipper right">
                                        <div className="circle"></div>
                                    </div>
                                </div>
                            </div>
                            <p className="smalltext" onChange={this.onTimeout}>  Será redirigido en&nbsp;
                            <span className="seconds"></span>
                            &nbsp;segundos</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default Countdown;