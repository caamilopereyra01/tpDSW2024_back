import { Router, request , response } from 'express';

import { contTP } from './tipovolquete.controler.js';

 const tipovolqueteRouter : Router = Router();

tipovolqueteRouter.get('/', contTP.findAll)
tipovolqueteRouter.get('/:id_tipo_volquete', contTP.findOne)
tipovolqueteRouter.post('/', contTP.add)
tipovolqueteRouter.put('/:id_tipo_volquete',contTP.update)
tipovolqueteRouter.delete('/:id_tipo_volquete', contTP.remove)

export {tipovolqueteRouter}