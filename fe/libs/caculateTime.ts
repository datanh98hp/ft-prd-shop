export type TimeLeft = {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
};
export type InputTime = {
    yearEnd: number;
    monthEnd: number;
    dayEnd: number;
}
export const calculateTimeLeft = ({
    yearEnd,
    monthEnd,
    dayEnd,
}: InputTime) => {

    // let year = new Date().getFullYear();
    // let month = new Date().getMonth() + 1;
    // let day = new Date().getDate() + 2;

    const difference = +new Date(`${yearEnd}-${monthEnd}-${dayEnd}`) - +new Date();

    let timeLeft: TimeLeft = {} as TimeLeft;

    if (difference > 0) {
        timeLeft = {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
            seconds: Math.floor((difference / 1000) % 60),
        };
    } else {
        timeLeft = {
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
        };
    }

    return timeLeft;
};