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
      <v-form ref="form">
        <v-card>
          <v-card-title>
            <span class="text-h5">Nuevo departamento</span>
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
                    v-model="departamento.descripcion"
                    :rules="descripcionRules"
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
      <!-- <td>
        <v-chip
          :color="item.estado ? 'green' : 'red'"
          dark
        >
          {{ item.estado ? 'Activo' : 'Inactivo' }}
        </v-chip>
      </td>   -->
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
          @click="borrarDepartamento(item.id)"
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
  name: 'DepartamentoView',
  data() {
    return {
      headers: [
        { text: 'ID', value: 'id' },
        { text: 'Descripción', value: 'descripcion' },
        { text: 'Editar', value: 'editar' },
        { text: 'Borrar', value: 'Borrar' },
      ],
      items: [],
      dialog: false,
      departamento: {
        id: 0,
        descripcion: ''
      },
      descripcionRules:[
        v => !! v || 'La descripción es requerida',
        v => v.length > 2 && v.length < 30 || 'La descripción debe tener mas de 2 carácteres y menos de 30.'
      ],
      editing: false,
    };
  },
  created() {
    this.getItems();
  },
  methods: {
    getItems() {
      http.get(`/Departamento`).then((response) => {
        this.items = response.data.data});
    },
    accionModal(){
      if (this.$refs.form.validate()) {
        this.editing ? this.editarDepartamento() : this.crearDepartamento();
      }

    },
    crearDepartamento() {      
      http.post(`/Departamento`, this.departamento).then((response) => {
        this.getItems();
        this.dialog = false;
      }).catch(data => {
            console.log(data)
        });
    },
    editarDepartamento() {
      http.put(`/Departamento/${this.departamento.id}`, this.departamento).then((response) => {
        this.getItems();
        this.dialog = false;
      });
    },
    abrirModalEditar(item) {
      this.departamento = Object.assign({}, item);
      this.dialog = true;
      this.editing = true;
    },
    abrirModalCrear() {
      this.editing = false;
      this.departamento = { id: 0, descripcion: '' }
    },
    borrarDepartamento(id) {
      http.delete(`/Departamento/${id}`).then((response) => {
        this.getItems();
      });
    },
  },
};
</script>
