import{q as p,j as e,a as c}from"./app-bkc-gmOT.js";import{B as n}from"./badge-PS8yy1KL.js";import{B as a}from"./button-DMvL_EpJ.js";import{C as g}from"./CourseLayout-DgLe218b.js";import{c as r}from"./createLucideIcon-CLRVkLq4.js";import{V as y}from"./video-CjBBTv9c.js";import{B as j}from"./book-a-CXPG7sKj.js";import"./index-BZ36hmY6.js";import"./utils-8RyR4BqC.js";import"./HomePageNavbar-DQtGlq6R.js";import"./UserMenu-uAI1TWL9.js";import"./dropdown-menu-DyE1_TF9.js";import"./index-CMgGuZy0.js";import"./index-JPL_TFbB.js";import"./index-wwYF-KOM.js";import"./index-CJUdMhxc.js";import"./component-CYGots2c.js";import"./chevron-right-BZ2JxwW8.js";import"./check-BCCSV_ru.js";import"./UserAvatar-BMIiIQHD.js";import"./sonner-8Cn1ircH.js";import"./index-CWUdkeQT.js";/**
 * @license lucide-react v0.396.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const u=r("AudioLines",[["path",{d:"M2 10v3",key:"1fnikh"}],["path",{d:"M6 6v11",key:"11sgs0"}],["path",{d:"M10 3v18",key:"yhl04a"}],["path",{d:"M14 8v7",key:"3a1oy3"}],["path",{d:"M18 5v13",key:"123xd1"}],["path",{d:"M22 10v3",key:"154ddg"}]]);/**
 * @license lucide-react v0.396.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const f=r("ChevronLeft",[["path",{d:"m15 18-6-6 6-6",key:"1wnfg3"}]]);/**
 * @license lucide-react v0.396.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const v=r("CircleCheck",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]]);/**
 * @license lucide-react v0.396.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const N=r("CircleDollarSign",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8",key:"1h4pet"}],["path",{d:"M12 18V6",key:"zqpxq5"}]]);/**
 * @license lucide-react v0.396.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const h=r("Clock",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["polyline",{points:"12 6 12 12 16 14",key:"68esgv"}]]);/**
 * @license lucide-react v0.396.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const b=r("Lock",[["rect",{width:"18",height:"11",x:"3",y:"11",rx:"2",ry:"2",key:"1w4ew1"}],["path",{d:"M7 11V7a5 5 0 0 1 10 0v4",key:"fwvmzm"}]]);/**
 * @license lucide-react v0.396.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const w=r("Save",[["path",{d:"M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z",key:"1c8476"}],["path",{d:"M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7",key:"1ydtos"}],["path",{d:"M7 3v4a1 1 0 0 0 1 1h7",key:"t51u73"}]]),k=({auth:t})=>{var m,o;const s=p().props.course,i=(o=(m=t.user)==null?void 0:m.purchased_courses)==null?void 0:o.some(l=>l.id===s.id),d=t.user.id===s.user_id;return e.jsx("div",{className:"border border-gray-700 rounded-md p-4",children:e.jsxs("div",{className:"flex-1 space-y-4",children:[e.jsxs("div",{className:"w-full mx-auto p-6 rounded-lg text-white",children:[e.jsxs("div",{className:"flex items-center justify-between mb-4",children:[e.jsxs(a,{size:"sm",variant:"outline",className:"bg-gray-900 hover:bg-gray-800 text-gray-400 hover:text-white border border-gray-700",children:[e.jsx(f,{size:16,className:"mr-2"}),"Browse All Series"]}),e.jsx(n,{className:"border border-red-900 bg-red-900 text-red-100 cursor-pointer hover:bg-red-100 hover:text-red-900",children:"Frameworks"})]}),e.jsxs("div",{className:"mb-6",children:[e.jsx("h1",{className:"text-3xl font-bold mb-2 text-gray-400",children:s.title}),e.jsxs("p",{className:"text-sm text-gray-400 mb-4",children:["Last Updated:",e.jsx(n,{variant:"outline",className:"ml-2 text-gray-400",children:s.updated_at})]}),e.jsx("p",{className:"text-gray-300",children:s.description})]}),!d&&e.jsxs("div",{className:"flex flex-col md:flex-row gap-4",children:[i&&e.jsx(c,{href:`/courses/${s.slug}/chapters/${s.chapters[0].id}`,children:e.jsxs(a,{variant:"outline",className:"bg-gray-900 hover:bg-gray-800 text-gray-400 hover:text-white border border-gray-700",children:[e.jsx(y,{size:16,className:"mr-2"}),e.jsx("span",{className:"flex items-center gap-2",children:"Continue Series"})]})}),e.jsxs(a,{variant:"outline",className:"bg-gray-700 hover:bg-gray-800 text-gray-400 hover:text-white border border-gray-700",children:[e.jsx(w,{size:16,className:"mr-2"}),"Add to Watchlist"]}),!i&&e.jsx(c,{href:`/payment?course=${s.id}&price=${s.price}`,className:"md:ml-auto w-full",children:e.jsxs(a,{className:"bg-gradient",children:[e.jsx(N,{size:16,className:"mr-2"}),e.jsx("span",{className:"font-semibold",children:"Enroll Now"})]})})]})]}),e.jsx("div",{className:"px-6",children:e.jsx("div",{className:"w-full mb-2 mx-auto p-6 bg-gray-800 rounded-lg shadow-md",children:e.jsxs("div",{className:"flex flex-col md:flex-row items-center md:justify-between",children:[e.jsxs("div",{className:"flex items-center w-full justify-between md:justify-start gap-2 text-gray-400",children:[e.jsxs("div",{className:"flex items-center gap-1",children:[e.jsx(j,{size:12}),e.jsx("span",{className:"text-sm",children:"5 Lessons"})]}),e.jsxs("div",{className:"flex items-center gap-1",children:[e.jsx(h,{size:12}),e.jsx("span",{className:"text-sm",children:"2 hours 30 minutes"})]}),e.jsxs("div",{className:"xl:flex gap-1 items-center hidden",children:[e.jsx(u,{size:12}),e.jsx("span",{className:"text-sm",children:"Level: Intermediate"})]})]}),!d&&i&&e.jsxs("div",{className:"flex justify-between md:justify-end gap-2 items-center w-full",children:[e.jsxs(a,{className:"text-gray-400 hover:text-white",children:[e.jsx(h,{size:16,className:"mr-2"}),"Reset Progress"]}),e.jsxs(a,{className:"text-gray-400 hover:text-white",children:[e.jsx(v,{size:16,className:"mr-2"}),"Mark as Complete"]})]})]})})}),e.jsx("div",{className:"w-full mx-auto px-6",children:e.jsx("div",{className:"flex flex-col gap-2",children:s.chapters.map((l,x)=>e.jsxs("div",{className:"flex bg-gray-800 p-6 items-center gap-4 rounded-lg shadow-md text-white",children:[e.jsx("div",{className:"bg-gray-900 flex items-center justify-center w-12 h-12 rounded-full",children:e.jsx("span",{className:"text-lg text-gray-400",children:x+1})}),e.jsx("div",{className:"flex flex-col",children:e.jsx(c,{href:`/courses/${s.slug}/chapters/${l.id}`,children:e.jsx("h1",{className:"text-lg font-semibold text-gray-400 hover:text-white",children:l.title})})}),e.jsx("div",{className:"ml-auto",children:e.jsx("div",{className:"flex items-center gap-2 bg-gray-900 p-2 rounded-full",children:e.jsx(b,{size:16,className:"text-red-500"})})})]},x))})})]})})};k.layout=t=>e.jsx(g,{children:t});export{k as default};
