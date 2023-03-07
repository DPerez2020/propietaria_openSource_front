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
        >
          Nuevo
        </v-btn>
      </template>
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
                  required
                ></v-text-field>
              </v-col>             
            </v-row>
            <v-row>
              <v-col
                cols="12"
                sm="12"
              >
                <v-select
                  :items="['Acivo', 'Inactivo']"
                  label="Estado"
                  required
                ></v-select>
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
            @click="dialog = false"
          >
            Guardar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
      </v-col>
    </v-row>
    <v-row>
      <v-table
  >
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
      <td>
        <v-chip
          :color="item.estado ? 'green' : 'red'"
          dark
        >
          {{ item.estado ? 'Activo' : 'Inactivo' }}
        </v-chip>
      </td>  
      <td>
        <v-btn
          color="primary"
          dark
          small
        >
          Editar
        </v-btn>        
      </td>
    </tr>
  </tbody>
  </v-table>
    </v-row>
  </v-container>
</template>

<script>

export default {
  name: 'DepartamentoView',
  data() {
    return {
      headers: [
        { text: 'ID', value: 'id' },
        { text: 'Descripción', value: 'descripcion' },
        { text: 'Estado', value: 'estado' },
      ],
      items: [
        { id: 1, descripcion: 'Producto A', estado: true },
        { id: 2, descripcion: 'Producto B', estado: false },
        { id: 3, descripcion: 'Producto C', estado: true },
      ],
      dialog: false
    };
  },
  created() {
    this.$axios.get(`https://localhost:7047/api/Departamento`).then((response) => {
      console.log(response);
    });
  },
};
</script>
