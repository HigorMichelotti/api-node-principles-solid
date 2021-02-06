import { ModelBase } from "./base/ModelBase"

export class Produto extends ModelBase {
    constructor(
        public Nome?: string,
        public Valor?: number,
        public Imagem?: string
    ) {
        super();
    }

    static fromJson(dadosJson: any): Produto {
        return Object.assign(new Produto(), dadosJson);
    }
}