import Vue from "vue";
import App from "./App.vue";
import { Divider, Grid, GridItem, Circle } from "vant";

Vue.use(Divider);
Vue.use(Grid);
Vue.use(GridItem);
Vue.use(Circle);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
