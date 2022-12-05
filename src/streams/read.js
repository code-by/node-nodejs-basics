import { fileURLToPath } from 'url';
import { join } from 'path';
import { createReadStream } from 'fs';
import { stdout } from 'process';

/*
    implement function that reads file fileToRead.txt content using Readable Stream
    and prints it's content into process.stdout
*/

const read = async () => {
    // Write your code here 

    try {
        const __dirname = fileURLToPath(new URL('./files', import.meta.url));
        const fileFullPath = join(__dirname, '/fileToRead.txt');

        createReadStream(fileFullPath, 'utf8')
            .on('end', () => { console.log('\r'); })
            .pipe(stdout);
    } catch (e) {
        console.log(e);
    }
};

await read();