import { ClienteService } from '@/services/cliente.service'
import { UsuarioService } from '@/services/usuario.service'
import { ProyectoService } from '@/services/proyecto.service'
import { TipoService } from '@/services/tipo.service'
import { EquipoService } from '@/services/equipo.service'
import { TareaService } from '@/services/tarea.service'
import { EstadoService } from '@/services/estado.service'
import { MiembroService } from '@/services/miembro.service'
import { RolService } from '@/services/rol.service'

export default function (ctx,inject){
    if(!ctx.$axios){
        throw new Error('Error axios')
    }

    inject('cliente',new ClienteService(ctx))
    inject('usuario',new UsuarioService(ctx))
    inject('proyecto',new ProyectoService(ctx))
    inject('tipo',new TipoService(ctx))
    inject('equipo',new EquipoService(ctx))
    inject('tarea',new TareaService(ctx))
    inject('estado',new EstadoService(ctx))
    inject('miembro',new MiembroService(ctx))
    inject('rol',new RolService(ctx))
}
