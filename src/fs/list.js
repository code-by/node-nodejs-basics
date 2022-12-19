import { fileURLToPath } from 'url';
import { readdir } from 'fs/promises';

/*
    list.js - implement function that prints all array of filenames from files folder into console
    (if files folder doesn't exists Error with message FS operation failed must be thrown)
*/

const list = async () => {
    // Write your code here 

    try {
        const __dirname = fileURLToPath(new URL('./files', import.meta.url));
        // TODO: skip folders?
        const dirEntries = await readdir(__dirname);
        console.log(dirEntries);
    } catch (e) {
        const NOT_EXISTS_CODE = 'ENOENT';
        if (e.code == NOT_EXISTS_CODE) {
            throw new Error('FS operation failed');
        } else {
            console.log(e);
        }
    }

};

await list();