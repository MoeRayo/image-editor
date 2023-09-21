<template>
	<form
		class="ba f6 b--black bw4 bg-white br2 center pa3 shadow-5"
		@submit.prevent="signIn">
		<h2 class="ttc tc">Sign In</h2>

		<label for="email" class="db mb2 black-70">Email</label>
		<input
			id="email"
			v-model="email"
			name="email"
			type="email"
			class="db mb3 w-100 br2 ph4 ba bw1 b--black"
			placeholder="example@email.com" />

		<label for="password" class="db mb2 black-70">Password</label>
		<input
			id="password"
			v-model="password"
			name="password"
			type="password"
			class="db mb3 w-100 br2 pa2 ba bw1 b--black"
			placeholder="••••••••" />

		<button
			type="submit"
			class="f7 center db pv2 ph3 mb3 tracked bg-black ba br3 white pointer hover-black hover-bg-gold bg-animate pointer">
			Sign in
		</button>
		<p>
			Don't have an account?
			<a @click="goToSignUp" class="black-70 b f7">Sign up</a>
		</p>
	</form>
</template>

<script>
	export default {
		name: "Signin",
		methods: {
			goToSignUp() {
				this.$emit("go-to-sign-up");
			},
		},
	};
</script>
