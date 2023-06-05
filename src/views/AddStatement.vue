<script>
  import { auth } from '../firebase/init.js'
  import { onAuthStateChanged } from 'firebase/auth'
  import AddStatementFormComponent from '../components/AddStatementFormComponent.vue'
  export default {
    components: {
      AddStatementFormComponent,
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
        <div class="col-lg-8 col-md-8 col-sm-12 mx-auto">
          <div class="card">
            <AddStatementFormComponent></AddStatementFormComponent>
          </div>
        </div>
      </div>
    </div>
</template>
