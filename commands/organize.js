let fs = require("fs");
let path = require("path");
function organizeFn(directoryPath) {
    // console.log("Organize command implemented for ",directoryPath);
    //1 input->directory from terminal
    if (directoryPath == undefined) {
        // console.log("Kindly Enter The Directory Path 🤦");
        destinationPath = process.cwd();
        return;
    }

    let isPathValid = fs.existsSync(directoryPath);

    if (isPathValid) {
        // 2 create -> organized_files->directory
        destinationPath = path.join(directoryPath, "organized_files");
        if (fs.existsSync(destinationPath) == false) {
            fs.mkdirSync(destinationPath);
        }
    } else {
        console.log("Path is INVALID , Please Enter the correct Path");
        return;
    }
    //3 identify categories of all the files in the input directory
    organizeHelper(directoryPath, destinationPath);
}

function organizeHelper(source, destination) {
    //3 identify categories of all the files in the input directory
    let childNames = fs.readdirSync(source);
    // console.log(childNames);
    for (let i = 0; i < childNames.length; i++) {
        let childAddress = path.join(source, childNames[i]);
        let isThisFile = fs.lstatSync(childAddress).isFile();
        if (isThisFile) {
            // console.log(childNames[i]);
            let category = getCategory(childNames[i]);
            // console.log(childNames[i], " belongs to --> ", category);
            //4. copy/cut files to that organized directory inside of any of category folder
            sendFiles(childAddress, destination, category);
        }
    }
}

function getCategory(fileName) {
    let extension = path.extname(fileName);
    extension = extension.slice(1);
    // console.log(extension);
    for (let type in types) {
        let particularTypes = types[type];
        // console.log(particularTypes);
        for (let i = 0; i < particularTypes.length; i++) {
            if (extension == particularTypes[i]) {
                return type;
            }
        }
    }
    return "others";
}

function sendFiles(sourceFilesPath, destinationFolder, category) {
    let categoryFolderPath = path.join(destinationFolder, category);
    if (fs.existsSync(categoryFolderPath) == false) {
        fs.mkdirSync(categoryFolderPath);
    }
    let fileName = path.basename(sourceFilesPath);
    let destinationFilePath = path.join(categoryFolderPath, fileName);
    fs.copyFileSync(sourceFilesPath, destinationFilePath);
    console.log(fileName, " copied to ", category);
}

module.exports={
    organizeKey:organizeFn
}