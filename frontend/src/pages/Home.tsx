import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { GET_PRODUCTS, GET_CATEGORIES } from "@/graphql/queries";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { useState } from "react";
import { toast } from "sonner";
import { ShoppingCart, Eye, Package } from "lucide-react";

interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  imageUrl?: string | null;
  category: {
    id: string;
    name: string;
  };
}

export default function Home() {
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { data: productsData, loading: productsLoading } = useQuery(GET_PRODUCTS);
  const { data: categoriesData, loading: categoriesLoading } = useQuery(GET_CATEGORIES);

  if (productsLoading || categoriesLoading)
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-pulse text-muted-foreground font-medium">Loading products...</div>
      </div>
    );

  const products = productsData?.products || [];
  const categories = categoriesData?.categories || [];

  const filteredProducts = selectedCategory
    ? products.filter((p) => p.category.id === selectedCategory)
    : products;

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    toast.success(`${product.name} added to cart!`, {
      description: "You can view it in your shopping cart.",
      duration: 2000,
    });
  };

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b pb-6">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">Our Products</h1>
          <p className="text-muted-foreground mt-2">
            Discover our curated selection of high-quality items.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            variant={selectedCategory === null ? "default" : "secondary"}
            size="sm"
            className="cursor-pointer rounded-full px-6"
            onClick={() => setSelectedCategory(null)}
          >
            All
          </Button>
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "secondary"}
              size="sm"
              className="cursor-pointer rounded-full px-6"
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.name}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredProducts.map((product) => (
          <Card
            key={product.id}
            className="group flex flex-col overflow-hidden border-none shadow-md hover:shadow-xl transition-all duration-300"
          >
            <Link
              to={`/product/${product.id}`}
              className="block relative aspect-[4/5] overflow-hidden bg-muted"
            >
              {product.imageUrl ? (
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground italic">
                  No Image Available
                </div>
              )}
              <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors" />
            </Link>
            <CardHeader className="p-5 pb-2">
              <div className="flex justify-between items-start gap-2">
                <CardTitle className="text-lg font-bold line-clamp-1 group-hover:text-primary transition-colors">
                  <Link to={`/product/${product.id}`}>{product.name}</Link>
                </CardTitle>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-2 min-h-[40px] leading-relaxed">
                {product.description}
              </p>
            </CardHeader>
            <CardContent className="p-5 pt-0 mt-auto">
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-black text-foreground">
                  ${product.price.toFixed(2)}
                </span>
              </div>
              <div className="mt-2 inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs font-semibold text-secondary-foreground">
                {product.category.name}
              </div>
            </CardContent>
            <CardFooter className="p-5 pt-0 flex gap-2">
              <Link to={`/product/${product.id}`} className="flex-1">
                <Button variant="outline" className="w-full cursor-pointer h-10 group/btn">
                  <Eye className="mr-2 h-4 w-4 transition-transform group-hover/btn:scale-110" />
                  Details
                </Button>
              </Link>
              <Button
                className="flex-1 cursor-pointer h-10 group/btn"
                onClick={() => handleAddToCart(product)}
              >
                <ShoppingCart className="mr-2 h-4 w-4 transition-transform group-hover/btn:scale-110" />
                Add
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="flex flex-col items-center justify-center py-32 text-center border rounded-xl bg-muted/20">
          <Package className="h-12 w-12 text-muted-foreground mb-4 opacity-20" />
          <h3 className="text-xl font-semibold">No products found</h3>
          <p className="text-muted-foreground mt-1">
            Try selecting a different category or clearing the filter.
          </p>
          <Button variant="link" className="mt-4" onClick={() => setSelectedCategory(null)}>
            Clear all filters
          </Button>
        </div>
      )}
    </div>
  );
}
