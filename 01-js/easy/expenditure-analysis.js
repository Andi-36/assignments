/*
  Implement a function `calculateTotalSpentByCategory` which takes a list of transactions as parameter
  and return a list of objects where each object is unique category-wise and has total price spent as its value.
  transactions is an array where each
  Transaction - an object like 
        {
		id: 1,
		timestamp: 1656076800000,
		price: 10,
		category: 'Food',
		itemName: 'Pizza',
	}
  Output - [{ category: 'Food', totalSpent: 10 }] // Can have multiple categories, only one example is mentioned here
*/

function calculateTotalSpentByCategory(transactions) {
  const spentList = [];

  for (let index = 0; index < transactions.length; index++) {
    const element = transactions[index];
    const checkCat = spentList?.some(
      (cat) => cat.category === element.category
    );

    console.log("checkCat", checkCat);

    if (checkCat) {
      spentList?.map((item) => {
        if (item.category === element.category) {
          item.totalSpent += element.price;
        }
      });
    } else {
      spentList.push({
        category: element.category,
        totalSpent: element.price,
      });
    }
  }

  return spentList;
}

calculateTotalSpentByCategory([
  {
    id: 1,
    timestamp: 1656076800000,
    price: 10,
    category: "Food",
    itemName: "Pizza",
  },
]);

module.exports = calculateTotalSpentByCategory;
