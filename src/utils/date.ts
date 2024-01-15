interface EventDateParams {
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
}

const getEventStartAndEndDate = ({
  startDate,
  startTime,
  endDate,
  endTime,
}: EventDateParams) => {
  let start = new Date(startDate);
  let end = new Date(endDate);

  const [startHour = 0, startMinute = 0, startSecond = 0] =
    startTime.split(':');
  const [endHour = 0, endMinute = 0, endSecond = 0] = endTime.split(':');

  start.setHours(Number(startHour), Number(startMinute), Number(startSecond));
  end.setHours(Number(endHour), Number(endMinute), Number(endSecond));

  if (endTime === '00:00') {
    end.setDate(end.getDate() + 1);
  }

  let newStartDateString = start.toISOString();
  let newEndDateString = end.toISOString();

  return {startDate: newStartDateString, endDate: newEndDateString};
};

export const DateUtils = {
  getEventStartAndEndDate,
};
