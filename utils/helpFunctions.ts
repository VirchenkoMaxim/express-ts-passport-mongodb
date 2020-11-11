export const imgPath = (imgPath: string): string => {
  return `${process.env.HOST}/${imgPath}`;
};
