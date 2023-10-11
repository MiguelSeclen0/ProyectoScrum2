export class ProyectoService {
    constructor({ $axios }) {
        this.$axios = $axios
    }
    
    FindAll() {
        return this.$axios.$get('/proyecto/all')
    }
}