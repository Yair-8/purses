class LoadOnScroll {
  constructor(containerSelector, baseRoute, itemsPerPage) {
    // Елемент контейнера, де будуть додаватися нові елементи
    this.container = document.querySelector(containerSelector);

    // Базова адреса для завантаження даних (може містити параметри пагінації)
    this.baseRoute = baseRoute;

    // Кількість елементів, що завантажуються за один раз
    this.itemsPerPage = itemsPerPage;

    // Поточна сторінка (починається з 0)
    this.page = 0;
    this.query = "";
    //this.sort = "price:asc";
    // Флаг завантаження, щоб запобігти багаторазовим завантаженням
    this.loading = false;

    // Ініціалізація класу
    this.init();
  }

  // Асинхронне завантаження елементів
  async loadItems() {
    // Якщо завантаження вже відбувається, виходимо
    if (this.loading) return;
    // Встановлюємо прапор завантаження
    this.loading = true;

    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/products?page=${this.page}&limit=${this.itemsPerPage}&${this.query}`
      );
      // const response = await fetch(
      //   `https://less12-backend.onrender.com/api/v1/products?page=${this.page}&limit=${this.itemsPerPage}&${this.query}`
      // );

      if (!response.ok) {
        throw new Error(
          "Failed to fetch products. HTTP Status: " + response.status
        );
      }
      const resData = await response.json();

      if (!resData.data || !resData.data.documents) {
        throw new Error("Invalid data format or no products found.");
      }

      // Додаємо завантажені елементи до контейнера
      let productsList = resData.data?.documents;

      const items = productsList
        .slice(
          this.page * this.itemsPerPage,
          (this.page + 1) * this.itemsPerPage
        ) // Slice to get only the current page's products
        .map((product, ind) => ({
          name: `${ind + 1 + this.page * this.itemsPerPage} )  ${
            product.title
          }`,
          title: product.title,
          price: product.price,
          image: product.image,
          description: product.description,
        }));

      // Обробка зображень продуктів
      items.forEach((prod) => {
        if (prod.image && !prod.image.startsWith("data:"))
          prod.image = "data:image;base64," + prod.image;
      });
      // Створення таблиці продуктів
      const grid = GridDataManager.createGridFromList(items);
      this.container.append(grid);

      // Збільшуємо номер сторінки для наступного завантаження
      this.page++;
      console.log("Current Page:", this.page);
    } catch (error) {
      console.error("Помилка завантаження елементів:", error);
    } finally {
      // Знімаємо прапор завантаження незалежно від успіху чи помилки
      this.loading = false;
    }
  }
  setQuery(query) {
    this.query = query;
  }
  resetPage() {
    this.page = 0;
  }
  // Ініціалізація класу
  init() {
    // Завантажуємо першу порцію елементів
    this.loadItems();

    // Додаємо обробник події прокручування для підвантаження нових елементів
    window.addEventListener("scroll", () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 100
      ) {
        this.loadItems();
      }
    });
    /*
Цей вираз використовується для визначення, чи користувач прокрутив сторінку до кінця або майже до кінця. Ось пояснення кожного значення:

- window.innerHeight: Висота видимої області вікна браузера (висота вікна перегляду).
- window.scrollY: Відстань, на яку сторінка була прокручена вертикально від верхньої частини.
- document.body.offsetHeight: Повна висота документа, включаючи видиму частину та ту, що знаходиться за межами видимої області (висота всього контенту на сторінці).
- 100: Відступ у 100 пікселів від нижньої частини документа. Це робиться для того, щоб завантаження нових даних починалося трохи раніше, ніж користувач досягне самого кінця сторінки.
 */
  }
}
