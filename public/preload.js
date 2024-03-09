import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('api', {
    getcopiedText:  (callback) => ipcRenderer.on('copiedText', (_event, text) => callback(text))
});
