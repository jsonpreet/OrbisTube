import { Web3Storage } from 'web3.storage'
import { v4 as uuidv4 } from 'uuid';

class StorageClient {
    client;
    constructor() {
        this.client = new Web3Storage({
            token: process.env.NEXT_PUBLIC_WEB3_STORAGE_API_KEY,
        })
    }
    async storeFiles(file) {
        const ext = file.name.split('.').pop();
        const fileName = `${uuidv4()}.${ext}`;
        const newFile = new File([file], fileName, {type: file.type});
        const cid = await this.client.put([newFile], {
            name: fileName,
        });
        const imageURI = `https://${cid}.ipfs.w3s.link/${fileName}`;
        return imageURI;
    }
}

export default StorageClient