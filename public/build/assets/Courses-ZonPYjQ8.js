import{q as o,j as e,a as t,r as h}from"./app-B_dPBHtO.js";import{B as p}from"./badge-CFb4tFzn.js";import{C as j,a as g,b as f}from"./card-CsMSw54R.js";import{B as l}from"./button-KTk-Rr5B.js";import{U as N}from"./UserAvatar-B_0Yw37M.js";import{c as r}from"./createLucideIcon-Cec6fke2.js";import{V as y}from"./video-Csle7zsN.js";import"./index-BZ36hmY6.js";import"./utils-8RyR4BqC.js";import"./index-BTFjxkej.js";import"./index-BNtcbWTn.js";/**
 * @license lucide-react v0.396.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const u=r("DollarSign",[["line",{x1:"12",x2:"12",y1:"2",y2:"22",key:"7eqyqh"}],["path",{d:"M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6",key:"1b0p4s"}]]);/**
 * @license lucide-react v0.396.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const b=r("Heart",[["path",{d:"M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z",key:"c3ymky"}]]);/**
 * @license lucide-react v0.396.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const v=r("StarHalf",[["path",{d:"M12 17.8 5.8 21 7 14.1 2 9.3l7-1L12 2",key:"nare05"}]]);/**
 * @license lucide-react v0.396.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const C=r("Star",[["polygon",{points:"12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2",key:"8f66p6"}]]);/**
 * @license lucide-react v0.396.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const k=r("UsersRound",[["path",{d:"M18 21a8 8 0 0 0-16 0",key:"3ypg7q"}],["circle",{cx:"10",cy:"8",r:"5",key:"o932ke"}],["path",{d:"M22 20c0-3.37-2-6.5-4-8a5 5 0 0 0-.45-8.3",key:"10s06x"}]]),w=({course:s})=>{var c;const{purchased_courses:a,id:i}=o().props.auth.user||{},x=a==null?void 0:a.some(d=>d.id===s.id),n=s.author.id===i,m=!x&&!n;return e.jsxs(j,{className:"bg-gray-800 border-none",children:[e.jsx(g,{className:"p-0",children:e.jsx(t,{href:route("courses.show",s.slug),children:e.jsx("img",{src:s.image_url,alt:s.title,className:"w-full h-56 object-cover rounded-t-lg"})})}),e.jsx(f,{className:"p-0",children:e.jsxs("div",{className:"px-4 py-4",children:[e.jsxs("div",{className:"flex items-center",children:[[...Array(4)].map((d,H)=>e.jsx(C,{size:16,fill:"green",className:"text-green-500"})),e.jsx(v,{size:16,fill:"green",className:"text-gray-500"}),e.jsx("span",{className:"text-green-100 text-xs bg-green-500 rounded-xl px-2 py-0.5 font-semibold",children:4.5})]}),e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsxs("p",{className:"text-gray-100 text-medium font-semibold truncate",children:[s.title.substring(0,20),"..."]}),e.jsxs(p,{children:[s.chapters_count,s.chapters_count>1?" Chapters":" Chapter"]})]}),e.jsxs("div",{className:"mt-2 flex gap-2 items-center mb-3",children:[e.jsx(N,{src:"",fallback:"SP"}),e.jsxs("div",{className:"flex flex-col text-sm text-yellow-700",children:[e.jsx("span",{className:"text-xs",children:"Author"}),e.jsx(t,{href:"/",className:"underline",children:(c=s==null?void 0:s.author)==null?void 0:c.name})]})]}),e.jsxs("div",{className:"flex flex-col gap-1 mb-4",children:[e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(y,{size:20,className:"text-gray-100"}),e.jsx("span",{className:"text-gray-100 text-xs",children:"20 Videos"})]}),e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(k,{size:20,className:"text-gray-100"}),e.jsx("span",{className:"text-gray-100 text-xs",children:"2500+ Students"})]})]}),e.jsx("div",{className:"mt-1",children:m?e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsx(t,{href:route("payment.show",{course:s.id,price:s.price}),children:e.jsxs(l,{className:"font-semibold tracking-wide",children:[e.jsx(u,{size:16,className:"text-white"}),"Enroll Now for $",s.price]})}),e.jsx(l,{children:e.jsx(b,{size:24})})]}):e.jsx(e.Fragment,{children:n?e.jsx(t,{href:route("teachers.courses.edit",s.id),children:e.jsx(l,{className:"bg-gradient",children:"Manage Course"})}):e.jsx(t,{href:route("courses.show",s.slug),children:e.jsx(l,{className:"bg-gradient",children:"Continue Learning"})})})})]})})]})},S=h.memo(({courses:s})=>e.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4",children:s==null?void 0:s.map((a,i)=>e.jsx("div",{className:"p-2",children:e.jsx(w,{course:a})},i))})),D=S;export{D as default};
