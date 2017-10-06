module.exports =
    {
        dgeniOutputPath: "src/build", // output dir where you want your dgeni generated files
        dataJsonOutputPath: "./src/data.json", // output dir where you want your json data file
        readDirForBuildData: "./build", // your build dir to perform changes at dgeni generated files
        examplePathTemplate: "node_modules/@plentymarkets/terra-components/app/", // your dest dir for example files
        examplePathTemplateSecond: "/example/",
        examplePathTemplateThird: ".component.example",
        apiPathTemplate: "assets/docu/build/" // your dest dir for api files
    };