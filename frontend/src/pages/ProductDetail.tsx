import { useQuery, useMutation } from "@apollo/client";
import { useParams, Link } from "react-router-dom";
import { GET_PRODUCT } from "@/graphql/queries";
import { ADD_REVIEW_MUTATION } from "@/graphql/mutations";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useState, ChangeEvent, FormEvent } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { parseApolloError } from "@/lib/errors";
import { useCart } from "@/context/CartContext";
import { Star, ShoppingCart, ArrowLeft, MessageSquare, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

export default function ProductDetail() {
  const { addToCart } = useCart();
  const { id } = useParams<{ id: string }>();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");
  
  const token = localStorage.getItem("token");

  const { data, loading, refetch } = useQuery(GET_PRODUCT, {
    variables: { id: id! },
  });

  const [addReview, { loading: reviewLoading }] = useMutation(ADD_REVIEW_MUTATION, {
    onCompleted: () => {
      setComment("");
      setRating(5);
      setError("");
      toast.success("Review submitted!");
      refetch();
    },
    onError: (err) => {
      const parsed = parseApolloError(err);
      setError(parsed.message);
    },
  });

  if (loading) return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="animate-pulse text-muted-foreground">Loading product details...</div>
    </div>
  );

  const product = data?.product;
  if (!product) return (
    <div className="text-center py-20">
      <h2 className="text-2xl font-bold text-destructive">Product not found</h2>
      <Link to="/"><Button variant="link">Back to products</Button></Link>
    </div>
  );

  const handleAddToCart = () => {
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

  const handleAddReview = (e: FormEvent) => {
    e.preventDefault();
    if (!token) {
      toast.error("Please login to write a review.");
      return;
    }
    setError("");
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

  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(isNaN(Number(dateStr)) ? dateStr : Number(dateStr));
      return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    } catch {
      return "Recently";
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-16">
      <Link to="/" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Gallery
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20">
        <div className="relative aspect-square bg-muted rounded-2xl overflow-hidden shadow-inner border">
          {product.imageUrl ? (
            <img src={product.imageUrl} alt={product.name} className="object-cover w-full h-full" />
          ) : (
            <div className="flex items-center justify-center h-full text-muted-foreground text-4xl italic">
              No Preview
            </div>
          )}
        </div>

        <div className="flex flex-col justify-center space-y-8">
          <div className="space-y-4">
            <Badge className="px-3 py-1 text-xs uppercase tracking-widest">{product.category.name}</Badge>
            <h1 className="text-5xl font-black tracking-tight">{product.name}</h1>
            <p className="text-3xl font-light text-primary">${product.price.toFixed(2)}</p>
          </div>

          <div className="prose prose-stone dark:prose-invert">
            <p className="text-lg text-muted-foreground leading-relaxed">
              {product.description || "No description provided for this premium item."}
            </p>
          </div>

          <div className="space-y-6 pt-4 border-t">
            <div className="flex items-center gap-3">
              <div className={`h-3 w-3 rounded-full ${product.stock > 0 ? 'bg-green-500 animate-pulse' : 'bg-destructive'}`} />
              <span className={`text-sm font-bold tracking-wide uppercase ${product.stock > 0 ? 'text-green-600' : 'text-destructive'}`}>
                {product.stock > 0 ? `In Stock (${product.stock} Units)` : 'Currently Unavailable'}
              </span>
            </div>
            
            <Button
              size="lg"
              className="w-full h-14 text-lg font-bold cursor-pointer transition-all hover:scale-[1.02] active:scale-95"
              disabled={product.stock === 0}
              onClick={handleAddToCart}
            >
              <ShoppingCart className="mr-3 h-6 w-6" />
              Add to Shopping Cart
            </Button>
            
            <div className="flex items-center justify-center gap-6 text-xs text-muted-foreground font-medium uppercase tracking-widest">
              <div className="flex items-center gap-1.5"><ShieldCheck className="h-4 w-4" /> Secure Payment</div>
              <div className="flex items-center gap-1.5">Free Shipping</div>
            </div>
          </div>
        </div>
      </div>

      <Separator />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
        <div className="lg:col-span-2 space-y-10">
          <div className="flex items-center gap-3">
            <MessageSquare className="h-6 w-6 text-primary" />
            <h2 className="text-3xl font-bold">Community Feedback</h2>
          </div>

          {product.reviews && product.reviews.length > 0 ? (
            <div className="space-y-10">
              {product.reviews.map((review) => (
                <div key={review.id} className="group space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                        {review.user.email[0].toUpperCase()}
                      </div>
                      <div>
                        <p className="text-sm font-bold">{review.user.email}</p>
                        <div className="flex mt-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3.5 w-3.5 ${i < review.rating ? "fill-primary text-primary" : "text-muted-foreground/30"}`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <time className="text-xs font-medium text-muted-foreground uppercase tracking-tighter">
                      {formatDate(review.createdAt)}
                    </time>
                  </div>
                  <blockquote className="pl-4 border-l-4 border-primary/20">
                    <p className="text-muted-foreground italic leading-relaxed font-medium">"{review.comment}"</p>
                  </blockquote>
                  <Separator className="opacity-50" />
                </div>
              ))}
            </div>
          ) : (
            <div className="py-20 text-center bg-muted/30 rounded-3xl border-2 border-dashed">
              <p className="text-muted-foreground font-medium">This product has no reviews yet. Be the first to share your thoughts!</p>
            </div>
          )}
        </div>

        <div className="relative">
          <Card className="sticky top-24 border-none shadow-2xl bg-primary text-primary-foreground overflow-hidden">
            <div className="absolute top-0 right-0 -mr-16 -mt-16 h-48 w-48 bg-white/10 rounded-full blur-3xl" />
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Write a Review</CardTitle>
              <CardDescription className="text-primary-foreground/70">Share your experience with others.</CardDescription>
            </CardHeader>
            <CardContent>
              {token ? (
                <form onSubmit={handleAddReview} className="space-y-6">
                  {error && <div className="p-3 text-xs font-bold bg-white text-destructive rounded-lg">{error}</div>}
                  <div className="space-y-3">
                    <Label className="text-xs font-black uppercase tracking-widest opacity-70">Rating</Label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          className="focus:outline-none transition-transform hover:scale-125 active:scale-90 cursor-pointer"
                        >
                          <Star
                            className={`h-8 w-8 ${star <= rating ? "fill-white text-white" : "text-white/30"}`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="comment" className="text-xs font-black uppercase tracking-widest opacity-70">Comment</Label>
                    <Input
                      id="comment"
                      className="bg-white/10 border-white/20 placeholder:text-white/40 text-white h-12"
                      placeholder="What did you think?"
                      value={comment}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => setComment(e.target.value)}
                    />
                  </div>
                  <Button type="submit" className="w-full h-12 bg-white text-primary hover:bg-white/90 font-black uppercase tracking-widest cursor-pointer" disabled={reviewLoading}>
                    {reviewLoading ? "Sending..." : "Post Review"}
                  </Button>
                </form>
              ) : (
                <div className="space-y-6 py-4">
                  <p className="text-sm font-medium opacity-80 leading-relaxed text-center">
                    You must be logged in to post a review and help the community.
                  </p>
                  <Link to="/login" className="block">
                    <Button className="w-full h-12 bg-white text-primary hover:bg-white/90 font-black uppercase tracking-widest cursor-pointer">
                      Login Now
                    </Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
