// lib/api.ts

import axios from "axios";

// Ganti dengan URL backend Laravel kamu
const BASE_URL = "http://127.0.0.1:8000/api";

const getToken = () => localStorage.getItem("token"); // atau dari cookies

// =====================
// AUTH
// =====================
export const login = async (username: string, password: string) => {
  const response = await axios.post(`${BASE_URL}/login`, {
    username,
    password,
  });
  return response.data;
};

export const logout = async (token: string | null) => {
  if (!token) throw new Error("Token tidak ditemukan");

  const res = await axios.post(
    `${BASE_URL}/logout`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};

// =====================
// USER
// =====================
export async function fetchUsers() {
  const res = await fetch(`${BASE_URL}/user`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  return res.json();
}

export async function createUser(data: {
  name: string;
  email: string;
  password: string;
}) {
  const res = await fetch(`${BASE_URL}/user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function updateUser(id: string, data: any) {
  const token = getToken();
  if (!token) throw new Error("Token tidak ditemukan");

  const res = await fetch(`${BASE_URL}/user/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errText = await res.text();
    console.error("Gagal update:", errText);
    throw new Error("Update gagal: " + errText);
  }

  return res.json();
}

export async function deleteUser(id: number) {
  const res = await fetch(`${BASE_URL}/user/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  return res.json();
}


// ===========================
// Customer API
// ===========================

// Ambil daftar customer
export async function fetchCustomers() {
  const res = await fetch(`${BASE_URL}/customers`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  if (!res.ok) throw new Error("Gagal fetch customer");

  const json = await res.json();
  if (!Array.isArray(json.data)) {
    console.warn("Response data bukan array:", json);
    return [];
  }

  return json.data;
}

// Tambah customer
export async function createCustomer(data: {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
}) {
  const res = await fetch(`${BASE_URL}/customers`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.json();
    const e = new Error("Gagal membuat customer");
    (e as any).response = {
      status: res.status,
      json: async () => error,
    };
    throw e;
  }

  return res.json();
}

// Update customer
export async function updateCustomer(id: string, data: any) {
  const token = getToken();
  if (!token) throw new Error("Token tidak ditemukan");

  const res = await fetch(`${BASE_URL}/customers/${id}`, {
    method: "PATCH", // atau "PUT" tergantung endpoint Laravel
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.json();
    const e = new Error("Gagal update customer");
    (e as any).response = {
      status: res.status,
      json: async () => error,
    };
    throw e;
  }

  return res.json();
}

// Hapus customer
export async function deleteCustomer(id: string) {
  const res = await fetch(`${BASE_URL}/customers/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  if (!res.ok) throw new Error("Gagal hapus customer");

  return res.json();
}


// ===========================
// Product API
// ===========================

// Ambil daftar produk
export async function fetchProducts() {
  const res = await fetch(`${BASE_URL}/products`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  if (!res.ok) throw new Error("Gagal fetch produk");

  const json = await res.json();
  if (!Array.isArray(json.data)) {
    console.warn("Data produk bukan array:", json);
    return [];
  }

  return json.data;
}

// Tambah produk
export async function createProduct(data: {
  product_id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category_id: string;
}) {
  const res = await fetch(`${BASE_URL}/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.json();
    const e = new Error("Gagal membuat produk");
    (e as any).response = {
      status: res.status,
      json: async () => error,
    };
    throw e;
  }

  return res.json();
}

// Update produk
export async function updateProduct(product_id: string, data: any) {
  const token = getToken();
  if (!token) throw new Error("Token tidak ditemukan");

  const res = await fetch(`${BASE_URL}/products/${product_id}`, {
    method: "PATCH", // Gunakan "PUT" jika API Laravel pakai PUT
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.json();
    const e = new Error("Gagal update produk");
    (e as any).response = {
      status: res.status,
      json: async () => error,
    };
    throw e;
  }

  return res.json();
}

// Hapus produk
export async function deleteProduct(product_id: string) {
  const res = await fetch(`${BASE_URL}/products/${product_id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  if (!res.ok) throw new Error("Gagal hapus produk");

  return res.json();
}


// ===========================
// Order API
// ===========================

// Ambil daftar order
export async function fetchOrders() {
  const res = await fetch(`${BASE_URL}/orders`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  if (!res.ok) throw new Error("Gagal fetch order");

  const json = await res.json();
  if (!Array.isArray(json.data)) {
    console.warn("Data order bukan array:", json);
    return [];
  }

  return json.data;
}

// Tambah order
export async function createOrder(data: {
  customer_id: string;
  order_date: string;
  total_amount: number;
  status: string;
}) {
  const res = await fetch(`${BASE_URL}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.json();
    const e = new Error("Gagal membuat order");
    (e as any).response = {
      status: res.status,
      json: async () => error,
    };
    throw e;
  }

  return res.json();
}

export async function updateOrder(order_id: string, data: any, token: string | null) {
  if (!token) throw new Error("Token tidak ditemukan");

  const res = await fetch(`${BASE_URL}/orders/${order_id}`, {
    method: "PATCH", // atau "PUT" tergantung backend Laravel kamu
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.json();
    const e = new Error("Gagal update pesanan");
    (e as any).response = {
      status: res.status,
      json: async () => error,
    };
    throw e;
  }

  return res.json();
}


// Hapus order
export async function deleteOrder(order_id: string) {
  const res = await fetch(`${BASE_URL}/orders/${order_id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  if (!res.ok) throw new Error("Gagal hapus order");

  return res.json();
}

// ===========================
// OrderItem API
// ===========================

// Ambil semua order item
// export async function fetchOrderItems() {
//   const res = await fetch(`${BASE_URL}/order-items`, {
//     headers: {
//       Authorization: `Bearer ${getToken()}`,
//     },
//   });

//   if (!res.ok) throw new Error("Gagal fetch order items");

//   const json = await res.json();
//   if (!Array.isArray(json.data)) {
//     console.warn("Response data bukan array:", json);
//     return [];
//   }

//   return json.data;
// }

// // Tambah order item
// export async function createOrderItem(data: {
//   order_item_id?: string;
//   product_id: string;
//   order_id: string;
//   quantity: number;
// }) {
//   const res = await fetch(`${BASE_URL}/order-items`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${getToken()}`,
//     },
//     body: JSON.stringify(data),
//   });

//   if (!res.ok) {
//     const error = await res.json();
//     const e = new Error("Gagal menambahkan order item");
//     (e as any).response = {
//       status: res.status,
//       json: async () => error,
//     };
//     throw e;
//   }

//   return res.json();
// }

// // Update order item
// export async function updateOrderItem(id: string, data: any) {
//   const token = getToken();
//   if (!token) throw new Error("Token tidak ditemukan");

//   const res = await fetch(`${BASE_URL}/order-items/${id}`, {
//     method: "PATCH",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//     body: JSON.stringify(data),
//   });

//   if (!res.ok) {
//     const error = await res.json();
//     const e = new Error("Gagal update order item");
//     (e as any).response = {
//       status: res.status,
//       json: async () => error,
//     };
//     throw e;
//   }

//   return res.json();
// }

// // Hapus order item
// export async function deleteOrderItem(id: string) {
//   const res = await fetch(`${BASE_URL}/order-items/${id}`, {
//     method: "DELETE",
//     headers: {
//       Authorization: `Bearer ${getToken()}`,
//     },
//   });

//   if (!res.ok) throw new Error("Gagal menghapus order item");

//   return res.json();
// }
// lib/api.ts

// =====================
// ORDER ITEMS
// =====================
export const fetchOrderItems = async () => {
  const token = getToken();
  const response = await axios.get(`${BASE_URL}/order-items`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data.data || response.data;
};

// export const createOrderItem = async (data: any, token: string | null) => {
//   await axios.post(`${BASE_URL}/order-items`, data, {
//     headers: { Authorization: `Bearer ${token}` },
//   });
// };

export const createOrderItem = async (data: any, token: string | null) => {
  try {
    const response = await axios.post(`${BASE_URL}/order-items`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error: any) {
    console.error("Order item creation failed:", error.response?.data || error.message);
    throw error;
  }
};


export const updateOrderItem = async (id: number, data: any, token: string | null) => {
  await axios.put(`${BASE_URL}/order-items/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const deleteOrderItem = async (id: number, token: string | null) => {
  await axios.delete(`${BASE_URL}/order-items/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};


// =====================
// CATEGORY API
// =====================

export const fetchCategories = async () => {
  const token = getToken();
  const response = await axios.get(`${BASE_URL}/categories`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data.data;
};

export const createCategory = async (data: any) => {
  const token = getToken();
  await axios.post(`${BASE_URL}/categories`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const updateCategory = async (category_id: number, data: any) => {
  const token = getToken();
  await axios.put(`${BASE_URL}/categories/${category_id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const deleteCategory = async (category_id: number) => {
  const token = getToken();
  await axios.delete(`${BASE_URL}/categories/${category_id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};








// =====================
// DASHBOARD
// =====================
export async function fetchDashboardCounts() {
  const res = await fetch(`${BASE_URL}/dashboard-counts`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  if (!res.ok) throw new Error("Gagal mengambil data dashboard");
  return res.json();
}

// =====================
// REGISTER
// =====================
export async function registerUser(data: {
  name: string;
  username: string;
  password: string;
  email: string;
}) {
  const res = await fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Registrasi gagal");
  }

  return res.json();
}







