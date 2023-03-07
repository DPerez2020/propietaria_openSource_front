<template>
    <v-container>

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
        <td>{{ item.fechaProceso }}</td>
        <td>{{ item.montoDepreciado }}</td>    
      </tr>
    </tbody>
    </v-table>
    </v-container>
  </template>
  
  <script>
  
  import http from '../http-common';
  
  export default {
    name: 'DepreciacionView',
    data() {
      return {
        headers: [
          { text: 'ID', value: 'id'},
          {text: "Fecha de proceso", value: "fechaProceso"},
          {text: "Monto depreciado", value: "montoDepreciado"}
        ],
        items: []
      };
    },
    created() {
      this.getItems();
    },
    methods: {
      getItems() {
        const activoFijoId= this.$route.params.activoId;
        http.get(`/CalculoDepreciacion/Get-by-activo`,{params:{activoFijoId}}).then((response) => {
          this.items = response.data;
        });
      }
    },
  };
  </script>
  