function dateTime() {
    var currentdate = new Date();
    var pst = new Date(currentdate.toLocaleString("en-US", {timeZone: "America/Los_Angeles"}));

    var month = pst.getMonth() + 1;
    var day = pst.getDate();
    var year = pst.getFullYear();
    var hours = pst.getHours();
    var minutes = pst.getMinutes();
    var seconds = pst.getSeconds();
    var ampm = hours >= 12 ? 'PM' : 'AM';

    const date = {year:year, month:month, day:day};

    hours = hours % 12;
    hours = hours ? hours : 12; // handle midnight (12 AM)

    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    // var formattedDate = month + "/" + day + "/" + year + " " + hours + ":" + minutes + ' ' + ampm;
    return {date: date, time: {hours: hours, minutes: minutes, seconds: seconds, ampm: ampm}}
}
module.exports = { dateTime };
