"use strict";(self.webpackChunkid_card=self.webpackChunkid_card||[]).push([[396],{234:(r,n,t)=>{t.d(n,{Z:()=>i});var e=t(645),a=t.n(e)()((function(r){return r[1]}));a.push([r.id,"@import url(https://vayuzsocial.s3.ap-south-1.amazonaws.com/bitovn-cdn/byte/byte_assets/css/social_feed_css.css);"]),a.push([r.id,"@import url(https://vayuzsocial.s3.ap-south-1.amazonaws.com/bitovn-cdn/byte/byte_assets/css/common.css);"]),a.push([r.id,"@import url(https://vayuzsocial.s3.ap-south-1.amazonaws.com/bitovn-cdn/byte/byte_assets/css/vayuzsocial-theme-switch.css);"]),a.push([r.id,'ol {\r\n  font-family: system-ui, sans-serif;\r\n  color: hsl(0 0% 95%);\r\n\r\n  width: fit-content;\r\n  max-width: 30rem;\r\n  margin-block: 0;\r\n  margin-inline: auto;\r\n  padding-block: 2rem;\r\n  padding-inline: 0;\r\n\r\n  display: grid;\r\n  gap: 3rem;\r\n\r\n  list-style: none;\r\n  counter-reset: liCount;\r\n\r\n  >li {\r\n    --border-radius: 1rem;\r\n    --padding: 0.5rem;\r\n    --number-size: 3rem;\r\n    --indent: 3.5rem;\r\n\r\n    display: grid;\r\n    --text-column: minmax(calc(var(--number-size) * 2), 1fr);\r\n    grid-template-columns: var(--number-size) var(--text-column);\r\n    gap: 0.5rem;\r\n    grid-auto-flow: dense;\r\n    align-items: center;\r\n    box-shadow: 2px 2px 5px hsl(0 0% 0% / 0.5);\r\n\r\n    margin-inline: var(--indent) 0rem;\r\n    padding-block: var(--padding);\r\n    padding-inline: var(--padding) calc(var(--padding) * 2);\r\n    border-radius: var(--border-radius);\r\n    background-color: var(--accent-color);\r\n    counter-increment: liCount;\r\n\r\n    &::before,\r\n    &::after {\r\n      content: "";\r\n      grid-area: 1/1;\r\n      background-color: var(--accent-color);\r\n      background-image: linear-gradient(hsl(0 0% 100% / 0.8) 0 0);\r\n    }\r\n\r\n    &::before {\r\n      content: "";\r\n      font-size: 1.5rem;\r\n      color: var(--accent-color);\r\n      aspect-ratio: 1;\r\n      border-radius: calc(var(--border-radius) - var(--padding));\r\n      display: grid;\r\n      place-items: center;\r\n      box-shadow: inset 0 0 2px hsl(0 0% 0% / 0.75);\r\n    }\r\n\r\n    &::after {\r\n      --scale: 2;\r\n      aspect-ratio: 1/1;\r\n      border-radius: calc(var(--border-radius) / var(--scale));\r\n      scale: var(--scale);\r\n      rotate: 45deg;\r\n      z-index: -1;\r\n      box-shadow: calc(var(--multi, 1) * -1px) calc(var(--multi, 1) * 1px) 5px hsl(0 0% 0% / 0.5),\r\n        calc(var(--multi, 1) * -0.5rem) calc(var(--multi, 1) * 0.5rem) 0 0 var(--accent-color);\r\n    }\r\n\r\n    &:nth-child(even) {\r\n      --multi: -1;\r\n      margin-inline: 0rem var(--indent);\r\n      padding-inline: calc(var(--padding) * 2) var(--padding);\r\n      grid-template-columns: var(--text-column) var(--number-size);\r\n\r\n      &::before,\r\n      &::after {\r\n        grid-area: 1/2;\r\n      }\r\n    }\r\n  }\r\n}\r\n\r\n\r\n.infographis-count {\r\n  font-size: 1.5rem;\r\n  color: var(--accent-color);\r\n  aspect-ratio: 1;\r\n  border-radius: calc(var(--border-radius) - var(--padding));\r\n  display: grid;\r\n  place-items: center;\r\n\r\n  position: absolute;\r\n\r\n  grid-area: 1/1;\r\n  background-color: var(--accent-color);\r\n  background-image: linear-gradient(hsl(0 0% 100% / 0.8) 0 0);\r\n  height: 48px;\r\n  width: 48px;\r\n  position: absolute;\r\n\r\n}\r\n\r\nli:nth-child(2n) .infographis-count {\r\n  right: 8px;\r\n  top: 0px;\r\n}\r\n\r\n.memories-main-slider .swiper-slide {\r\n  padding-top: 30px;\r\n\r\n  flex-direction: column;\r\n\r\n}\r\n\r\n.memories-main-slider .like-byte {\r\n  padding: 10px;\r\n  border-radius: 10px;\r\n  margin: 10px 30px;\r\n}\r\n\r\n.memories-main-slider .attatchment-block {\r\n  max-height: 250px;\r\n}\r\n\r\n.memories-main-slider .attatchment-block video,\r\n.memories-main-slider .attatchment-block img {\r\n  height: 230px !important;\r\n}\r\n\r\n.most-like-lottie {\r\n  position: absolute;\r\n  bottom: 0;\r\n  left: 50%;\r\n  transform: translate(-50%, 9%);\r\n  z-index: +999;\r\n}\r\n\r\n.autoplay-progress {\r\n  position: absolute;\r\n  right: 16px;\r\n  bottom: 16px;\r\n  z-index: 10;\r\n  width: 48px;\r\n  height: 48px;\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  font-weight: bold;\r\n  color: var(--swiper-theme-color);\r\n}\r\n\r\n.autoplay-progress svg {\r\n  --progress: 0;\r\n  position: absolute;\r\n  left: 0;\r\n  top: 0px;\r\n  z-index: 10;\r\n  width: 100%;\r\n  height: 100%;\r\n  stroke-width: 4px;\r\n  stroke: var(--swiper-theme-color);\r\n  fill: none;\r\n  stroke-dashoffset: calc(125.6 * (1 - var(--progress)));\r\n  stroke-dasharray: 125.6;\r\n  transform: rotate(-90deg);\r\n}\r\n\r\n.swiper-pagination-progressbar {\r\n  top: unset !important;\r\n  bottom: 0 !important;\r\n}\r\n\r\n.swiper-pagination-progressbar .swiper-pagination-progressbar-fill {\r\n  top: unset !important;\r\n  bottom: 0\r\n}\r\n\r\n.mySwipe .swiper-slide {\r\n  border: none !important\r\n}\r\n\r\n.byte-image-memories {\r\n  max-height: 300px;\r\n}\r\n\r\n.memories-byte-event-name {\r\n  font-size: 18px;\r\n  color: #fff !important;\r\n  font-weight: 500;\r\n  padding-bottom: 5px;\r\n  margin-top: 15px;\r\n}\r\n\r\n.memories-byte-event-img {\r\n  max-height: 300px;\r\n  height: 300px;\r\n  object-fit: cover !important;\r\n  border-radius: 20px 20px 0 0 !important;\r\n}\r\n\r\n\r\n/* wipe CSS for slider */\r\n/* \r\n @property --angle {\r\n  syntax: \'<angle>\';\r\n  inherits: true;\r\n  initial-value: -10deg;\r\n}\r\n\r\n@keyframes scene-transition {\r\n  to { --angle: 370deg; }\r\n}\r\n\r\n.swiper-slide {\r\n\r\n  -webkit-mask-image:\r\n    conic-gradient(\r\n      #fff 0deg,\r\n      #fff calc(var(--angle) - 10deg),\r\n      transparent calc(var(--angle) + 10deg),\r\n      transparent 360deg\r\n    ),\r\n    conic-gradient(\r\n      transparent 340deg,\r\n      #fff 360deg\r\n    );\r\n}\r\n\r\n.swiper-slide:is(.swiper-slide-prev) .swiper-slide.swiper-slide-active {\r\n  z-index: 1;\r\n  animation: scene-transition 2s linear forwards;\r\n}  */\r\n\r\n#confetti canvas {\r\n  height: 100%;\r\n  left: 0px;\r\n  position: absolute;\r\n  top: 0px;\r\n  width: 100%;\r\n  z-index: 0;\r\n}\r\n\r\n#confetti {\r\n  background: black;\r\n}\r\n\r\n.top-most-like-img {\r\n  border-radius: 20px;\r\n}\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n.animated {\r\n  -webkit-animation-duration: 1s;\r\n  animation-duration: 1s;\r\n  -webkit-animation-fill-mode: backwards;\r\n  animation-fill-mode: backwards;\r\n}\r\n\r\n.animated.infinite {\r\n  -webkit-animation-iteration-count: infinite;\r\n  animation-iteration-count: infinite;\r\n}\r\n\r\n@-webkit-keyframes fadeInDown {\r\n  0% {\r\n    opacity: 0;\r\n    -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";\r\n    -webkit-transform: translate3d(0, -40px, 0);\r\n    transform: translate3d(0, -40px, 0)\r\n  }\r\n\r\n  to {\r\n    opacity: 1;\r\n    -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=100)";\r\n    -webkit-transform: translateZ(0);\r\n    transform: translateZ(0)\r\n  }\r\n}\r\n\r\n@keyframes fadeInDown {\r\n  0% {\r\n    opacity: 0;\r\n    -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";\r\n    -webkit-transform: translate3d(0, -40px, 0);\r\n    transform: translate3d(0, -40px, 0)\r\n  }\r\n\r\n  to {\r\n    opacity: 1;\r\n    -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=100)";\r\n    -webkit-transform: translateZ(0);\r\n    transform: translateZ(0)\r\n  }\r\n}\r\n\r\n.fadeInDown {\r\n  -webkit-animation-name: fadeInDown;\r\n  animation-name: fadeInDown;\r\n  -webkit-animation-duration: 3s;\r\n  animation-duration: 3s;\r\n}\r\n\r\n@-webkit-keyframes fadeInUp {\r\n  0% {\r\n    opacity: 0;\r\n    -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";\r\n    -webkit-transform: translate3d(0, 40px, 0);\r\n    transform: translate3d(0, 40px, 0)\r\n  }\r\n\r\n  to {\r\n    opacity: 1;\r\n    -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=100)";\r\n    -webkit-transform: translateZ(0);\r\n    transform: translateZ(0)\r\n  }\r\n}\r\n\r\n@keyframes fadeInUp {\r\n  0% {\r\n    opacity: 0;\r\n    -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";\r\n    -webkit-transform: translate3d(0, 40px, 0);\r\n    transform: translate3d(0, 40px, 0)\r\n  }\r\n\r\n  to {\r\n    opacity: 1;\r\n    -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=100)";\r\n    -webkit-transform: translateZ(0);\r\n    transform: translateZ(0)\r\n  }\r\n}\r\n\r\n.fadeInUp {\r\n  -webkit-animation-name: fadeInUp;\r\n  animation-name: fadeInUp;\r\n  -webkit-animation-duration: 3s;\r\n  animation-duration: 3s;\r\n}\r\n\r\n@-webkit-keyframes fadeInLeft {\r\n  from {\r\n    opacity: 0;\r\n    -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";\r\n    -webkit-transform: translate3d(-50%, 0, 0);\r\n    transform: translate3d(-50%, 0, 0);\r\n  }\r\n\r\n  to {\r\n    opacity: 1;\r\n    -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=100)";\r\n    -webkit-transform: translate3d(0, 0, 0);\r\n    transform: translate3d(0, 0, 0);\r\n  }\r\n}\r\n\r\n@keyframes fadeInLeft {\r\n  from {\r\n    opacity: 0;\r\n    -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";\r\n    -webkit-transform: translate3d(-50%, 0, 0);\r\n    transform: translate3d(-50%, 0, 0);\r\n  }\r\n\r\n  to {\r\n    opacity: 1;\r\n    -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=100)";\r\n    -webkit-transform: translate3d(0, 0, 0);\r\n    transform: translate3d(0, 0, 0);\r\n  }\r\n}\r\n\r\n.fadeInLeft {\r\n  -webkit-animation-name: fadeInLeft;\r\n  animation-name: fadeInLeft;\r\n  -webkit-animation-duration: 3s;\r\n  animation-duration: 3s;\r\n}\r\n\r\n@-webkit-keyframes fadeInRight {\r\n  from {\r\n    opacity: 0;\r\n    -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";\r\n    -webkit-transform: translate3d(50%, 0, 0);\r\n    transform: translate3d(50%, 0, 0);\r\n  }\r\n\r\n  to {\r\n    opacity: 1;\r\n    -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=100)";\r\n    -webkit-transform: translate3d(0, 0, 0);\r\n    transform: translate3d(0, 0, 0);\r\n  }\r\n}\r\n\r\n@keyframes fadeInRight {\r\n  from {\r\n    opacity: 0;\r\n    -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";\r\n    -webkit-transform: translate3d(50%, 0, 0);\r\n    transform: translate3d(50%, 0, 0);\r\n  }\r\n\r\n  to {\r\n    opacity: 1;\r\n    -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=100)";\r\n    -webkit-transform: translate3d(0, 0, 0);\r\n    transform: translate3d(0, 0, 0);\r\n  }\r\n}\r\n\r\n.fadeInRight {\r\n  -webkit-animation-name: fadeInRight;\r\n  animation-name: fadeInRight;\r\n  -webkit-animation-duration: 3s;\r\n  animation-duration: 3s;\r\n}\r\n\r\n@-webkit-keyframes spin {\r\n  0% {\r\n    -webkit-transform: rotate(0deg);\r\n    transform: rotate(0deg);\r\n  }\r\n\r\n  100% {\r\n    -webkit-transform: rotate(360deg);\r\n    transform: rotate(360deg);\r\n  }\r\n}\r\n\r\n@keyframes spin {\r\n  0% {\r\n    -webkit-transform: rotate(0deg);\r\n    transform: rotate(0deg);\r\n  }\r\n\r\n  100% {\r\n    -webkit-transform: rotate(360deg);\r\n    transform: rotate(360deg);\r\n  }\r\n}\r\n\r\n.spin {\r\n  -webkit-animation: spin 2s linear infinite;\r\n  animation: spin 1s linear infinite;\r\n  -webkit-animation-duration: 3s;\r\n  animation-duration: 3s;\r\n}\r\n\r\n@-webkit-keyframes bounce {\r\n  0% {\r\n    -webkit-transform: translateY(0px);\r\n    transform: translateY(0px);\r\n  }\r\n\r\n  50% {\r\n    -webkit-transform: translateY(-40px);\r\n    transform: translateY(-40px);\r\n  }\r\n\r\n  100% {\r\n    -webkit-transform: translateY(0px);\r\n    transform: translateY(0px);\r\n  }\r\n\r\n}\r\n\r\n@keyframes bounce {\r\n  0% {\r\n    -webkit-transform: translateY(0px);\r\n    transform: translateY(0px);\r\n  }\r\n\r\n  50% {\r\n    -webkit-transform: translateY(-40px);\r\n    transform: translateY(-40px);\r\n  }\r\n\r\n  100% {\r\n    -webkit-transform: translateY(0px);\r\n    transform: translateY(0px);\r\n  }\r\n\r\n}\r\n\r\n.bounce {\r\n  -webkit-animation: bounce 2s linear infinite;\r\n  animation: bounce 1s linear infinite;\r\n  -webkit-animation-duration: 3s;\r\n  animation-duration: 3s;\r\n}\r\n\r\n@-webkit-keyframes rotate2d {\r\n  0% {\r\n    -webkit-transform: rotate(0deg);\r\n    transform: rotate(0deg);\r\n  }\r\n\r\n  100% {\r\n    -webkit-transform: rotate(360deg);\r\n    transform: rotate(360deg);\r\n  }\r\n}\r\n\r\n@keyframes rotate2d {\r\n  0% {\r\n    -webkit-transform: rotate(0deg);\r\n    transform: rotate(0deg);\r\n  }\r\n\r\n  100% {\r\n    -webkit-transform: rotate(360deg);\r\n    transform: rotate(360deg);\r\n  }\r\n}\r\n\r\n.rotate2d {\r\n  -webkit-animation: rotate2d 2s linear infinite;\r\n  animation: rotate2d 1s linear infinite;\r\n  -webkit-animation-duration: 3s;\r\n  animation-duration: 3s;\r\n}\r\n\r\n\r\n@-webkit-keyframes rotate-3d {\r\n  0% {\r\n    -webkit-transform: rotateY(0deg);\r\n    transform: rotateY(0deg);\r\n  }\r\n\r\n  100% {\r\n    -webkit-transform: rotateY(360deg);\r\n    transform: rotateY(360deg);\r\n  }\r\n}\r\n\r\n@keyframes rotate-3d {\r\n  0% {\r\n    -webkit-transform: rotateY(0deg);\r\n    transform: rotateY(0deg);\r\n  }\r\n\r\n  100% {\r\n    -webkit-transform: rotateY(360deg);\r\n    transform: rotateY(360deg);\r\n  }\r\n}\r\n\r\n.rotate-3d {\r\n  -webkit-animation: rotate-3d 2s linear infinite;\r\n  animation: rotate-3d 1s linear infinite;\r\n  -webkit-animation-duration: 3s;\r\n  animation-duration: 3s;\r\n}\r\n\r\n\r\n/* Animation : End */\r\n\r\n.text-white {\r\n  color: #fff !important;\r\n}\r\n\r\n.user-name-div.user-name {\r\n  color: #fff !important;\r\n}\r\n\r\n.slide-heading {\r\n  position: absolute;\r\n  left: 50%;\r\n  top: 0;\r\n  transform: translate(-50%, 0);\r\n  white-space: nowrap;\r\n}\r\n\r\n.swiper-slide-active {\r\n  height: calc(100vh - 100px);\r\n}\r\n\r\n.swiper-creative .swiper-slide {\r\n  padding-top: 60px;\r\n}\r\n\r\n/* New CSS starts */\r\n\r\n.year-recap-heading {\r\n  font-size: 48px;\r\n  font-family: \'Dancing Script\';\r\n  white-space: nowrap;\r\n}\r\n\r\n.gold-glitter {\r\n  color: gold;\r\n  background: -webkit-linear-gradient(transparent, transparent), url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/191814/gold_glitter.gif) repeat;\r\n}\r\n\r\n.hotpink-glitter {\r\n  color: blue;\r\n  background: -webkit-linear-gradient(transparent, transparent), url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/191814/sparkleshotpink.gif) repeat;\r\n}\r\n\r\n.year {\r\n  background: -o-linear-gradient(transparent, transparent) !important;\r\n  -webkit-background-clip: text !important;\r\n  -webkit-text-fill-color: transparent !important;\r\n  margin: 0;\r\n  padding: 0;\r\n  font-weight: 900;\r\n  width: 100%;\r\n  letter-spacing: 1px;\r\n  z-index: 200;\r\n  -webkit-background-clip: text;\r\n}\r\n\r\n.year-recap-container .user-name-div .user-name,\r\n.year-recap-container .user-name-div span,\r\n.year-recap-container p:not(.shared-event-details p),\r\n.year-recap-container .byte-text {\r\n  color: #fff !important;\r\n}\r\n\r\n.year-recap-container .icon-color {\r\n  color: #fff !important;\r\n}\r\n\r\n.rank-container figure {\r\n  width: 210px;\r\n  height: 210px;\r\n  text-align: center;\r\n  padding: 2px;\r\n  border-radius: 50%;\r\n  background: conic-gradient(red, yellow, lime, aqua, blue, magenta, red);\r\n  position: relative;\r\n}\r\n\r\n.rank-container figure .rank-dp {\r\n  border-radius: 50%;\r\n  width: 206px;\r\n  height: 206px;\r\n  font-size: 10px;\r\n  object-fit: cover;\r\n}\r\n\r\n.rank-container .rank {\r\n  position: absolute;\r\n  right: 0;\r\n  /* background: #fff; */\r\n  padding: 10px 15px;\r\n  border-radius: 50%;\r\n  bottom: 22px;\r\n  line-height: normal;\r\n  font-size: 18px;\r\n  font-weight: 500;\r\n  backdrop-filter: blur(16px) saturate(180%);\r\n  -webkit-backdrop-filter: blur(16px) saturate(180%);\r\n  background-color: rgba(30, 31, 38, 0.85);\r\n  color: #fff;\r\n  border: 4px dotted #e9e9e9;\r\n}\r\n\r\n.insight-bg-reflec {\r\n  /* transition: none; */\r\n  background: #1e1f26;\r\n  --radius: 10px;\r\n  --inset: 2rem;\r\n  --inset-right: 0;\r\n  --offset: -1rem;\r\n  content: "";\r\n  position: absolute;\r\n  top: 0;\r\n  right: 0;\r\n  bottom: 0;\r\n  left: 0;\r\n  margin: var(--offset);\r\n  border-radius: var(--radius);\r\n  overflow: hidden;\r\n  color: #fff;\r\n  clip-path: inset(var(--inset-top, var(--inset)) var(--inset-right, var(--inset)) var(--inset-bottom, var(--inset)) var(--inset-left, var(--inset)) round var(--radius));\r\n  contain: strict;\r\n  transition: clip-path .3s ease .1s;\r\n\r\n  backdrop-filter: blur(16px) saturate(180%);\r\n  -webkit-backdrop-filter: blur(16px) saturate(180%);\r\n  background-color: rgba(30, 31, 38, 0.85);\r\n}\r\n\r\n.merories_insight {\r\n  max-width: 500px;\r\n  margin: 0 auto;\r\n  position: relative;\r\n  background: transparent;\r\n}\r\n\r\n.merories_insight .cat {\r\n  color: #b7bbc8 !important;\r\n    margin-top: -22px;\r\n    background-color: #1e1f26;\r\n    padding: 5px 10px;\r\n    border-radius: 0 10px 10px 10px;\r\n    z-index: 9999;\r\n    position: fixed;\r\n    width: max-content;\r\n}\r\n\r\n.merories_insight .desc {\r\n  color: #b7bbc8 !important;\r\n  font-size: 14px;\r\n}\r\n\r\n.merories_insight .shared-event-details {\r\n  padding: 0 15px 15px 0;\r\n  position: relative;\r\n  overflow: hidden;\r\n}\r\n\r\n.merories_insight:hover .insight-bg-reflec {\r\n  clip-path: inset(0 0 35px 0 round var(--radius));\r\n  transition-delay: 0s;\r\n}\r\n\r\n@media only screen and (max-width:767px) {\r\n  .merories_insight {\r\n    max-width: 100%;\r\n\r\n  }\r\n}\r\n\r\n.memories-shimmer{\r\n  padding: 12px;\r\n}\r\n.memories-shimmer-inside{\r\n  -webkit-animation-duration: 1s;\r\n    -webkit-animation-fill-mode: forwards;\r\n    -webkit-animation-iteration-count: infinite;\r\n    -webkit-animation-name: placeHolderShimmer;\r\n    -webkit-animation-timing-function: linear;\r\n    animation-duration: 1s;\r\n    animation-fill-mode: forwards;\r\n    animation-iteration-count: infinite;\r\n    animation-name: placeHolderShimmer;\r\n    animation-timing-function: linear;\r\n    background: #f6f7f8;\r\n    background-image: linear-gradient(to right, #c1dceb 4%, #a3cbe1 25%, #c1dceb 36%) !important;\r\n    background-repeat: no-repeat;\r\n    background-size: 800px 500px;\r\n    height: 500px;\r\n    position: relative;\r\n}\r\n.cat-image-insight{\r\n  width:25px !important;\r\n}',""]);const i=a},645:r=>{r.exports=function(r){var n=[];return n.toString=function(){return this.map((function(n){var t=r(n);return n[2]?"@media ".concat(n[2]," {").concat(t,"}"):t})).join("")},n.i=function(r,t,e){"string"==typeof r&&(r=[[null,r,""]]);var a={};if(e)for(var i=0;i<this.length;i++){var o=this[i][0];null!=o&&(a[o]=!0)}for(var s=0;s<r.length;s++){var d=[].concat(r[s]);e&&a[d[0]]||(t&&(d[2]?d[2]="".concat(t," and ").concat(d[2]):d[2]=t),n.push(d))}},n}},396:(r,n,t)=>{t.r(n),t.d(n,{default:()=>o});var e=t(379),a=t.n(e),i=t(234);a()(i.Z,{insert:"head",singleton:!1});const o=i.Z.locals||{}},379:(r,n,t)=>{var e,a=function(){var r={};return function(n){if(void 0===r[n]){var t=document.querySelector(n);if(window.HTMLIFrameElement&&t instanceof window.HTMLIFrameElement)try{t=t.contentDocument.head}catch(r){t=null}r[n]=t}return r[n]}}(),i=[];function o(r){for(var n=-1,t=0;t<i.length;t++)if(i[t].identifier===r){n=t;break}return n}function s(r,n){for(var t={},e=[],a=0;a<r.length;a++){var s=r[a],d=n.base?s[0]+n.base:s[0],m=t[d]||0,p="".concat(d," ").concat(m);t[d]=m+1;var l=o(p),c={css:s[1],media:s[2],sourceMap:s[3]};-1!==l?(i[l].references++,i[l].updater(c)):i.push({identifier:p,updater:u(c,n),references:1}),e.push(p)}return e}function d(r){var n=document.createElement("style"),e=r.attributes||{};if(void 0===e.nonce){var i=t.nc;i&&(e.nonce=i)}if(Object.keys(e).forEach((function(r){n.setAttribute(r,e[r])})),"function"==typeof r.insert)r.insert(n);else{var o=a(r.insert||"head");if(!o)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");o.appendChild(n)}return n}var m,p=(m=[],function(r,n){return m[r]=n,m.filter(Boolean).join("\n")});function l(r,n,t,e){var a=t?"":e.media?"@media ".concat(e.media," {").concat(e.css,"}"):e.css;if(r.styleSheet)r.styleSheet.cssText=p(n,a);else{var i=document.createTextNode(a),o=r.childNodes;o[n]&&r.removeChild(o[n]),o.length?r.insertBefore(i,o[n]):r.appendChild(i)}}function c(r,n,t){var e=t.css,a=t.media,i=t.sourceMap;if(a?r.setAttribute("media",a):r.removeAttribute("media"),i&&"undefined"!=typeof btoa&&(e+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(i))))," */")),r.styleSheet)r.styleSheet.cssText=e;else{for(;r.firstChild;)r.removeChild(r.firstChild);r.appendChild(document.createTextNode(e))}}var f=null,g=0;function u(r,n){var t,e,a;if(n.singleton){var i=g++;t=f||(f=d(n)),e=l.bind(null,t,i,!1),a=l.bind(null,t,i,!0)}else t=d(n),e=c.bind(null,t,n),a=function(){!function(r){if(null===r.parentNode)return!1;r.parentNode.removeChild(r)}(t)};return e(r),function(n){if(n){if(n.css===r.css&&n.media===r.media&&n.sourceMap===r.sourceMap)return;e(r=n)}else a()}}r.exports=function(r,n){(n=n||{}).singleton||"boolean"==typeof n.singleton||(n.singleton=(void 0===e&&(e=Boolean(window&&document&&document.all&&!window.atob)),e));var t=s(r=r||[],n);return function(r){if(r=r||[],"[object Array]"===Object.prototype.toString.call(r)){for(var e=0;e<t.length;e++){var a=o(t[e]);i[a].references--}for(var d=s(r,n),m=0;m<t.length;m++){var p=o(t[m]);0===i[p].references&&(i[p].updater(),i.splice(p,1))}t=d}}}}}]);