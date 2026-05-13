import { useQuery } from "@apollo/client";
import { GET_PROFILE, GET_MY_ORDERS } from "@/graphql/queries";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { User, Package, Calendar, Mail, Clock } from "lucide-react";

export default function Profile() {
  const { data: profileData, loading: profileLoading } = useQuery(GET_PROFILE);
  const { data: ordersData, loading: ordersLoading } = useQuery(GET_MY_ORDERS);

  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(isNaN(Number(dateStr)) ? dateStr : Number(dateStr));
      return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    } catch {
      return "Recently";
    }
  };

  if (profileLoading || ordersLoading) return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="animate-pulse text-muted-foreground">Loading your profile...</div>
    </div>
  );

  const profile = profileData?.profile;
  const orders = ordersData?.myOrders || [];

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <div className="flex items-center gap-6">
        <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center border-2 border-primary/20">
          <User className="h-10 w-10 text-primary" />
        </div>
        <div>
          <h1 className="text-4xl font-black tracking-tight">Account Overview</h1>
          <p className="text-muted-foreground font-medium">Manage your profile and track your orders.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-none shadow-lg bg-muted/30">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg flex items-center gap-2">
              <Mail className="h-4 w-4 text-primary" />
              Email Address
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xl font-bold">{profile?.email}</p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-lg bg-muted/30">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg flex items-center gap-2">
              <Calendar className="h-4 w-4 text-primary" />
              Member Since
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xl font-bold">{profile?.createdAt ? formatDate(profile.createdAt) : "N/A"}</p>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-8 pt-6">
        <div className="flex items-center justify-between border-b pb-4">
          <h2 className="text-2xl font-black flex items-center gap-3">
            <Package className="h-6 w-6 text-primary" />
            Order History
          </h2>
          <Badge variant="secondary" className="font-bold">{orders.length} {orders.length === 1 ? 'Order' : 'Orders'}</Badge>
        </div>

        {orders.length === 0 ? (
          <div className="py-20 text-center bg-muted/20 rounded-3xl border-2 border-dashed">
            <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-20" />
            <p className="text-muted-foreground font-medium text-lg">You haven't placed any orders yet.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <Card key={order.id} className="overflow-hidden border-none shadow-md hover:shadow-xl transition-shadow duration-300">
                <div className="bg-primary/5 px-6 py-4 flex flex-row items-center justify-between">
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase tracking-widest font-black text-muted-foreground opacity-70">Order Reference</span>
                    <CardTitle className="text-sm font-mono tracking-tight">{order.id}</CardTitle>
                  </div>
                  <Badge
                    className={`font-black tracking-widest text-[10px] uppercase px-3 py-1 ${
                      order.status === "DELIVERED"
                        ? "bg-green-500 hover:bg-green-600"
                        : order.status === "PENDING"
                          ? "bg-amber-500 hover:bg-amber-600"
                          : "bg-slate-500 hover:bg-slate-600"
                    }`}
                  >
                    {order.status}
                  </Badge>
                </div>
                <CardContent className="p-6 space-y-6">
                  <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground uppercase tracking-widest">
                    <Calendar className="h-3 w-3" />
                    Placed on {formatDate(order.createdAt)}
                  </div>
                  
                  <div className="space-y-4">
                    {order.items && order.items.length > 0 ? (
                      order.items.map((item, idx: number) => (
                        <div key={idx} className="flex justify-between items-center text-sm font-medium">
                          <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded bg-muted flex items-center justify-center text-[10px] font-black">{item.quantity}x</div>
                            <span className="text-foreground">{item.product.name}</span>
                          </div>
                          <span className="font-bold">${(item.priceAtOrder * item.quantity).toFixed(2)}</span>
                        </div>
                      ))
                    ) : (
                      <p className="text-muted-foreground italic text-xs">No item data recorded for this order.</p>
                    )}
                  </div>
                  
                  <Separator className="opacity-50" />
                  
                  <div className="flex justify-between items-baseline pt-2">
                    <span className="text-xs font-black uppercase tracking-widest opacity-50">Total Amount</span>
                    <span className="text-2xl font-black text-primary">${order.totalAmount.toFixed(2)}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
