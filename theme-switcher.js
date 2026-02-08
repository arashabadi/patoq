(() => {
  const STORAGE_KEY = "patoq-color-mode";
  const DARK_MODE = "dark";
  const LIGHT_MODE = "light";

  const getStoredMode = () => {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch {
      return null;
    }
  };

  const setStoredMode = (mode) => {
    try {
      localStorage.setItem(STORAGE_KEY, mode);
    } catch {
      return;
    }
  };

  const normalizeMode = (mode) => (mode === LIGHT_MODE ? LIGHT_MODE : DARK_MODE);

  const applyMode = (mode) => {
    const resolvedMode = normalizeMode(mode);
    document.documentElement.setAttribute("data-bs-theme", resolvedMode);

    if (document.body) {
      document.body.classList.toggle("quarto-dark", resolvedMode === DARK_MODE);
      document.body.classList.toggle("quarto-light", resolvedMode === LIGHT_MODE);
    }

    const button = document.getElementById("patoq-theme-toggle");
    if (button) {
      const nextMode = resolvedMode === DARK_MODE ? LIGHT_MODE : DARK_MODE;
      button.textContent = resolvedMode === DARK_MODE ? "Light mode" : "Dark mode";
      button.setAttribute("aria-label", `Switch to ${nextMode} mode`);
      button.setAttribute("title", `Switch to ${nextMode} mode`);
    }
  };

  const mountToggle = () => {
    const headerContainer = document.querySelector("#quarto-header .container-fluid");
    if (!headerContainer || document.getElementById("patoq-theme-toggle")) {
      return;
    }

    const button = document.createElement("button");
    button.id = "patoq-theme-toggle";
    button.type = "button";
    button.className = "btn btn-sm";
    button.addEventListener("click", () => {
      const currentMode = normalizeMode(getStoredMode());
      const nextMode = currentMode === DARK_MODE ? LIGHT_MODE : DARK_MODE;
      setStoredMode(nextMode);
      applyMode(nextMode);
    });

    headerContainer.appendChild(button);
    applyMode(getStoredMode());
  };

  const initialize = () => {
    if (!getStoredMode()) {
      setStoredMode(DARK_MODE);
    }
    applyMode(getStoredMode());
    mountToggle();
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialize);
  } else {
    initialize();
  }
})();
