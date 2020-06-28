# Nodejs Training: Day 5

## CLI Application Assignment

### Description

Build a CLI application to calculate SUM of purchases.

### CLI

Here is how the CLI application should work.

```bash
Hey there, We have the following items in our shop.

1) Soap - 10 rupees/item
2) Tooth Paste 20 rupees/item
3) Ice cream 30 rupees/item

What do you want to purchase today ?

user input : 1
How many ?
user input : 2
Anything else ?
user input : Yes

1) Soap - 10 rupees/item
2) Tooth Paste 20 rupees/item
3) Ice cream 30 rupees/item

What do you want to purchase today ?
2
How many ?
1
Anything else ?
No
calculating your bill...

Your bill is 40 rupees
```

### Solution

My node and npm versions used for this demo:

- Node: `12.16.2`
- Npm: `6.14.5`

### How to run locally?

1. Clone this repo.
2. Then go to this folder and install npm modules like:
   ```bash
   cd nodejs-training\Day5-Assignments\2-cli-app
   npm install
   ```
3. Then finally start the cli app like:

   ```bash
   node cli.js start
   ```

   Or, using shortcut like

   ```bash
   node cli.js s
   ```

4. Then you will see first message like:

   ```bash
   Hey there, we have the following items in our shop.

   1) Soap - 10 rupees/item
   2) Tooth Paste - 20 rupees/item
   3) Ice cream - 30 rupees/item

   What do you want to purchase today?
   ```

   Enter a value between 1 and 3. Then you will see another message like:

   ```bash
   How many do you need?
   ```

   Enter a quantity between 1 and 100. Then you will see another message like:

   ```bash
   Anything else?
   ```

   If you want to continue, then press 'y', else you can press 'n' or enter, as by default answer is 'No'. if the answer was 'Yes', then the whole process will start again, else it will show a message like:

   ```bash
   Calculating your bill...
   Your bill is 40 rupees.
   ```

### How to run globally?

1. Clone this repo.
2. Then go to this folder and install npm modules like:

   ```bash
   cd nodejs-training\Day5-Assignments\2-cli-app
   npm install
   ```

3. Now, we need to install our CLI module globally like:

   ```bash
   npm install -g
   ```

   This works because we have add a [shebang](https://en.wikipedia.org/wiki/Shebang_%28Unix%29) line to the top of `cli.js`:

   ```js
   #!/usr/bin/env node
   ```

   Also, we need to add a `bin` property to our `package.json` file. This maps the command name (`calculate`) to the name of the file to be executed (relative to `package.json`):

   ```json
   "bin": {
      "calculate": "./cli.js"
   }
   ```

   If you want to confirm the install worked, you can list your globally installed Node modules using this:

   ```bash
   npm ls -g --depth=0
   ```

   We should see something like this in the list:

   ```bash
   +-- first-cli-app@1.0.0 -> d:\nodejs-training\Day5-Assignments\2-cli-app
   ```

4. Now, we just need to call the cli command name (`calculate`) like:

   ```bash
   calculate start
   ```

   or, just

   ```bash
   calculate s
   ```

   Now, we will see same interface as we have seen when we run the cli locally.

   To break out of the cli, press `CTRL + C` anytime.
