<template>
  <!-- Contenedor principal del componente -->
  <div id="tabla-personas">
    <form @submit.prevent="agregarPersona" class="mb-3">
        <input v-model="nuevoNombre" type="text" placeholder="Nombre" required />
        <input v-model="nuevoApellido" type="text" placeholder="Apellido" required />
        <input v-model="nuevoEmail" type="email" placeholder="Email" required />
        <button type="submit">Agregar persona</button>
    </form>
    <!-- Tabla para mostrar información de personas -->
    <table class="table">
      <!-- Encabezado de la tabla -->
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>Email</th>
        </tr>
      </thead>
      <!-- Cuerpo de la tabla -->
      <tbody>
        <tr v-for="persona in personas" :key="persona.email">
            <td>{{ persona.nombre }}</td>
            <td>{{ persona.apellido }}</td>
            <td>{{ persona.email }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const personas = ref([
  { nombre: 'Jon', apellido: 'Nieve', email: 'jon@email.com' },
  { nombre: 'Tyrion', apellido: 'Lannister', email: 'tyrion@email.com' },
  { nombre: 'Daenerys', apellido: 'Targaryen', email: 'daenerys@email.com' }
])

defineOptions({
  name: 'tabla-personas',
});

const nuevoNombre = ref('');
const nuevoApellido = ref('');
const nuevoEmail = ref('');

function agregarPersona() {
  personas.value.push({
    nombre: nuevoNombre.value,
    apellido: nuevoApellido.value,
    email: nuevoEmail.value
  });
  // Limpiar los campos
  nuevoNombre.value = '';
  nuevoApellido.value = '';
  nuevoEmail.value = '';
}

</script>

<style scoped>
/* Estilos específicos del componente con el modificador "scoped" */
</style>