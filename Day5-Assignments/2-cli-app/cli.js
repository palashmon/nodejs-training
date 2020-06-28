#!/usr/bin/env node

/**
 * @file    A simple CLI application to calculate SUM of purchases.
 * @author  Palash Mondal
 */
//@ts-check
const program = require('commander')
const { prompt } = require('inquirer')
const Helper = require('./helper')

let orderTotal = 0
program.version('1.0.0').description('A simple CLI application to calculate SUM of purchases')

async function setupAction() {
  console.log('\n1) Soap - 10 rupees/item')
  console.log('2) Tooth Paste - 20 rupees/item')
  console.log('3) Ice cream - 30 rupees/item\n')
  const answers = await prompt(Helper.getQuestions())

  // Calculate the sum of current order
  orderTotal += Helper.itemPriceEnum[answers.item] * Number(answers.quantity)

  if (answers.addMoreItems) {
    setupAction()
    return // Skip the remaining logic
  }

  console.log('\nCalculating your bill...')
  console.log(`\nYour bill is ${orderTotal} rupees.\nThank you for shopping with us.`)
}

program
  .command('start') // No need of specifying arguments here
  .alias('s')
  .description('Add items that you want to purchase today')
  .action(() => {
    console.log('\nHey there, we have the following items in our shop.')
    setupAction()
  })

program.parse(process.argv)
