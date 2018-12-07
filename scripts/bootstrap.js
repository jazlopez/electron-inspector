"use strict";
const s3 = require('aws-sdk/clients/s3'),
    
    faker = require('faker'),
    
    fs = require('fs'),
    
    path = require('path'),
    
    TEMPLATE_LOGFILE = path.join(".", "templates", "template.log");

/**
 *
 * @param row
 */
function addLogRow(row, appendTo) {
    
    let rowLogLine = document.createElement("div");
    
    rowLogLine.textContent = row;
    
    appendTo.appendChild(rowLogLine);
}


function logFileView() {
    
    let panelLog = document.getElementById("__panel-log__"),
        
        stream = fs.createReadStream(TEMPLATE_LOGFILE, {'encoding': 'utf8'});
    
    stream.on('data', chunk => {
        
        let s = chunk.toString(), rows = s.split("\n");
        
        rows.map((row) => addLogRow(row, panelLog));
        
        stream.close();
    });
    
    stream.on('close', () => {
        
        /**
         *
         */
    });
}

function bucketsView() {
    
    let client = new s3();
    
    console.log("bootstrap loaded up!");
    
    console.log(client.toString());
    
    client.listObjectsV2({
        
        MaxKeys: 10 ,
        
        Prefix: 'foo',
        
        Bucket: 'apd-revos-service-log-test'}, (e, data) => {
        
        if(e) {
            
            console.error(e);
            
            return;
        }
        
        
        let buckets = document.getElementById("buckets");
        
        if(!data.Contents){
            
            let empty = document.createElement('div');
            
            empty.textContent = "No results found";
            
            buckets.appendChild(empty);
            
        }
        
        if(data.Contents) {
            
            data.Contents.forEach(function (file) {
                
                
                let    bucket = document.createElement('div'),
                    
                    separator = document.createElement('div'),
                    
                    lastModified = document.createElement('div'),
                    
                    size = document.createElement('div');
                
                separator.setAttribute("class", "separator");
                
                lastModified.setAttribute("class", "indent sm");
                
                size.setAttribute("class", "indent sm");
                
                bucket.textContent = "File name: " + file.Key;
                
                lastModified.textContent = "Last Modified : " + file.LastModified;
                
                size.textContent = "Size : " + file.Size;
                
                bucket.setAttribute("class", "title");
                
                bucket.appendChild(lastModified);
                
                bucket.appendChild(size);
                
                buckets.appendChild(bucket);
                
                buckets.appendChild(separator);
                
            });
        }
        
        
        
    });
}


(function(){
    
    logFileView();
    
    bucketsView();
    
})();
