import { DefaultConfigOptions } from "@formkit/vue";
import { generateClasses } from "@formkit/themes";

import twclasses from "./utils/tw-classes";

const config: DefaultConfigOptions = {
  config: {
    classes: generateClasses(twclasses),
  },
};

export default config;
