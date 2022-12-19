import { env } from 'process';

/*
    implement function that parses environment variables with prefix RSS_
    and prints them to the console in the format RSS_name1=value1; RSS_name2=value2
*/

const parseEnv = () => {
    // Write your code here 

    const ENV_PREFIX = 'RSS_';
    let envString = '';
    
    for (const [key, value] of Object.entries(env)) {
        if (key.startsWith(ENV_PREFIX)) {
            envString += `${envString ? '; ' : '' }${key}=${value}`
        }
    }

    console.log(envString);
};

parseEnv();