import { withPluginApi } from "discourse/lib/plugin-api";

export default {
  name: "discourse-navigation-controls",

  initialize(container) {
    withPluginApi("0.8.13", (api) => {
      api.onPageChange((url, title) => {
        const site = api.container.lookup("service:site");
        if (!site.mobileView) return;
      
        let lastScrollTop = 0;
        const scrollMax = 30;
        const hiddenNavControlsClass = "nav-controls-hidden";
        const scrollCallback = (() => {
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
        }).bind(this);
      });
    });
  },
};
