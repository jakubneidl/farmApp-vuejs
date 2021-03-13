import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Crops from '../views/Crops.vue'
import Seeder from '../views/Seeder.vue'
import PlantedCrops from '../views/PlantedCrops.vue'
import Overview from '../views/Overview.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/crops',
    name: 'Crops',
    component: Crops
  },
  {
    path: '/seeder',
    name: 'Seeder',
    component: Seeder
  },
  {
    path: '/plantedCrops',
    name: 'PlantedCrops',
    component: PlantedCrops
  },
  {
    path: '/overview',
    name: 'Overview',
    component: Overview
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
