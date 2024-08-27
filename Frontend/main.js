const { app, BrowserWindow, ipcMain } = require('electron');

const path = require('node:path');

const createWindow = () => {
    let loginStatus = true; // will implement better later NOT PERMENENT
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    });
    //win.removeMenu();
    if (loginStatus) {
        win.loadFile('./html/homePage.html');
    } else {
        win.loadFile('./html/index.html');
    }
}

app.whenReady().then(() => {
    ipcMain.handle('ping', () => 'pong');
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    })
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});
