import React, { useEffect, useState } from "react";
import { useInterval } from "../hooks/use-interval";
import { secondsToMinutes } from "../utils/seconds-to-minutes";
import { Button } from "./button"
import { Timer } from "./timer";
import { secondsToTime } from "../utils/seconds-to-time";
const bell = require('../sounds/mixkit-bike-magical-bell-591.wav')

const audioStartWorking = new Audio(bell)

interface Props {
    pomodoroTime: number
    shortRestTime: number
    longRestTime: number
    cycles: number
}

export function PomodoroTimer(props: Props): JSX.Element {
    const [ mainTime, setMainTime ] = useState(props.pomodoroTime)
    const [ timeCounting, setTimeCounting ] = useState(false)
    const [ working, setWorking ] = useState(false)
    const [ resting, setResting ] = useState(false)
    const [ cyclesQtdManager, setCyclesQtdManager ] = useState(new Array(props.cycles - 1).fill(true),)

    const [completedCycles, setCompletedCycles] = useState(0)
    const [fullWorkingTime, setFullWorkingTime] = useState(0)
    const [numberOfPomodoros, setNumberOfPomodoros] = useState(0)

    useEffect(() => {
        if (working) document.body.classList.add('working')
        if (!working) document.body.classList.remove('working')
        if (resting) document.body.classList.remove('working')

        if (mainTime > 0) return;

        if (working && cyclesQtdManager.length > 0) {
            configureRest(false)
            cyclesQtdManager.pop()
        } else if (working && cyclesQtdManager.length <= 0) {
            configureRest(true)
            setCyclesQtdManager(new Array(props.cycles - 1).fill(true))
            setCompletedCycles(completedCycles + 1)
        }

        if (working) setNumberOfPomodoros(numberOfPomodoros + 1)
        if (resting) configureWork()
    }, [working, resting, mainTime]) // IF DONT WORK PUT ALL DEPENDENCES HERE

    useInterval(() => {
        setMainTime(mainTime - 1)
        if (working) setFullWorkingTime(fullWorkingTime + 1)
    }, timeCounting ? 1000 : null)

    const configureWork = () => {
        setTimeCounting(true) 
        setWorking(true)
        setResting(false)
        setMainTime(props.pomodoroTime)
        audioStartWorking.play()
    }

    const configurePause = () => {
        setTimeCounting(false) 
        setWorking(false)
    }

    const configureRest = (long: boolean) => {
        setTimeCounting(true) 
        setWorking(false)
        setResting(true)

        if(long) {
            setMainTime(props.longRestTime)
        } else {
            setMainTime(props.shortRestTime)
        }

        audioStartWorking.play()
    }

    return (
    <div className="pomodoro">
        <h2>You are: {working ? 'working' : 'resting'}</h2>
        <Timer mainTime={mainTime}/>

        <div className="controls">
            <Button text="work" onClick={() => configureWork()}></Button>
            <Button text="rest" onClick={() => configureRest(false)}></Button>
            <Button className={!working && !resting ? 'hidden' : ''} text={timeCounting ? "pause" : "play"} onClick={() => configurePause()}></Button>
        </div>

        <div className="details">
            <p>Ciclos concluídos: {completedCycles}</p>
            <p>Horas trabalhadas: {secondsToTime(fullWorkingTime)}</p>
            <p>Pomodoros concluídos: {numberOfPomodoros}</p>
        </div>
    </div>
)
}
