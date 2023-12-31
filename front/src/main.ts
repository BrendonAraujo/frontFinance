/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue'
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
// Composables
import { createApp } from 'vue'
import Hotjar from 'vue-hotjar'
import { vMaska } from "maska"

// Plugins
import { registerPlugins } from '@/plugins'

import router from '@/router/index'
const route  = router;
const app = createApp(App)

// const cors = require('cors');
// const corsOptions = {
//     origin: '*',
//     credentials: true,
//     optionSuccessStatus: 200
//   }
//   app.use(cors(corsOptions))

app.use (Hotjar, {
  id: '3694780' // Hotjar Site ID
})

app.component('VueDatePicker', VueDatePicker);
app.directive("maska", vMaska);

registerPlugins(app)

app.mount('#app')

