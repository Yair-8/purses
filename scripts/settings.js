const menuItems = [
  { href: "index.html", text: "Home", meta: { requireAuth: false } },
  {
    href: "products/list.html",
    text: "Products",
    meta: { requireAuth: false, pageId: "products" },
  },
  //   {
  //     href: "products/listScroll.html",
  //     text: "ProductsScroll",
  //     meta: { requireAuth: false, pageId: "productsScroll" },
  //   },
  {
    href: "contact/contact.html",
    text: "Contact Us",
    meta: { requireAuth: false, pageId: "contact" },
  },
  {
    href: "users/list.html",
    text: "Users",
    id: "users-link",
    meta: { requireAuth: true, pageId: "users" },
  },
  {
    href: "cart/cart.html",
    text: "Cart",
    id: "cart-link",
    meta: { requireAuth: false },
  },
  {
    href: "auth/login.html",
    text: "Login",
    id: "auth-link",
    meta: { requireAuth: false },
  },
];
