const classes = {
  global: {
    outer: "mb-5 formkit-disabled:opacity-40 w-full",
    label: "block mb-1 font-semibold text-sm formkit-invalid:text-red-500",
    inner:
      "w-full border border-gray-400 rounded-lg mb-1 overflow-hidden focus-within:border-emoryblue-400 formkit-invalid:border-red-500",
    input:
      "w-full h-10 px-3 border-none text-base text-gray-700 placeholder-gray-400 focus-visible:outline-none",
    help: "text-xs text-gray-500",
    messages: "list-none p-0 mt-1 mb-0",
    message: "text-red-500 mb-1 text-xs",
    // wrapper: "border"
  },
  checkbox: {
    outer: "flex w-full",
    wrapper: "flex flex-col-reverse w-full",
    // inner: "border border-green-300",
    inner: "$reset w-min",
    input: "$reset border border-red-300 w-min",
    label: "w-max",
  },
  "family:button": {
    input:
      "rounded-md w-full bg-emoryblue hover:bg-emoryblue-600 active:bg-emoryblue-700 text-white font-medium tracking-wide py-2 px-6 rounded focus-visible:outline-2 focus-visible:outline-blue-600 focus-visible:outline-offset-1 formkit-disabled:bg-gray-400 formkit-loading:before:w-4 formkit-loading:before:h-4 formkit-loading:before:mr-2 formkit-loading:before:border formkit-loading:before:border-2 formkit-loading:before:border-r-transparent formkit-loading:before:rounded-3xl formkit-loading:before:border-white formkit-loading:before:animate-spin",
    wrapper: "mb-1",
    prefixIcon: "$reset block w-4 -ml-2 mr-2 stretch",
    suffixIcon: "$reset block w-4 ml-2 stretch",
  },
  //   'family:dropdown': {
  //     dropdownWrapper:
  //       'my-2 w-full drop-shadow-lg rounded [&::-webkit-scrollbar]:hidden',
  //     emptyMessageInner:
  //       'flex items-center justify-center text-sm p-2 text-center w-full text-gray-500 [&>span]:mr-3 [&>span]:ml-0',
  //     inner:
  //       'max-w-md relative flex ring-1 ring-gray-400 focus-within:ring-blue-500 focus-within:ring-2 rounded mb-1 formkit-disabled:focus-within:ring-gray-400 formkit-disabled:focus-within:ring-1 [&>span:first-child]:focus-within:text-blue-500',
  //     input: 'w-full px-3 py-2',
  //     listbox: 'bg-white drop-shadow-lg rounded overflow-hidden',
  //     listboxButton: 'flex w-12 self-stretch justify-center mx-auto',
  //     listitem:
  //       'pl-7 relative hover:bg-gray-300 data-[is-active="true"]:bg-gray-300 data-[is-active="true"]:aria-selected:bg-blue-600 aria-selected:bg-blue-600 aria-selected:text-white',
  //     loaderIcon: 'ml-auto',
  //     loadMoreInner:
  //       'flex items-center justify-center text-sm p-2 text-center w-full text-blue-500 formkit-loading:text-gray-500 cursor-pointer [&>span]:mr-3 [&>span]:ml-0',
  //     option: 'p-2.5',
  //     optionLoading: 'text-gray-500',
  //     placeholder: 'p-2.5 text-gray-400',
  //     selector: 'flex w-full justify-between items-center [&u]',
  //     selectedIcon: 'block absolute top-1/2 left-2 w-3 -translate-y-1/2',
  //     selectIcon: 'flex box-content w-4 px-2 self-stretch grow-0 shrink-0',
  //   },
  //   radio: {
  //     decorator: 'rounded-full',
  //     decoratorIcon: 'w-5 p-[5px]',
  //   },
  //   range: {
  //     inner: '$reset flex items-center max-w-md',
  //     input: '$reset w-full mb-1 h-2 p-0 rounded-full',
  //     prefixIcon:
  //       '$reset w-4 mr-1 flex self-stretch grow-0 shrink-0 [&>svg]:max-w-[1em] [&>svg]:max-h-[1em] [&>svg]:m-auto',
  //     suffixIcon:
  //       '$reset w-4 ml-1 flex self-stretch grow-0 shrink-0 [&>svg]:max-w-[1em] [&>svg]:max-h-[1em] [&>svg]:m-auto',
  //   },
  select: {
    inner: "pr-3",
    input: "pl-2",
    // selectIcon: '',
    // option: "formkit-multiple:p-3 formkit-multiple:text-sm text-gray-700",
  },
  textarea: {
    inner: "pb-0 w-full",
    input: "pt-1 pb-0 w-full",
  },
};

export default classes;
