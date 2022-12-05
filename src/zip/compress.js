import { createGzip } from 'zlib';
import { pipeline } from 'stream';
import { fileURLToPath } from 'url';
import { join } from 'path';
import { createReadStream, createWriteStream } from 'fs';
import { promisify } from 'util';

/*
    implement function that compresses file fileToCompress.txt to archive.gz using zlib and Streams API
*/

const compress = async () => {
    // Write your code here 

    try {
        const __dirname = fileURLToPath(new URL('./files', import.meta.url));
        const srcFileFullPath = join(__dirname, '/fileToCompress.txt');
        const newFileFullPath = join(__dirname, '/archive.gz');

        const gzip = createGzip();
        const source = createReadStream(srcFileFullPath);
        const destination = createWriteStream(newFileFullPath);
        const pipe = promisify(pipeline);

        await pipe(source, gzip, destination);
    } catch (e) {
        console.log(e);
    }
};

await compress();