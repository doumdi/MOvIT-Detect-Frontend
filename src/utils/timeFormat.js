export function milliToMinute(milliSeconds) {
  return Math.round(milliSeconds / 600000);
}

export function milliArrayToMinute(milliArray) {
  const minuteArray = [];
  milliArray.forEach((element) => {
    minuteArray.push(Math.round(element / 60000));
  });
  return minuteArray;
}
