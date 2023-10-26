export class TareaService {
    constructor({ $axios }) {
        this.$axios = $axios
    }

    // FindAll() {
    //    return this.$axios.$get('/tarea/all')
    // }  
    findById({params}) {
        return this.$axios.$get('/tarea/findByproyectoId', {
          params,
        })
      }
      
    // listEstado({params}) {
    //     return this.$axios.$get('/tarea/listEstado', {
    //       params,
    //     })
    //   }  
}