const MAX_CHARS = 15;

const formatTitle = (title: string, date_end: number) => {
  const truncatedTitle =
    title.length > MAX_CHARS ? `${title.substring(0, MAX_CHARS)}... ` : title;

  const comma = date_end ? ',' : '';
  const fullTitle = `${truncatedTitle}${comma} ${date_end || ''}`;

  return fullTitle;
};

const formatSubtitle = (subtitle: string) => {
  const truncatedSubtitle =
    subtitle.length > MAX_CHARS
      ? `${subtitle.substring(0, MAX_CHARS)}... `
      : subtitle;

  return truncatedSubtitle;
};

export const TextUtils = {
  formatTitle,
  formatSubtitle,
};
