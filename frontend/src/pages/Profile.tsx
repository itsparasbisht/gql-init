import { useQuery } from "@apollo/client";
import { GET_PROFILE, GET_MY_ORDERS } from "@/graphql/queries";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function Profile() {
  const { data: profileData, loading: profileLoading } = useQuery(GET_PROFILE);
  const { data: ordersData, loading: ordersLoading } = useQuery(GET_MY_ORDERS);

  if (profileLoading || ordersLoading) return <div>Loading...</div>;

  const profile = profileData?.profile;
  const orders = ordersData?.myOrders || [];

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>My Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">Email</p>
            <p className="text-lg">{profile?.email}</p>
          </div>
          <Separator className="my-4" />
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">Member Since</p>
            <p>{profile?.createdAt ? new Date(parseInt(profile.createdAt)).toLocaleDateString() : "N/A"}</p>
          </div>
        </CardContent>
      </Card>

      <div>
        <h2 className="text-2xl font-bold mb-4">Order History</h2>
        {orders.length === 0 ? (
          <p className="text-muted-foreground">You haven't placed any orders yet.</p>
        ) : (
          <div className="space-y-4">
            {orders.map((order: any) => (
              <Card key={order.id}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0">
                  <CardTitle className="text-sm font-medium">
                    Order ID: {order.id}
                  </CardTitle>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    order.status === 'DELIVERED' ? 'bg-green-100 text-green-700' :
                    order.status === 'PENDING' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {order.status}
                  </span>
                </CardHeader>
                <CardContent>
                  <div className="text-xs text-muted-foreground mb-4">
                    Placed on: {new Date(parseInt(order.createdAt)).toLocaleDateString()}
                  </div>
                  <div className="space-y-2">
                    {order.items.map((item: any, idx: number) => (
                      <div key={idx} className="flex justify-between text-sm">
                        <span>{item.product.name} x {item.quantity}</span>
                        <span>${(item.priceAtOrder * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                  <Separator className="my-4" />
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>${order.totalAmount.toFixed(2)}</span>
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
