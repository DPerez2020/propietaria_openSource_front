<template>
    <v-container>
      <v-row>
        <v-col>
          <v-dialog
        v-model="dialog"
        persistent
        width="500"
      >
        <template v-slot:activator="{ props }">
          <v-btn
            color="primary"
            v-bind="props"
            @click="abrirModalCrear()"
          >
            Nuevo
          </v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="text-h5">Nuevo Activo fijo</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col
                  cols="12"
                  sm="12"
                  md="12"
                >
                  <v-text-field
                    label="Descripcion"
                    v-model="tipoActivo.descripcion"
                    required
                  ></v-text-field>
                </v-col>             
                <v-col
                  cols="12"
                  sm="12"
                  md="12"
                >
                  <v-text-field
                    label="Cuenta contable compra"
                    v-model="tipoActivo.cuentaContableCompra"
                    required
                  ></v-text-field>
                </v-col>    
                <v-col
                  cols="12"
                  sm="12"
                  md="12"
                >
                  <v-text-field
                    label="Cuenta contable depreciación"
                    v-model="tipoActivo.cuentaContableDepreciacion"
                    required
                  ></v-text-field>
                </v-col>    
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="blue-darken-1"
              variant="text"
              @click="dialog = false"
            >
              Cancelar
            </v-btn>
            <v-btn
              color="blue-darken-1"
              variant="text"
              @click="accionModal()"
            >
              Guardar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
        </v-col>
      </v-row>
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
        <td>{{ item.descripcion }}</td>
        <td>{{ item.cuentaContableCompra }}</td>
        <td>{{ item.cuentaContableDepreciacion }}</td>
        <td>
          <v-btn
            color="warning"
            dark
            small
            @click="abrirModalEditar(item)"
          >
          <v-icon icon="mdi-lead-pencil"></v-icon>

          </v-btn>        
        </td>
        <td>
          <v-btn
            color="error"
            dark
            small
            @click="borrar(item.id)"
          >
          <v-icon icon="mdi-delete"></v-icon>
          </v-btn>
        </td>      
      </tr>
    </tbody>
    </v-table>
      </v-row>
    </v-container>
  </template>
  
  <script>
  
  import http from '../http-common';
  
  export default {
    name: 'TipoActivoView',
    data() {
      return {
        headers: [
          { text: 'ID' },
          { text: 'Descripción'},
          { text: 'Cuenta contable Compra'},
          { text: 'Cuenta contable Depreciación'},       
          { text: 'Editar'},   
          { text: 'Borrar'}          
        ],
        items: [],
        dialog: false,
        tipoActivo: {
            id: 0,
            descripcion: '',
            cuentaContableCompra: '',
            cuentaContableDepreciacion: ''
        },
        editing: false,
      };
    },
    created() {
      this.getItems();
    },
    methods: {
      getItems() {
        http.get(`/TipoActivo`).then((response) => {
          this.items = response.data.data;
        });
      },
      accionModal(){
        this.editing ? this.editar() : this.crear();
      },
      crear() {      
        http.post(`/TipoActivo`, this.tipoActivo).then((response) => {
          console.log(response.data.message)
          this.getItems();
          this.dialog = false;
        }).catch(error => {
                console.log(error.errors)
        });
      },
      editar() {
        http.put(`/TipoActivo/${this.tipoActivo.id}`, this.tipoActivo).then((response) => {
          this.getItems();
          this.dialog = false;
        });
      },
      abrirModalEditar(item) {
        this.tipoActivo = item;
        this.dialog = true;
        this.editing = true;
      },
      abrirModalCrear() {
        this.editing = false;
        this.tipoActivo= { }
      },
      borrar(id) {
        http.delete(`/TipoActivo/${id}`).then((response) => {
          this.getItems();
        });
      },
    },
  };
  </script>
  