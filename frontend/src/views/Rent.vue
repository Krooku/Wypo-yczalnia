<template>
  <div>
    <p class="title">
      Wypożyczanie
    </p>
    <p>
      Data i godzina wypożyczenia
    </p>
    <form
      class="container"
      method="post"
      @submit.prevent="insertErrand"
    >
      <date-picker
        v-model="time1"
        class="date"
        value-type="format"
      />
      <date-picker
        v-model="time2"
        class="date"
        :minute-step="1"
        :hour-options="hours"
        format="HH:mm"
        value-type="format"
        type="time"
        @placeholder="time2"
      />
      <select
        v-model="role"
        class="type"
        required
      >
        <option
          value="rent"
          selected
        >
          Wynajem
        </option>
        <option value="transport">
          Transport
        </option>
      </select>
      <div
        v-if="error"
        class="message message--error"
      >
        {{ message }}
      </div>
      <div
        v-else-if="!error"
        class="message message--success"
      >
        {{ message }}
      </div>
      <button
        class="btn"
        type="submit"
      >
        Dodaj
      </button>
    </form>
  </div>
</template>

<script>
import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css'
import api from '../api'

export default {
  components: {
    DatePicker
  },
  data () {
    return {
      carId: this.$route.params.carId,
      time1: null,
      time2: null,
      time3: null,
      cars: [],
      role: 'rent',
      error: null
    }
  },
  async beforeRouteEnter (to, from, next) {
    const response = await api.listCars()
    // this.time1 = this.formatDate()
    next(vm => {
      vm.time1 = vm.formatDate()
      vm.cars = response.data
    })
  },
  methods: {
    formatDate () {
      var d = new Date()
      d.setDate(d.getDate())
      var month = '' + (d.getMonth() + 1)
      var day = '' + d.getDate()
      var year = d.getFullYear()

      this.time2 = d.getHours() + ':' + d.getMinutes()

      if (month.length < 2) { month = '0' + month }
      if (day.length < 2) { day = '0' + day }

      return [year, month, day].join('-')
    },
    async insertErrand () {
      // this.time1.setDate(this.time1 + this.time2)
      var a = this.time2.split(':')

      var date = new Date(this.time1)
      date.setHours(a[0])
      date.setMinutes(a[1])
      alert(date)
      alert(this.carId)
      const response = await api.insertErrand(this.carId, { startDate: date, role: this.role })

      if (response.status !== 200) {
        this.error = true
        this.message = response.data.message
      } else {
        this.error = false
        this.message = 'samochód został dodany'
      }
      alert(this.message)
      alert(this.time1 + ' ' + this.time2)
    }
  }
}
</script>

<style lang="scss">
p {
  text-align: center;
}

.container {
  display: flex;
  min-width: 300px;
  max-width: 1300px;
  margin: 20px auto;
  flex-direction: column;
  align-items: center;

  .title {
    font-size: 24px;
    color: black;
  }

  .date {
    margin-top: 10px;
  }

  .type {
    cursor: pointer;
    margin-top: 15px;
    width: 200px;
    border-radius: 5px;
    padding: 6px;
  }

  .btn {
    cursor: pointer;
    background-color: white;
    margin-top: 12px;
    width: 180px;
    border-radius: 5px;
    border: none;
    padding: 5px;
  }
}
</style>
