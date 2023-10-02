import { useEffect, useRef, useState } from "react";
import "./App.css";
import backgroundWhite from "./assets/ph_moon-bold.svg";
import backgroundBlack from "./assets/ph_sun-bold.svg";
import playBtn from "./assets/ph_play-circle.svg"
import pauseBtn from "./assets/ph_pause-circle.svg"
import timerBtn from "./assets/ph_timer.svg";
import stopBtn from "./assets/ph_stop-circle.svg";
import speakerOff from "./assets/ph_speaker-none.svg";
import speakerOn from "./assets/ph_speaker-high.svg";

function App() {
  const currentTimer = useRef()
  const [bg, setBg] = useState(backgroundWhite);
  const [bodyBg, setBodyBg] = useState("#fff");
  const [timerColor, setTimerColor] = useState("#000");
  const [play, setPlay] = useState(playBtn)
  const [speaker, setSpeaker] = useState(speakerOff)
  const [stop, setStop] = useState(timerBtn)
  const [timer, setTimer] = useState(1500);
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    return ()=>clearInterval(currentTimer.current)
  })

  const switchTheme = () => {
    if (bg === backgroundWhite && bodyBg === "#fff") {
      setBg(backgroundBlack);
      setBodyBg("#000");
      setTimerColor("#fff");
    } else if (bg === backgroundBlack && bodyBg === "#000") {
      setBg(backgroundWhite);
      setBodyBg("#fff");
      setTimerColor("#000");
    }
  };

  const start = () => {
    setIsActive(!isActive)
    if (play === playBtn && stop === timerBtn) {
      setPlay(pauseBtn)
      setStop(stopBtn)
    } else {
      setPlay(playBtn)
      setStop(timerBtn)
    } 
  }

  const stopTimer = () => {
    setTimer(500)
    setIsActive(false)
    if (play === playBtn && stop === timerBtn) {
      setPlay(pauseBtn);
      setStop(stopBtn);
    } else {
      setPlay(playBtn);
      setStop(timerBtn);
    } 
  }

  const speakerChange = () => {
    if (speaker === speakerOff) {
      setSpeaker(speakerOn)
    } else {
      setSpeaker(speakerOff)
    }
  }

  useEffect(() => {
    if (isActive && timer > 0) {
      currentTimer.current = setInterval(() => {
      setTimer((timer) => timer - 1);
    }, 1000);
    }
  }, [timer, isActive]);

  const getTime = (timer) => {
    const min = Math.floor(timer / 60)
    const sec = timer % 60
    return `${min < 10 ? "0"+min : min}:${sec<10?"0"+sec: sec}`
  }

  return (
    <div className="App">
      <div className="pomodoro_body" style={{ background: `${bodyBg}` }}>
        <div className="pomodoro__header">
          <button
            className="pomodoro__mode"
            style={{ backgroundImage: `url(${bg})` }}
            onClick={switchTheme}
          ></button>
        </div>
        <div className="pomodoro__container">
          <div className="pomodoro__time">
            <p className="pomodoro__timer" style={{ color: `${timerColor}` }}>
              {getTime(timer)}
            </p>
          </div>
          <div className="pomodoro__settings">
            <button
              className="pomodoro__btns"
              style={{ backgroundImage: `url('${play}')` }}
              onClick={start}
            ></button>
            <button
              className="pomodoro__btns"
              style={{ backgroundImage: `url(${stop})` }}
              onClick={stopTimer}
            ></button>
            <button
              className="pomodoro__btns"
              style={{
                backgroundImage: `url(${speaker})`,
              }}
              onClick={speakerChange}
            ></button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
