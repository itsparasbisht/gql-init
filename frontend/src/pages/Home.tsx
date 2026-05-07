import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { GET_PRODUCTS, GET_CATEGORIES } from "@/graphql/queries";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { useState } from "react";

export default function Home() {
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { data: productsData, loading: productsLoading } = useQuery(GET_PRODUCTS);
  const { data: categoriesData, loading: categoriesLoading } = useQuery(GET_CATEGORIES);

  if (productsLoading || categoriesLoading) return <div className="text-center py-10">Loading products...</div>;

  const products = productsData?.products || [];
  const categories = categoriesData?.categories || [];

  const filteredProducts = selectedCategory
    ? products.filter((p: any) => p.category.id === selectedCategory)
    : products;

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-3xl font-bold">Our Products</h1>
        <div className="flex flex-wrap gap-2">
          <Button
            variant={selectedCategory === null ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(null)}
          >
            All
          </Button>
          {categories.map((cat: any) => (
            <Button
              key={cat.id}
              variant={selectedCategory === cat.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(cat.id)}
            >
              {cat.name}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product: any) => (
          <Card key={product.id} className="flex flex-col">
            <div className="aspect-square bg-muted relative overflow-hidden rounded-t-lg">
              {product.imageUrl ? (
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="object-cover w-full h-full transition-transform hover:scale-105"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  No Image
                </div>
              )}
            </div>
            <CardHeader>
              <CardTitle className="line-clamp-1">{product.name}</CardTitle>
              <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
            </CardHeader>
            <CardContent className="mt-auto">
              <p className="text-xl font-bold">${product.price.toFixed(2)}</p>
              <p className="text-xs text-muted-foreground mt-1">
                Category: {product.category.name}
              </p>
            </CardContent>
            <CardFooter className="gap-2">
              <Link to={`/product/${product.id}`} className="flex-1">
                <Button variant="outline" className="w-full">View Details</Button>
              </Link>
              <Button className="flex-1" onClick={() => addToCart(product)}>Add to Cart</Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-20 text-muted-foreground">
          No products found in this category.
        </div>
      )}
    </div>
  );
}
