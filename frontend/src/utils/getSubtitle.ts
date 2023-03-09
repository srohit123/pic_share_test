export const getSubtitle = (title: string): string => {
  if (title.length > 10) {
    const subtitle = title.substring(0, 10) + "...";
    return subtitle;
  }
  return title;
};
