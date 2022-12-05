import { fileURLToPath } from 'url';
import { join } from 'path';
import { readFile } from 'fs/promises';


/*
    read.js - implement function that prints content of the fileToRead.txt into console
    (if there's no file fileToRead.txt Error with message FS operation failed must be thrown)
*/

const read = async () => {
    // Write your code here 

    try {
        const __dirname = fileURLToPath(new URL('./files', import.meta.url));
        const fileFullPath = join(__dirname, '/fileToRead.txt');

        console.log(await readFile(fileFullPath, { encoding: 'utf8' }));
    } catch (e) {
        const NOT_EXISTS_CODE = 'ENOENT';
        if (e.code == NOT_EXISTS_CODE) {
            throw new Error('FS operation failed');
        } else {
            console.log(e);
        }
    }

};

await read();