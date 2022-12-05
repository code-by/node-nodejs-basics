import { parentPort, workerData } from 'worker_threads';

// n should be received from main thread
const nthFibonacci = (n) => n < 2 ? n : nthFibonacci(n - 1) + nthFibonacci(n - 2);

const sendResult = () => {
    // This function sends result of nthFibonacci computations to main thread

    try {
        if (Number.isInteger(workerData)) {
            parentPort.postMessage(nthFibonacci(workerData));
        } else {
            throw new Error('value is not an integer');
        }
    } catch (e) {
        throw new Error(e.message);        
    }
};

sendResult();