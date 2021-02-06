import { Request, Response } from 'express';
import { ProdutoService } from '../services/ProdutosService';

export class ProdutoController {
    constructor(
        private produtoService: ProdutoService
    ) { }

    public async get(req: Request, res: Response): Promise<Response> {
        var produtos = await this.produtoService.obterTodos();
        return res.json(produtos);
    }

    public async post(req: Request, res: Response): Promise<Response> {
        console.log('req body', req.body)
        const result = await this.produtoService.salvar(req.body);
        return res.json(result);
    }

    public async put(req: Request, res: Response): Promise<Response> {
        console.log('req body', req.body)
        const result = await this.produtoService.atualizar(req.body);
        return res.json(result);
    }

    public async delete(req: Request, res: Response): Promise<Response> {
        const result = await this.produtoService.deletar(req.body.Id);
        return res.json(result);
    }
}