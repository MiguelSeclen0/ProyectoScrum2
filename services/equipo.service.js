export class EquipoService {
    constructor({ $axios }) {
        this.$axios = $axios
    }

    FindAll() {
        return this.$axios.$get('/equipo/all')
    }  
}