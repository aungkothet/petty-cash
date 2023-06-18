<script>
  import { db } from '../firebase/init.js'
  import { collection, addDoc } from 'firebase/firestore'
  export default {
    data: () => ({
      date: null,
      desc: null,
      amount: 0,
    }),
    methods: {
      addUsage() {
        var localUser = JSON.parse(window.localStorage.getItem('localUser'))

        let refId = new Date(this.date).getTime() + ''
        addDoc(collection(db, 'petty-cash', localUser.email, 'monthly-usage', refId, 'detail'), {
          desc: this.desc,
          amount: +this.amount,
          date: this.date,
        })
          .then((docRef) => {
            console.log('Document has been added successfully')
            this.amount = null
            this.desc = null
          })
          .catch((error) => {
            console.log(error)
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
          <h1 class="text-center">Add Monthly Usage</h1>
          <div class="input-group mb-3">
            <span class="input-group-text">Date</span>
            <input
              type="month"
              class="form-control"
              aria-label="Date"
              v-model="date"
            />
          </div>
          <div class="input-group mb-3">
            <span class="input-group-text">Description</span>
            <input
              type="text"
              class="form-control"
              aria-label="Description"
              v-model="desc"
              list="suggestions"
            />
            <datalist id="suggestions">
              <option value="May"></option>
              <option value="Father"></option>
              <option value="Mother"></option>
              <option value="Ko's အသုံး"></option>
              <option value="4လွှာဈေးဘိုး"></option>
              <option value="Violin"></option>
              <option value="DDL"></option>
            </datalist>
          </div>
          <div class="input-group mb-3">
            <span class="input-group-text">Amount</span>
            <input
              type="text"
              class="form-control"
              aria-label="Amount"
              v-model="amount"
            />
            <span class="input-group-text">MMK</span>
          </div>
          <div class="col-auto">
            <button class="btn btn-primary mb-3" @click="addUsage">Save</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
