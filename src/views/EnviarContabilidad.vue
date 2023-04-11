<template>
    <v-container>
      <v-row>
        <v-table>
    <thead>
      <tr>
        <th v-for="header in headers" :key="header.text">
          {{ header.text }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in items" :key="item.id">
        <td>{{ item.id }}</td>
        <td>Depreciación {{ item.descripcionActivosFijos }}</td>
        <td>{{ item.fechaProceso }}</td>
        <td>{{ item.montoDepreciado }}</td>
        <td>{{ item.AsientoContableId }}</td> 
      </tr>
    </tbody>
    </v-table>
      </v-row>
      <v-row>
        <v-btn color="primary" @click="accionModal">Enviar a Contabilidad</v-btn>
      </v-row>
    </v-container>
  </template>

<script>
import http from '../http-common';

export default {
  name: 'EnviarContabilidadView',
  data() {
    return {
      headers: [
        { text: 'ID', value: 'id' },
        { text: 'Descripción', value: 'descripcion' },
        { text: 'Fecha Transacción', value: 'fechaProceso' },
        { text: 'Monto', value: 'Monto' },
        { text: 'Id Asiento', value: 'IdAsientoContable' },
      ],
      items: []
    };
  },
  created() {
    this.getItems();
  },
  methods: {
    getItems() {
      http.get(`/CalculoDepreciacion`).then((response) => {
        this.items = response.data.data
      });
    },
    accionModal(){
      console.log('accionModal');
      const ids = this.items.map(item => item.id);
      http.post(`/CalculoDepreciacion/Contabilizar`,{ids}).then((response) => {
        console.log(response);
      });
    },
  },
};
</script>
