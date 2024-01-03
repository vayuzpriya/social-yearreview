<script>
	// import { Utility } from "./../network/Utility";
	// import Service from "./../network/Service";
	// import { Config } from "./../config";
	import jQ from "jquery";
	import { onMount, onDestroy } from "svelte";

	onMount(async () => {
		vayuzevent();
		loadConfitti();
	});

	function vayuzevent() {
		setTimeout(function () {
			var swiper = new Swiper(".memoriesSlider", {
				grabCursor: true,
				loop: true,
				effect: "creative",
				creativeEffect: {
					prev: {
						shadow: true,
						translate: [0, 0, -800],
						rotate: [180, 0, 0],
					},
					next: {
						shadow: true,
						translate: [0, 0, -800],
						rotate: [-180, 0, 0],
					},
				},
				  autoplay: {
				    delay: 5000,
				    disableOnInteraction: false,
				  },
				keyboard: {
					enabled: true,
				},
				pagination: {
					el: ".swiper-pagination",
					type: "progressbar",
				},
				//   navigation: {
				//     nextEl: ".swiper-button-next",
				//     prevEl: ".swiper-button-prev",
				//   },
			});
		}, 1000);
	}

	function loadConfitti() {
		/* Confetti by Patrik Svensson (http://metervara.net) */
		jQ(document).ready(function () {
			var frameRate = 30;
			var dt = 1.0 / frameRate;
			var DEG_TO_RAD = Math.PI / 180;
			var RAD_TO_DEG = 180 / Math.PI;
			var colors = [
				["#df0049", "#660671"],
				["#00e857", "#005291"],
				["#2bebbc", "#05798a"],
				["#ffd200", "#b06c00"],
			];

			function Vector2(_x, _y) {
				(this.x = _x), (this.y = _y);
				this.Length = function () {
					return Math.sqrt(this.SqrLength());
				};
				this.SqrLength = function () {
					return this.x * this.x + this.y * this.y;
				};
				this.Equals = function (_vec0, _vec1) {
					return _vec0.x == _vec1.x && _vec0.y == _vec1.y;
				};
				this.Add = function (_vec) {
					this.x += _vec.x;
					this.y += _vec.y;
				};
				this.Sub = function (_vec) {
					this.x -= _vec.x;
					this.y -= _vec.y;
				};
				this.Div = function (_f) {
					this.x /= _f;
					this.y /= _f;
				};
				this.Mul = function (_f) {
					this.x *= _f;
					this.y *= _f;
				};
				this.Normalize = function () {
					var sqrLen = this.SqrLength();
					if (sqrLen != 0) {
						var factor = 1.0 / Math.sqrt(sqrLen);
						this.x *= factor;
						this.y *= factor;
					}
				};
				this.Normalized = function () {
					var sqrLen = this.SqrLength();
					if (sqrLen != 0) {
						var factor = 1.0 / Math.sqrt(sqrLen);
						return new Vector2(this.x * factor, this.y * factor);
					}
					return new Vector2(0, 0);
				};
			}
			Vector2.Lerp = function (_vec0, _vec1, _t) {
				return new Vector2(
					(_vec1.x - _vec0.x) * _t + _vec0.x,
					(_vec1.y - _vec0.y) * _t + _vec0.y,
				);
			};
			Vector2.Distance = function (_vec0, _vec1) {
				return Math.sqrt(Vector2.SqrDistance(_vec0, _vec1));
			};
			Vector2.SqrDistance = function (_vec0, _vec1) {
				var x = _vec0.x - _vec1.x;
				var y = _vec0.y - _vec1.y;
				return x * x + y * y + z * z;
			};
			Vector2.Scale = function (_vec0, _vec1) {
				return new Vector2(_vec0.x * _vec1.x, _vec0.y * _vec1.y);
			};
			Vector2.Min = function (_vec0, _vec1) {
				return new Vector2(
					Math.min(_vec0.x, _vec1.x),
					Math.min(_vec0.y, _vec1.y),
				);
			};
			Vector2.Max = function (_vec0, _vec1) {
				return new Vector2(
					Math.max(_vec0.x, _vec1.x),
					Math.max(_vec0.y, _vec1.y),
				);
			};
			Vector2.ClampMagnitude = function (_vec0, _len) {
				var vecNorm = _vec0.Normalized;
				return new Vector2(vecNorm.x * _len, vecNorm.y * _len);
			};
			Vector2.Sub = function (_vec0, _vec1) {
				return new Vector2(
					_vec0.x - _vec1.x,
					_vec0.y - _vec1.y,
					_vec0.z - _vec1.z,
				);
			};

			function EulerMass(_x, _y, _mass, _drag) {
				this.position = new Vector2(_x, _y);
				this.mass = _mass;
				this.drag = _drag;
				this.force = new Vector2(0, 0);
				this.velocity = new Vector2(0, 0);
				this.AddForce = function (_f) {
					this.force.Add(_f);
				};
				this.Integrate = function (_dt) {
					var acc = this.CurrentForce(this.position);
					acc.Div(this.mass);
					var posDelta = new Vector2(
						this.velocity.x,
						this.velocity.y,
					);
					posDelta.Mul(_dt);
					this.position.Add(posDelta);
					acc.Mul(_dt);
					this.velocity.Add(acc);
					this.force = new Vector2(0, 0);
				};
				this.CurrentForce = function (_pos, _vel) {
					var totalForce = new Vector2(this.force.x, this.force.y);
					var speed = this.velocity.Length();
					var dragVel = new Vector2(this.velocity.x, this.velocity.y);
					dragVel.Mul(this.drag * this.mass * speed);
					totalForce.Sub(dragVel);
					return totalForce;
				};
			}

			function ConfettiPaper(_x, _y) {
				this.pos = new Vector2(_x, _y);
				this.rotationSpeed = Math.random() * 600 + 800;
				this.angle = DEG_TO_RAD * Math.random() * 360;
				this.rotation = DEG_TO_RAD * Math.random() * 360;
				this.cosA = 1.0;
				this.size = 5.0;
				this.oscillationSpeed = Math.random() * 1.5 + 0.5;
				this.xSpeed = 40.0;
				this.ySpeed = Math.random() * 60 + 50.0;
				this.corners = new Array();
				this.time = Math.random();
				var ci = Math.round(Math.random() * (colors.length - 1));
				this.frontColor = colors[ci][0];
				this.backColor = colors[ci][1];
				for (var i = 0; i < 4; i++) {
					var dx = Math.cos(this.angle + DEG_TO_RAD * (i * 90 + 45));
					var dy = Math.sin(this.angle + DEG_TO_RAD * (i * 90 + 45));
					this.corners[i] = new Vector2(dx, dy);
				}
				this.Update = function (_dt) {
					this.time += _dt;
					this.rotation += this.rotationSpeed * _dt;
					this.cosA = Math.cos(DEG_TO_RAD * this.rotation);
					this.pos.x +=
						Math.cos(this.time * this.oscillationSpeed) *
						this.xSpeed *
						_dt;
					this.pos.y += this.ySpeed * _dt;
					if (this.pos.y > ConfettiPaper.bounds.y) {
						this.pos.x = Math.random() * ConfettiPaper.bounds.x;
						this.pos.y = 0;
					}
				};
				this.Draw = function (_g) {
					if (this.cosA > 0) {
						_g.fillStyle = this.frontColor;
					} else {
						_g.fillStyle = this.backColor;
					}
					_g.beginPath();
					_g.moveTo(
						this.pos.x + this.corners[0].x * this.size,
						this.pos.y + this.corners[0].y * this.size * this.cosA,
					);
					for (var i = 1; i < 4; i++) {
						_g.lineTo(
							this.pos.x + this.corners[i].x * this.size,
							this.pos.y +
								this.corners[i].y * this.size * this.cosA,
						);
					}
					_g.closePath();
					_g.fill();
				};
			}
			ConfettiPaper.bounds = new Vector2(0, 0);

			function ConfettiRibbon(
				_x,
				_y,
				_count,
				_dist,
				_thickness,
				_angle,
				_mass,
				_drag,
			) {
				this.particleDist = _dist;
				this.particleCount = _count;
				this.particleMass = _mass;
				this.particleDrag = _drag;
				this.particles = new Array();
				var ci = Math.round(Math.random() * (colors.length - 1));
				this.frontColor = colors[ci][0];
				this.backColor = colors[ci][1];
				this.xOff = Math.cos(DEG_TO_RAD * _angle) * _thickness;
				this.yOff = Math.sin(DEG_TO_RAD * _angle) * _thickness;
				this.position = new Vector2(_x, _y);
				this.prevPosition = new Vector2(_x, _y);
				this.velocityInherit = Math.random() * 2 + 4;
				this.time = Math.random() * 100;
				this.oscillationSpeed = Math.random() * 2 + 2;
				this.oscillationDistance = Math.random() * 40 + 40;
				this.ySpeed = Math.random() * 40 + 80;
				for (var i = 0; i < this.particleCount; i++) {
					this.particles[i] = new EulerMass(
						_x,
						_y - i * this.particleDist,
						this.particleMass,
						this.particleDrag,
					);
				}
				this.Update = function (_dt) {
					var i = 0;
					this.time += _dt * this.oscillationSpeed;
					this.position.y += this.ySpeed * _dt;
					this.position.x +=
						Math.cos(this.time) * this.oscillationDistance * _dt;
					this.particles[0].position = this.position;
					var dX = this.prevPosition.x - this.position.x;
					var dY = this.prevPosition.y - this.position.y;
					var delta = Math.sqrt(dX * dX + dY * dY);
					this.prevPosition = new Vector2(
						this.position.x,
						this.position.y,
					);
					for (i = 1; i < this.particleCount; i++) {
						var dirP = Vector2.Sub(
							this.particles[i - 1].position,
							this.particles[i].position,
						);
						dirP.Normalize();
						dirP.Mul((delta / _dt) * this.velocityInherit);
						this.particles[i].AddForce(dirP);
					}
					for (i = 1; i < this.particleCount; i++) {
						this.particles[i].Integrate(_dt);
					}
					for (i = 1; i < this.particleCount; i++) {
						var rp2 = new Vector2(
							this.particles[i].position.x,
							this.particles[i].position.y,
						);
						rp2.Sub(this.particles[i - 1].position);
						rp2.Normalize();
						rp2.Mul(this.particleDist);
						rp2.Add(this.particles[i - 1].position);
						this.particles[i].position = rp2;
					}
					if (
						this.position.y >
						ConfettiRibbon.bounds.y +
							this.particleDist * this.particleCount
					) {
						this.Reset();
					}
				};
				this.Reset = function () {
					this.position.y = -Math.random() * ConfettiRibbon.bounds.y;
					this.position.x = Math.random() * ConfettiRibbon.bounds.x;
					this.prevPosition = new Vector2(
						this.position.x,
						this.position.y,
					);
					this.velocityInherit = Math.random() * 2 + 4;
					this.time = Math.random() * 100;
					this.oscillationSpeed = Math.random() * 2.0 + 1.5;
					this.oscillationDistance = Math.random() * 40 + 40;
					this.ySpeed = Math.random() * 40 + 80;
					var ci = Math.round(Math.random() * (colors.length - 1));
					this.frontColor = colors[ci][0];
					this.backColor = colors[ci][1];
					this.particles = new Array();
					for (var i = 0; i < this.particleCount; i++) {
						this.particles[i] = new EulerMass(
							this.position.x,
							this.position.y - i * this.particleDist,
							this.particleMass,
							this.particleDrag,
						);
					}
				};
				this.Draw = function (_g) {
					for (var i = 0; i < this.particleCount - 1; i++) {
						var p0 = new Vector2(
							this.particles[i].position.x + this.xOff,
							this.particles[i].position.y + this.yOff,
						);
						var p1 = new Vector2(
							this.particles[i + 1].position.x + this.xOff,
							this.particles[i + 1].position.y + this.yOff,
						);
						if (
							this.Side(
								this.particles[i].position.x,
								this.particles[i].position.y,
								this.particles[i + 1].position.x,
								this.particles[i + 1].position.y,
								p1.x,
								p1.y,
							) < 0
						) {
							_g.fillStyle = this.frontColor;
							_g.strokeStyle = this.frontColor;
						} else {
							_g.fillStyle = this.backColor;
							_g.strokeStyle = this.backColor;
						}
						if (i == 0) {
							_g.beginPath();
							_g.moveTo(
								this.particles[i].position.x,
								this.particles[i].position.y,
							);
							_g.lineTo(
								this.particles[i + 1].position.x,
								this.particles[i + 1].position.y,
							);
							_g.lineTo(
								(this.particles[i + 1].position.x + p1.x) * 0.5,
								(this.particles[i + 1].position.y + p1.y) * 0.5,
							);
							_g.closePath();
							_g.stroke();
							_g.fill();
							_g.beginPath();
							_g.moveTo(p1.x, p1.y);
							_g.lineTo(p0.x, p0.y);
							_g.lineTo(
								(this.particles[i + 1].position.x + p1.x) * 0.5,
								(this.particles[i + 1].position.y + p1.y) * 0.5,
							);
							_g.closePath();
							_g.stroke();
							_g.fill();
						} else if (i == this.particleCount - 2) {
							_g.beginPath();
							_g.moveTo(
								this.particles[i].position.x,
								this.particles[i].position.y,
							);
							_g.lineTo(
								this.particles[i + 1].position.x,
								this.particles[i + 1].position.y,
							);
							_g.lineTo(
								(this.particles[i].position.x + p0.x) * 0.5,
								(this.particles[i].position.y + p0.y) * 0.5,
							);
							_g.closePath();
							_g.stroke();
							_g.fill();
							_g.beginPath();
							_g.moveTo(p1.x, p1.y);
							_g.lineTo(p0.x, p0.y);
							_g.lineTo(
								(this.particles[i].position.x + p0.x) * 0.5,
								(this.particles[i].position.y + p0.y) * 0.5,
							);
							_g.closePath();
							_g.stroke();
							_g.fill();
						} else {
							_g.beginPath();
							_g.moveTo(
								this.particles[i].position.x,
								this.particles[i].position.y,
							);
							_g.lineTo(
								this.particles[i + 1].position.x,
								this.particles[i + 1].position.y,
							);
							_g.lineTo(p1.x, p1.y);
							_g.lineTo(p0.x, p0.y);
							_g.closePath();
							_g.stroke();
							_g.fill();
						}
					}
				};
				this.Side = function (x1, y1, x2, y2, x3, y3) {
					return (x1 - x2) * (y3 - y2) - (y1 - y2) * (x3 - x2);
				};
			}
			ConfettiRibbon.bounds = new Vector2(0, 0);
			confetti = {};
			confetti.Context = function (parent) {
				var i = 0;
				var canvasParent = document.getElementById(parent);
				var canvas = document.createElement("canvas");
				canvas.width = canvasParent.offsetWidth;
				canvas.height = canvasParent.offsetHeight;
				canvasParent.appendChild(canvas);
				var context = canvas.getContext("2d");
				var interval = null;
				var confettiRibbonCount = 7;
				var rpCount = 30;
				var rpDist = 8.0;
				var rpThick = 8.0;
				var confettiRibbons = new Array();
				ConfettiRibbon.bounds = new Vector2(
					canvas.width,
					canvas.height,
				);
				for (i = 0; i < confettiRibbonCount; i++) {
					confettiRibbons[i] = new ConfettiRibbon(
						Math.random() * canvas.width,
						-Math.random() * canvas.height * 2,
						rpCount,
						rpDist,
						rpThick,
						45,
						1,
						0.05,
					);
				}
				var confettiPaperCount = 25;
				var confettiPapers = new Array();
				ConfettiPaper.bounds = new Vector2(canvas.width, canvas.height);
				for (i = 0; i < confettiPaperCount; i++) {
					confettiPapers[i] = new ConfettiPaper(
						Math.random() * canvas.width,
						Math.random() * canvas.height,
					);
				}
				this.resize = function () {
					canvas.width = canvasParent.offsetWidth;
					canvas.height = canvasParent.offsetHeight;
					ConfettiPaper.bounds = new Vector2(
						canvas.width,
						canvas.height,
					);
					ConfettiRibbon.bounds = new Vector2(
						canvas.width,
						canvas.height,
					);
				};
				this.start = function () {
					this.stop();
					var context = this;
					this.interval = setInterval(function () {
						confetti.update();
					}, 1000.0 / frameRate);
				};
				this.stop = function () {
					clearInterval(this.interval);
				};
				this.update = function () {
					var i = 0;
					context.clearRect(0, 0, canvas.width, canvas.height);
					for (i = 0; i < confettiPaperCount; i++) {
						confettiPapers[i].Update(dt);
						confettiPapers[i].Draw(context);
					}
					for (i = 0; i < confettiRibbonCount; i++) {
						confettiRibbons[i].Update(dt);
						confettiRibbons[i].Draw(context);
					}
				};
			};
			var confetti = new confetti.Context("confetti");
			confetti.start();
			jQ(window).resize(function () {
				confetti.resize();
			});
		});
	}
</script>

<link
	href="https://fonts.googleapis.com/css?family=Dancing+Script"
	rel="stylesheet"
/>
<!-- memories section on year end -->
<div class="post year-recap-container" id="confetti">
	<div class="row">
		<div class=" col-md-12 d-md-block col-12">
			<h3
				class=" text-center text-white year-recap-heading gold-glitter year"
			>
				Year Recap'23
			</h3>
			<div class="memories-main-slider">
				<div class="swiper memoriesSlider">
					<div class="swiper-wrapper">
						<div class="swiper-slide">
							<div class="like-byte">
								<div
									id="bytefeed_id_1703752974298"
									class="byte-card"
								>
									<div class="">
										<div class="post-user-detail">
											<div
												class="user-image-name d-flex align-items-center"
											>
												<div class="user-image">
													<figure class="me-2 mb-0">
														<img
															class="profile_redirection pointer user-profile-image"
															height="40"
															width="40"
															src="https://vayuzsocial.s3.ap-south-1.amazonaws.com/images/1696835608593_1696835608593.blob"
															alt="Monika Singh"
															title="Monika Singh"
														/>
													</figure>
												</div>
												<div class="user-name-div">
													<p
														class="mb-0 d-flex align-items-center"
													>
														<a
															href="#"
															class="profile_redirection user-name text-white"
															>Monika</a
														>
													</p>
													<p
														class="mb-0 user-detail-second-line"
													>
														<span
															class="me-1"
															data-bs-toggle="tooltip"
															data-bs-placement="top"
															title="Time"
															aria-label="Time"
														>
															<i
																class="icon-color fa-regular fa-clock clock-icon text-white"
																data-bs-toggle="tooltip"
																data-bs-placement="top"
																title="28 Dec 2023 14:12:54"
																aria-label="28 Dec 2023 14:12:54"
															></i> 1d
														</span>
														<i
															class="icon-color fa-regular fa-period mx-1"
														></i>
														<span
															class="mx-1"
															data-bs-toggle="tooltip"
															data-bs-placement="top"
															data-bs-title="Edited"
															title="Edited"
															aria-label="Edited"
														>
															<i
																class="icon-color fa-regular fa-pen-to-square text-white"
															></i>
														</span>
														<i
															class="icon-color fa-regular fa-period mx-1 text-white"
														>
														</i>
														<span class="mx-1">
															<i
																class="icon-color fa-regular fa-user-group text-white"
															></i>
														</span>
													</p>
												</div>
											</div>
										</div>
									</div>
									<div
										class="post-content post-metafeed_id_1703752974298"
									>
										<div
											id="descfeed_id_1703752974298"
											getstyle="[object Object]"
											class="post-description"
										>
											<div
												class="byte-text two"
												id="visible_post_content_feed_id_1703752974298"
											>
												<p class="bigemoji">
													<span
														class="ql-emojiblot"
														data-name="christmas_tree"
														>&#xFEFF;
														<span
															contenteditable="false"
															>&#xFEFF;
															<span
																contenteditable="false"
																>&#xFEFF;
																<span
																	contenteditable="false"
																>
																	<span
																		class="ap ap-christmas_tree"
																		>🎄</span
																	>
																</span>&#xFEFF;
															</span>&#xFEFF;
														</span>&#xFEFF;
													</span>
													<span
														class="ql-emojiblot"
														data-name="heart"
														>&#xFEFF;
														<span
															contenteditable="false"
															>&#xFEFF;
															<span
																contenteditable="false"
																>&#xFEFF;
																<span
																	contenteditable="false"
																>
																	<span
																		class="ap ap-heart"
																		>❤</span
																	>
																</span>&#xFEFF;
															</span>&#xFEFF;
														</span>&#xFEFF;
													</span>
												</p>
											</div>
										</div>

										<figure>
											<img
												class="image_popup byte-image-memories"
												index="0"
												src="https://vayuzsocial.s3.ap-south-1.amazonaws.com/images/1703752305244_1703752305244.jpeg"
												data-demo-src="https://vayuzsocial.s3.ap-south-1.amazonaws.com/images/1703752305244_1703752305244.jpeg"
												alt=""
											/>
										</figure>
									</div>
								</div>
							</div>
							<h4 class=" text-center text-white slide-heading">
								Most Like Byte
							</h4>
							<!-- <dotlottie-player class="most-like-lottie" autoplay loop src="./background-images/memories-like.lottie" style="width: 200px; height:200px; margin: 0 auto;"></dotlottie-player> -->
						</div>
						<div class="swiper-slide">
							<div
								class="news_detail_redirection shared-news-byte"
							>
								<figure class="shared-event-image-div">
									<img
										src="https://vayuzsocial.s3.ap-south-1.amazonaws.com/images/1703682126012_1703682126012.blob"
										alt=""
										class="memories-byte-event-img shared-image-banner"
									/>
								</figure>
								<div class="shared-event-details">
									<p
										class="event-name memories-byte-event-name pb-0"
									>
										AI tools Designers should explore in
										2024
									</p>
								</div>
							</div>
							<h4 class="text-center text-white slide-heading">
								Insight Read most
							</h4>
							<!-- <dotlottie-player class="most-like-lottie" autoplay loop src="./background-images/memories-like.lottie" style="width: 200px; height:200px; margin: 0 auto;"></dotlottie-player> -->
						</div>
						<div class="swiper-slide">
							<ol>
								<li
									class="fadeInLeft"
									style="--accent-color: #36b9ea"
								>
									<span class="infographis-count count-1"
										>145
									</span>My Posted Bytes
								</li>
								<li
									class="fadeInRight position-relative"
									style="--accent-color: #3ecbb1"
								>
									<span class="infographis-count count-2"
										>145
									</span> Published Insight
								</li>
								<li
									class="fadeInLeft"
									style="--accent-color: #fcc003"
								>
									<span class="infographis-count count-3"
										>145
									</span> Created Events
								</li>
								<li style="--accent-color: #fb337b" class="position-relative">
									<span class="infographis-count count-3"
										>14
									</span> Insight Read
								</li>
								<li style="--accent-color: #9c54e5">
									<span class="infographis-count count-3"
										>4
									</span> Shout Out Received
								</li>
							</ol>
							<h4 class=" text-center text-white slide-heading">
								My InfoGraphics
							</h4>
						</div>
						<div class="swiper-slide text-center">
							<h4 class=" text-center text-white slide-heading">
								Your Rank in 2023
							</h4>
							<div class="rank-container mt-3">
								<figure>
									<img
									class="profile_redirection pointer rank-dp"
									src="https://vayuzsocial.s3.ap-south-1.amazonaws.com/images/1696835608593_1696835608593.blob"
									alt="Monika Singh"
									title="Monika Singh"
								/>
								<div class="rank">17</div>
								</figure>
							</div>
							<h3 class="text-white mt-3 hotpink-glitter year">Monika Singh</h3>
						</div>
					</div>
					<!-- <div class="swiper-button-next"></div>
                    <div class="swiper-button-prev"></div> -->
					<div class="swiper-pagination"></div>
					<div class="autoplay-progress">
						<svg viewBox="0 0 48 48">
							<circle cx="24" cy="24" r="20"></circle>
						</svg>
						<span></span>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
