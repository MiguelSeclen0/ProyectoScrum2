import { ClienteService } from '@/services/cliente.service'
import { UsuarioService } from '@/services/usuario.service'

export default function (ctx,inject){
    if(!ctx.$axios){
        throw new Error('Error axios')
    }

    inject('cliente',new ClienteService(ctx))
    inject('usuario',new UsuarioService(ctx))
}