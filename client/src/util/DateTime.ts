export const timeDifferenceInMinutesAndSeconds = (date: number) => {
    var delta = Math.abs(Date.now() - date) / 1000;

    var days = Math.floor(delta / 86400);
    delta -= days * 86400;

    var hours = Math.floor(delta / 3600) % 24;
    delta -= hours * 3600;

    var minutes = Math.floor(delta / 60) % 60;
    delta -= minutes * 60;

    var seconds = Math.floor(delta % 60);
    return { days, hours, minutes, seconds };
};
