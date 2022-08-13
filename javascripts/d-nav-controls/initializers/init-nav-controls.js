import { withPluginApi } from "discourse/lib/plugin-api";

export default {
  name: "discourse-navigation-controls",

  initialize() {
    withPluginApi("0.8.13", (api) => {
      const site = api.container.lookup("site:main");
      if (!site.mobileView) return;
            
        let scrollpos = window.scrollY
        const body = document.body;
        const header_height = 30;

        const add_class_on_scroll = () => body.classList.add("fade-in")
        const remove_class_on_scroll = () => body.classList.remove("fade-in")

        window.addEventListener('scroll', function() { 
          scrollpos = window.scrollY;

          if (scrollpos >= header_height) { add_class_on_scroll() }
          else { remove_class_on_scroll() }

          console.log(scrollpos)
        })
    });
  },
};
