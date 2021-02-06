import {request, response, Router} from 'express'
import { produtoController } from './infra/dependencyInjection';

const routes = Router();

routes.get('/produtos', (req, resp) => {
    return produtoController.get(req, resp)
})

routes.post('/produtos', (req, resp) =>{
    return produtoController.post(req, resp)
})

routes.put('/produtos', (req, resp) =>{
    return produtoController.put(req, resp)
})

routes.delete('/produtos', (req, resp) =>{
    return produtoController.put(req, resp)
})

export default routes