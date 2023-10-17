export class ProyectoService {
    constructor({ $axios }) {
        this.$axios = $axios
    }

    FindAll() {
        return this.$axios.$get('/proyecto/all')
    }

    findAllById(filters) {
        return this.$axios.$get('/proyecto/findById', {
          params: filters,
        })
      }
}