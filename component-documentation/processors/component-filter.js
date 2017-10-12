const path = require('path');

class ComponentGroup {
    constructor(name) {
        this.name = name;
        this.id = 'component-group-${name}';
        this.aliases = [];
        this.docType = 'componentGroup';
        this.directives = [];
        this.services = [];
        this.additionalClasses = [];
        this.ngModule = null;
    }
}

function createGroupNameByBaseName(baseName,stringToDelete) {

    for(var x = 0;x != stringToDelete.length;x++)
    {
        if(baseName.search(stringToDelete[x]) !=-1)
        {
           baseName = baseName.replace(stringToDelete[x],'');
        }
    }
    return baseName;
}

module.exports = function componentGrouper() {
    return {
        $runBefore: ['docs-processed'],
        $process: function (docs)
        {
            // Map of group name to group instance.
            var groups = new Map();
            var stringDelete = ['.component'];

            docs.forEach(function (doc)
                {
                    var group, groupName = 'not-assigned';

                    if (doc.isDirective)
                    {
                        groupName = doc.fileInfo.relativePath;
                    }
                    else if (doc.isService)
                    {
                        groupName = doc.fileInfo.relativePath;
                    }
                    else if (doc.docType === 'class') {
                        groupName = doc.fileInfo.relativePath;
                    }

                    if (groups.has(groupName)) {
                        group = groups.get(groupName);
                    } else {
                        group = new ComponentGroup(groupName);
                        groups.set(groupName, group);
                    }


                    if (doc.isDirective) {
                        group.directives.push(doc);
                    } else if (doc.isService) {
                        group.services.push(doc);
                    } else if (doc.docType === 'class') {
                        group.additionalClasses.push(doc);
                    }
                }
            );

            return Array.from(groups.values());
        }
    };
};