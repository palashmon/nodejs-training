# Nodejs Training: Day 5

## Compress (zip) Files Assignment

### Description

Write an application that processes a directory and zip all the directories content inside it into another directory.

### Input Directory Structure

INPUT: Following diagram is a directory structure that the node application is going to process.

- test
  - a.txt
  - b.txt
  - temp [ directory]
    - temp1.txt
    - temp2.txt
  - dummy [ directory]
    - dummy1.txt
    - dummy2.txt
  - readMe.md
  - doc.txt

### Output Directory Structure

OUTPUT should be a zip directory named as `output.zip` with all the files in it. Make sure it extracts all the content to into a single directory.

- output [ directory]
  - output.zip
    - a.txt
    - b.txt
    - temp1.txt
    - temp2.txt
    - dummy1.txt
    - dummy2.txt
    - readMe.md
    - doc.txt

### Solution

My node and npm versions used for this demo:

- Node: `12.16.2`
- Npm: `6.14.5`

How to run locally:

1. Clone this repo.
2. Then go to this folder and install npm modules like:
   ```bash
   cd nodejs-training\Day5-Assignments\1-compress-files\
   npm install
   ```
3. Then finally start the node app like:

   ```bash
   npm start
   ```

4. If everything is fine, then we should see an output in CLI like:

   ```
   Files has been successfully compressed and added to "/output" directory.
   ```

5. Then go to `"output"` folder inside `"1-compress-files"` folder and we should see a zip file named as `"output.zip"` with all the files in it.
