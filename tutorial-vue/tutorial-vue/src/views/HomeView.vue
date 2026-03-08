<template>
  <div id="app" class="container">
    <div class="row">
      <div class="col-md-12">
        <h1>Personas</h1>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <formulario-persona @add-persona="agregarPersona" />
        <tabla-personas 
          v-if="!isLoading"
          :personas="personas" 
          @delete-persona="eliminarPersona"
          @actualizar-persona="actualizarPersona"
        />
      </div>
    </div>
    <div>
      <p>Count is {{ store.count }}</p>
    </div>
  </div>
</template>

<script setup>
import TablaPersonas from '@/components/TablaPersonas.vue'
import FormularioPersona from '@/components/FormularioPersona.vue'
import { ref, onMounted } from 'vue';
import { useCounterStore } from '@/stores/counter';

const personas = ref([]);
const isLoading = ref(true);
const store = useCounterStore();
const djangoUrl = import.meta.env.VITE_DJANGOURL;
let fetchInProgress = false;

const listadoPersonas = async () => {
  if (fetchInProgress) {
    return;
  }
  fetchInProgress = true;
  isLoading.value = true;
  try {
    const response = await fetch(`${djangoUrl}/api/v1/personas/`);
    const data = await response.json();
    personas.value = data;
  } catch (error) {
    console.error(error);
    fetchInProgress = false;
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  listadoPersonas();
});

const agregarPersona = async (persona) => {
  try {
    const response = await fetch(`${djangoUrl}/api/v1/personas/`, {
      method: 'POST',
      body: JSON.stringify(persona),
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
    });
    const personaCreada = await response.json();
    personas.value = [...personas.value, personaCreada];
    store.increment();
  } catch (error) {
    console.error(error);
  }
};

const eliminarPersona = async (persona_id) => {
  try {
    await fetch(`${djangoUrl}/api/v1/personas/${persona_id}/`, {
      method: "DELETE"
    });
    personas.value = personas.value.filter(u => u.id !== persona_id);
  } catch (error) {
    console.error(error);
  }
};

const actualizarPersona = async (id, personaActualizada) => {
  try {
    const response = await fetch(`${djangoUrl}/api/v1/personas/${personaActualizada.id}/`, {
      method: 'PUT',
      body: JSON.stringify(personaActualizada),
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
    });
    const personaActualizadaJS = await response.json();
    personas.value = personas.value.map(u => (u.id === personaActualizada.id ? personaActualizadaJS : u));
  } catch (error) {
    console.error(error);
  }
};
</script>
