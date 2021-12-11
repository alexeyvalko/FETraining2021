import {K1, K2, extraCharge1, extraCharge2, extraCharge3} from './common/constants'


/** Add extra charge to pizza
 * @param  {number} totalPice - total price of pizza without extra charge
 * @return {number} total price with extra charge
 */


const addExtraCharge  = (totalPice) => {
  let price = parseInt(totalPice, 10)
  const lowerK1 = totalPice < K1;
  const lowerK2 = totalPice < K2;
  const greaterK2 = totalPice > K2

  if(lowerK1) {
  price = Math.round(price + (price * extraCharge1 / 100))
  }

  if(!lowerK1 && lowerK2) {
    price = Math.round(price + (price * extraCharge2 / 100))
  }

  if(greaterK2) {
    price = Math.round(price + (price * extraCharge3 / 100))
  }

  return price
}

export default addExtraCharge;