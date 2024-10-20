import React from "react";
import Link from "next/link";

const Header = () => {
  return (
    <header className="bg-blue-600 p-4 text-white flex justify-between items-center">
      <h1 className="text-2xl font-bold"></h1>
      <nav>
        <Link href="/" className="mr-4 hover:underline">
          Inicio
        </Link>
        <Link href="/cart" className="mr-4 hover:underline">
          Carrito
        </Link>
        <Link href="/my-account" className="hover:underline">
          Mi Cuenta
        </Link>
      </nav>
    </header>
  );
};

export default Header;
