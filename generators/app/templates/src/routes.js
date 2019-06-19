import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const Todo = () => import("./pages/Todo.vue");

export const dynamicRoutes = [{ path: "/todo", component: Todo, icon: "todo" }];

const router = new VueRouter({
  mode: "history",
  routes: dynamicRoutes
});

export default router;
