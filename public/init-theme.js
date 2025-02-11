const initTheme = () => {
  if (
    localStorage.darkMode === "true" ||
    (!("darkMode" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    document.documentElement.classList.add("dark");
    localStorage.darkMode = "true";
  } else {
    document.documentElement.classList.remove("dark");
    localStorage.darkMode = "false";
  }
};

initTheme();
