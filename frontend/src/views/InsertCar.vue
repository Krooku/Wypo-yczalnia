<template>
  <div>
    <div class="text">
      Dodaj samochód do wypożyczalni
    </div>

    <div class="form_container">
      <form
        method="post"
        @submit.prevent="insertCar"
      >
        <input
          v-model="car.band"
          type="text"
          placeholder="Marka Samochodu"
          required
        >
        <input
          v-model="car.model"
          type="text"
          placeholder="Model samochodu"
          required
        >
        <input
          v-model="car.registrationNumber"
          type="text"
          placeholder="Numer rejestracyjny"
          required
        >
        <select v-model="car.klasa">
          <option
            value="A"
            selected
          >
            Klasa: A
          </option>
          <option value="B">
            Klasa: B
          </option>
          <option value="C">
            Klasa: C
          </option>
          <option value="D">
            Klasa: D
          </option>
          <option value="SUV">
            Klasa: SUV
          </option>
        </select>
        <select v-model="car.role">
          <option
            value="avaiable"
            selected
          >
            Dostępny
          </option>
          <option value="rent">
            Wypożyczony
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
        <button type="submit">
          Dodaj
        </button>
      </form>
    </div>
  </div>
</template>

<script>

import api from '../api'

export default {
  data () {
    return {
      error: null,
      message: null,
      car: {
        band: '',
        model: '',
        registrationNumber: '',
        klasa: 'A',
        role: 'avaiable'
      }
    }
  },
  methods: {
    async insertCar () {
      const response = await api.insertCar(this.car)

      if (response.status !== 200) {
        this.error = true
        this.message = response.data.message
      } else {
        this.error = false
        this.message = 'samochód został dodany'
      }
    }
  }
}
</script>

<style lang="scss">

.text {
  font-size: 15px;
  margin: 10px 0;
  text-align: center;
}

.form_container {
  display: flex;
  flex-direction: column;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;

  input {
    width: 294px;
    display: block;
    border: none;
    padding: 10px 3px;
    margin: 10px auto;
  }

  select {
    width: 250px;
    display: block;
    border: none;
    padding: 10px 3px;
    margin: 10px auto;
    cursor: pointer;
  }

  button {
    width: 300px;
    display: block;
    border: none;
    padding: 10px 3px;
    margin: 10px auto;
    cursor: pointer;
    background-color: #fff;
  }

  .message {
    text-align: center;
    font-size: 24px;

    &--success {
      color: green;
    }

    &--warn {
      color: orange;
    }

    &--error {
      color: red;
    }
  }
}

</style>
