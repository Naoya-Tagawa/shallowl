const {app, BrowserWindow, globalShortcut, Menu} = require('electron');
const isDev = require('electron-is-dev');
const path = require('path');

let mainWindow; // グローバルな変数としてウィンドウを定義

function createWindow () {
    // ブラウザウィンドウの作成
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            contextIsolation: false,
            preload: path.join(__dirname, 'preload.js')
        }
    });

    // URLの読み込み
    mainWindow.loadURL(
        isDev
        ? "http://localhost:3000"
        : `file://${path.join(__dirname, "../build/index.html")}`
    );

    // ウィンドウが閉じたときの処理
    mainWindow.on('closed', function () {
        mainWindow = null;
    });
}
// 初期化が完了し、ウィンドウの起動準備ができた時に呼ばれる処理（APIの呼び出しはこの処理の後）
// ショートカットキーの登録
app.whenReady().then(() => {
    globalShortcut.register('Alt+CommandOrControl+U', () => {
        if (!mainWindow) {
            createWindow(); // ウィンドウが存在しない場合にのみウィンドウを作成する
        }
    });

    globalShortcut.register('Alt+CommandOrControl+P', () => {
        if (mainWindow) {
            mainWindow.focus(); // ウィンドウを最前面に表示する
        }
    });
});

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit();
});

app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

app.whenReady().then(createWindow); // 最初のウィンドウを作成
