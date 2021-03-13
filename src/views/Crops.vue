<template>
<h2>Crops</h2>
  <div v-if="crops.length" class="cropslist">
    <table>
      <tr>
        <td>Crop name</td>
        <td>Info</td>
        <td>Spacing</td>
        <td>Ideal soil humidity</td>
        <td>Seeder name</td>
      </tr>
      <tr v-for="crop in crops" :key="crop.name">
        <td @Click="plantCrop(crop)">{{ crop.name }}</td>
        <td>{{ crop.info }}</td>
        <td>{{ crop.spacing }}</td>
        <td>{{ crop.idealSoilHumidity }}</td>
        <td>{{ crop.seeder.name }}</td>
      </tr>
    </table>
  </div>
  <div v-else class="loading">
    <p>Loading data . . .</p>
  </div>
<hr>
  <div class="cropform">
    <form @submit="addCrop">
      <label>Crop name</label>
      <input type="text" v-model="name" />
      <label>Info</label>
      <input type="text" v-model="info" />
      <label>Ideal Soil Humidity</label>
      <input type="text" v-model="idealSoilHumidity" />
      <label>Spacing</label>
      <input type="text" v-model="spacing" />
      <label>Seeder</label>
      <select v-model="selectedSeeder">
        <option v-for="seeder in seeders" :key="seeder.name">
          {{ seeder.name }}
        </option>
      </select>
      <button class="button">Add Crop</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      info: "",
      spacing: "",
      soilHumidity: "",
      idealSoilHumidity: "",
      crops: [],
      url: "http://localhost:8081/crops",
      urlSeeder: "http://localhost:8081/seeders",
      seeders: [],
      selectedSeeder: "",
    };
  },
  mounted() {
    fetch(this.url)
      .then((res) => res.json())
      .then((data) => (this.crops = data))
      .catch((err) => console.log(err.message));

    fetch(this.urlSeeder)
      .then((res) => res.json())
      .then((data) => (this.seeders = data))
      .catch((err) => console.log(err.message));
  },
  methods: {
    plantCrop(crop){
        console.log(crop)

    },
    addCrop() {
      const options = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        body: JSON.stringify({
          name: this.name,
          info: this.info,
          spacing: this.spacing,
          idealSoilHumidity: this.idealSoilHumidity,
          seeder: {
            name: this.selectedSeeder,
          },
        }),
      };
      fetch(this.url, options).then((response) => {
        console.log(response);
      });
    },
  },
};
</script>

<style>
form {
  width: 400px;
  margin: 25px auto
}
input[type="text"],
select {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}
.button {
  display: inline-block;
  padding: 15px 25px;
  font-size: 20px;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  outline: none;
  color: #fff;
  background-color: #4caf50;
  border: none;
  border-radius: 15px;
}
</style>