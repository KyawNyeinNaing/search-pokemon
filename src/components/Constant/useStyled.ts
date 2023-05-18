import { useContext } from "react";
import { ThemeContext } from "styled-components";

const useStyledTheme = () => {
  const theme = useContext(ThemeContext);
  return theme || {};
};

export default useStyledTheme;
