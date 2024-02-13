import { DateTime } from "next-auth/providers/kakao";

const MONTH_NAMES = [
    "Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık" 
]

export default function createClockString(time: string) {
    return `${new Date(time).getDate()} 
        ${MONTH_NAMES.at(new Date(time).getMonth())} 
        ${(new Date(time).getHours() < 10) ? `0${new Date(time).getHours()}`:`${new Date(time).getHours()}`}:${(new Date(time).getMinutes() < 10) ? `0${new Date(time).getMinutes()}`:`${new Date(time).getMinutes()}`}`
}