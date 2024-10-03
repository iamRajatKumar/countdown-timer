const InputTimer = ({handleInput, handleStart}) =>{
    return(
        <div className="input-container">
          <div className="input-box">
            <input id="hours" onChange={handleInput} placeholder="Hr" />
            <input id="minutes" onChange={handleInput} placeholder="Min" />
            <input id="seconds" onChange={handleInput} placeholder="Sec" />
          </div>
          <button className="timer-button" onClick={handleStart}>
            Start
          </button>
        </div>
    )
}

export default InputTimer;