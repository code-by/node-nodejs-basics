import { fileURLToPath } from 'url';
import { join } from 'path';
import { fork, spawn } from 'child_process';

/*
    implement function spawnChildProcess that receives array of arguments args and creates child process 
    from file script.js, passing these args to it. This function should create IPC-channel between stdin and 
    stdout of master process and child process:
        child process stdin should receive input from master process stdin
        child process stdout should send data to master process stdout
*/

const spawnChildProcess = async (args) => {
    // Write your code here

    try {
        const __dirname = fileURLToPath(new URL('./files', import.meta.url));
        const childPath = join(__dirname, 'script.js');

        const cp = spawn('node', [childPath, ...args]);
        // const cp = fork(childPath, [...args]);

        cp.on('close', (code) => {
            process.exit();
        });
          
        cp.on('exit', (code) => {
            process.exit();
        });

        cp.stdout.on('data', data => {
            console.log(data.toString());
        });

        process.stdin.on('data', data => {
            cp.stdin.write(data);
        });

    } catch (e) {
        console.log(e);
    }

};

spawnChildProcess(['--abc', '--helloworld']);