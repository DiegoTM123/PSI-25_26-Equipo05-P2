// Importa la funcion createApp de la biblioteca Vue
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')

// Las dos lineas siguientes haran que Bootstrap este disponible para tu
// aplicacion si Bootstrap ha sido instalado.
// Las instrucciones de instalacion estan disponibles mas adelante en esta guia.
// Importa el archivo JavaScript de Bootstrap desde node_modules
import "../node_modules/bootstrap/dist/js/bootstrap.js"
// Importa el archivo CSS de Bootstrap desde node_modules
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
