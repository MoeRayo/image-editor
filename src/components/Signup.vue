<template>
	<form
		@submit.prevent="signUp"
		class="ba b--black bw4 bg-white br2 mw6 center pv2 ph4 shadow-5 f6">
		<h2 class="ttc tc">Sign Up</h2>

		<label for="name" class="db mb2 black-70">First Name</label>
		<input
			id="firstname"
			v-model="first_name"
			name="firstname"
			type="text"
			class="db mb3 w-100 br2 pa2 ba bw1 b--black"
			placeholder="John" />

		<label for="name" class="db mb2 black-70">Last Name</label>

		<input
			id="lastname"
			v-model="last_name"
			name="lastname"
			type="text"
			class="db mb3 w-100 br2 pa2 ba bw1 b--black"
			placeholder="Doe" />

		<label for="email" class="db mb2 black-70">Email</label>
		<input
			id="email"
			v-model="email"
			name="email"
			type="email"
			class="db mb3 w-100 br2 pa2 ba bw1 b--black"
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
			class="center db pv2 ph3 mb3 tracked bg-black ba br3 white pointer hover-black hover-bg-gold bg-animate pointer f7">
			Sign up
		</button>
		<p class="f7">
			Already have an account?
			<a @click="switchToSignin" class="black-70 b">Sign in</a>
		</p>
	</form>
</template>

<script>
	export default {
		name: "Signup",
		methods: {
			switchToSignin() {
				this.$emit("user-has-account", true);
			},
		},
	};
</script>
