import bcrypt from "bcryptjs";

const data = {
  users: [
    {
      name: "Emmanuel",
      email: "paliemmanuel@gmail.com",
      password: bcrypt.hashSync("12345678"),
      isAdmin: true,
    },
  ],

  products: [
    {
      name: "Smart Reractable Wallet",
      slug: "retractable-wallet",
      category: "accessories",
      image: "/images/wallet.png",
      price: 70,
      brand: "pali",
      rating: 4.8,
      numReviews: 8,
      countInStock: 10,
      description: "Access you cards with a touch of a clip",
    },
    {
      name: "Retro Wallet",
      slug: "retro-wallet",
      category: "accessories",
      image: "/images/wallet.png",
      price: 70,
      brand: "pali",
      rating: 4.8,
      numReviews: 8,
      countInStock: 20,
      description: "Access you cards with a touch of a clip",
    },
  ],
};

export default data;
