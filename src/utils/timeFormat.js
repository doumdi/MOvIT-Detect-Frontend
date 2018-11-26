export function getTime(timestamp) {
  const date = new Date(timestamp);
  const hours = date.getHours() + OFFSET;
  const minutes = date.getMinutes() < 10
    ? `0${date.getMinutes()}`
    : date.getMinutes();
  return `${hours}:${minutes}`;
}
