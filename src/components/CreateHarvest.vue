<template>
  <div>
    <form @submit.prevent="pushData">
      <label>name</label>
      <input v-model="name" />
      <label>info</label>
      <input v-model="info" />
      <button>Add harvest season</button>
    </form>
  </div>
</template>

<script>
var urlHarvest ='http://localhost:8081/harvests'
export default {
  data() {
    return {
      name: null,
      info: null,
    };
  },
  methods: {
    pushData() {
      if (this.name != null) {
        const options = {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json;charset=UTF-8",
          },
          body: JSON.stringify({
            name: this.name,
            info: this.info,
          }),
        };
        fetch(urlHarvest, options).then((response) => {
          console.log(response);
        });
      }
    },
  },
};
</script>

<style>
</style>