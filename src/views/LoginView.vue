<script>
  import { auth } from '../firebase/init.js'
  import { signInWithEmailAndPassword } from 'firebase/auth'
  export default {
    data: () => ({
      email: import.meta.env.VITE_GUEST_MAIL,
      password: import.meta.env.VITE_GUEST_PASSWORD,
    }),
    methods: {
      login() {
        signInWithEmailAndPassword(auth, this.email, this.password)
          .then((userCredential) => {
            window.localStorage.setItem(
              'localUser',
              JSON.stringify(userCredential.user)
            )
            this.$router.push({ name: 'home'})
          })
          .catch((error) => {
            window.localStorage.removeItem('localUser')
            console.log(error)
          })
      },
    },
  }
</script>

<template>
  <div class="container mt-5 py-5">
    <div class="row">
      <div class="col-lg-4 col-md-6 col-sm-8 mx-auto">
        <div class="card login">
          <h1 class="text-center">Sign In</h1>
          <input
            v-model="email"
            type="email"
            class="form-control mb-3"
            placeholder="Email"
            required
          />
          <input
            v-model="password"
            type="password"
            class="form-control mb-3"
            placeholder="Password"
            required
          />
          <input
            type="button"
            class="btn btn-primary"
            @click="login"
            value="Sign In"
          />
        </div>
      </div>
    </div>
  </div>
</template>
