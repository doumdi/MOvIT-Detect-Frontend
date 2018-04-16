const monthDays = {
  1: 31,
  2: 28,
  3: 31,
  4: 30,
  5: 31,
  6: 30,
  7: 31,
  8: 31,
  9: 30,
  10: 31,
  11: 30,
  12: 31,
};
export function toDisabledDates(data) {
  const disabledDates = {
    firstDate: null,
    dates: [],
    lastDate: null,
  };
  let index = 0;
  const dates = data['2018'];
  Object.keys(dates).forEach((key) => {
    const property = dates[key];
    if (index === 0) {
      disabledDates.firstDate = new Date(`2018-${key}-${property[0]}`);
    }
    if (index === Object.keys(dates).length - 1) {
      disabledDates.lastDate = new Date(`2018-${key}-${property[property.length - 1]}`);
    }
    for (let i = 1; i <= monthDays[key]; i += 1) {
      if (property.indexOf(i) === -1) {
        disabledDates.dates.push(new Date(`2018-${key}-${i}`));
      }
    }
    index += 1;
  });
  return disabledDates;
}
