import { useState, ChangeEvent, FormEvent } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_PRODUCT_MUTATION } from "@/graphql/mutations";
import { GET_PRODUCTS, GET_CATEGORIES } from "@/graphql/queries";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Admin() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [stock, setStock] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const { data: catData } = useQuery(GET_CATEGORIES);
  const categories = catData?.categories || [];

  const [addProduct, { loading }] = useMutation(ADD_PRODUCT_MUTATION, {
    refetchQueries: [{ query: GET_PRODUCTS }],
    onCompleted: () => {
      alert("Product added successfully!");
      setName("");
      setDescription("");
      setPrice("");
      setStock("");
      setImageUrl("");
    },
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    addProduct({
      variables: {
        product: {
          name,
          description,
          price: parseFloat(price),
          categoryId,
          stock: parseInt(stock),
          imageUrl,
        },
      },
    });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      <Card>
        <CardHeader>
          <CardTitle>Add New Product</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Product Name</Label>
              <Input id="name" value={name} onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input id="description" value={description} onChange={(e: ChangeEvent<HTMLInputElement>) => setDescription(e.target.value)} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">Price</Label>
                <Input id="price" type="number" step="0.01" value={price} onChange={(e: ChangeEvent<HTMLInputElement>) => setPrice(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="stock">Stock</Label>
                <Input id="stock" type="number" value={stock} onChange={(e: ChangeEvent<HTMLInputElement>) => setStock(e.target.value)} required />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <select
                id="category"
                className="w-full border rounded-md p-2 bg-background"
                value={categoryId}
                onChange={(e: ChangeEvent<HTMLSelectElement>) => setCategoryId(e.target.value)}
                required
              >
                <option value="">Select a category</option>
                {categories.map((cat: any) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="imageUrl">Image URL</Label>
              <Input id="imageUrl" value={imageUrl} onChange={(e: ChangeEvent<HTMLInputElement>) => setImageUrl(e.target.value)} placeholder="https://example.com/image.jpg" />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Adding..." : "Add Product"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
