const changeTime = (dateString: string, newTime: string) => {
  let date = new Date(dateString);

  const [newHour = 0, newMinute = 0, newSecond = 0] = newTime.split(':');

  date.setHours(Number(newHour), Number(newMinute), Number(newSecond));

  let newDateString = date.toISOString();

  return newDateString;
};

export const DateUtils = {
  changeTime,
};
