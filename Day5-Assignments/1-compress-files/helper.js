/**
 * @file    These are our main helper methods used in main module
 * @author  Palash Mondal
 */
//@ts-check
const fs = require('fs')
const path = require('path')
const archiver = require('archiver')
const glob = require('glob-promise')

// Set the input and output directories
const INPUT_DIR = 'test'
const OUTPUT_DIR = path.join(__dirname + '/output/')
const OUTPUT_FILE_PATH = path.join(OUTPUT_DIR + '/output.zip')

/**
 * Create output directory if it doesn't exist
 */
async function createDirectory() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    await fs.promises.mkdir(OUTPUT_DIR)
  }
}

/**
 * Delete the old output.zip file, if it already exists
 */
async function deleteZipFile() {
  if (!fs.existsSync(OUTPUT_FILE_PATH)) {
    await fs.promises.unlink(OUTPUT_FILE_PATH)
  }
}

/**
 * This method is used to get all file paths in current directory
 * and also in all of the sub-directories
 * @returns {Promise}
 */
async function getAllFilePaths() {
  const paths = await glob(INPUT_DIR + '/**/*', { nodir: true })
  return paths
}

/**
 * This method is used to zip all the directories content inside it into another directory
 * @param {string[]} inputFilePaths
 * @returns {Promise}
 */
function zipFilesInDirectory(inputFilePaths) {
  // create a file to stream archive data to.
  const stream = fs.createWriteStream(OUTPUT_FILE_PATH)
  const archive = archiver('zip', {
    zlib: { level: 9 }, // Sets the compression level.
  })

  return new Promise((resolve, reject) => {
    archive.on('error', (err) => reject(err)).pipe(stream)

    // append a file
    inputFilePaths.forEach(function (filePath) {
      archive.file(filePath, { name: path.basename(filePath) })
    })

    stream.on('close', () => resolve())
    archive.finalize()
  })
}

module.exports = {
  createDirectory,
  deleteZipFile,
  getAllFilePaths,
  zipFilesInDirectory,
}
