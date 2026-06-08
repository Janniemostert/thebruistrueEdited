import { useState } from "react";
import { useCart } from "../components/shop/CartContext";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "../utils";
import { toast } from "sonner";
import { ArrowLeft, Package } from "lucide-react";

export default function Checkout() {
  const { cart, getTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    street: "",
    city: "",
    province: "",
    postalCode: "",
    notes: "",
  });

  const shippingCost = 80; // Fixed shipping for now
  const total = getTotal() + shippingCost;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const orderNumber = `BRU${Date.now()}`;
      
      await base44.entities.Order.create({
        order_number: orderNumber,
        customer_name: formData.name,
        customer_email: formData.email,
        customer_phone: formData.phone,
        shipping_address: {
          street: formData.street,
          city: formData.city,
          province: formData.province,
          postal_code: formData.postalCode,
          country: "South Africa",
        },
        items: cart.map((item) => ({
          product_id: item.product.id,
          product_name: item.product.name,
          quantity: item.quantity,
          price: item.product.price,
          grind_option: item.grindOption,
        })),
        subtotal: getTotal(),
        shipping_cost: shippingCost,
        total: total,
        status: "pending",
        payment_status: "pending",
        notes: formData.notes,
      });

      // Award loyalty points (10 points per R100 spent)
      const pointsEarned = Math.floor(total / 10);
      await base44.entities.LoyaltyTransaction.create({
        user_email: formData.email,
        type: "earned",
        points: pointsEarned,
        reason: `Purchase - Order ${orderNumber}`,
        order_id: orderNumber,
      });

      toast.success("Order placed successfully!");
      clearCart();
      navigate(createPageUrl("OrderConfirmation"), { 
        state: { orderNumber, total } 
      });
    } catch (error) {
      toast.error("Failed to place order. Please try again.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-[#FBF7F2] flex items-center justify-center">
        <div className="text-center">
          <Package className="h-16 w-16 text-[#1A0F0A]/20 mx-auto mb-4" />
          <h2 className="text-2xl font-light text-[#1A0F0A] mb-4">Your cart is empty</h2>
          <Button
            onClick={() => navigate(createPageUrl("Shop"))}
            className="bg-[#D4A574] hover:bg-[#C49564] text-[#1A0F0A]"
          >
            Continue Shopping
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FBF7F2] py-12">
      <div className="max-w-6xl mx-auto px-6">
        <button
          onClick={() => navigate(createPageUrl("Shop"))}
          className="flex items-center gap-2 text-[#1A0F0A]/60 hover:text-[#1A0F0A] mb-8 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Shop
        </button>

        <h1 className="text-4xl font-light text-[#1A0F0A] mb-12">Checkout</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form */}
          <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl p-8 space-y-6">
              <h2 className="text-xl font-medium text-[#1A0F0A]">Contact Information</h2>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 space-y-6">
              <h2 className="text-xl font-medium text-[#1A0F0A]">Shipping Address</h2>
              
              <div>
                <Label htmlFor="street">Street Address *</Label>
                <Input
                  id="street"
                  required
                  value={formData.street}
                  onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                />
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="city">City *</Label>
                  <Input
                    id="city"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="province">Province *</Label>
                  <Input
                    id="province"
                    required
                    value={formData.province}
                    onChange={(e) => setFormData({ ...formData, province: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="postalCode">Postal Code *</Label>
                  <Input
                    id="postalCode"
                    required
                    value={formData.postalCode}
                    onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="notes">Order Notes (Optional)</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Any special instructions?"
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#D4A574] hover:bg-[#C49564] text-[#1A0F0A] py-6 text-base"
            >
              {isSubmitting ? "Processing..." : "Place Order"}
            </Button>
          </form>

          {/* Order summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-8 sticky top-24">
              <h2 className="text-xl font-medium text-[#1A0F0A] mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                {cart.map((item) => (
                  <div key={`${item.product.id}-${item.grindOption}`} className="flex gap-3">
                    <img
                      src={item.product.image_url || "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=200&q=80"}
                      alt={item.product.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{item.product.name}</p>
                      {item.grindOption && (
                        <p className="text-xs text-[#1A0F0A]/40">{item.grindOption}</p>
                      )}
                      <p className="text-sm text-[#1A0F0A]/60">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-semibold text-sm">
                      R {(item.product.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="border-t border-[#1A0F0A]/10 pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>R {getTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Shipping</span>
                  <span>R {shippingCost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg font-semibold pt-2 border-t border-[#1A0F0A]/10">
                  <span>Total</span>
                  <span className="text-[#D4A574]">R {total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}