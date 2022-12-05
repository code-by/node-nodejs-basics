import { createGunzip } from 'zlib';
import { pipeline } from 'stream';
import { fileURLToPath } from 'url';
import { join } from 'path';
import { createReadStream, createWriteStream } from 'fs';
import { promisify } from 'util';

/*
    implement function that decompresses archive.gz back to the fileToCompress.txt with same content
    as before compression using zlib and Streams API
*/

const decompress = async () => {
    // Write your code here 

    try {
        const __dirname = fileURLToPath(new URL('./files', import.meta.url));
        const srcFileFullPath = join(__dirname, '/archive.gz');
        const newFileFullPath = join(__dirname, '/fileToCompress.txt');

        const gUnzip = createGunzip();
        const source = createReadStream(srcFileFullPath);
        const destination = createWriteStream(newFileFullPath);
        const pipe = promisify(pipeline);

        await pipe(source, gUnzip, destination);
    } catch (e) {
        console.log(e);
    }
};

await decompress();