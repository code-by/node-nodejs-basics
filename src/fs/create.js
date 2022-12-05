import { appendFile, stat } from 'fs/promises';
import { join } from 'path';
import { fileURLToPath } from 'url';

const create = async () => {
    // Write your code here 

    try {
        const __dirname = fileURLToPath(new URL('.', import.meta.url));
        const fileFullPath = join(__dirname, '/files/fresh.txt');

        await appendFile(
            fileFullPath,
            'I am fresh and young',
            {flag: 'wx'},
        );
    } catch (e) {
        const FILE_EXISTS_CODE = 'EEXIST';

        if (e.code === FILE_EXISTS_CODE) {
            throw new Error('FS operation failed');
        }
    }
};

await create();