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
        <v-form ref="form">
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
                      :rules="NombreRules"
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
                      :rules="ApellidoRules"
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
                      :rules="CedulaRules"
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
                      v-model="empleado.fechaIngreso"
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
        </v-form>
      </v-dialog>
        </v-col>
      </v-row>
      <v-row>
  <v-table hover="true">
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
            v-if="item.tipoPersona == 'Fisica'"
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
  import moment from "moment"
  
  import {valida_cedula} from '../utils/helpers.js';
  
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
          { text: 'Fecha de ingreso' },  
          { text: 'Editar' },     
          { text: 'Borrar' }      
        ],
        items: [],
        dialog: false,
        empleado: {
          id: 0,          
          nombre:'',
          apellido:'',
          cedula:'',
          departamentoId:'',
          tipoPersona:0,          
          fechaIngreso:'',
        },
        NombreRules:[
          v => !! v || 'El nombre es requerido.',
          v => v.length > 2 && v.length < 30  || 'El nombre debe tener mas de 2 carácteres y menos de 30.' 
        ],
        ApellidoRules:[
          v => !! v || 'El apellido es requerido.',
          v => v.length > 2 && v.length < 30  || 'El apellido debe tener mas de 2 carácteres y menos de 30.' 
        ],
        CedulaRules:[
          v => !! v || 'La cédula es requerida.',
          v => valida_cedula(v) ? true : 'La cédula ingresada no es valida.'
        ],
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
          this.items = response.data.data;
          // this.items.forEach(empleado => {
          //   empleado.fechaIngreso = this.formatearFecha(empleado.fechaIngreso)
          // });
        });
      },
      accionModal(){
        if (this.$refs.form.validate()) {
          this.editing ? this.editar() : this.crear();
        }
      },
      crear() {   
        if (!valida_cedula(this.empleado.cedula)) {
          return;
        }
        
        http.post(`/Empleado`, this.empleado).then((response) => {
          this.getItems();
          this.dialog = false;
        });
      },
      editar() {
        if(this.empleado.tipoPersona == 'Fisica') this.empleado.tipoPersona = 0;
        http.put(`/Empleado/${this.empleado.id}`, this.empleado).then((response) => {
          this.getItems();
          this.dialog = false;
        }).catch(err => {
          console.log(err.message);
        });
      },
      abrirModalEditar(item) {
        this.empleado = Object.assign({}, item);        
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
          this.departamentos = response.data.data;
        });
      },
      formatearFecha(fecha){
        fecha = fecha.substring(0,9).split("-").reverse().join("-");
        return fecha;
      }
    },
  };
  </script>
  