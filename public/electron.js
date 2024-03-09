const { app, BrowserWindow, globalShortcut, ipcMain } = require('electron');
const isDev = require('electron-is-dev');
const path = require('path');
// const { getText } = require('./api');

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            contextIsolation: true,
            nodeIntegration: false,
            preload: path.join(__dirname, 'public/preload.js')
        },
        autoHideMenuBar: true,
        icon: path.join(__dirname, 'public/ico.png')
    });

    mainWindow.loadURL(
        isDev
            ? "http://localhost:3000"
            : `file://${path.join(__dirname, "../build/index.html")}`
    );

    mainWindow.on('closed', function () {
        mainWindow = null;
    });
}

app.whenReady().then(() => {
    globalShortcut.register('Alt+CommandOrControl+U', () => {
        if (!mainWindow) {
            createWindow();
        }
    });

    globalShortcut.register('Alt+CommandOrControl+P', () => {
        if (mainWindow) {
            mainWindow.focus();
        }
    });
    // Ctrl+Cが二回押されたときの処理
// Ctrl+Cが二回押されたときの処理
    globalShortcut.register('Ctrl+K', () => {
        const clipboard = require('electron').clipboard;
        const copiedText = clipboard.readText();
        console.log(copiedText);
        mainWindow.webContents.send('copiedText', copiedText); // テキストをレンダラープロセスに送信
         
    });

});

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit();
});

app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

app.whenReady().then(createWindow);
