<template>
    <v-container>
      <v-row>
        <v-col>
          <v-dialog
        v-model="dialog"
        persistent
        width="1024"
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
                  cols="4"
                  sm="4"
                  md="4"
                >
                  <v-text-field
                    label="Descripcion"
                    v-model="activoFijo.descripcion"
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
                    v-model="activoFijo.cuentaContableCompra"
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
                    v-model="activoFijo.cuentaContableDepreciacion"
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
            color="primary"
            dark
            small
            @click="abrirModalEditar(item)"
          >
            Editar
          </v-btn>        
        </td>
        <td>
          <v-btn
            color="error"
            dark
            small
            @click="borrar(item.id)"
          >
            Borrar
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
    name: 'ActivoFijoView',
    data() {
      return {
        headers: [
          { text: 'ID' },
          { text: 'Descripción'},
          { text: 'Departamento'},
          { text: 'Tipo activo'},
          { text: 'Fecha de registro'},
          { text: 'Valor compra'},
          { text: 'Año depreciación'},
          { text: 'Valor depreciación'},
          { text: 'Depreciación acumulada'}
        ],
        items: [],
        dialog: false,
        activoFijo: {
            id: 0,
            descripcion: '',   
            departamentoId:'',
            tipoActivoId:'',
            fechaRegistro:'',
            valorCompra:'',
            añoDepreciacion:'',
            valorDepreciacion:'',
            depreciacionAcumulada:''
        },
        editing: false,
        departamentos: [],
        tiposActivos: []
      };
    },
    created() {
      this.getItems();
    },
    methods: {
      getItems() {
        http.get(`/ActivoFijo`).then((response) => {
          this.items = response.data;
        });
      },
      accionModal(){
        this.editing ? this.editar() : this.crear();
      },
      crear() {      
        http.post(`/ActivoFijo`, this.activoFijo).then((response) => {
          this.getItems();
          this.dialog = false;
        });
      },
      editar() {
        http.put(`/ActivoFijo/${this.activoFijo.id}`, this.activoFijo).then((response) => {
          this.getItems();
          this.dialog = false;
        });
      },
      abrirModalEditar(item) {
        this.activoFijo = item;
        this.dialog = true;
        this.editing = true;
      },
      abrirModalCrear() {
        this.editing = false;
        this.activoFijo= { id: 0, descripcion: '' }
      },
      borrar(id) {
        http.delete(`/ActivoFijo/${id}`).then((response) => {
          this.getItems();
        });
      },
      obtenerDepartamentos(){
        http.get(`/Departamento`).then((response) => {
          this.departamentos = response.data;
        });
      },
      obtenerTipoActivo(){
        http.get(`/TipoActivo`).then((response) => {
          this.tiposActivos = response.data;
        });
      },
    },
  };
  </script>
  