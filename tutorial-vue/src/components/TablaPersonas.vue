<!-- src/components/TablaPersonas.vue -->
<template>
<!-- Contenedor principal del componente -->
<div id="tabla-personas">
<!-- Tabla para mostrar informacion de personas -->
<table class="table">
<!-- Encabezado de la tabla -->
<thead>
<tr>
<!-- Columnas del encabezado -->
<th>Nombre</th>
<th>Apellido</th>
<th>Email</th>
</tr>
</thead>
<!-- Cuerpo de la tabla -->
<tbody>
  <tr v-for="persona in personas" :key="persona.id">
    <td>{{ persona.nombre }}</td>
    <td>{{ persona.apellido }}</td>
    <td>{{ persona.email }}</td>
  </tr>
</tbody>
</table>
</div>
</template>
<script setup>
// Definicion del componente Vue
defineOptions({
// Nombre del componente
name: 'tabla-personas',
});
const props = defineProps({
personas: {type: Array, default: () => []},
});

</script>
<style scoped>
/* Estilos especificos del componente con el modificador "scoped" */
</style>