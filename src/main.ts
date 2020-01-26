import Vue from "vue";
import App from "./App.vue";
import {
  Divider,
  Grid,
  GridItem,
  Circle,
  DatetimePicker,
  CellGroup,
  Field,
  Overlay,
  Icon
} from "vant";

Vue.use(Icon);
Vue.use(Overlay);
Vue.use(Field);
Vue.use(CellGroup);
Vue.use(DatetimePicker);
Vue.use(Divider);
Vue.use(Grid);
Vue.use(GridItem);
Vue.use(Circle);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
