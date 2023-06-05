<script>
  import 'jquery/dist/jquery.min.js'
  import 'bootstrap/dist/css/bootstrap.min.css'
  import 'datatables.net-dt/js/dataTables.dataTables'
  import 'datatables.net-dt/css/jquery.dataTables.min.css'
  import $ from 'jquery'

  import { db } from '../firebase/init.js'
  import {
    collection,
    getDocs,
    query,
    orderBy,
    where,
    onSnapshot,
  } from 'firebase/firestore'

  export default {
    data: () => ({
        id:1
    }),
    mounted() {
      this.loadStatements()
    },
    methods: {
      queryData() {
        var date = new Date(),
          y = date.getFullYear(),
          m = date.getMonth()
        var firstDay = new Date(y, m, 1)
        var lastDay = new Date(y, m + 1, 1)
        var creditAmount = 0
        var debitAmount = 0
        const creditStatementsQuery = query(
          collection(db, 'petty-cash'),
          where('date', '>=', firstDay),
          where('date', '<', lastDay)
        )
        getDocs(creditStatementsQuery)
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              if (doc.data().type == 'C') {
                creditAmount += doc.data().amount
              }
              if (doc.data().type == 'D') {
                debitAmount += doc.data().amount
              }
            })
            var msg =
              'Remainig for ' +
              date.toLocaleString('default', { month: 'long' })
            msg +=
              '\nTotal Credit Amount => ' +
              creditAmount.toLocaleString() +
              ' MMK\nTotal Debit Amount => ' +
              debitAmount.toLocaleString()
            msg +=
              ' MMK\nRemaining Credit Amount => ' +
              (creditAmount - debitAmount).toLocaleString() +
              ' MMK'
            alert(msg)
          })
          .catch((error) => {
            console.log(error)
          })
      },
      loadStatements() {
        const statementsQuery = query(
          collection(db, 'petty-cash'),
          orderBy('date', 'asc')
        )
        onSnapshot(statementsQuery, (snapshot) => {
          snapshot.docChanges().forEach((change) => {
            var data = change.doc.data()
            let str = data.date.toDate() + ''
            var msg =
              '<tr><td>' + (this.id++) +'</td><td>'+
              str.substring(4).substring(0, 11).replaceAll(' ', '-') +
              '</td><td>' +
              data.desc +
              '</td><td class="text-end">'
            if (data.type == 'C') {
              msg += data.amount.toLocaleString()
            }
            msg += '</td><td class="text-end">'
            if (data.type == 'D') {
              msg += data.amount.toLocaleString()
            }
            msg += '</td></tr>'
            $('tbody').append(msg)
          })
          $('#datatable').DataTable({ aaSorting: [] })
        })
      },
    },
  }
</script>

<template>
  <div>
    <h1 class="text-center">Debit/Credit Statements</h1>
    <table
      id="datatable"
      class="table table-striped table-hover table-responsive"
    >
      <thead>
        <tr>
            <th>#</th>
          <th>Date</th>
          <th>Description</th>
          <th class="text-end">Credit</th>
          <th class="text-end">Debit</th>
        </tr>
      </thead>
      <tbody></tbody>
    </table>
    <div class="row justify-content-between mt-1">
      <button type="button" @click="queryData" class="btn btn-primary col-md-3 col">
        Calculate Remaining
      </button>
    </div>
  </div>
</template>
