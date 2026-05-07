import { useQuery, useMutation } from "@apollo/client";
import { useParams } from "react-router-dom";
import { GET_PRODUCT } from "@/graphql/queries";
import { ADD_REVIEW_MUTATION } from "@/graphql/mutations";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useState, ChangeEvent, FormEvent } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Star } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function ProductDetail() {
  const { addToCart } = useCart();
  const { id } = useParams<{ id: string }>();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const { data, loading, refetch } = useQuery(GET_PRODUCT, {
    variables: { id },
  });

  const [addReview, { loading: reviewLoading }] = useMutation(ADD_REVIEW_MUTATION, {
    onCompleted: () => {
      setComment("");
      setRating(5);
      refetch();
    },
  });

  if (loading) return <div className="text-center py-10">Loading product...</div>;

  const product = data?.product;
  if (!product) return <div className="text-center py-10">Product not found.</div>;

  const handleAddReview = (e: FormEvent) => {
    e.preventDefault();
    addReview({
      variables: {
        input: {
          productId: id!,
          rating,
          comment,
        },
      },
    });
  };

  return (
    <div className="space-y-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="aspect-square bg-muted rounded-xl overflow-hidden">
          {product.imageUrl ? (
            <img src={product.imageUrl} alt={product.name} className="object-cover w-full h-full" />
          ) : (
            <div className="flex items-center justify-center h-full text-muted-foreground text-4xl">No Image</div>
          )}
        </div>

        <div className="space-y-6">
          <div>
            <Badge variant="secondary" className="mb-2">{product.category.name}</Badge>
            <h1 className="text-4xl font-bold">{product.name}</h1>
            <p className="text-2xl font-bold mt-2">${product.price.toFixed(2)}</p>
          </div>

          <p className="text-muted-foreground leading-relaxed">
            {product.description}
          </p>

          <div className="space-y-4 pt-4">
            <div className="flex items-center gap-4">
              <span className={`text-sm ${product.stock > 0 ? 'text-green-600' : 'text-destructive'}`}>
                {product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'}
              </span>
            </div>
            <Button size="lg" className="w-full" disabled={product.stock === 0} onClick={() => addToCart(product)}>
              Add to Cart
            </Button>
          </div>
        </div>
      </div>

      <Separator />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="md:col-span-2 space-y-8">
          <h2 className="text-2xl font-bold">Customer Reviews</h2>
          {product.reviews && product.reviews.length > 0 ? (
            <div className="space-y-6">
              {product.reviews.map((review: any) => (
                <div key={review.id} className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`h-4 w-4 ${i < review.rating ? 'fill-primary text-primary' : 'text-muted'}`} />
                      ))}
                    </div>
                    <span className="text-sm font-medium">{review.user.email}</span>
                  </div>
                  <p className="text-muted-foreground italic">"{review.comment}"</p>
                  <p className="text-xs text-muted-foreground">{new Date(parseInt(review.createdAt)).toLocaleDateString()}</p>
                  <Separator className="mt-4" />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">No reviews yet. Be the first to review!</p>
          )}
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Write a Review</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAddReview} className="space-y-4">
                <div className="space-y-2">
                  <Label>Rating</Label>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className="focus:outline-none"
                      >
                        <Star className={`h-6 w-6 ${star <= rating ? 'fill-primary text-primary' : 'text-muted'}`} />
                      </button>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="comment">Comment</Label>
                  <Input
                    id="comment"
                    placeholder="What did you think?"
                    value={comment}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setComment(e.target.value)}
                  />
                </div>
                <Button type="submit" className="w-full" disabled={reviewLoading}>
                  {reviewLoading ? "Submitting..." : "Submit Review"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
