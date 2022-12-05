import { argv } from 'process';

/*
    implement function that parses command line arguments
    (given in format --propName value --prop2Name value2, you don't need to validate it)
    and prints them to the console in the format propName is value, prop2Name is value2
*/

const parseArgs = () => {
    // Write your code here
    let argString = '';

    for (let i = 2; i < argv.length; i += 1) {
        argString += `${argString ? ', ' : '' }${argv[i].substring(2, argv[i].length)} is ${argv[++i]}`
    }

    console.log(argString);
};

parseArgs();