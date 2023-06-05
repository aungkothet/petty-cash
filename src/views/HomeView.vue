<script>
  import { auth } from '../firebase/init.js'
  import { onAuthStateChanged } from 'firebase/auth'
  import DebitCreditStatement from '../components/DebitCreditStatement.vue'
  export default {
    data: () => ({
      statements: [],
    }),
    components: {
      DebitCreditStatement,
    },
    mounted() {
      onAuthStateChanged(auth, (user) => {
        if (!user) {
          this.$router.push({ path: '/login' })
        }
      })
    },
  }
</script>

<template>
  <div class="container mt-5 py-5">
    <div class="row">
      <div class="col-lg-10 col-md-8 col-sm-12 mx-auto">
        <div class="card" style="overflow-x: scroll">
          <DebitCreditStatement></DebitCreditStatement>
        </div>
      </div>
    </div>
  </div>
</template>
