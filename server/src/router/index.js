import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("@/views/AttendanceVersionOne"),
  },
  {
    path: "/canvas",
    name: "canvas",
    component: () => import("@/components/SignatureCanvas.vue"),
  },
  {
    path: "/fileUpload",
    name: "fileUpload",
    component: () => import("@/components/FileUpload.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
