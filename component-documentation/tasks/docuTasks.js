const fs = require('fs');
var paths = require('./paths.js');

/**
 * deleteNotNeededFiles has to be run before getFiles method
 */

module.exports = {
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

    createJsonFile: function (jsonFilePath) {
        var dirs = filterArray('./src/app');
        var dirLength = dirs.length - 1;
        var exclude = ['interface', 'config'];
        var comma = ',';

        fs.closeSync(fs.openSync(jsonFilePath, 'w'));
        fs.appendFileSync(jsonFilePath, '[');

        for (var i = 0; i < dirs.length; i++) {
            if (i === dirLength) comma = ']';
            var examplePaths = this.findExamplePath(dirs[i], '', 'example', null);
            var searchName = examplePaths[0].substring(( examplePaths[0].lastIndexOf('/')) + 1);
            var selector = searchName.substring(0, searchName.indexOf('.'));
            var apiExamplePath = this.findExamplePath('./component-documentation/build', '', selector, exclude);
            examplePaths[examplePaths.length] = apiExamplePath[0];
            examplePaths[examplePaths.length] = selector;
            examplePaths[examplePaths.length] = selector + '-example';
            fs.appendFileSync(jsonFilePath, JsonDataTemplate(examplePaths, comma));
        }
    },

    findExamplePath: function (dir, file, filter, exclude) {

        file = [];
        var files = fs.readdirSync(dir);
        var excludeError = false;
        for (var i in files) {
            var name = dir + '/' + files[i];
            if (fs.statSync(name).isDirectory()) {
                var examples = this.findExamplePath(name, file, filter, exclude);
                if (examples.length !== 0) {
                    for (var i = 0; i < examples.length; i++) {
                        file.push(examples[i]);
                    }
                }
            }
            else if (name.includes(filter)) {
                if (!name.includes('.d.ts')) {
                    if (exclude !== null) {
                        for (var x in exclude) {
                            if (name.includes(exclude[x])) excludeError = true;

                        }
                        if (excludeError === false) file.push(name);
                        excludeError = false;
                    }
                    else file.push(name);
                }
            }
        }
        return file;
    }
};

function filterArray(dir) {
    var results = [];
    var list = fs.readdirSync(dir);
    list.forEach(function (file) {
        file = dir + '/' + file;
        var stat = fs.statSync(file);
        if (stat.isDirectory()) results = results.concat(filterArray(file));
        else if (dir.includes('example')) results = dir;
    });
    return results;
}

function JsonDataTemplate(array, comma) {
    var writeData;
    if (array.length === 7) {
        writeData =
            '\r\n\t{' +
            '\r\n\t\t"name":' + '"' + array[5] + '"' + ',' +
            '\r\n\t\t"ExampleSelector":' + '"' + '<' + array[6] + '></' + array[6] + '>' + '",' +
            '\r\n\t\t"pathExampleHtml"' + ':' + '"' + array[0] + '",' +
            '\r\n\t\t"pathExampleCss"' + ':' + '"' + array [1] + '",' +
            '\r\n\t\t"pathExampleTs"' + ':' + '"' + array[2] + '",' +
            '\r\n\t\t"pathExampleMd"' + ':' + '"' + array[3] + '",' +
            '\r\n\t\t"path"' + ':' + '"' + array[4] + '"' +
            '\r\n\t}' + comma;
    }
    else {
        writeData =
            '\r\n\t{' +
            '\r\n\t\t"name":' + '"' + array[4] + '"' + ',' +
            '\r\n\t\t"ExampleSelector":' + '"' + '<' + array[5] + '></' + array[5] + '>' + '",' +
            '\r\n\t\t"pathExampleHtml"' + ':' + '"' + array[0] + '",' +
            '\r\n\t\t"pathExampleCss"' + ':' + '"' + array [1] + '",' +
            '\r\n\t\t"pathExampleTs"' + ':' + '"' + array[2] + '",' +
            '\r\n\t\t"path"' + ':' + '"' + array[3] + '"' +
            '\r\n\t}' + comma;
    }
    return writeData;
}

