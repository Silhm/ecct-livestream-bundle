<template>
	<div class="jao-schedule">
		<section v-for="(day, index) in schedule">
			<header>
				<span v-if="schedule.length>1">Day {{index+1}} &mdash;</span> {{day.date | date}}
			</header>
			<ul>
				<li v-for="slot in day.agenda" v-bind:class="{ current: checkTime(slot.range[0], slot.range[1]), past: checkTimePast(slot.range[0], slot.range[1]) }">
					<h3><b>{{slot.display.h? slot.display.h + 'h' : ''}}</b>{{slot.display.m}}{{slot.display.a}}</h3>
					<div class="event-desc">
						<h4 v-html="slot.title"></h4>
						<small v-html="slot.desc"></small>
						<small v-html="slot.location"></small>
					</div>



				</li>

			</ul>
		</section>
	</div>
</template>

<script>

	window.moment = require('moment');
	require('moment/locale/fr');

	//TODO: load this on replicants
	//let agenda = require('./assets/schedule.json').agenda;


	export default {
		filters: {
			date: function(date) {
				return moment(date).format('LL');
			}
		},
		data() {
			return {
				now: '',
				schedule: []
			}
		},
		mounted() {
			this.runTimer();
			this.time = this.timeFromNum(10.2, ':', true);
			this.setClockPos();

			this.replicant = nodecg.Replicant('planning','ECCT');
			this.replicant.on('change', (newValue, oldValue) => {

				console.log('planning', newValue, oldValue);

				// JSON DATA
				let schedule = [
					{
						date: moment.now(),
						agenda: this.replicant.value.agenda
					}
				]
				this.schedule = schedule;

			});

			//DEBUG
			var date = "2017-03-13";
			var time = "18:00";
			var forcedTime = moment(date + ' ' + time)

			this.setTime();
		},
		created() {
			this.now = moment().format('HH:mm');
		},
		methods: {
			moment: function () {
				return window.moment;
			},
			checkTime: function(ts, te) {
				return (this.now >= this.numFromTime(ts) && this.now < this.numFromTime(te));
			},
			checkTimePast: function(ts, te) {
				return (this.now >= this.numFromTime(ts) && this.now > this.numFromTime(te));
			},

			numFromTime: (time) => {
				let set = time.split(/[.:]/)
				let hh = parseInt(set[0])
				let mm = set[1] ? parseInt(set[1]) : 0
				return parseFloat((hh + mm / 60).toFixed(1))
			},
			timeFromNum: (num, sep, ampm) => {
				let hh = parseInt(num);
				let mm = Math.round((num-hh) * 60);
				sep = sep || '';
				return (hh>12&&ampm?hh-12:hh)+sep+('00'+mm).substr(-2)+(ampm?(hh>11?' pm':' am'):'');
			},

			runTimer: function() {
				this.setClockPos();
				this._timeTraveler = setInterval(function() {
					this.setTime()
				}.bind(this), 30000);
			},

			setClockPos: function() {
				setTimeout(() => {
					let anchor = document.querySelector('.current')
					let t = '1em'
					if(anchor) {
						t = Math.round(anchor.getBoundingClientRect().top) + 'px'
					}
					document.documentElement.style.setProperty('--y', t);
				}, 350)
			},

			setTime: function(forcedTime) {
				let now = forcedTime? forcedTime:moment();
				this.now = this.numFromTime(moment(now).format('HH:mm'));
				this.time = moment(now).format('h:mm a');
			}

		}

	};
</script>

<style lang="scss" scoped>

	// primary layout
	aside {
		position: relative;
		flex: 1;
		order: 1;
	}
	.jao-schedule {
		position: relative;
		flex: 1;
		order: 2;
		overflow: hidden;
		height: 90vh;
		section {
			display: flex;
			min-height: 90vh;
		}
	}

	svg.logo {
		position: absolute;
		pointer-event: none;
		font-size: 100vmax;
		width: 1em;
		height: 1em;
		top: 50%;
		left: 50%;
		will-change: transform;
		transform: var(--transform);
		transition: transform 12000ms ease-in-out;
		mix-blend-mode: overlay;
		path {
			fill: var(--accent);
			transition: fill 3000ms linear;
		}
	}

	// schedule listing
	.jao-schedule {
		/*
		background: rgba(#001, .8);
		color: #fff;
		*/
		background: rgba(255, 255, 255, 0.87);
		color: #d17e35;

		header {
			flex: 0 0 auto;
			writing-mode: vertical-rl;
			padding: 1em .5em;
			/*
			color: rgba(#001, .4);
			background: #fff;
			 */
			color: rgb(255, 255, 255);
			background: #6f6f6f;
		}
		ul {
			list-style: none;
			font-size: 1.65em;
			margin: 0;
			padding-left: 2rem;
			flex: 1;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
		}
		li {
			display: flex;
			flex-direction: row;
			align-items: baseline;
			margin-bottom: 1em;
			position: relative;
			transition: font-size 300ms ease-in, opacity 300ms ease-in;
			font-size: .5em;
			opacity: .2;
			line-height: 1.2;
			&.current {
				font-size: 1em;
				opacity: 1;
				background: white;
				padding: 10px;
				width: 100%;

				&::before {
					content: '';
					position: absolute;
					top: 0.8em;
					left: -2rem;
					transform: translateY(-.5rem);
					border: .5em solid;
					border-width: 1em 0 1em .625em;
					border-color: transparent;
					border-left-color: currentColor;
					color:#6f6f6f;
				}
				~ li {
					opacity: .4;
				}
				+ li {
					font-size: .675em;
					opacity: .7;
				}
				.event-desc small{
					display: block;
				}
			}
			&.past {
				margin-bottom: 0;
			}
			div.event-desc {
				font-family: 'Montserrat', sans-serif;
				h4 {
					font-size: 2em;
					margin-bottom: 0;
					font-weight: bold;
				}
				small{
					display: none;
				}
			}
		}
	}
	h1 {
		position: relative;
		top: .65em;
		left: .65em;
		margin: 0;
		line-height: 1;
		display: inline;
		font-weight: bold;
	}
	h3 {
		margin: 0;
		width: 120px;
		text-transform: uppercase;
		font-weight: 200;
		font-size: 1.5em;
		text-align: right;
		padding-right: 40px;
		b {
			font-weight: 900;
		}
	}

	// playground
	.clock {
		position: absolute;
		font-size: 1em;
		top: 1em;
		right: 1em;
		transform: translate(0, calc(-1.3em + var(--y)));
		transition: transform 300ms ease-out;
	}

	small {
		font-size: .75em;
		color: var(--accent);
		transition: color 3000ms linear;
		small {
			font-size: .85em;
		}
	}

	// before/after hours
	.jao-schedule li.after-hours {
		animation: fade-in 1000ms ease-in 80ms forwards;
		position: fixed;
		font-size: 1.2em;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(#000, .85);
		line-height: 1.5;
		width: 100vw;
		height: 100vh;
		display: flex;
		opacity: 0;
		// z-index: 1;
		text-align: center;
		align-items: center;
		justify-content: center;
	}
	.jao-schedule li.current ~ li.after-hours {
		display: none;
		opacity: 0;
	}

	// multi-day presentation
	// main section + section {
	//   ul {
	//     box-shadow: 0 1px 0 0 inset;
	//   }
	//   header {
	//     box-shadow: 0 1px 0 0 inset;
	//   }
	// }

	// animations
	@keyframes fade-in {
		100% {opacity: 1;}
	}

	// demo
	.control {
		position: absolute;
		z-index: 2;
		bottom: 0;
		right: 0;
		font-size: .5em;
		background: rgba(#000, .7);
		transform: translateY(calc(100% - 2em));
		transition: transform 300ms ease-out;
		header {
			display: flex;
			justify-content: space-between;
			align-items: center;
			text-transform: uppercase;
			cursor: pointer;
			div {
				padding-left: 1em;
			}
		}
		> div {
			padding: 1em;
		}
		p {
			margin: 0;
			+ p {
				margin-top: 1em;
			}
		}
		input[type=range] {
			padding: 0;
			border: 0;
			width: 15em;
			vertical-align: middle;
			border-radius: 1em;
			background: rgba(#fff, 0.3);
			font-size: 1rem;
			line-height: 1;
			appearance: none;
			outline: none;
			transition: all .3s;
			outline-offset: 0;
			margin: 0;
			&::-webkit-slider-thumb {
				appearance: none;
				width: 1em;
				height: 1em;
				border: none;
				border-radius: 1em;
				background: #E2E4E6;
				background-image: none;
				transform: scale(2);
				transition: all .3s;
			}
		}
		button {
			font: inherit;
			border: none;
			color: inherit;
			width: 2em;
			height: 2em;
			font-size: 1em;
			font-weight: 100;
			background: rgba(#fff, .4);
			outline: none;
			display: flex;
			align-items: center;
			justify-content: center;
			line-height: 0;
			transform: rotate(180deg);
		}
		&.show {
			transform: translateY(0%);
			button {
				transform: rotate(0deg);
			}
		}
	}

	// boring
	*, *::before, *::after {box-sizing: border-box;}

	html, body {
		background: var(--bg); // fixes chrome 58+ mix-blend-mode bug
	}

	body {
		margin: 0;
		min-height: 100vh;
		display: flex;
		flex-flow: row wrap;
		justify-content: center;
		overflow: hidden;
		font-family: var(--font);
		font-size: calc(1em + 1.5vmin);
		// background: var(--bg);
		transition: background 1500ms linear;
		color: #fff;
	}

	// safari fix
	.jao-schedule header {
		height: 100%;
	}

	// firefox fix
	.jao-schedule header {
		width: 0px;
		padding: 1em 1.25em;
		line-height: 0;
	}

</style>
