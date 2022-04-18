export const getCount = ({
  saleStartTime,
  revealStartTime,
  setDays,
  setHours,
  setMinutes,
  setSeconds,
}) => {
  var calc = setInterval(function () {
    let unixTime = saleStartTime || revealStartTime * 1000;
    let dateFuture = new Date(unixTime);
    let dateNow = new Date();

    let seconds = Math.floor((dateFuture - dateNow) / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
    let days = Math.floor(hours / 24);

    hours = hours - days * 24;
    minutes = minutes - days * 24 * 60 - hours * 60;
    seconds = seconds - days * 24 * 60 * 60 - hours * 60 * 60 - minutes * 60;
    console.log("days in getCount", days);
    setDays(days);
    setHours(hours);
    setMinutes(minutes);
    setSeconds(seconds);
  }, 1000);
};
