import { useCart } from "../../context/CartContext";

export default function CartItem({ item }) {
  const { updateQuantity, removeFromCart } = useCart();

  const subtotal = item.price * item.quantity;

  return (
    <div className="grid grid-cols-6 gap-4 items-center py-4 border-b">
      <div className="col-span-2 flex items-center gap-4">
        <img
          src={item.imageUrl}
          alt={item.name}
          className="w-16 h-16 object-cover rounded"
        />
        <div>
          <h3 className="font-medium">{item.name}</h3>
          <p className="text-sm text-gray-500 line-clamp-2">
            {item.description}
          </p>
        </div>
      </div>

      <div className="text-center">${item.price.toFixed(2)}</div>

      <div className="flex justify-center items-center space-x-2">
        <button
          onClick={() => updateQuantity(item.id, item.quantity - 1)}
          className="p-2 rounded-full hover:bg-gray-100">
          -
        </button>
        <span className="w-8 text-center">{item.quantity}</span>
        <button
          onClick={() => updateQuantity(item.id, item.quantity + 1)}
          className="p-2 rounded-full hover:bg-gray-100">
          +
        </button>
      </div>

      <div className="text-center font-medium">${subtotal.toFixed(2)}</div>

      <div className="flex justify-center">
        <button
          onClick={() => removeFromCart(item.id)}
          className="text-red-600 hover:text-red-700">
          Remove
        </button>
      </div>
    </div>
  );
}
