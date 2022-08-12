import { withPluginApi } from "discourse/lib/plugin-api";

export default {
  name: "discourse-navigation-controls",

  initialize() {
    withPluginApi("0.8.13", (api) => {
      const site = api.container.lookup("site:main");
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

    this.reopen({

      didInsertElement() {
        this._super(...arguments);
        document.addEventListener("scroll", scrollCallback);
      },

      willDestroyElement() {
        this._super(...arguments);
        document.removeEventListener("scroll", scrollCallback);
      },
    });
  },
};
