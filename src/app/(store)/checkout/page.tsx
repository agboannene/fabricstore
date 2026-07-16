"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/cart-context";
import PaystackButton from "@/components/PaystackButton";

interface DomesticFee {
  state: string;
  fee: number;
}

interface InternationalFee {
  country: string;
  fee: number;
}

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, clearCart } = useCart();

  const [domesticFees, setDomesticFees] = useState<DomesticFee[]>([]);
  const [internationalFees, setInternationalFees] = useState<InternationalFee[]>([]);
  const [isDomestic, setIsDomestic] = useState(true);
  const [selectedState, setSelectedState] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"pay_on_delivery" | "paystack">("paystack");

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    country: "Nigeria",
    notes: "",
  });

  useEffect(() => {
    fetch("/api/delivery-fees/domestic")
      .then((r) => r.json())
      .then((d) => { if (d.success) setDomesticFees(d.data); });
    fetch("/api/delivery-fees/international")
      .then((r) => r.json())
      .then((d) => { if (d.success) setInternationalFees(d.data); });
  }, []);

  useEffect(() => {
    if (isDomestic && selectedState) {
      const fee = domesticFees.find((f) => f.state === selectedState);
      setDeliveryFee(fee?.fee || 0);
    } else if (!isDomestic && selectedCountry) {
      const fee = internationalFees.find((f) => f.country === selectedCountry);
      setDeliveryFee(fee?.fee || 0);
    } else {
      setDeliveryFee(0);
    }
  }, [isDomestic, selectedState, selectedCountry, domesticFees, internationalFees]);

  const total = subtotal + deliveryFee;

  async function createOrder(): Promise<string | null> {
    const res = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        customer: {
          name: form.name,
          phone: form.phone,
          email: form.email || undefined,
        },
        items: items.map((i) => ({
          colourVariantId: i.colourVariantId,
          quantity: i.quantity,
          unitPrice: i.unitPrice,
        })),
        delivery: {
          addressLine1: form.addressLine1,
          addressLine2: form.addressLine2 || undefined,
          city: form.city,
          state: form.state,
          country: form.country,
          isDomestic,
          fee: deliveryFee,
        },
        paymentMethod,
        notes: form.notes || undefined,
      }),
    });
    const data = await res.json();
    if (data.success) return data.data.orderIdDisplay;
    return null;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!items.length) return;

    setSubmitting(true);
    try {
      const id = await createOrder();
      if (id) {
        clearCart();
        setDone(true);
      } else {
        alert("Failed to place order");
      }
    } catch {
      alert("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  function handlePaystackSuccess(reference: string) {
    clearCart();
    router.push(`/checkout/success?reference=${reference}`);
  }

  if (!items.length && !done) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-16 text-center">
        <h1 className="text-h2 font-heading font-bold text-neutral-900 mb-4">Checkout</h1>
        <p className="text-neutral-500 mb-6">Your cart is empty.</p>
        <Link href="/catalogue" className="text-primary-500 hover:underline">
          Browse Catalogue
        </Link>
      </div>
    );
  }

  if (done) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-16 text-center">
        <h1 className="text-h2 font-heading font-bold text-neutral-900 mb-4">Order Placed!</h1>
        <p className="text-neutral-600 mb-6">
          Your order has been placed successfully. You will be contacted shortly to confirm.
        </p>
        <Link
          href="/catalogue"
          className="inline-flex h-10 px-6 bg-primary-500 text-white text-sm font-semibold rounded-md hover:bg-primary-600 items-center no-underline"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <h1 className="text-h2 font-heading font-bold text-neutral-900 mb-8">Checkout</h1>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
        <form onSubmit={handleSubmit} className="md:col-span-3 flex flex-col gap-4">
          <div className="bg-white border border-neutral-200 rounded-md p-4">
            <h2 className="font-semibold text-neutral-900 mb-4">Contact</h2>
            <div className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="Full Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="h-10 px-3 border border-neutral-300 rounded-md text-sm"
                required
              />
              <input
                type="tel"
                placeholder="Phone Number"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="h-10 px-3 border border-neutral-300 rounded-md text-sm"
                required
              />
              {paymentMethod === "paystack" && (
                <input
                  type="email"
                  placeholder="Email (required for online payment)"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="h-10 px-3 border border-neutral-300 rounded-md text-sm"
                  required
                />
              )}
              {paymentMethod === "pay_on_delivery" && (
                <input
                  type="email"
                  placeholder="Email (optional)"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="h-10 px-3 border border-neutral-300 rounded-md text-sm"
                />
              )}
            </div>
          </div>

          <div className="bg-white border border-neutral-200 rounded-md p-4">
            <h2 className="font-semibold text-neutral-900 mb-4">Delivery</h2>
            <div className="flex flex-col gap-3">
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsDomestic(true)}
                  className={`flex-1 h-10 rounded-md text-sm font-medium border ${
                    isDomestic
                      ? "bg-primary-500 text-white border-primary-500"
                      : "bg-white text-neutral-700 border-neutral-300"
                  }`}
                >
                  Domestic
                </button>
                <button
                  type="button"
                  onClick={() => setIsDomestic(false)}
                  className={`flex-1 h-10 rounded-md text-sm font-medium border ${
                    !isDomestic
                      ? "bg-primary-500 text-white border-primary-500"
                      : "bg-white text-neutral-700 border-neutral-300"
                  }`}
                >
                  International
                </button>
              </div>

              <input
                type="text"
                placeholder="Address Line 1"
                value={form.addressLine1}
                onChange={(e) => setForm({ ...form, addressLine1: e.target.value })}
                className="h-10 px-3 border border-neutral-300 rounded-md text-sm"
                required
              />
              <input
                type="text"
                placeholder="Address Line 2 (optional)"
                value={form.addressLine2}
                onChange={(e) => setForm({ ...form, addressLine2: e.target.value })}
                className="h-10 px-3 border border-neutral-300 rounded-md text-sm"
              />

              <div className="grid grid-cols-2 gap-3">
                {isDomestic ? (
                  <select
                    value={selectedState}
                    onChange={(e) => {
                      setSelectedState(e.target.value);
                      setForm({ ...form, state: e.target.value, country: "Nigeria" });
                    }}
                    className="h-10 px-3 border border-neutral-300 rounded-md text-sm"
                    required
                  >
                    <option value="">Select State</option>
                    {domesticFees.map((f) => (
                      <option key={f.state} value={f.state}>{f.state}</option>
                    ))}
                  </select>
                ) : (
                  <select
                    value={selectedCountry}
                    onChange={(e) => {
                      setSelectedCountry(e.target.value);
                      setForm({ ...form, state: "", country: e.target.value });
                    }}
                    className="h-10 px-3 border border-neutral-300 rounded-md text-sm"
                    required
                  >
                    <option value="">Select Country</option>
                    {internationalFees.map((f) => (
                      <option key={f.country} value={f.country}>{f.country}</option>
                    ))}
                  </select>
                )}

                <input
                  type="text"
                  placeholder="City"
                  value={form.city}
                  onChange={(e) => setForm({ ...form, city: e.target.value })}
                  className="h-10 px-3 border border-neutral-300 rounded-md text-sm"
                  required
                />
              </div>

              <textarea
                placeholder="Delivery notes (optional)"
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
                className="h-20 px-3 py-2 border border-neutral-300 rounded-md text-sm resize-none"
              />
            </div>
          </div>

          <div className="bg-white border border-neutral-200 rounded-md p-4">
            <h2 className="font-semibold text-neutral-900 mb-3">Payment Method</h2>
            <div className="flex flex-col gap-2">
              <label className="flex items-center gap-3 p-3 border rounded-md cursor-pointer hover:bg-neutral-50 transition-colors border-neutral-300">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="paystack"
                  checked={paymentMethod === "paystack"}
                  onChange={() => setPaymentMethod("paystack")}
                  className="accent-[#1A5632]"
                />
                <div>
                  <p className="text-sm font-medium text-neutral-900">Pay Online</p>
                  <p className="text-xs text-neutral-500">Card, Bank Transfer, USSD</p>
                </div>
              </label>
              <label className="flex items-center gap-3 p-3 border rounded-md cursor-pointer hover:bg-neutral-50 transition-colors border-neutral-300">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="pay_on_delivery"
                  checked={paymentMethod === "pay_on_delivery"}
                  onChange={() => setPaymentMethod("pay_on_delivery")}
                  className="accent-[#1A5632]"
                />
                <div>
                  <p className="text-sm font-medium text-neutral-900">Pay on Delivery</p>
                  <p className="text-xs text-neutral-500">Cash or transfer at delivery</p>
                </div>
              </label>
            </div>
          </div>

          {paymentMethod === "paystack" ? (
            <PaystackButton
              email={form.email}
              amount={total}
              beforeOpen={createOrder}
              onSuccess={handlePaystackSuccess}
              onError={(err) => alert(err)}
              disabled={!form.name || !form.phone || !form.email || !form.addressLine1 || !form.city}
            >
              Pay ₦{total.toLocaleString()}
            </PaystackButton>
          ) : (
            <button
              type="submit"
              disabled={submitting}
              className="h-12 bg-primary-500 text-white text-sm font-semibold rounded-md hover:bg-primary-600 disabled:opacity-50 flex items-center justify-center"
            >
              {submitting ? "Placing Order..." : `Place Order — ₦${total.toLocaleString()}`}
            </button>
          )}
        </form>

        {/* Order Summary */}
        <div className="md:col-span-2">
          <div className="bg-white border border-neutral-200 rounded-md p-4 sticky top-24">
            <h2 className="font-semibold text-neutral-900 mb-4">Order Summary</h2>

            <div className="flex flex-col gap-3 mb-4">
              {items.map((item) => (
                <div key={item.colourVariantId} className="flex justify-between text-sm">
                  <div>
                    <p className="text-neutral-900">{item.productName}</p>
                    <p className="text-neutral-500 text-xs">{item.colourName} × {item.quantity}</p>
                  </div>
                  <p className="font-medium">₦{(item.unitPrice * item.quantity).toLocaleString()}</p>
                </div>
              ))}
            </div>

            <div className="border-t border-neutral-200 pt-3 flex flex-col gap-2 text-sm">
              <div className="flex justify-between text-neutral-600">
                <span>Subtotal</span>
                <span>₦{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-neutral-600">
                <span>Delivery</span>
                <span>{deliveryFee > 0 ? `₦${deliveryFee.toLocaleString()}` : "—"}</span>
              </div>
              <div className="flex justify-between font-bold text-neutral-900 border-t border-neutral-200 pt-2">
                <span>Total</span>
                <span>₦{total.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
