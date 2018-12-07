"use strict";

const electron = require('electron'),
	
	app = electron.app,
	
	BrowserWindow = electron.BrowserWindow;


/**
 *
 */
function createWindow() {
    let win = new BrowserWindow({ titleBarStyle: 'hidden',  width: 800, height: 600 });
    
	win.loadFile('views/index.html');
	
}

app.on('ready', createWindow);
