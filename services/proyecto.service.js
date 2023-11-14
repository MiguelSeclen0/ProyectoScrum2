export class ProyectoService {
  constructor({ $axios }) {
    this.$axios = $axios
  }

  FindAll() {
      return this.$axios.$get('/proyecto/all')
  }

  findById({ params }) {
    return this.$axios.$get('/proyecto/findById', {
      params,
    })
  }

  deletedById({ params }) {
    console.log('params.serv.js', params)
    return this.$axios.$get('/proyecto/delete', {
      params,
    })
  }


  proyectoInsert(proyecto) {
    return this.$axios.$post('/proyecto/save', proyecto)
  }
}