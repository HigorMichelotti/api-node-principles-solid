import { DbContext } from "../infra/dbContext";
import { IDbContext } from "../infra/IDbContext";
import { Produto } from "../models/produto.model";
import { Result } from "../models/Result";
import { IProdutoRepository } from "./IProdutoRepository";

export class ProdutoRepository implements IProdutoRepository {

    public readonly result: Result;

    constructor(
        private dbContext: IDbContext
    ) {
        this.result = new Result;
    }

    public async obterTodos(): Promise<Produto[]> {
        await this.dbContext.openConexao();

        var produtos = new Array<Produto>();

        const resultRequest = await this.dbContext.request()
            .query("select * from produtos")

        resultRequest.recordset.forEach((produto: Produto) => {
            produtos.push(Produto.fromJson(produto))
        });

        this.dbContext.dispose();

        return produtos;
    }

    public async salvar(produto: Produto): Promise<Result> {
        await this.dbContext.openConexao();

        await this.dbContext.request()
            .input('nome', produto.Nome)
            .input('valor', produto.Valor)
            .input('imagem', produto.Imagem)
            .query("insert into produtos (nome, valor, imagem) values (@nome, @valor, @imagem)")
            .then(() => {
                this.result.Status = true;
                this.result.Mensagem = "Produto adicionado com sucesso";
                this.result.Data = "Success"
            }).catch(erro => {
                this.result.Status = false;
                this.result.Mensagem = "Problemas ao adicionar produto";
                this.result.Data = erro.toString();
                this.result.Source = erro;
            })

        this.dbContext.dispose();

        return this.result;
    }

    public async atualizar(produto: Produto): Promise<Result> {
        await this.dbContext.openConexao();

        await this.dbContext.request()
            .input('id', produto.Id)
            .input('nome', produto.Nome)
            .input('valor', produto.Valor)
            .input('imagem', produto.Imagem)
            .query("update produtos set Nome = @nome, Valor = @valor, Imagem = @imagem Where Id = @id")
            .then(() => {
                this.result.Status = true;
                this.result.Mensagem = "Produto atualizado com sucesso";
                this.result.Data = "Success"
            })
            .catch(erro => {
                this.result.Status = false;
                this.result.Mensagem = "Problemas ao atualizar produto";
                this.result.Data = erro.toString();
                this.result.Source = erro;
            });

        this.dbContext.dispose();

        return this.result;
    }

    public async deletar(id: number): Promise<Result> {
        await this.dbContext.openConexao();

        await this.dbContext.getConexao().request()
            .input('id', id)
            .query("delete from produtos where Id = @id")
            .then(() => {
                this.result.Status = true;
                this.result.Mensagem = "Produto excluído com sucesso";
                this.result.Data = "Success"
            })
            .catch(erro => {
                this.result.Status = false;
                this.result.Mensagem = "Problemas ao excluir produto";
                this.result.Data = erro.toString();
                this.result.Source = erro;
            });

        await this.dbContext.dispose();

        return this.result;
    }
}