export function pasteNotAllowFunc(id) {
    let myInput = document.getElementById(id);
    myInput.onpaste = (e) => e.preventDefault();
}

export function convertToMilisecond(time = "0ms") {
    let milisecond = 0;

    let timeUnit = time.match(/([a-z]+)/gm)[0];

    let second = 1000;
    let minute = 60 * second;
    let hour = 60 * minute;
    let day = 24 * hour;
    let week = 7 * day;
    let month = 31 * day;
    let year = 365 * 24 * day;

    switch (timeUnit) {
        case "m":
            milisecond = parseInt(time) * minute;
            break;

        case "h":
            milisecond = parseInt(time) * hour;
            break;

        case "weeks":
            milisecond = parseInt(time) * week;
            break;

        case "months":
            milisecond = parseInt(time) * month;
            break;

        case "y":
            milisecond = parseInt(time) * year;
            break;

        default:
            milisecond = second;
            break;
    }

    return milisecond;
}
