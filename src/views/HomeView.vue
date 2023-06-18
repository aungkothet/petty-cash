<script>
  import DebitCreditStatement from '../components/DebitCreditStatement.vue'
  export default {
    components: {
      DebitCreditStatement,
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
