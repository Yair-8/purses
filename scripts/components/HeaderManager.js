class HeaderManager {
  constructor(currentPath, menuItems) {
    this.currentPath = currentPath;
    this.menuItems = menuItems;
    this.init();
    this.basePath = this.getBasePath();
  }

  // Метод для декодування даних з токена
  decodeToken(token) {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );
    return JSON.parse(jsonPayload);
  }

  // Метод для визначення базового шляху
  getBasePath() {
    const depth = (this.currentPath.match(/\//g) || []).length;
    return depth ? "../".repeat(depth) : "";
  }

  createMenuItem(item, basePath) {
    const li = document.createElement("li");
    if (item.id) {
      li.id = item.id;
    }

    const a = document.createElement("a");
    a.href = basePath + item.href;
    a.textContent = item.text;

    if (item.href === this.currentPath) {
      a.className = "active";
    }

    li.append(a);
    return li;
  }

  // Метод для формування заголовка
  //   canReadPage(pageMeta) {
  //     return (
  //       !pageMeta.requireAuth ||
  //       (RequestManager.isAuthenticated() &&
  //         (!pageMeta.pageId ||
  //           this.user?.pagesPermissions[pageMeta.pageId]?.read))
  //     );
  //   }
  // Метод для формування заголовка
  createHeader() {
    const basePath = this.getBasePath();
    const header = document.createElement("header");
    header.className = "main-menu";

    const nav = document.createElement("nav");
    const ul = document.createElement("ul");

    this.menuItems.forEach((item) => {
      //Додаємо пукнт навігації, якщо він не потребує автентифікації
      //або користувач є автентифікованим
      // if (this.canReadPage(item.meta)) {
      if (!item.meta.requireAuth || RequestManager.isAuthenticated()) {
        const li = this.createMenuItem(item, basePath);
        ul.append(li);
      }
    });

    nav.append(ul);
    header.append(nav);
    document.body.insertBefore(header, document.body.firstChild);

    // Додаємо додаткову логіку для перевірки аутентифікації
    const token = localStorage.getItem("jwt_token");
    const userLink = document.getElementById("users-link");
    const authLink = document.getElementById("auth-link");

    if (token) {
      const user = this.decodeToken(token);

      if (user) {
        userLink.style.display = "block";
        authLink.innerHTML = `<a href="#" id="logout-link">Logout (${user.username})</a>`;
      }
    }

    document
      .getElementById("auth-link")
      .addEventListener("click", async (event) => {
        if (event.target.id === "logout-link") {
          event.preventDefault();
          await RequestManager.onLogout();
          localStorage.removeItem("jwt_token");
          location.reload();
        }
      });
  }

  // Ініціалізація формування заголовка
  init() {
    this.createHeader();
  }
}
