import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('api', {
    getText: async (text) => {
        try {
            return await ipcRenderer.invoke('getText', text);
        } catch (error) {
            console.error('Error calling getText:', error);
            return null;
        }
    }
});
