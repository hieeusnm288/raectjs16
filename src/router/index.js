import TrangChu from "../Component/TrangChu/TrangChu";

import HomePage from "../Component/HomePage/HomePage";
import Login from "../Component/Login/login";
import LichCoQuan from "../Component/LichCoQuan/LichCoQuan";
import CreateLich from "../Component/LichCoQuan/CreateLich";
import DetailLich from "../Component/LichCoQuan/DetailLich";
import UpdateLich from "../Component/LichCoQuan/UpdateLich";
import ListThongBao from "../Component/ThongBao/ListThongBao";
import DetailThongBao from "../Component/ThongBao/DetailThongBao";

const publicRoutes = [
  { path: "/login", component: Login, layout: null },
  { path: "/home", component: HomePage, layout: TrangChu },

  // Router Lịch
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
  {
    path: "/company-work-schedule/update/:code",
    component: UpdateLich,
    layout: TrangChu,
  },

  //Router Thông Báo
  {
    path: "/utility/general-notifications",
    component: ListThongBao,
    layout: TrangChu,
  },
  {
    path: "/utility/general-notifications/view/:id",
    component: DetailThongBao,
    layout: TrangChu,
  },
  //   { path: '/upload', component: Upload, layout: HeaderOnly },
  //   { path: '/search', component: Search, layout: null },
  // /utility/general-notifications
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
