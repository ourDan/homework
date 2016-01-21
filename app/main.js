const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

var mainWindow = null;

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  app.quit();
});

app.on('ready', function() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    autoHideMenuBar: false,
    useContentSize: true,
    fullscreen: true
  });
  mainWindow.loadURL('file://' + __dirname + '/index.html');
  mainWindow.focus();
});
