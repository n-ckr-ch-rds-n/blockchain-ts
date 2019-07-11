import * as sha256 from "sha256";

export class Block {
    constructor(private _index: number,
                private _timestamp: number,
                private _data: string,
                private _prevHash: string) {
    }

    get thisHash(): string {
         return sha256(`${this.index}${this._timestamp}${this._data}${this._prevHash}`);
    }

    get index(): number {
        return this._index;
    }
}
