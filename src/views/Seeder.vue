<template>
  <h2>Seeders</h2>
  <table v-if="seeders.length">
    <tr>
      <td>Seeder name</td>
      <td>Seeder position</td>
    </tr>
    <tr v-for="seeder in seeders" :key="seeder.name">
      <td>{{ seeder.name }}</td>
      <td>{{ seeder.seederPosition }}</td>
    </tr>
  </table>
  <hr />

  <div class="seederform">
    <form @submit="addSeeder">
      <label>Seeder name</label>
      <input type="text" v-model="seederName" required />
      <label>Positon X</label>
      <input type="text" v-model="positionX" required />
      <label>Positon Y</label>
      <input type="text" v-model="positionY" required />
      <label>Positon Z</label>
      <input type="text" v-model="positionZ" required />
      <button class="button">Add Seeder</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      seederName: "",
      seeders: [],
      urlSeeder: "http://localhost:8081/seeders",
      positionX: "",
      positionY: "",
      positionZ: "",
    };
  },
  mounted() {
    fetch(this.urlSeeder)
      .then((res) => res.json())
      .then((data) => (this.seeders = data))
      .catch((err) => console.log(err.message));
  },
  methods: {
    addSeeder() {
      const options = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        body: JSON.stringify({
          name: this.seederName,
          seederPosition: {
            positionX: this.positionX,
            positionY: this.positionY,
            positionZ: this.positionZ,
          },
        }),
      };
      fetch(this.urlSeeder, options).then((response) => {
        console.log(response);
      });
    },
  },
};
</script>

<style>
table,
th,
td {
  border: 1px solid black;
  margin: auto;
}
.seederform {
  width: 400px;
  margin: auto;
}
</style>