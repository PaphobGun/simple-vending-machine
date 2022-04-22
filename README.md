# Simple Vending Machine

### Customer Operation
1. A vending machine should accept coins of 1,5,10 THB and banknotes of 20, 50, 100,
500, 1,000 THB
2. Allow users to select products a product available in stock
3. The system should calculate these logics
a. enough money to buy the chosen product
b. enough coin or banknote for change to the customer
c. stock available for sale
4. Return the number of remaining changes and adjust product stock and coin &
banknote stock in the vending machine

## Technology Stack
TypeScript
React with Nextjs


## Scope of work
My preference is Frontend so mainly focus on ``frontend`` the backend is implemented by Nextjs Route API but just for the basic communication with frontend but yes it can calculate the totalprice totalinserted and change.

## Getting Start

You can run by 
```
npm i

npm run dev
```

Or you can run by docker
```
docker build -t svm .
docker run -p 3000:3000 svm
```
