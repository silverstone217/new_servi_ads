export const isEmptyString = (str: string): boolean => {
  return str.replace(/ /g, "") === "";
};
