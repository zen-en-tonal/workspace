export const request = {
  run: (url: string) => fetch(url),
};

export const toJson = {
  run: (resp: Response) => resp.json(),
};

export const toText = {
  run: (resp: Response) => resp.text(),
};
