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
                >
                <v-select
                    :items="departamentos"
                    label="Departamento"
                    item-value="id"
                    item-title="descripcion"
                    v-model="activoFijo.departamentoId"
                    required
                  ></v-select>
                </v-col>    
                <v-col
                >
                <v-select
                    :items="tiposActivos"
                    label="Tipo de activo"
                    item-value="id"
                    item-title="descripcion"
                    v-model="activoFijo.tipoActivoId"
                    required
                  ></v-select>
                </v-col>                    
              </v-row>
              <v-row>
                <v-col>
                  <v-text-field
                    label="Valor de la compra"
                    v-model="activoFijo.valorCompra"
                    required
                  ></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field
                    label="Año depreciacion"
                    v-model="activoFijo.añoDepreciacion"
                    required
                  ></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field
                    label="Valor depreciacion"
                    v-model="activoFijo.valorDepreciacion"
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
        <td>{{ item.descripcionDepartamento }}</td>
        <td>{{ item.descripcionTipoActivo }}</td>
        <td>{{ item.fechaRegistro }}</td>
        <td>{{ item.valorCompra }}</td>
        <td>{{ item.anioDepreciacion }}</td>
        <td>{{ item.valorDepreciacion }}</td>
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
            color="deep-purple"
            dark
            small
            @click="calcularDepreciacion(item)"
          >
          
          <v-icon icon="mdi-calculator"></v-icon>
          </v-btn>
        </td>  
        <td>
          <v-btn
            color="blue"
            dark
            small
            :to="`/Depreciacion/${item.id}`"
          >
          <v-icon icon="mdi-eye"></v-icon>
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
          { text: 'Editar'},
          { text: 'Calcular depreciacion'},
          { text: 'Depreciaciones'}
        ],
        items: [],
        dialog: false,
        activoFijo: {
            id: 0,
            descripcion: '',   
            departamentoId:'',
            descripcionDepartamento: '',
            tipoActivoId:'',
            descripcionTipoActivo: '',
            fechaRegistro: '',
            valorCompra:'',
            anioDepreciacion:'',
            valorDepreciacion:''
        },
        editing: false,
        departamentos: [],
        tiposActivos: []
      };
    },
    created() {
      this.getItems();
      this.obtenerDepartamentos();
      this.obtenerTipoActivo();
    },
    methods: {
      calcularDepreciacion(item){
        http.post(`/CalculoDepreciacion`,{ActivoFijoId:item.id}).then((response) => {
          this.items = response.data.data;
        });
      },
      getItems() {
        http.get(`/ActivoFijo`).then((response) => {
          this.items = response.data.data;
          this.items.forEach(activoFijo => {
            activoFijo.fechaRegistro = this.formatearFecha(activoFijo.fechaRegistro);
          });    
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
          this.departamentos = response.data.data;
        });
      },
      obtenerTipoActivo(){
        http.get(`/TipoActivo`).then((response) => {
          this.tiposActivos = response.data.data;
        });
      },
      formatearFecha(fecha){
        fecha = fecha.substring(0,9).split("-").reverse().join("-");
        // año = fecha.split("-");
        return fecha;
      }
    },
  };
  </script>
  