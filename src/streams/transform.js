import { Transform } from 'stream';
import { pipeline } from 'stream/promises';
import { stdin, stdout } from 'process';

/*
    implement function that reads data from process.stdin, reverses text using Transform Stream and
    then writes it into process.stdout
*/

const transform = async () => {
    // Write your code here

    // TODO:
    // stdin.on('data', (chunk) => { console.log(chunk); })
    

    const myTransform = new Transform({
        transform(chunk, encoding, callback) {
          callback(chunk);
        }
      });

      //stdin.myTransformstdout.pipe(stdout);
      //stdin.on('data', (chunk) => myTransform.transform(chunk)).pipe(stdout);

    // stdin.pipeline(stdout, (chunk) => chunk.split("").reverse().join(""));

      // stdin.read().myTransform().pipe.stdout();

//    stdin.pipe(stdout);

    await pipeline(
        stdin,
        async function* (source, { signal }) {
            source.setEncoding('utf8');  // Work with strings rather than `Buffer`s.
            for await (const chunk of source) {
              yield chunk.split("").reverse().join("") + '\r\n';
            }
        },
        stdout
    );
};

await transform();