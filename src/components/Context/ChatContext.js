import { createContext } from "react";

export const callInfoContext = createContext(
  {
    onCall:false,
    to:'',
  }
);
