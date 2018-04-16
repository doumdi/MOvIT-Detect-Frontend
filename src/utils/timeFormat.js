export function milliToTimeString(value) {
  return `${Math.floor(value / 3600000)}:${(`0${Math.floor((value % 3600000) / 60000)}`).slice(-2)}`;
}
