import Vue from "vue";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

import App from "./App.vue";
import router from "./routes";
import { post, get, put } from "./utils/request";
import "./plugins/element.js";
import "./styles/index.scss";

import store from "./store";

NProgress.configure({ showSpinner: false });

Vue.prototype.$post = post;
Vue.prototype.$get = get;
Vue.prototype.$put = put;

router.afterEach(() => {
  NProgress.done();
});

new Vue({
  router,
  store,
  render(h) {
    return h(App);
  }
}).$mount("#app");
