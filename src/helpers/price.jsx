const getProductPrice = (prices) => {
  let productPrice = {};
  prices.forEach((price) => {
    if (
      price.currency.label ===
      JSON.parse(localStorage.getItem("activeCurrency"))?.label
    ) {
      productPrice = price;
    }
  });

  return productPrice;
};

export default getProductPrice;
