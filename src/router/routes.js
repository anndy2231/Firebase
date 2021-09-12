const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/SignIn.vue") },
      { path: "/signup", component: () => import("pages/SignUp.vue") },
      { path: "/index", component: () => import("pages/Index.vue") },
      { path: "/myinfo", component: () => import("pages/MyInfo.vue") },
      { path: "/update", component: () => import("pages/Update.vue") },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/Error404.vue"),
  },
];

export default routes;
