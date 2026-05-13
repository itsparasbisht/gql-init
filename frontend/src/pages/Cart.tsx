import { useCart } from "@/context/CartContext";
import { useMutation } from "@apollo/client";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { CREATE_ORDER_MUTATION } from "@/graphql/mutations";
import { GET_MY_ORDERS } from "@/graphql/queries";
import { parseApolloError } from "@/lib/errors";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Trash2, Plus, Minus, ShoppingBag, CreditCard, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, total, clearCart } = useCart();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const [createOrder, { loading }] = useMutation(CREATE_ORDER_MUTATION, {
    refetchQueries: [{ query: GET_MY_ORDERS }],
    onCompleted: () => {
      toast.success("Order placed successfully!", {
        description: "Your items are on their way.",
      });
      clearCart();
      navigate("/profile");
    },
    onError: (err) => {
      const parsed = parseApolloError(err);
      setError(parsed.message);
      toast.error("Checkout failed", {
        description: parsed.message,
      });
    },
  });

  const handleCheckout = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Authentication required", {
        description: "Please login to place an order.",
      });
      navigate("/login");
      return;
    }

    setError(null);
    const items = cart.map((item) => ({
      productId: item.id,
      quantity: item.quantity,
    }));
    createOrder({ variables: { input: { items } } });
  };

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-center max-w-lg mx-auto">
        <div className="h-24 w-24 bg-muted rounded-full flex items-center justify-center mb-6">
          <ShoppingBag className="h-10 w-10 text-muted-foreground opacity-50" />
        </div>
        <h2 className="text-3xl font-black tracking-tight">Your cart is empty</h2>
        <p className="text-muted-foreground mt-2 text-lg">
          Looks like you haven't discovered anything yet. Start exploring our premium collection!
        </p>
        <Link to="/" className="mt-8">
          <Button size="lg" className="px-8 cursor-pointer font-bold">Start Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-10">
      <h1 className="text-5xl font-black tracking-tight border-b pb-6 flex items-baseline gap-4">
        Shopping Cart 
        <span className="text-sm font-medium text-muted-foreground uppercase tracking-widest">({cart.length} unique items)</span>
      </h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
        <div className="lg:col-span-2 space-y-6">
          {cart.map((item) => (
            <Card key={item.id} className="overflow-hidden border-none shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-0 flex flex-col sm:flex-row h-full">
                <div className="w-full sm:w-48 aspect-square bg-muted flex-shrink-0 relative overflow-hidden">
                  {item.imageUrl ? (
                    <img src={item.imageUrl} alt={item.name} className="h-full w-full object-cover transition-transform hover:scale-105" />
                  ) : (
                    <div className="flex items-center justify-center h-full text-muted-foreground italic text-xs">No Image</div>
                  )}
                </div>
                <div className="flex-grow p-6 flex flex-col justify-between">
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <h3 className="text-xl font-bold tracking-tight mb-1">{item.name}</h3>
                      <p className="text-primary font-black text-lg">${item.price.toFixed(2)}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors cursor-pointer"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <Trash2 className="h-5 w-5" />
                    </Button>
                  </div>
                  
                  <div className="flex items-center gap-4 mt-6">
                    <div className="flex items-center border rounded-lg bg-muted/30">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-10 w-10 cursor-pointer hover:bg-background"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-10 text-center font-black text-sm">{item.quantity}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-10 w-10 cursor-pointer hover:bg-background"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="text-sm font-medium text-muted-foreground italic">
                      Subtotal: <span className="font-bold text-foreground">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="lg:sticky lg:top-28">
          <Card className="border-none shadow-2xl bg-secondary overflow-hidden">
            <CardHeader className="bg-primary text-primary-foreground">
              <CardTitle className="text-2xl font-black uppercase tracking-widest flex items-center gap-3">
                <CreditCard className="h-6 w-6" />
                Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
              {error && (
                <div className="p-4 text-xs font-black uppercase tracking-widest text-destructive bg-white rounded-xl shadow-inner border-2 border-destructive/20">
                  {error}
                </div>
              )}
              <div className="space-y-4">
                <div className="flex justify-between text-sm font-medium opacity-70 uppercase tracking-widest">
                  <span>Subtotal</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm font-medium opacity-70 uppercase tracking-widest">
                  <span>Standard Shipping</span>
                  <span className="text-green-600 font-black italic">FREE</span>
                </div>
                <Separator className="bg-foreground/10" />
                <div className="flex justify-between items-baseline">
                  <span className="text-xs font-black uppercase tracking-widest opacity-50">Total Amount</span>
                  <span className="text-3xl font-black text-primary">${total.toFixed(2)}</span>
                </div>
              </div>
              
              <div className="pt-4">
                <Button 
                  className="w-full h-16 text-lg font-black uppercase tracking-widest cursor-pointer shadow-xl transition-all hover:scale-[1.02] active:scale-95" 
                  size="lg" 
                  onClick={handleCheckout} 
                  disabled={loading}
                >
                  {loading ? "Processing..." : "Complete Checkout"}
                </Button>
              </div>

              <div className="flex flex-col items-center gap-2 opacity-50 pt-4">
                <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest">
                  <ShieldCheck className="h-4 w-4" /> 
                  SSL Secured Checkout
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
