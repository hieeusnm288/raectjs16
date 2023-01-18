import TrangChu from "../Component/TrangChu/TrangChu";

import HomePage from "../Component/HomePage/HomePage";
import Login from "../Component/Login/login";
import LichCoQuan from "../Component/LichCoQuan/LichCoQuan";
import CreateLich from "../Component/LichCoQuan/CreateLich";
import DetailLich from "../Component/LichCoQuan/DetailLich";

const publicRoutes = [
  { path: "/login", component: Login, layout: null },
  { path: "/home", component: HomePage, layout: TrangChu },
  { path: "/company-work-schedule", component: LichCoQuan, layout: TrangChu },
  {
    path: "/company-work-schedule/view/:code",
    component: DetailLich,
    layout: TrangChu,
  },

  {
    path: "/company-work-schedule/create",
    component: CreateLich,
    layout: TrangChu,
  },
  //   { path: '/upload', component: Upload, layout: HeaderOnly },
  //   { path: '/search', component: Search, layout: null },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
