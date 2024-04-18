import { createContext } from "react";

const PostContext = createContext({});
const PostDispatchContext = createContext(null);
const PostFilterContext = createContext('new');
const ChangeFilterContext = createContext(null);

export {PostContext};
export {PostDispatchContext};
export {PostFilterContext};
export {ChangeFilterContext};
