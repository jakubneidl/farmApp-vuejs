<template>
  <h3>Planted crops</h3>
  <table>
    <tr>
      <td>Crop name</td>
      <td>position X</td>
      <td>position Y</td>
      <td>position Z</td>
      <td>planted</td>
    </tr>
    <tr
      v-for="plantedCrop in plantedCrops"
      :key="plantedCrop.plantedCropPosition"
      @click="getPldCrop(plantedCrop)"
    >
      <td>{{ plantedCrop.crop.name }}</td>
      <td>{{ plantedCrop.plantedCropPosition.positionX }}</td>
      <td>{{ plantedCrop.plantedCropPosition.positionY }}</td>
      <td>{{ plantedCrop.plantedCropPosition.positionZ }}</td>
      <td>{{ plantedCrop.planted }}</td>
    </tr>
  </table>
  <humidity-chart/>
</template>

<script>
import HumidityChart from "../components/HumidityChart.vue";
export default {
  components: {
    HumidityChart,
  },

  data() {
    return {
      urlPlantedCrops: "http://localhost:8081/plantedCrops",
      plantedCrops: [],
      showGraph: false,
      selectedPldCrop: "",
    };
  },
  mounted() {
    fetch(this.urlPlantedCrops)
      .then((res) => res.json())
      .then((data) => (this.plantedCrops = data))
      .catch((err) => console.log(err.message));
  },
  methods: {
    getPldCrop(crop) {
      this.showGraph = true;
      selectedPldCrop = crop.plantedCropPosition.positionX;
    },
  },
};
</script>

<style>
</style>