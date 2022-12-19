import { fileURLToPath } from 'url';
import { join } from 'path';
import { readFile } from 'fs/promises';
import { createHash } from 'crypto';

const calculateHash = async () => {
    // Write your code here 

    try {
        const __dirname = fileURLToPath(new URL('./files', import.meta.url));
        const fileFullPath = join(__dirname, '/fileToCalculateHashFor.txt');
        const fileContent = await readFile(fileFullPath, { encoding: 'utf8' });
        const hash = createHash('sha256').update(fileContent).digest('hex');

        console.log(hash);
    } catch (e) {
        const NOT_EXISTS_CODE = 'ENOENT';
        if (e.code == NOT_EXISTS_CODE) {
            throw new Error('FS operation failed');
        } else {
            console.log(e);
        }
    }

};

await calculateHash();