import CreateMainWindow from '@main/src/CreateMainWindow';
import HandleEventListeners from '@main/src/HandleEventListeners';
import { join } from 'path';

const IndexHTMLFile = join(__dirname, '../renderer/index.html');
const IndexPreloadFile = join(__dirname, '../preload/index.js');
const MainWindowOptions = {
    htmlFile: IndexHTMLFile,
    preloadFile: IndexPreloadFile,
};
new CreateMainWindow(MainWindowOptions);
new HandleEventListeners();
