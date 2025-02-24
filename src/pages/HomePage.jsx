import ProductList from "../components/products/ProductList";

export default function HomePage() {
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold text-center mb-8">
        Welcome to E-Mullick Store
      </h1>
      <ProductList />
    </div>
  );
}
