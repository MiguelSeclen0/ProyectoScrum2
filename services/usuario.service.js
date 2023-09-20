export class UsuarioService {
    constructor({ $axios }) {
        this.$axios = $axios
    }
    
    FindAll() {
        return this.$axios.$get('/usuario/all')
    }
}