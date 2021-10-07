// creating products and cart-items using the products array

for (let x = 0; x < products.length; x++) {
  let product = products[x];
  // creating product cards
  $(".products-container").append(
    $("<div>", { id: "card", class: `product-${product.id}` })
      .append(
        $("<img>", {
          src: product.src,
        }).css({
          filter: ` hue-rotate(${x * 65}deg)`,
        })
      )
      .append($("<span>").text(`${product.name}`))
      .append($("<span>").text(`BDT - ${product.price.toFixed(2)}`))
  );

  $(`.product-${product.id}`).on("click", function () {
    $(".cart-welcome-massege").css({ display: "none" });

    // creating cart list items
    if (
      document.getElementsByClassName(`cart-product-${product.id}`).length < 1
    ) {
      $(".cart-list-item").append(
        $("<div>", {
          id: "single-item",
          class: `cart-product-${product.id}`,
        })
          .append(
            $("<img>", { src: product.src }).css({
              filter: ` hue-rotate(${x * 65}deg)`,
            })
          )
          .append(
            $("<div>").text(product.name).css({
              flex: "1",
              paddingLeft: ".5rem",
            })
          )
          .append(
            $("<div>", {
              id: "product-count",
              class: `cart-product-count-${product.id}`,
            })
          )
          .append(
            $("<div>", { class: `cart-product-cost-${product.id}` }).css({
              paddingRight: "1rem",
            })
          )
          .append(
            $("<i>", {
              id: "close",
              class: `fa fa-trash close-${product.id}`,
            })
          )
      );
    }
  });
}

// doing the cart calculations

let totalCost = 0;

for (let x = 0; x < products.length; x++) {
  let product = products[x];
  let count = 0;
  let cost = 0;

  $(`.product-${product.id}`).on("click", function () {
    count++;
    cost = product.price * count;
    totalCost += product.price;

    $(`.cart-product-count-${product.id}`).text(`${count}`);
    $(`.cart-product-cost-${product.id}`).text(`BDT ${cost.toFixed(2)}`);
    $(".total-cost").text(`BDT ${totalCost.toFixed(2)}`);

    $(`.close-${product.id}`).on("click", function () {
      totalCost -= product.price * count;
      count = 0;
      cost = 0;

      $(`.cart-product-${product.id}`).remove();
      $(".total-cost").text(`BDT ${totalCost.toFixed(2)}`);
      totalCost === 0 && $(".cart-welcome-massege").css({ display: "block" });
    });
  });
}
