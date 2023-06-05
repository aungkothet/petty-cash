<script>
  import { auth, db } from '../firebase/init.js'
  import { onAuthStateChanged } from 'firebase/auth'
  import { collection, query, orderBy, onSnapshot } from 'firebase/firestore'

  export default {
    data: () => ({
      date: null,
      detail: [],
      total: 0,
      error: null,
      title: null,
    }),
    mounted() {
      onAuthStateChanged(auth, (user) => {
        if (!user) {
          this.$router.push({ path: '/login' })
        }
      })
    },
    methods: {
      queryData() {
        let refId = new Date(this.date).getTime() + ''
        let dateUsage = new Date(this.date).toLocaleString('default', {
          month: 'long',
          year: 'numeric',
        })
        this.title = dateUsage + ' Usage'
        const statementsQuery = query(
          collection(db, 'monthly-usage', refId, 'detail'),
          orderBy('amount', 'asc')
        )
        onSnapshot(statementsQuery, (snapshot) => {
          if (!snapshot.empty) {
            this.error = null
            snapshot.docChanges().forEach((change) => {
              var data = change.doc.data()
              this.detail.push(data)
              this.total += data.amount
            })
          } else {
            this.error = 'No data found for ' + this.title
          }
        })
      },
    },
  }
</script>

<template>
  <div class="container mt-5 py-5">
    <div class="row">
      <div class="col-lg-8 col-md-8 col-sm-12 mx-auto">
        <div class="card">
          <h1 class="text-center mb-4">Monthly Usages</h1>
          <div class="row justify-content-center g-3">
            <div class="col-auto">
              <div class="input-group">
                <span class="input-group-text">Select Month</span>
                <input
                  type="month"
                  class="form-control"
                  aria-label="Month"
                  v-model="date"
                  required
                />
              </div>
            </div>
            <div class="col-auto">
              <button type="button" @click="queryData" class="btn btn-primary">
                Show Detail
              </button>
            </div>
          </div>
          <div v-if="detail.length != 0">
            <h2 class="text-center my-2">{{ title }}</h2>
            <table class="table table-striped table-hover table-responsive">
              <thead>
                <tr>
                  <th>Description</th>
                  <th class="text-end">Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(usage, index) in detail" :key="index">
                  <td>{{ usage.desc }}</td>
                  <td class="text-end">{{ usage.amount.toLocaleString() }}</td>
                </tr>
                <tr>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                </tr>
                <tr>
                  <td class="text-center">Total</td>
                  <td class="text-end">{{ total.toLocaleString() }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <h2 v-if="error" class="text-danger my-2">{{ error }}</h2>
        </div>
      </div>
    </div>
  </div>
</template>
