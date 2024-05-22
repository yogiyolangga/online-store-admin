export const dollar = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
});

export const isLoggedIn = () => {
  const token = localStorage.getItem("tokenAdmin");
  return !!token;
};

export function truncateTitle(str) {
  if (str.length > 20) {
    return str.substring(0, 30) + "..."; // Mengambil karakter dari indeks 0 hingga 7
  } else {
    return str; // Mengembalikan string asli jika panjangnya kurang dari atau sama dengan 8 karakter
  }
}

export function pretyDate(d) {
  const date = new Date(d);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}
