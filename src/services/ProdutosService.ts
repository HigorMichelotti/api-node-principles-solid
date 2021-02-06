import { Produto } from "../models/produto.model";
import { Result } from "../models/Result";
import { IProdutoRepository } from "../repository/IProdutoRepository";
import { IProdutoService } from "./IProdutoService";

export class ProdutoService implements IProdutoService {

    constructor(
        private produtoRepository: IProdutoRepository
    ) { }

    public async obterTodos(): Promise<Produto[]> {
        return await this.produtoRepository.obterTodos();
    }

    public async salvar(produto: Produto): Promise<Result> {
        return await this.produtoRepository.salvar(produto);
    }

    public async atualizar(produto: Produto): Promise<Result> {
        return await this.produtoRepository.atualizar(produto);
    }

    public async deletar(id: number): Promise<Result> {
        return await this.produtoRepository.deletar(id);
    }
}