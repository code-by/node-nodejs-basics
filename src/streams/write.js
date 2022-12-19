import { fileURLToPath } from 'url';
import { join } from 'path';
import { createWriteStream } from 'fs';
import { stdin } from 'process';

/*
    implement function that writes process.stdin data into file fileToWrite.txt content
    using Writable Stream
*/

const write = async () => {
    // Write your code here 

    try {
        const __dirname = fileURLToPath(new URL('./files', import.meta.url));
        const fileFullPath = join(__dirname, '/fileToWrite.txt');

        stdin.pipe(createWriteStream(fileFullPath, 'utf8'));
    } catch (e) {
        console.log(e);
    }

};

await write();