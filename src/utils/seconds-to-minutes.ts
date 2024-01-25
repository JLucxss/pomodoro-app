import { zeroLeft } from "./zeroLeft"

export function secondsToMinutes(seconds: number):string{
    const min = zeroLeft((seconds / 60) % 60).toString().padStart(2, '0')
    const sec = zeroLeft((seconds % 60) % 60).toString().padStart(2, '0')
    return `${min}:${sec}`
}