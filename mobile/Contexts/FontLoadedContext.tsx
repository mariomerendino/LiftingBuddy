import { createContext } from "react";

interface FontLoadedContextType {
  fontLoaded: boolean;
}

const FontLoadedContext = createContext<FontLoadedContextType>({
  fontLoaded: false,
});

export default FontLoadedContext;
