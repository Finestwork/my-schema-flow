import MainWindow from './MainWindow';
import { electronApp, optimizer } from '@electron-toolkit/utils';
import { app, BrowserWindow } from 'electron';

export default class App {
    /**
     * Constructs a new instance of the App class.
     * @constructor
     * @param {MainWindow} mainWindow - The main window of the application.
     */
    constructor(private mainWindow: MainWindow) {
        this.whenReady();
        this.handleWindowWhenClosed();
    }

    /**
     * Method called when Electron has finished initialization and is ready to create browser windows.
     * @private
     */
    private whenReady() {
        app.whenReady().then(() => {
            electronApp.setAppUserModelId('com.craftie');

            // Default open or close DevTools by F12 in development
            // and ignore CommandOrControl + R in production.
            // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
            app.on('browser-window-created', (_, window) => {
                optimizer.watchWindowShortcuts(window);
            });

            this.mainWindow.createWindow();

            app.on('activate', () => {
                // On macOS it's common to re-create a window in the app when the
                // dock icon is clicked and there are no other windows open.
                if (BrowserWindow.getAllWindows().length === 0) this.mainWindow.createWindow();
            });
        });
    }

    /**
     * Method called when all windows are closed.
     * It quits the application if the platform is not darwin (macOS).
     * @private
     */
    private handleWindowWhenClosed() {
        app.on('window-all-closed', () => {
            if (process.platform !== 'darwin') {
                app.quit();
            }
        });
    }
}
