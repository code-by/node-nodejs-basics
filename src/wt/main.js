import { fileURLToPath } from 'url';
import { join } from 'path';
import { Worker } from 'worker_threads';
import { cpus } from 'os';

const performCalculations = async () => {
    // Write your code here

    try {
        const __dirname = fileURLToPath(new URL('.', import.meta.url));
        const workerFullPath = join(__dirname, './worker.js');

        const workers = Array(cpus().length).fill().map((e, i) =>
            new Promise((resolve, reject) => {
                const worker = new Worker(
                    workerFullPath,
                    {
                        workerData: 10 + i,
                    }
                );
                worker.on('message', msg => {
                    resolve({
                        status: 'resolved',
                        data: msg,
                    });
                });
                worker.on('error', err => {
                    reject({ status: 'error', data: null });
                    // resolve({ status: 'error', data: null });
                });
            })
        );

        const workersResult = (await Promise.allSettled(workers)).map(({ value, reason }) => value || reason);
        console.log(workersResult);
    } catch (e) {
        console.log('unexpected error:');
        console.log(e);
    }
};

await performCalculations();