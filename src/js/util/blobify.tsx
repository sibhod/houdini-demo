export const blobify = (str: string): string => {
  const URL = window.URL || window.webkitURL;
  const blob = new Blob([`${str}`], {
    type: 'application/javascript',
  });
  return URL.createObjectURL(blob);
};

export const blobifyFunction = (func: () => any): string => {
  return blobify(func.toString());
};
