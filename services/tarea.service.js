export class TareaService {
  constructor({ $axios }) {
    this.$axios = $axios
  }

  // FindAll() {
  //    return this.$axios.$get('/tarea/all')
  // }  
  findById({ params }) {
    return this.$axios.$get('/tarea/findByproyectoId', {
      params,
    })
  }
  tareaInsert(tarea) {
    return this.$axios.$post('/tarea/save', tarea)
  }
  DelTarea({ params }) {
    return this.$axios.$get('/tarea/delete', {
      params,
    })
  }
  // listEstado({params}) {
  //     return this.$axios.$get('/tarea/listEstado', {
  //       params,
  //     })
  //   }  
}