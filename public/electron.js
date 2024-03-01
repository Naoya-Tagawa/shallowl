const { app, BrowserWindow, globalShortcut, ipcMain } = require('electron');
const isDev = require('electron-is-dev');
const path = require('path');
const { getText } = require('./api');

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.js')
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
    let lastCopyTime = 0;
    globalShortcut.register('Ctrl+C', () => {
        const currentTime = new Date().getTime();
        // 直前のCtrl+Cから500ms以内にもう一度Ctrl+Cが押された場合
        if (currentTime - lastCopyTime <= 500) {
            const clipboard = require('electron').clipboard;
            const copiedText = clipboard.readText();
            // getHello関数を実行し、コピーしたテキストを引数として渡す
            ipcMain.handle('getText', (event, text) => getText(text));
            ipcMain.handle('getText', (event, text) => getText(copiedText));
            lastCopyTime = 0; // 最後のCtrl+Cの時間をリセット
        } else {
            lastCopyTime = currentTime; // 最後のCtrl+Cの時間を更新
        }
    });
});

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit();
});

app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

app.whenReady().then(createWindow);
