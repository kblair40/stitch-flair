const borderClasses = [
  "transition-colors duration-200",
  "border border-gray-200 hover:border-gray-300",
  "focus-within:border-gray-400 focus-within:hover:border-gray-400",
].join(" ");

const buttonLoadingClasses = [
  "formkit-loading:before:animate-spin",
  // "formkit-loading:before:w-4 formkit-loading:before:h-4 formkit-loading:before:mr-2",
  // "formkit-loading:before:border formkit-loading:before:border-2 formkit-loading:before:border-r-transparent",
  // "formkit-loading:before:rounded-3xl formkit-loading:before:border-white formkit-loading:before:animate-spin",
];

const classes = {
  global: {
    outer: "formkit-disabled:opacity-60 w-full",
    label: "block mb-1 font-semibold text-sm formkit-invalid:text-red-500",
    inner: `w-full bg-white ${borderClasses} rounded-lg mb-1 overflow-hidden formkit-invalid:border-red-500`,
    // inner: //  <-- PREV
    //   "w-full border border-gray-200 rounded-lg mb-1 overflow-hidden formkit-invalid:border-red-500",
    input:
      "w-full px-3 border-none text-base text-gray-800 placeholder-gray-400 focus-visible:outline-none",
    // "w-full h-10 px-3 border-none text-base text-gray-800 placeholder-gray-400 focus-visible:outline-none",
    help: "text-xs text-gray-500",
    messages: "list-none p-0 mt-1 mb-0",
    message: "text-red-500 mb-1 text-xs",
    // wrapper: "border",
  },
  text: {
    input: "h-10",
  },
  number: {
    input: "h-10",
  },
  checkbox: {
    // outer: "flex border border-red-300 w-max",
    outer: "flex w-max",
    wrapper: "flex flex-col-reverse justify-end",
    inner: "$reset w-min",
    input: "$reset w-5 h-5",
    label: "w-max",
  },
  "family:button": {
    input: `h-10 rounded-md w-full bg-emoryblue hover:bg-emoryblue-600 active:bg-emoryblue-700 font-medium tracking-wide py-2 px-6 rounded focus-visible:outline-2 focus-visible:outline-blue-600 focus-visible:outline-offset-1 formkit-disabled:bg-gray-400 ${buttonLoadingClasses}`,
    wrapper: "mb-1",
    prefixIcon: "$reset block w-4 -ml-2 mr-2 stretch",
    suffixIcon: "$reset block w-4 ml-2 stretch",
  },
  select: {
    // outer: "formkit-multiple:h-18",
    inner: "pr-2 formkit-multiple:pr-0",
    input: "pl-2",
    // input:
    //   "pl-2 formkit-multiple:h-16 formkit-multiple:pt-1 formkit-multiple:max-h-min",
    // selectIcon: "border border-red-500",
    // option: "formkit-multiple:p-3 formkit-multiple:text-sm text-gray-700",
  },
  textarea: {
    inner: "bg-white mb-0",
    input: "h-auto pt-1",
  },
  submit: {
    input:
      "border border-whitepeach-300 transition-colors duration-300 mx-auto py-2 px-6 rounded-md bg-lightpeach-50 hover:bg-lightpeach-100 active:bg-lightpeach-200",
    label: "text-lg font-medium text-slate-100",
  },
};

// const buttonClasses = [
//   "border border-whitepeach-300",
//   "transition-colors duration-300",
//   "w-1/2 mx-auto py-2 px-6 rounded-md",
//   "text-lg font-medium",
//   "bg-lightpeach-50 text-purplegrey-600",
//   "hover:bg-lightpeach-100 active:bg-lightpeach-200",
// ];
// text-lg font-medium bg-lightpeach-50 text-purplegrey-600 hover:bg-lightpeach-100 active:bg-lightpeach-200

export default classes;
