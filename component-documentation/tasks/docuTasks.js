const fs = require('fs');
var paths = require('./paths.js');

/**
 * deleteNotNeededFiles has to be run before getFiles method
 */

module.exports = {
    getFiles: function (dir, jsonFilePath, fileList) {
        fileList = fileList || [];

        fs.closeSync(fs.openSync(jsonFilePath, 'w'));//if file not exists it gets created else it clears the file
        var files = fs.readdirSync(dir);// get file paths form directory

        for (var i in files) {//puts file paths into Array
            if (!files.hasOwnProperty(i)) continue;
            var name = dir + '/' + files[i];
            if (fs.statSync(name).isDirectory()) {
                getFiles(name, fileList);
            } else {
                fileList.push(name);
            }
        }
        for (var x in fileList) {
            fileList[x] = fileList[x].replace(paths.readDirForBuildData + '/', '');
            fileList[x] = fileList[x].replace('.html', '');
        }


        //creating Json file
        fs.appendFileSync(jsonFilePath, "[");

        var listLength = fileList.length - 1;
        var comma = ",";

        for (var x  in fileList) {
            if (x === listLength) comma = '';

            var componentDir = fileList[x];

            var writeData =
                '\r\n\t{' +
                '\r\n\t\t"name":' + '"' + fileList[x] + '"' + ',' +
                '\r\n\t\t"ExampleSelector":' + '"' + '<' + fileList[x] + '-example' + '></' + fileList[x] + '-example' + '>' + '"' + ',' +
                '\r\n\t\t"pathOverview"' + ':' + '"' + paths.examplePathTemplate + componentDir +
                paths.examplePathTemplateSecond + fileList[x] +
                '.component.overview' + '.md' + '"' + ',' +
                '\r\n\t\t"pathExampleHtml"' + ':' + '"' + paths.examplePathTemplate + componentDir +
                paths.examplePathTemplateSecond + fileList[x] +
                paths.examplePathTemplateThird + '.html' + '"' + ',' +
                '\r\n\t\t"pathExampleCss"' + ':' + '"' + paths.examplePathTemplate + componentDir +
                paths.examplePathTemplateSecond + fileList[x] +
                paths.examplePathTemplateThird + '.scss' + '"' + ',' +
                '\r\n\t\t"pathExampleTs"' + ':' + '"' + paths.examplePathTemplate + componentDir +
                paths.examplePathTemplateSecond + fileList[x] +
                paths.examplePathTemplateThird + '.ts' + '"' + ',' +
                '\r\n\t\t"path"' + ':' + '"' + paths.apiPathTemplate + fileList[x] + '.html' + '"' +
                '\r\n\t}' + comma;

            fs.appendFileSync(jsonFilePath, writeData);
        }
        fs.appendFileSync(jsonFilePath, "]");
        console.log("info: Finished creating data");
    },
    deleteNotNeededFiles: function (dir) {
        var fileList = [];

        var files = fs.readdirSync(dir);// get file paths form directory

        for (var i in files) {//puts file paths into Array
            if (!files.hasOwnProperty(i)) continue;
            var name = dir + '/' + files[i];
            if (fs.statSync(name).isDirectory()) {
                getFiles(name, fileList);
            } else {
                fileList.push(name);
            }
        }
        for (var x in fileList) {
            if ((fileList[x].search('.ts') !== -1)) {
                fs.unlinkSync(fileList[x]);
                console.log(fileList[x] + ' deleted');
            }
        }
    },


    createJsonFile: function () {
        var fileNames = [];
        var dir = './component-documentation/build/src/app';
        fileNames = fs.readdirSync(dir);

        for(var i =0; i<= fileNames.length -1;i++)
        {
            if(fs.statSync(dir+'/'+fileNames[i]).isDirectory())
            {
                var componentsExample = this.findExamplePath('./src/app/'+fileNames[i], '', 'example');
                if(componentsExample.length === 0)
                {

                }
                else
                {
                    var jsonInput =this.findExamplePath(dir+'/'+fileNames[i]);
                    var exampleLength = componentsExample.length;
                    componentsExample[exampleLength] = jsonInput[0];
                    console.log(componentsExample);
                }
            }
        }
    },

    findExamplePath: function (dir, file, filter) {

        file = [];
        var files = fs.readdirSync(dir);
        for (var i in files) {
            var name = dir + '/' + files[i];
            if (fs.statSync(name).isDirectory()) {
                var examples = this.findExamplePath(name, file, filter);
                if (examples.length !== 0) {
                    for (var i = 0; i <= examples.length; i++) {
                        if(examples[i] !== undefined)
                        {
                                file.push(examples[i]);
                        }
                    }
                }
            }
            else if (name.search(filter) !== -1) {
                if(name.search('.d.ts') === -1)
                {
                    file.push(name);
                }
            }
        }
        return file;
    }
};

function filterArray(file) {
    for (var i = 0; i <= file.length - 1; i++) {
        if (file[i].search('example') !== -1) {
            console.log('true');
            return true;
        }
        else {
            console.log('false');
            return false;
        }
    }
}

