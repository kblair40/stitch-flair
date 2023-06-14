export const toTitleCase = (str: string) => {
  return str
    .toLowerCase()
    .split(" ")
    .map(function (word) {
      console.log("WORD:", word, typeof word);
      return word ? word.replace(word[0], word[0].toUpperCase()) : "";
    })
    .join(" ");
};
