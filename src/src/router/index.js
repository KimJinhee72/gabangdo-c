import { createRouter, createWebHistory } from "vue-router";
import Home from "../Home.vue";
import Bangbeob2 from "../views/bangbeob/Bangbeob2.vue";
import Yeyak from "../views/yeyak/Yeyak.vue";
import Yeyak2 from "../views/yeyak/Yeyak2.vue";
import Yeyak4 from "../views/yeyak/Yeyak4.vue";
import Yeyak5 from "../views/yeyak/Yeyak5.vue";
import YeyakLookup from "../views/yeyak/YeyakLookup.vue";
import YeyakLookup2 from "../views/yeyak/YeyakLookup2.vue";
import Yogeum from "../views/yogeum/Yogeum.vue";
import Sotong from "../views/sotong/Sotong.vue";
import Yeohaeng from "../views/yeohaeng/Yeohaeng.vue";
import Yh_Festival from "../views/yeohaeng/Yh_Festival.vue";
import Delivery from "../views/deliverylogin/Delivery.vue";
import Login from "../views/deliverylogin/Login.vue";
import Signup from "../views/deliverylogin/Signup.vue";
import findPassword from "../views/deliverylogin/findPassword.vue";
// 기사페이지
import DDashboard from "../pages/worker/DDashboard.vue";
import Assign from "../pages/worker/Assign.vue";
import AssignedJobs from "../pages/worker/AssignedJobs.vue";
import Jobhistory from "../pages/worker/Jobhistory.vue";
import Profile from "@/pages/worker/Profile.vue";
// 관리자페이지
import LoginAdmin from "../views/LoginAdmin.vue";
import AdminHome from "../pages/admin/AdminHome.vue";
import Dashboard from "../pages/admin/Dashboard.vue";
import Customers from "../pages/admin/Customers.vue";
import Settings from "../pages/admin/Settings.vue";
import Workers from "../pages/admin/Workers.vue";
import Reservations from "../pages/admin/Reservations.vue";
import SaleStatus from "@/pages/admin/SaleStatus.vue";
const routes = [
  { path: "/", component: Home },
  { path: "/bangbeob2", component: Bangbeob2 },
  { path: "/yeyak", component: Yeyak },
  { path: "/yeyak2", component: Yeyak2 },
  { path: "/yeyak4", component: Yeyak4 },
  { path: "/yeyak5", component: Yeyak5 },
  { path: "/yeyaklookup", component: YeyakLookup },
  { path: "/yeyaklookup2", component: YeyakLookup2 },
  { path: "/yogeum", component: Yogeum },
  { path: "/sotong", component: Sotong },
  { path: "/yeohaeng", component: Yeohaeng },
  { path: "/yh_festival", component: Yh_Festival },
  { path: "/delivery", component: Delivery },
  { path: "/login", component: Login },
  { path: "/signup", component: Signup },
  { path: "/findpassword", component: findPassword },
  {
    path: "/:pathMatch(.*)*",
    name: "ErrorPage",
    component: () => import("../views/ErrorPage.vue"),
  },
  // 기사페이지
  {
    path: "/worker",
    // component: WorkerHome,
    redirect: "/worker/DDashboard", //경로 접근시 자동 리다이렉트
    children: [
      {
        path: "ddashboard",
        component: DDashboard,
      },
      {
        path: "assigned-jobs",
        component: AssignedJobs,
      },
      {
        path: "assign",
        component: Assign,
      },
      {
        path: "job-history",
        component: Jobhistory,
      },
      {
        path: "profile",
        component: Profile,
      },
    ],
  },
  // 관리자페이지
  {
    path: "/admin",
    name: "LoginAdmin",
    component: LoginAdmin,
  },
  // 관리자 로그인후
  {
    path: "/admin",
    component: AdminHome,
    redirect: "/admin/dashboard",
    children: [
      {
        path: "dashboard",
        component: Dashboard,
      },
      {
        path: "customers",
        component: Customers,
      },
      {
        path: "settings",
        component: Settings,
      },
      {
        path: "workers",
        component: Workers,
      },
      {
        path: "reservations",
        component: Reservations,
      },
      { path: "salestatus", component: SaleStatus },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // 항상 맨 위로 스크롤
    return { top: 0 };
  },
});
export default router;
