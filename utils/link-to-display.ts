export const linkToDisplay = (link: string) => {
  return link
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .split("/")[0];
};
