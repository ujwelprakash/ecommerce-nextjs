Next.js E-commerce Application

This is a simplified E-commerce website built with Next.js (App Router), Tailwind CSS, and integrated with a provided backend API.
It includes authentication, products, cart, and orders functionality.

🚀 Features
Public Pages

/ → Homepage showing all products

/products/[id] → Product details with Add to Cart

/login → User login

/register → New user registration

Authenticated Pages

/cart → View cart, checkout order

/orders → View past orders

Additional

Dynamic Navbar (Login/Logout, Cart, Orders)

Protected routes (redirect to login if not authenticated)

Token stored in localStorage

Loading and error handling

🛠 Tech Stack

Framework: Next.js
 (App Router)

Styling: Tailwind CSS v4

State Management: React Context API

HTTP Client: Axios

Authentication: JWT token (localStorage)

⚡ API Endpoints Used

Base URL: https://globosoft.co.uk/ecommerce-api

Auth

POST /api/auth/register.php

POST /api/auth/login.php

Products

GET /api/products/list.php

GET /api/products/details.php?id={id}

Cart

POST /api/cart/add.php

GET /api/cart/view.php

POST /api/checkout/checkout.php

Orders

GET /api/orders/list.php

ecommerce-nextjs/
│── app/              # Next.js App Router pages
│   ├── page.js       # Homepage (Products list)
│   ├── login/        # Login page
│   ├── register/     # Register page
│   ├── products/     # Product details
│   ├── cart/         # Cart page
│   └── orders/       # Orders page
│
│── components/       # Navbar, ProductCard, Loader, ProtectedRoute
│── context/          # AuthContext (login/logout, token)
│── lib/              # Axios API helpers
│── public/           # Static assets
"# ecommerce-nextjs" 
