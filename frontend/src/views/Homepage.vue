<template>
  <div class="homepage">
    <div
      v-if="getRole=='admin'"
      class="button"
    >
      <router-link
        tag="div"
        :to="{ name: 'insertcar' }"
      >
        Dodaj samochód
      </router-link>
    </div>
    <div class="check">
      <p v-if="selected == '1'">
        Dostępne {{ selected_cars.length }}
      </p>
      <p v-if="selected == '2'">
        Wynajęte {{ selected_cars.length }}
      </p>
      <p v-if="selected == '0'">
        Wszystkie {{ selected_cars.length }}
      </p>
      <input
        v-model="selected"
        true-value="1"
        type="checkbox"
        class="checkmark"
        @change="getTypedCars"
      >
      <input
        v-model="selected"
        true-value="2"
        type="checkbox"
        class="checkmark"
        @change="getTypedCars"
      >
      <input
        v-model="selected"
        true-value="0"
        type="checkbox"
        class="checkmark"
        @change="getTypedCars"
      >
    </div>
    <div class="grid_container">
      <div
        v-for="car in selected_cars"
        :key="car._id"
        class="car_tile"
      >
        <p class="car_model">
          {{ car.band }} {{ car.model }}
        </p>
        <div class="car_model">
          {{ car.registrationNumber }}
        </div>
        <div class="car_model">
          {{ car.type }}
        </div>
        <div
          v-if="car.role=='avaiable'"
          class="car_model car_model--avaiable"
        >
          Dostępny
        </div>
        <div
          v-else-if="car.role=='rent'"
          class="car_model car_model--rent"
        >
          Wynajęty
        </div>
        <div
          v-else
          class="car_model car_model--transport"
        >
          Transport osób
        </div>
        <div
          v-if="car.role=='avaiable'"
          class="car_model"
        >
          <router-link :to="{ name: 'rent', params: { carId: car._id }}">
            Wynajmij
          </router-link>
        </div>
        <div
          v-else-if="car.role=='rent' || car.role=='transport'"
          class="car_model"
        >
          Zwróć
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../api'
// import Vuetify from 'vuetify/lib'

export default {
  // vuetify: new Vuetify(),
  name: 'Homepage',
  data () {
    return {
      cars: [],
      selected_cars: [],
      selected: 0,
      checkbox: true,
      radioGroup: 1,
      switch1: true
    }
  },
  async beforeRouteEnter (to, from, next) {
    const response = await api.listCars()
    next(vm => {
      vm.cars = response.data
      vm.selected_cars = response.data
    })
  },
  computed: {
    getRole () {
      return this.$store.getters.role
    }
  },
  async mounted () {
  },
  methods: {
    func () {
      alert(this.getRole)
    },
    getTypedCars () {
      switch (this.selected) {
        case '0':
          this.selected_cars = this.cars
          break
        case '1':
          this.selected_cars = this.cars.filter(car => car.role === 'avaiable')
          break
        case '2':
          this.selected_cars = this.cars.filter(car => (car.role === 'rent') || (car.role === 'transport'))
          break
        default:
          this.selected_cars = this.cars
      }
    }
  }
}
</script>

<style lang="scss">
.button {
  cursor: pointer;
  width: 200px;
  padding: 14px;
  margin: 14px auto;
  border: solid black 4px;
  text-align: center;
  background-color: white;
}

.button:hover {
  background-color: #eee;
}

.check {
  text-align: center;
  max-width: 1300px;
  margin: 14px auto;

  .checkmark {
    padding: 20px;
    margin: 0 8px;
  }
}

.grid_container {
  font-size: 24px;
  color: white;
  margin: 10px auto;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 1400px;
  text-align: center;

  .car_tile {
    display: block;
    background-color: #43332e;
    width: 300px;
    border: solid black 2px;
    margin: 5px;
    padding: 4px;

    .car_model {
      text-align: center;
      border-bottom: solid black 2px;
      margin: 0;
      padding: 4px;

      a {
        color: white;
      }

      a:hover {
        color: rgb(170, 158, 158);
      }

      &--avaiable {
        // text-decoration: none;
        color: green !important;
      }

      &--avaiable:hover {
        color: rgb(42, 233, 42);
      }

      &--transport {
        color: orange;
      }

      &--rent {
        color: red;
      }
    }

    .car_model:last-child {
      border-bottom: none;
    }
  }
}

.fade-enter-active {
  transition: opacity 2.5s;
}

.fade-leave-active {
  transition: opacity 1.5s;
}

.fade-enter,
.fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
