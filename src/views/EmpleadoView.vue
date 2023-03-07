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
            <span class="text-h5">Nuevo empleado</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col
                  cols="6"
                  sm="6"
                  md="6"
                >
                  <v-text-field
                    label="Nombre"
                    v-model="empleado.nombre"
                    required
                  ></v-text-field>
                </v-col> 
                <v-col
                  cols="6"
                  sm="6"
                  md="6"
                >
                  <v-text-field
                    label="Apellido"
                    v-model="empleado.apellido"
                    required
                  ></v-text-field>
                </v-col>                           
              </v-row>
              <v-row>
                <v-col
                  cols="6"
                  sm="6"
                  md="6"
                >
                  <v-text-field
                    label="Cedula"
                    v-model="empleado.cedula"
                    required
                  ></v-text-field>
                </v-col> 
                <v-col
                  cols="6"
                  sm="6"
                  md="6"
                >
                <v-select
                    :items="departamentos"
                    label="Departamento"
                    item-value="id"
                    item-title="descripcion"
                    v-model="empleado.departamentoId"
                    required
                  ></v-select>
                </v-col>              
              </v-row>
              <v-row>
                <v-col
                  cols="6"
                  sm="6"
                  md="6"
                >
                <v-select
                    :items="tipoPersonas"
                    label="Tipo de persona"
                    item-value="value"
                    item-title="title"
                    v-model="empleado.tipoPersona"
                    required
                  ></v-select>
                </v-col> 
                <v-col
                  cols="6"
                  sm="6"
                  md="6"
                >
                  <v-text-field
                    label="Fecha de ingreso"
                    model-value="empleado.fechaIngreso"
                    type="date"
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
        <td>{{ item.nombre }}</td>
        <td>{{ item.apellido }}</td>
        <td>{{ item.cedula }}</td>
        <td>{{ item.departamentoDescripcion }}</td>
        <td>
          <v-chip
            v-if="item.tipoPersona == 0"
            color="green"
            text-color="white"
          >
            Fisica
          </v-chip>
          <v-chip
            v-else
            color="red"
            text-color="white"
          >
            Juridica
          </v-chip>
        </td>      
        <td>{{ item.fechaIngreso }}</td>
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
  import moment from "moment"
  
  export default {
    name: 'EmpleadoView',
    data() {
      return {
        headers: [
          { text: 'ID' },          
          { text: 'Nombre'},
          { text: 'Apellido' },
          { text: 'Cedula' },
          { text: 'Departamento' },
          { text: 'Tipo de persona' },
          { text: 'Fecha de ingreso' }      
        ],
        items: [],
        dialog: false,
        empleado: {
          id: 0,          
          nombre:'',
          apellido:'',
          cedula:'',
          departamentoId:'',
          tipoPersona:'',          
          fechaIngreso:'',
        },
        editing: false,
        departamentos: [],
        tipoPersonas: [
          {value:0, title:'Fisica'},
          {value:1, title:'Juridica'}
        ]
      };
    },
    created() {
      this.getItems();
      this.obtenerDepartamentos();
    },
    methods: {
      getItems() {
        http.get(`/Empleado`).then((response) => {
          this.items = response.data;
        });
      },
      accionModal(){
        this.editing ? this.editar() : this.crear();
      },
      crear() {      
        http.post(`/Empleado`, this.empleado).then((response) => {
          this.getItems();
          this.dialog = false;
        });
      },
      editar() {
        http.put(`/Empleado/${this.empleado.id}`, this.empleado).then((response) => {
          this.getItems();
          this.dialog = false;
        });
      },
      abrirModalEditar(item) {
        this.empleado = item;        
        this.empleado.fechaIngreso = moment(item.fechaIngreso).format('YYYY-MM-DD');
        this.dialog = true;
        this.editing = true;
      },
      abrirModalCrear() {
        this.editing = false;
        this.empleado = { id: 0, descripcion: '' }
      },
      borrar(id) {
        http.delete(`/Empleado/${id}`).then((response) => {
          this.getItems();
        });
      },
      obtenerDepartamentos(){
        http.get(`/Departamento`).then((response) => {
          this.departamentos = response.data;
        });
      },
    },
  };
  </script>
  