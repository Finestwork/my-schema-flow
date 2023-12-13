import icon from '../../../resources/icon.png?asset';
import { is } from '@electron-toolkit/utils';
import { BrowserWindow, shell } from 'electron';
import { join } from 'path';

export default class MainWindow {
    private _mainWindow: BrowserWindow | null;

    constructor() {
        this._mainWindow = null;
    }

    get mainWindow(): BrowserWindow | null {
        return this._mainWindow;
    }

    createWindow() {
        this._mainWindow = new BrowserWindow({
            minWidth: 900,
            minHeight: 670,
            show: false,
            autoHideMenuBar: true,
            titleBarStyle: 'hidden',
            title: 'SchemaSparkle',
            icon: icon,
            titleBarOverlay: {
                color: '#090B10',
                symbolColor: '#8695BB',
                height: 40,
            },
            ...(process.platform === 'linux' ? { icon } : {}),
            webPreferences: {
                preload: join(__dirname, '../preload/index.js'),
                sandbox: false,
            },
        });
        this.listeners();
        this.handleFileLoad();
    }

    /**
     * Initializes the listeners for the main window.
     *
     * @private
     * @return {void} This function does not return a value.
     */
    private listeners() {
        if (this._mainWindow === null) return;

        // Create the browser window.
        this._mainWindow.webContents.openDevTools({
            mode: 'bottom',
        });
        this._mainWindow.on('ready-to-show', () => {
            if (this._mainWindow === null) return;
            this._mainWindow.maximize();
            this._mainWindow.show();
        });
        this._mainWindow.webContents.setWindowOpenHandler((details) => {
            shell.openExternal(details.url);
            return { action: 'deny' };
        });
    }

    /**
     * @desc HMR for renderer base on electron-vite cli. Load the remote URL for development or the local html file for production.
     */
    private handleFileLoad() {
        if (this._mainWindow === null) return;

        if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
            this._mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL']);
        } else {
            this._mainWindow.loadFile(
                join(__dirname, '../renderer/index.html'),
            );
        }
    }
}
