var fs = require('fs');
var paths =require('./paths.js');

/**
 * deleteNotNeededFiles has to be run before getFiles method
 */

module.exports = {
    getFiles: function (dir,jsonFilePath, fileList) {
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
            fileList[x] = fileList[x].replace(paths.readDirForBuildData+'/', '');
            fileList[x] = fileList[x].replace('.html', '');
        }
        //creating Json file
        fs.appendFileSync(jsonFilePath, "[");

        var listLength = fileList.length - 1;
        var comma = ",";

        for (var x  in fileList)
        {
            if (x == listLength) comma = '';

            var componentDir = fileList[x];
            componentDir = componentDir.replace('terra-','');

            var writeData =
                '\r\n\t{'+
                '\r\n\t\t"name":' + '"' + fileList[x] + '"'+ ','+
                '\r\n\t\t"ExampleSelector":' + '"'+'<' + fileList[x]+'-example'+ '></'+ fileList[x]+'-example'+'>'+ '"'+ ','+
                '\r\n\t\t"pathOverview"'+ ':' +'"' + paths.examplePathTemplate+ componentDir+
                paths.examplePathTemplateSecond+ fileList[x]+
                '.component.overview'+ '.md'+'"'+ ','+
                '\r\n\t\t"pathExampleHtml"'+ ':' +'"' + paths.examplePathTemplate+ componentDir+
                paths.examplePathTemplateSecond+ fileList[x]+
                paths.examplePathTemplateThird + '.html'+'"'+ ','+
                '\r\n\t\t"pathExampleCss"'+ ':' +'"' + paths.examplePathTemplate+ componentDir+
                paths.examplePathTemplateSecond+ fileList[x] +
                paths.examplePathTemplateThird+ '.scss'+'"'+ ','+
                '\r\n\t\t"pathExampleTs"'+ ':' +'"' + paths.examplePathTemplate+ componentDir+
                paths.examplePathTemplateSecond+ fileList[x] +
                paths.examplePathTemplateThird + '.ts'+'"'+ ','+
                '\r\n\t\t"path"'+ ':' +'"' + paths.apiPathTemplate+ fileList[x] + '.html'+'"'+
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
    test:function () {
        const docsPackage = require('tools/dgeni/index.js');
        const docs = new Dgeni([docsPackage]);
        return docs.generate();
    }

};

function cleanNotNeedetHtmlTags(dir)
{
    fs.readFile(dir, "utf-8", function(err, data) {

    });
}
