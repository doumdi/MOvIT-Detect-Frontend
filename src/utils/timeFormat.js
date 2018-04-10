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

export function milliToPercent(milliArray) {
  const percentArray = [];
  let total = 0;
  milliArray.forEach((element) => {
    total += element;
  });
  milliArray.forEach((element) => {
    percentArray.push(Math.round((element / total) * 100));
  });
  return percentArray;
}
