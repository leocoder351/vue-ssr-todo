import Vue from 'vue';
import VueRouter from 'vue-router';
import Todo from '../views/todo/Todo.vue';

Vue.use(VueRouter);

let routes = [
  {
    path: '/',
    redirect: '/app'
  },
  {
    name: 'App',
    path: '/app',
    component: Todo,
    meta: {
      title: 'this is app',
      description: 'adsad'
    },
    children: [
      {
        path: '/test',
        component: Todo
      }
    ]
  }
];

function createRouter() {
  const router = new VueRouter({
    mode: 'history',
    routes
  });

  return router;
}

export default createRouter;
