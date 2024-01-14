const formatInfo = (
  location: string,
  start_date: string,
  start_time: string,
  end_time: string,
) => {
  return `${location} | ${new Date(
    start_date,
  ).toLocaleDateString()} | ${start_time} - ${end_time}`;
};

export const TextUtils = {
  formatInfo,
};
