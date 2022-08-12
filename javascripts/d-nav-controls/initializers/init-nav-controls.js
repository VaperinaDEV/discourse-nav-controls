import { withPluginApi } from "discourse/lib/plugin-api";

export default {
  name: "discourse-navigation-controls",

  initialize() {
    withPluginApi("0.8.13", (api) => {
      const site = api.container.lookup("site:main");
      if (!site.mobileView) return;
          
      function scrollCallback = (() => {
        let lastScrollTop = 0;
        const scrollMax = 30;
        const hiddenNavControlsClass = "nav-controls-hidden";

        const scrollTop = window.scrollY;
        const body = document.body;
        if (
          lastScrollTop < scrollTop &&
          scrollTop > scrollMax &&
          !body.classList.contains(hiddenNavControlsClass)
        ) {
          body.classList.add(hiddenNavControlsClass);
        } else if (
          lastScrollTop > scrollTop &&
          body.classList.contains(hiddenNavControlsClass)
        ) {
          body.classList.remove(hiddenNavControlsClass);
        }
        lastScrollTop = scrollTop;
      });
      document.addEventListener("scroll", scrollCallback);
      document.removeEventListener("scroll", scrollCallback);
    });
  },
};
