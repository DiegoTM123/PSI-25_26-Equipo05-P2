<template>
  <!-- Contenedor principal del componente -->
  <div id="tabla-personas">
    <!-- Formulario para añadir personas -->
    <form @submit.prevent="agregarPersona" class="mb-3">
      <input v-model="nuevoNombre" type="text" placeholder="Nombre" required />
      <input v-model="nuevoApellido" type="text" placeholder="Apellido" required />
      <input v-model="nuevoEmail" type="email" placeholder="Email" required />
      <button type="submit">Agregar persona</button>
    </form>
    <!-- Mensajes informativos -->
    <div v-if="mensajeError" class="alert alert-danger">
      {{ mensajeError }}
    </div>
    <div v-if="mensajeInfo" class="alert alert-success">
      {{ mensajeInfo }}
    </div>
    <!-- Tabla para mostrar información de personas -->
    <table class="table">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>Email</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(persona, indice) in personas" :key="persona.email">
          <td>{{ persona.nombre }}</td>
          <td>{{ persona.apellido }}</td>
          <td>{{ persona.email }}</td>
          <td>
            <button @click="borrarPersona(indice)" class="btn btn-danger btn-sm">Borrar</button>
          </td>
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

const nuevoNombre = ref('');
const nuevoApellido = ref('');
const nuevoEmail = ref('');
const mensajeError = ref('');
const mensajeInfo = ref('');

defineOptions({
  name: 'tabla-personas',
});

function agregarPersona() {
  if (!nuevoNombre.value || !nuevoApellido.value || !nuevoEmail.value) {
    mensajeError.value = 'Todos los campos son obligatorios.';
    return;
  }
  personas.value.push({
    nombre: nuevoNombre.value,
    apellido: nuevoApellido.value,
    email: nuevoEmail.value
  });
  nuevoNombre.value = '';
  nuevoApellido.value = '';
  nuevoEmail.value = '';
  mensajeError.value = '';
}

function borrarPersona(indice) {
  personas.value.splice(indice, 1);
  mensajeInfo.value = 'Persona eliminada correctamente.';
  setTimeout(() => mensajeInfo.value = '', 2000);
}
</script>

<style scoped>
/* Estilos específicos del componente con el modificador "scoped" */
</style>