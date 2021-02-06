import { Produto } from "../models/produto.model";
import { Result } from "../models/Result";

export interface IProdutoRepository {
    obterTodos(): Promise<Produto[]>
    salvar(produto: Produto): Promise<Result>
    atualizar(produto: Produto): Promise<Result>
    deletar(id: number): Promise<Result>
}