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
          <template v-if="indiceEditando === indice">
            <td><input v-model="editNombre" type="text" /></td>
            <td><input v-model="editApellido" type="text" /></td>
            <td><input v-model="editEmail" type="email" /></td>
            <td>
              <button @click="guardarEdicion(indice)" class="btn btn-success btn-sm">Guardar</button>
              <button @click="cancelarEdicion" class="btn btn-secondary btn-sm">Cancelar</button>
            </td>
          </template>
          <template v-else>
            <td>{{ persona.nombre }}</td>
            <td>{{ persona.apellido }}</td>
            <td>{{ persona.email }}</td>
            <td>
              <button @click="editarPersona(indice)" class="btn btn-primary btn-sm">Editar</button>
              <button @click="borrarPersona(indice)" class="btn btn-danger btn-sm">Borrar</button>
            </td>
          </template>
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

const indiceEditando = ref(null);
const editNombre = ref('');
const editApellido = ref('');
const editEmail = ref('');

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

function editarPersona(indice) {
  indiceEditando.value = indice;
  editNombre.value = personas.value[indice].nombre;
  editApellido.value = personas.value[indice].apellido;
  editEmail.value = personas.value[indice].email;
}

function guardarEdicion(indice) {
  if (!editNombre.value || !editApellido.value || !editEmail.value) {
    mensajeError.value = 'Todos los campos son obligatorios.';
    return;
  }
  personas.value[indice] = {
    nombre: editNombre.value,
    apellido: editApellido.value,
    email: editEmail.value
  };
  indiceEditando.value = null;
  mensajeError.value = '';
  mensajeInfo.value = 'Persona editada correctamente.';
  setTimeout(() => mensajeInfo.value = '', 2000);
}

function cancelarEdicion() {
  indiceEditando.value = null;
  mensajeError.value = '';
}
</script>

<style scoped>
/* Estilos específicos del componente con el modificador "scoped" */
</style>