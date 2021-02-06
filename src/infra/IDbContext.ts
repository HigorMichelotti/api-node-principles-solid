import {ConnectionPool, Request } from "mssql/msnodesqlv8"
export interface IDbContext{
    openConexao();
    request(): Request;
    getConexao(): ConnectionPool;
    dispose()
}