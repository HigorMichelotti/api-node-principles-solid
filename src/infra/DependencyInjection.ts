import { ProdutoController } from "../controller/ProdutoController"
import { ProdutoRepository } from "../repository/ProdutoRepository"
import { ProdutoService } from "../services/ProdutosService"
import { DbContext } from "./dbContext";

const dbContext = new DbContext();
const produtoRepository = new ProdutoRepository(dbContext);
const produtoService = new ProdutoService(produtoRepository);
const produtoController = new ProdutoController(produtoService);

export { produtoService, produtoController }