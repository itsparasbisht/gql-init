import { useCart } from "@/context/CartContext";
import { useMutation } from "@apollo/client";
import { useNavigate, Link } from "react-router-dom";
import { CREATE_ORDER_MUTATION } from "@/graphql/mutations";
import { GET_MY_ORDERS } from "@/graphql/queries";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, total, clearCart } = useCart();
  const navigate = useNavigate();

  const [createOrder, { loading }] = useMutation(CREATE_ORDER_MUTATION, {
    refetchQueries: [{ query: GET_MY_ORDERS }],
    onCompleted: () => {
      clearCart();
      navigate("/profile");
    },
  });

  const handleCheckout = () => {
    const items = cart.map((item) => ({
      productId: item.id,
      quantity: item.quantity,
    }));
    createOrder({ variables: { input: { items } } });
  };

  if (cart.length === 0) {
    return (
      <div className="text-center py-20 flex flex-col items-center gap-4">
        <ShoppingBag className="h-16 w-16 text-muted-foreground" />
        <h2 className="text-2xl font-bold">Your cart is empty</h2>
        <p className="text-muted-foreground">Looks like you haven't added anything to your cart yet.</p>
        <Link to="/">
          <Button>Start Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-4">
        <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
        {cart.map((item) => (
          <Card key={item.id}>
            <CardContent className="p-4 flex gap-4">
              <div className="h-24 w-24 bg-muted rounded overflow-hidden flex-shrink-0">
                {item.imageUrl && <img src={item.imageUrl} alt={item.name} className="h-full w-full object-cover" />}
              </div>
              <div className="flex-grow space-y-1">
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-sm text-muted-foreground">${item.price.toFixed(2)}</p>
                <div className="flex items-center gap-2 pt-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="text-right flex flex-col justify-between">
                <p className="font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-destructive hover:text-destructive hover:bg-destructive/10"
                  onClick={() => removeFromCart(item.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div>
        <Card className="sticky top-8">
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Shipping</span>
              <span className="text-green-600 font-medium">Free</span>
            </div>
            <Separator />
            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" size="lg" onClick={handleCheckout} disabled={loading}>
              {loading ? "Processing..." : "Checkout"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
