'use strict';

var express = require('express');
var app = express();

var morgan = require('morgan'); // log requests to the console (express4)
var bodyParser = require('body-parser'); // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
var routes = require('./backend/routes');
var user = require('./backend/controllers/user');



app.use(morgan('dev')); // log every request to the console
app.use(bodyParser.urlencoded({
    'extended': 'true'
})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(methodOverride());


app.use(require('connect-livereload')());
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/frontend/views');
app.use(express.static(__dirname + '/frontend'));
app.use('/', routes);


var server = app.listen(3000, function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Someone is listening at http://%s:%s', host, port);
});



module.exports = app;

//=================== Electron part ==================

const electron = require('electron');
// Module to control application life.
const eApp = electron.app;
const ipcMain = electron.ipcMain;

// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;


// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow() {
    // Create the browser window.
    mainWindow = new BrowserWindow({
        width: 400,
        height: 600,
        minWidth: 400,
        minHeight: 600,
        'web-preferences': {'web-security': false}
    });

    var port = server.address().port;
    mainWindow.loadURL('http://localhost:' + port + '/login');

    // Open the DevTools.
    mainWindow.webContents.openDevTools();

    // Emitted when the window is closed.
    mainWindow.on('closed', function() {
        // Dereference the window object, usually you would store windows
        // in an array if your eApp supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null;
        server.close();
    });

    ipcMain.on('login', function(event, credential){
        user.init(credential).then(function(userInfo){
            event.sender.send('login-response', userInfo);
        });
    });

    ipcMain.on('set-window-size', function(event, width, height, isFixed){
        mainWindow.setSize(width, height);
        mainWindow.setResizable(!isFixed);
    });

}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
eApp.on('ready', createWindow);

// Quit when all windows are closed.
eApp.on('window-all-closed', function() {
    // On OS X it is common for eApplications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        eApp.quit();
    }
});

eApp.on('activate', function() {
    // On OS X it's common to re-create a window in the eApp when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow();
    }
});
