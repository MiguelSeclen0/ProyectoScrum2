export class RolService {
    constructor({ $axios }) {
        this.$axios = $axios
    }

    FindAll() {
        return this.$axios.$get('/rol/all')
    }  
}