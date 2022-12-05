import { join } from 'path';
import { fileURLToPath } from 'url';
import { unlink } from 'fs/promises';

/*
delete.js - implement function that deletes file fileToRemove.txt
(if there's no file fileToRemove.txt Error with message FS operation failed must be thrown)
*/

const remove = async () => {
    // Write your code here

    try {
        const __dirname = fileURLToPath(new URL('./files', import.meta.url));
        const fileFullPath = join(__dirname, '/fileToRemove.txt');
        await unlink(fileFullPath);
    } catch (e) {
        const FILE_NOT_EXISTS_CODE = 'ENOENT';
        if (e.code == FILE_NOT_EXISTS_CODE) {
            throw new Error('FS operation failed');
        } else {
            console.log(e);
        }
    }
};

await remove();