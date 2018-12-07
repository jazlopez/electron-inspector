"use strict";

const faker = require('faker'),

    fs = require('fs'),
    
    path = require('path'),
    
    TEMPLATE_DIR = path.resolve(path.join('.', '..', 'templates')),
    
    TEMPLATE_LOGFILE = path.join(TEMPLATE_DIR, "template.log");
console.info("Reading %s", TEMPLATE_LOGFILE);

fs.readFile(TEMPLATE_LOGFILE, (err, data) => {
    
    if(err) {
        
        console.error(err.message);
        
        throw Error(err);
    }
    
    console.log(data.toString());
});


// bootstrap
// fs.readdir(TEMPLATE_DIR, (err, files) => {
//
//     "use strict";
//
//     if(err) {
//
//         console.error(err.message);
//
//         throw Error(err);
//     }
//
//     console.info(files);
//
//
// })
