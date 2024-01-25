import { zeroLeft } from "./zeroLeft"

export function secondsToTime(seconds: number):string{
    const hours = zeroLeft(seconds / 3600).toString().padStart(2, '0')
    const min = zeroLeft((seconds / 60) % 60).toString().padStart(2, '0')
    const sec = zeroLeft((seconds % 60) % 60).toString().padStart(2, '0')
    return `${hours}:${min}:${sec}`
}