let url =
  "https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json";
let options = {
  method: "GET",
};

const convertData = (data) => {
  const {
    badge_text,
    compare_at_price,
    id,
    image,
    price,
    second_image,
    title,
    vendor,
  } = data;
  return {
    badgeText: badge_text,
    compareAtPrice: compare_at_price,
    id,
    image,
    price,
    second_image,
    title,
    vendor,
  };
};

const getDiscount = (p1, p2) => Math.round((p1 / p2) * 100);

const getCategory = (data, selected) => {};

fetch(url, options)
  .then((res) => {
    return res.json();
  })
  .then((jsonData) => {
    let data = jsonData.categories;

    // work here
    const selectedCategory1 = getCategory(data, selected);
    const selectedCategory = data[0];

    // console.log(data);
    const categories = data.categories;

    const productsList = selectedCategory.category_products;
    console.log(productsList);

    const productsContainer = document.getElementById("products-container");
    productsList.forEach((element) => {
      const formattedData = convertData(element);
      const {
        badgeText,
        compareAtPrice,
        id,
        image,
        price,
        second_image,
        title,
        vendor,
      } = formattedData;

      const discount = getDiscount(price, compareAtPrice);

      const productItem = document.createElement("li");
      productItem.classList.add("product-item");
      productsContainer.appendChild(productItem);

      const backgroundImage = document.createElement("div");
      backgroundImage.style.backgroundImage = `url(${image})`;
      backgroundImage.classList.add("product-image");
      productItem.appendChild(backgroundImage);

      const productDetails = document.createElement("div");
      productDetails.classList.add("product-details");
      productItem.appendChild(productDetails);

      const topRow = document.createElement("div");
      topRow.classList.add("top-row");
      productDetails.appendChild(topRow);

      const titleItem = document.createElement("h1");
      titleItem.classList.add("product-name");
      titleItem.innerHTML = `${title}`;
      topRow.appendChild(titleItem);

      const vendorItem = document.createElement("p");
      vendorItem.classList.add("vendor-name");
      vendorItem.innerHTML = `${vendor}`;
      topRow.appendChild(vendorItem);

      const bottomRow = document.createElement("div");
      bottomRow.classList.add("bottom-row");
      productDetails.appendChild(bottomRow);

      const priceItem = document.createElement("p");
      priceItem.classList.add("price-name");
      priceItem.innerHTML = `Rs ${price}`;
      bottomRow.appendChild(priceItem);

      const comparePriceItem = document.createElement("p");
      comparePriceItem.classList.add("compare-price");
      comparePriceItem.innerHTML = `${compareAtPrice}`;
      bottomRow.appendChild(comparePriceItem);

      const discountItem = document.createElement("p");
      discountItem.classList.add("product-name");
      discountItem.innerHTML = `${discount}% Off`;
      bottomRow.appendChild(discountItem);

      const button = document.createElement("button");
      button.innerHTML = "Add to Cart";
      button.classList.add("add-button");
      productDetails.appendChild(button);
    });
  });
