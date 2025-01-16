class GridDataManager {
  static createGridItem(
    item,
    createLinkFunction,
    deleteFunction,
    addToCartFunction,
    showQuantity = false,
    subtractFunction = null,
    addAmountFunction = null
  ) {
    const itemDiv = document.createElement("div");
    itemDiv.classList.add("product-item");

    const detailLink = document.createElement("a");
    detailLink.classList.add("product-link");
    detailLink.href = `details.html?id=${item._id}`;
    //  detailLink.href = `${window.location.origin}/products/details.html?id=${item._id}`;
    //  detailLink.href = getDetailPageUrl(item._id);

    // Image
    const imageDiv = document.createElement("div");
    imageDiv.classList.add("product-image");
    const img = document.createElement("img");
    img.src = item.image;
    img.alt = item.title;
    imageDiv.appendChild(img);
    detailLink.appendChild(imageDiv);

    const contentDiv = document.createElement("div");
    contentDiv.classList.add("product-content");
    // Title
    const titleDiv = document.createElement("div");
    titleDiv.classList.add("product-title");
    titleDiv.textContent = item.title;
    contentDiv.appendChild(titleDiv);

    // Price
    const priceDiv = document.createElement("div");
    priceDiv.classList.add("product-price");
    priceDiv.textContent = "$ " + item.price;
    contentDiv.appendChild(priceDiv);

    // Description
    const descriptionDiv = document.createElement("div");
    descriptionDiv.classList.add("product-description");
    descriptionDiv.textContent = item.description;
    contentDiv.appendChild(descriptionDiv);
    detailLink.appendChild(contentDiv);
    itemDiv.appendChild(detailLink);

    const actionsDiv = document.createElement("div");
    actionsDiv.classList.add("product-actions");
    // Quantity
    if (showQuantity) {
      const quantityDiv = document.createElement("div");
      quantityDiv.classList.add("product-quantity");

      // -- "Quantity" label --
      const quantityLabel = document.createElement("span");
      quantityLabel.textContent = "Quantity: ";
      quantityDiv.appendChild(quantityLabel);

      // Subtract button ( “-” )
      const subtractBtn = document.createElement("button");
      subtractBtn.textContent = "-";
      subtractBtn.disabled = item.amount === 1;
      subtractBtn.onclick = () => {
        if (subtractFunction) {
          subtractFunction(item._id, item.amount);
        } else {
          console.warn("subtractFunction not provided!");
        }
      };
      quantityDiv.appendChild(subtractBtn);

      // Amount display
      const amountSpan = document.createElement("span");
      amountSpan.textContent = ` ${item.amount} `;
      quantityDiv.appendChild(amountSpan);

      // Add button ( “+” )
      const addBtn = document.createElement("button");
      addBtn.textContent = "+";
      addBtn.onclick = () => {
        if (addAmountFunction) {
          addAmountFunction(item._id, item.amount);
        } else {
          console.warn("addAmountFunction not provided!");
        }
      };
      quantityDiv.appendChild(addBtn);
      actionsDiv.appendChild(quantityDiv);

      itemDiv.appendChild(actionsDiv);
    }

    const buttonsContainer = document.createElement("div");
    buttonsContainer.classList.add("buttons-container");

    // Edit Link
    if (createLinkFunction) {
      const editLink = document.createElement("a");
      editLink.classList.add("button-edit");
      editLink.href = createLinkFunction(item._id);
      editLink.textContent = "Edit";
      buttonsContainer.appendChild(editLink);
    }

    // Delete Button
    if (deleteFunction) {
      const deleteButton = document.createElement("button");
      deleteButton.classList.add("button-delete");
      deleteButton.textContent = "Delete";
      deleteButton.onclick = () => deleteFunction(item._id);
      buttonsContainer.appendChild(deleteButton);
    }

    // Add to cart Button
    if (addToCartFunction) {
      const addToCartButton = document.createElement("button");
      addToCartButton.classList.add("addToCart-button");
      addToCartButton.textContent = "Add To Cart";
      addToCartButton.onclick = () => addToCartFunction(item);
      buttonsContainer.appendChild(addToCartButton);
    }
    itemDiv.appendChild(buttonsContainer);

    return itemDiv;
  }

  static createGridFromList(
    data,
    createLinkFunction,
    deleteFunction,
    addToCartFunction,
    showQuantity = false,
    subtractFunction = null,
    addAmountFunction = null
  ) {
    const gridContainer = document.createElement("div");
    gridContainer.classList.add("product-container");

    // Create grid items (for each product)
    data.forEach((item) => {
      const itemDiv = this.createGridItem(
        item,
        createLinkFunction,
        deleteFunction,
        addToCartFunction,
        showQuantity,
        subtractFunction,
        addAmountFunction
      );
      gridContainer.appendChild(itemDiv);
    });

    return gridContainer;
  }
}
