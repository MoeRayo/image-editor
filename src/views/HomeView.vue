<template>
	<header class="vh-100 bg-light-pink dt w-100 helvetica">
		<div
			style="
				background: url(http://mrmrs.github.io/photos/display.jpg) no-repeat
					center right;
				background-size: cover;
			"
			class="dtc cover ph3 ph4-m ph5-l tc">
			<div class="tc mt4 mb5">
				<h1 class="f2 f-subheadline-l measure lh-title nb1 fw9">
					X-Transformr
				</h1>
				<h2 class="f6 fw6 black">
					Store, transform and update images using Xata (File Attachments)
				</h2>
			</div>
			<Uploadcontainer />
		</div>
	</header>
</template>
<script>
	import Uploadcontainer from "@/components/Uploadcontainer.vue";

	export default {
		components: {
			Uploadcontainer,
		},
		data() {
			return {};
		},
		methods: {},
	};
</script>
