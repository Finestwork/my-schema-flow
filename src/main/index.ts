import CreateMainWindow from '@main/src/CreateMainWindow';
import HandleEventListeners from '@main/src/HandleEventListeners';
import HandleDatabaseListener from '@main/src/HandleDatabaseListener';
import { join } from 'path';

const IndexHTMLFile = join(__dirname, '../renderer/index.html');
const IndexPreloadFile = join(__dirname, '../preload/index.js');
const MainWindowOptions = {
    htmlFile: IndexHTMLFile,
    preloadFile: IndexPreloadFile,
};
new CreateMainWindow(MainWindowOptions);
new HandleEventListeners();
new HandleDatabaseListener();
