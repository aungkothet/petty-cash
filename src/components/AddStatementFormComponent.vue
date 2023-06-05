<script>
  import { db } from '../firebase/init.js'
  import {
    collection,
    addDoc,
  } from 'firebase/firestore'

  export default {
    data: () => ({
      desc: null,
      date: null,
      type: 'C',
      amount: 0,
    }),
    mounted() {},
    methods: {
      addStatement() {
        addDoc(collection(db, 'petty-cash'), {
          desc: this.desc,
          date: new Date(this.date),
          type: this.type,
          amount: +this.amount,
        })
          .then((docRef) => {
            alert('Document has been added successfully')
            this.desc = null
            this.amount = 0
            this.type = 'C'
          })
          .catch((error) => {
            console.log(error)
          })
      },
    },
  }
</script>

<template>
  <h1 class="text-center">Add Statement</h1>
  <div class="input-group mb-3">
    <span class="input-group-text">Date</span>
    <input
      type="date"
      class="form-control"
      aria-label="Date"
      v-model="date"
      required
    />
  </div>
  <div class="input-group mb-3">
    <span class="input-group-text">Description</span>
    <input
      type="text"
      class="form-control"
      aria-label="Description"
      v-model="desc"
      required
      list="suggestions"
    />
    <datalist id="suggestions">
      <option value="May လစာ"></option>
      <option value="May အသုံး"></option>
      <option value="May လက်ကျန်"></option>
      <option value="THB 10000 လဲ * 84"></option>
      <option value="a အကြွေးပြန်ရ"></option>
    </datalist>
  </div>
  <div class="input-group mb-3">
    <span class="input-group-text">Type</span>
    <select class="form-select" v-model="type" required>
      <option value="C">Credit</option>
      <option value="D">Debit</option>
    </select>
  </div>
  <div class="input-group mb-3">
    <span class="input-group-text">Amount</span>
    <input
      type="text"
      class="form-control"
      aria-label="Amount"
      v-model="amount"
      required
    />
    <span class="input-group-text">MMK</span>
  </div>
  <div class="col-auto">
    <button @click="addStatement" class="btn btn-primary mb-3">Save</button>
  </div>
</template>
