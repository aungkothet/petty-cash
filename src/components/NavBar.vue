<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary fixed-top">
    <div class="container">
      <router-link to="/" class="navbar-brand">
        Petty
        <img src="../assets/icon.png" alt="pettycash" width="40" height="40" />
        Cash
      </router-link>
      <button
        v-if="userData"
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav" v-if="userData">
        <ul class="navbar-nav">
          <li class="nav-item" v-if="userData.email == adminMail">
            <router-link to="/add-statement" class="nav-link"
              >Add Statement</router-link
            >
          </li>
          <li class="nav-item">
            <router-link to="/monthly-usage" class="nav-link"
              >Monthly Usages</router-link
            >
          </li>
          <li class="nav-item" v-if="userData.email == adminMail">
            <router-link to="/add-usage" class="nav-link"
              >Add Monthly Usages</router-link
            >
          </li>
          <li class="nav-item" v-if="userData">
            <span @click="logout" class="nav-link">Log Out</span>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
  import { auth } from '../firebase/init'
  import { onAuthStateChanged, signOut } from 'firebase/auth'

  export default {
    data: () => ({
      userData: null,
      adminMail: import.meta.env.VITE_ADMIN_MAIL,
    }),
    mounted() {
      onAuthStateChanged(auth, (user) => {
        this.userData = user
      })
    },
    methods: {
      logout() {
        signOut(auth)
          .then(() => {
            console.log('Sign Out Success')
          })
          .catch((error) => {
            // An error happened.
          })
      },
    },
  }
</script>
