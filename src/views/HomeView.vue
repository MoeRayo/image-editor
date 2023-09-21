<template>
	<header class="vh-100 bg-light-pink dt w-100 helvetica">
		<div
			style="
				background: url(http://mrmrs.github.io/photos/display.jpg) no-repeat
					center right;
				background-size: cover;
			"
			class="dtc v-mid cover ph3 ph4-m ph5-l">
			<div class="flex justify-around">
				<div>
					<h1 class="f2 f-subheadline-l measure lh-title nb1 fw9">Editr</h1>
					<h2 class="f6 fw6 black">
						Store, transform and update images using Xata (File Attachments)
					</h2>
				</div>
				<div class="mv2">
					<div v-if="userHasAccount">
						<Signin @go-to-sign-up="switchToSignUp" />
					</div>
					<div v-else>
						<Signup @user-has-account="handleUserHasAccount" />
					</div>
				</div>
			</div>
		</div>
	</header>
</template>
<script>
	import Signin from "@/components/Signin.vue";
	import Signup from "@/components/Signup.vue";

	export default {
		components: {
			Signin,
			Signup,
		},
		data() {
			return {
				userHasAccount: false,
			};
		},
		methods: {
			handleUserHasAccount(value) {
				this.userHasAccount = value;
			},
			switchToSignUp() {
				this.userHasAccount = false;
			},
		},
	};
</script>
