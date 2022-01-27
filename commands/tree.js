let fs = require("fs");
let path = require("path");
function treeFn(directoryPath) {

    // console.log("Tree command implemented for ", directoryPath);
    if (directoryPath == undefined) {
        // console.log("Kindly Enter The Directory Path 🤦");
        treeHelper(process.cwd(), "");
        return;
    }

    let isPathValid = fs.existsSync(directoryPath);

    if (isPathValid) {
        treeHelper(directoryPath, "");
    } else {
        console.log("Path is INVALID , Please Enter the correct Path");
        return;
    }
}

function treeHelper(directoryPath, indent) {
    //is this a file or folder
    let isThisFile = fs.lstatSync(directoryPath).isFile();
    if (isThisFile) {
        let fileName = path.basename(directoryPath);
        console.log(indent + "├──" + fileName);
    } else {
        let directoryName = path.basename(directoryPath);
        console.log(indent + "└──" + directoryName);
        let childrens = fs.readdirSync(directoryPath);
        for (let i = 0; i < childrens.length; i++) {
            let childrenPath = path.join(directoryPath, childrens[i]);
            treeHelper(childrenPath, indent + "\t");
        }
    }
}

module.exports = {
    treeKey: treeFn

}