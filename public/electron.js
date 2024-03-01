const { app, BrowserWindow, globalShortcut, ipcMain } = require('electron'); // ipcMain を追加
const isDev = require('electron-is-dev');
const path = require('path');

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

    globalShortcut.register('Alt+CommandOrControl+C', () => {
        if (mainWindow) {
            const text = '取得したテキスト'; // テキストの取得方法は実装に依存
            mainWindow.webContents.send('text-updated', text);
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

// テキストを取得してコンソールに表示する処理を追加
ipcMain.on('text-updated', (event, text) => {
    console.log('取得したテキスト:', text);
});
