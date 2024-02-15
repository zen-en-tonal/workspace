export const request = (init?: RequestInit) => ({
  run: (url: string) => fetch(url, init),
});

export const toJson = {
  run: (resp: Response) => resp.json(),
};

export const toText = {
  run: (resp: Response) => resp.text(),
};
