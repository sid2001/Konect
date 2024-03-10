import { createContext } from "react";

export const callInfoContext = createContext(
  {
    onCall:false,
    to:'',
  }
);
export const chatHistoryContext = createContext(null);
export const chatHistoryDispatchContext = createContext(null);

export const incomingCallContext = createContext(null);
export const dispatchIncomingCallContext = createContext(null);