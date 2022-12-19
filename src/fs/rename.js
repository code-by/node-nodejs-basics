import { rename as fsRename, stat } from 'fs/promises';
import { fileURLToPath } from 'url';
import { join } from 'path';

/*
rename.js - implement function that renames file wrongFilename.txt to properFilename with extension .md
(if there's no file wrongFilename.txt or properFilename.md already exists
Error with message FS operation failed must be thrown)
*/

const rename = async () => {
    // Write your code here 

    const __dirname = fileURLToPath(new URL('./files', import.meta.url));
    const oldFileFullPath = join(__dirname, '/wrongFilename.txt');
    const newFileFullPath = join(__dirname, '/properFilename.md');

    const newFileStat = await stat(newFileFullPath).catch(e => false);
    if (newFileStat) {
        console.warn('properFilename.md already exists');
        throw new Error('FS operation failed');
    }

    try {
        await fsRename(oldFileFullPath, newFileFullPath);
    } catch(e) {
        const FILE_NOT_EXISTS_CODE = 'ENOENT';
        if (e.code == FILE_NOT_EXISTS_CODE) {
            console.warn('wrongFilename.txt not exists');
            throw new Error('FS operation failed');
        } else {
            console.log(e);
        }
    }

};

await rename();