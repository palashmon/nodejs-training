/**
 * @file    This is our main index file for this module
 *          Here we have the logic to processes a directory
 *          and zip all the directories content inside it into another directory.
 * @author  Palash Mondal
 */
//@ts-check
const Helper = require('./helper')

async function init() {
  try {
    await Helper.createDirectory()
    const paths = await Helper.getAllFilePaths()
    if (!paths || !paths.length) {
      console.log('\nNo files found in the "/test" directory')
      return // Skip the remaining logic
    }
    await Helper.zipFilesInDirectory(paths)
    console.log(`\nFiles has been successfully compressed and added to "/output" directory.`)
  } catch (err) {
    console.log('Error: ', err)
  }
}

init()
