<template>
  <h2>Plant your crops</h2>
  <div class="crops">
    <h3>Crops</h3>
    <table>
      <tr>
        <td>Crop name</td>
        <td>Info</td>
        <td>Spacing</td>
        <td>Ideal soil humidity</td>
        <td>Seeder name</td>
      </tr>
      <tr v-for="crop in crops" :key="crop.name" @Click="prepareCrop(crop)">
        <td>{{ crop.name }}</td>
        <td>{{ crop.info }}</td>
        <td>{{ crop.spacing }}</td>
        <td>{{ crop.idealSoilHumidity }}</td>
        <td>{{ crop.seeder.name }}</td>
      </tr>
    </table>

    <form @submit="addToPlantedCrops">
      <h3 class="selectedCrop">{{ selectedCrop }}</h3>
      <label>positionX</label>
      <input type="text" v-model="positionX" />
      <label>positionY</label>
      <input type="text" v-model="positionY" />
      <label>positionZ</label>
      <input type="text" v-model="positionZ" />
      <button>Add Crop to Queue</button>
    </form>
  </div>

  <div class="plantedCrops">
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
      >
        <td>{{ plantedCrop.crop.name }}</td>
        <td>{{ plantedCrop.plantedCropPosition.positionX }}</td>
        <td>{{ plantedCrop.plantedCropPosition.positionY }}</td>
        <td>{{ plantedCrop.plantedCropPosition.positionZ }}</td>
        <td>{{ plantedCrop.planted }}</td>
      </tr>
    </table>
      <button @click="plantUnplantedCrops">Plant crops in queue crops</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      urlCrops: "http://localhost:8081/crops",
      urlPlantedCrops: "http://localhost:8081/plantedCrops",
      crops: [],
      plantedCrops: [],
      positionX: "",
      positionY: "",
      positionZ: "",
      selectedCrop: "",
    };
  },
  mounted() {
    fetch(this.urlCrops)
      .then((res) => res.json())
      .then((data) => (this.crops = data))
      .catch((err) => console.log(err.message));

    fetch(this.urlPlantedCrops)
      .then((res) => res.json())
      .then((data) => (this.plantedCrops = data))
      .catch((err) => console.log(err.message));
  },
  methods: {
    addToPlantedCrops(crop) {
      const options = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        body: JSON.stringify({
          crop: {
            name: this.selectedCrop,
          },
          plantedCropPosition: {
            positionX: this.positionX,
            positionY: this.positionY,
            positionZ: this.positionZ,
          },
        }),
      };
      fetch(this.urlPlantedCrops, options).then((response) => {
        console.log(response);
      });
    },
    plantUnplantedCrops() {
      fetch('http://localhost:8081/espPlant')
        .then((res) => res.json())
        .then((data) => (this.plantedCrops = data))
        .catch((err) => console.log(err.message));
    },
    prepareCrop(crop) {
      console.log(crop);
      this.selectedCrop = crop.name;
    },
  },
};
</script>

<style>
.selectedCrop {
  color: green;
  font-size: 5em;
}
</style>