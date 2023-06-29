export const toTitleCase = (str: string) => {
  return str
    .toLowerCase()
    .split(" ")
    .map(function (word) {
      return word ? word.replace(word[0], word[0].toUpperCase()) : "";
    })
    .join(" ");
};

export const debounce = (func: (e: any) => void, delay = 200) => {
  let timer: NodeJS.Timeout;

  return (e: any) => {
    // clear any pre-existing timer
    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      console.warn("CALLING DEBOUNCED FUNC");
      func(e);
    }, delay);
  };
};
