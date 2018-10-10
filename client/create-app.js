import Vue from 'vue';
import App from './App.vue';
import createStore from './store/store';
import createRouter from './router/router';

import './assets/styles/global.styl';

export default () => {
  const router = createRouter();
  const store = createStore();

  const app = new Vue({
    router,
    store,
    render: h => h(App)
  });

  return { app, router, store };
} 
