import fs from 'fs';
import path from 'path';

const DIST = path.resolve(__dirname, '..', 'dist');
const MAKE = path.resolve(__dirname, '..', 'make');

const readJsFileContent = (filePath: string) => {
    const content = fs.readFileSync(filePath, 'utf-8');
    return content
        .split('export function').join('function')
        .split('export const').join('const');
};

const injectedJsTemplate = (scrapperContent: string) => `
(function() {
    ${scrapperContent}

    async function onReady() {
        try {
            const data = await scrapper();

            if (window.ReactNativeWebView) {
                window.ReactNativeWebView.postMessage(JSON.stringify(data));
            } else {
                console.log(data);
            }
        } catch (error) {
            if (window.ReactNativeWebView) {
                window.ReactNativeWebView.postMessage(JSON.stringify({error}));
            } else {
                console.log(error);
            }
        }
    };

    if (
        document.readyState === 'complete' ||
        (document.readyState !== 'loading' && !document.documentElement.doScroll)
    ) {
        onReady();
    } else {
        document.addEventListener('DOMContentLoaded', onReady);
    }
})();
`;

const createInjectedJsFile = (scrapperName: string) => {
    const scrapperContent = readJsFileContent(path.resolve(DIST, scrapperName, 'scrapper', 'index.js'));
    const content = injectedJsTemplate(scrapperContent);

    if (!fs.existsSync(MAKE)) {
        fs.mkdirSync(MAKE, {recursive: true});
    }
    
    fs.writeFileSync(path.resolve(MAKE, `${scrapperName}-scrapper.js`), content);
};

createInjectedJsFile('tweet');
createInjectedJsFile('tg');