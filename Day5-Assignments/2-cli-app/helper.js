/**
 * @file    These are our main helper methods used in main module
 * @author  Palash Mondal
 */
//@ts-check

/**
 * This enum is used to get the item price based on item number
 */
const itemPriceEnum = {
  '1': 10, // Soap - 10 rupees/item
  '2': 20, // Tooth Paste - 20 rupees/item
  '3': 30, // Ice cream - 30 rupees/item
}

/**
 * This method is used to get set of questions that will be
 * displayed in the cli one-by-one, as user gives the input
 */
function getQuestions() {
  const questions = [
    {
      type: 'input',
      name: 'item',
      message: 'What do you want to purchase today?',
      validate: function (value) {
        var reg = /^\d+$/
        var valid = reg.test(value)
        if (!valid) return 'Please enter a number'
        if (value < 1 || value > 3) return 'Please enter a number between 1 and 3'
        return valid
      },
    },
    {
      type: 'input',
      name: 'quantity',
      message: 'How many do you need?',
      validate: function (value) {
        var reg = /^\d+$/
        var valid = reg.test(value)
        if (!valid) return 'Please enter a number between 1 and 100'
        if (value < 1 || value > 100) return 'Please enter the quantity between 1 and 100'
        return valid
      },
    },
    {
      type: 'confirm',
      name: 'addMoreItems',
      message: 'Anything else?',
      default: false,
    },
  ]

  return questions
}

module.exports = {
  getQuestions,
  itemPriceEnum,
}
