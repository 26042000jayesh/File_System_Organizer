function helpFn() {
    console.log(`
                LIST OF ALL THE COMMANDS

                node main.js tree "directoryPath"
                node main.js organize "directoryPath"
                node main.js help
    `);
}
module.exports={
    helpKey:helpFn
}