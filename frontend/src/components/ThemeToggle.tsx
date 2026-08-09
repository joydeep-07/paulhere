import { CiDark, CiLight } from "react-icons/ci";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { toggleTheme } from "../redux/themeSlice";

const ThemeToggle = () => {
  const dispatch = useAppDispatch();

  const theme = useAppSelector((state) => state.theme.mode);

  const handleToggle = () => {
    dispatch(toggleTheme());
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      className="flex items-center justify-center cursor-pointer"
    >
      {theme === "light" ? <CiDark size={28} /> : <CiLight size={28} />}
    </button>
  );
};

export default ThemeToggle;
