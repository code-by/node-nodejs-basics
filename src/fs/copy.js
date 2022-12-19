import { readdir, copyFile, stat, mkdir } from 'fs/promises';
import { join, normalize } from 'path';
import { fileURLToPath } from 'url';

/*
    copy.js - implement function that copies folder files files with all its content
    into folder files_copy at the same level
    (if files folder doesn't exists or files_copy has already been created
    Error with message FS operation failed must be thrown)
*/

const copy = async () => {
    // Write your code here
    try {
        const __dirname = fileURLToPath(new URL('.', import.meta.url));
        const srcFolderFullPath = join(__dirname, '/files');
        const newFolderFullPath = normalize(srcFolderFullPath + '_copy');

        // solution with fs.cp:
        /*
        await cp(
            srcFolderFullPath,
            newFolderFullPath,
            {
                errorOnExist: true,
                force: false,
                recursive: true,
            }
        );
        */

        // solution with copyFile
        const copyFolder = async(srcCurrentFolderPath, newCurrentFolderPath) => {

            await mkdir(newCurrentFolderPath);

            const folderEntries = await readdir(srcCurrentFolderPath);

            for (const folderEntry of folderEntries) {
                const srcEntryFullPath = join(srcCurrentFolderPath, folderEntry);
                const newEntryFullPath = join(newCurrentFolderPath, folderEntry);
                if ((await stat(srcEntryFullPath)).isFile()) {
                    copyFile(srcEntryFullPath, newEntryFullPath);
                } else {
                    await copyFolder(srcEntryFullPath, newEntryFullPath);
                }
            }
        };

        await copyFolder(srcFolderFullPath, newFolderFullPath);

    } catch(e) {
        const ERR_FS_NOT_EXISTS_CODE = 'ENOENT';
        const ERR_FS_CP_EEXIST_CODE = 'ERR_FS_CP_EEXIST';

        if (
            [
                undefined,
                ERR_FS_NOT_EXISTS_CODE,
                ERR_FS_CP_EEXIST_CODE
            ].indexOf(e.code)
        ) {
            throw new Error('FS operation failed');
        }
        console.log(e);
    };

};

copy();