export class ClienteService {
    constructor({ $axios }) {
        this.$axios = $axios
    }
    
    FindAll() {
        debugger
        return this.$axios.$get('/cliente/all')
    }
}