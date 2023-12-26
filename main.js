// #ifndef VUE3
import Vue from 'vue';
import App from './App';

Vue.config.productionTip = false;

App.mpType = 'app';

const app = new Vue({
    ...App
});
app.$mount();
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue';
import * as Pinia from 'pinia';
import tabBar from '@/component/tabbar.vue';
export function createApp() {
  const app = createSSRApp(App);
  app.use(Pinia.createPinia());
  app.component('my-tabBar',tabBar)
  return {
    app,
	Pinia
  };
}
// #endif