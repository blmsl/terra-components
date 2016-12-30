module.exports = function () {

    var config = {

        allTs: './src/**/*.ts',
        allCSS: './src/**/*.css',
        allFonts: './src/app/assets/fonts/**/*',
        allImages: './src/app/assets/images/**/*',
        allSCSS: './src/**/*.scss',
        allHTML: './src/**/*.html',
        tsOutputPath: './dist/',
        fontsOutputPath: './dist/app/assets/fonts',
        imagesOutputPath: './dist/app/assets/images',
        excluded: '!./src/system-config.ts'

    };

    return config;
};
