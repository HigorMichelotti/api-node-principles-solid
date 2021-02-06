import sql, { ConnectionPool, Request } from "mssql/msnodesqlv8"
import { IDbContext } from "./IDbContext";

export class DbContext implements IDbContext {

    private conexao: any;

    private dbConfig = {
        server: 'NB-HIGOR-HD\\SQLEXPRESS',
        database: 'ProjetoTeste',
        driver: "msnodesqlv8",
        options: {
            trustedConnection: true
        }
    }

    public async openConexao() {
        this.conexao = await new sql.ConnectionPool(this.dbConfig)
            .connect()
            .then(pool => {
                console.log('Connected to SQLServer')
                return pool;
            }).catch(err => {
                console.log('Database Connection Failed! Bad Config: ', err)
            })

    }

    public request(): Request {
        return this.getConexao().request();
    }

    public getConexao(): ConnectionPool {
        return this.conexao;
    }

    public async dispose() {
        this.getConexao().close();
    }
}