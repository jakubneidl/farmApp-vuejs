<template>
  <h2>crops</h2>
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
</template>

<script>
export default {
  data() {
    return {
      url: "http://localhost:8081/crops",
      crops: [],
    };
  },
  mounted() {
    fetch(this.url)
      .then((res) => res.json())
      .then((data) => (this.crops = data))
      .catch((err) => console.log(err.message));
  },
};
</script>

<style>
</style>