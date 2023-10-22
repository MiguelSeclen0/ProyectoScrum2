export class TipoService {
    constructor({ $axios }) {
        this.$axios = $axios
    }

    FindAll() {
        return this.$axios.$get('/tipo/all')
    }  
}