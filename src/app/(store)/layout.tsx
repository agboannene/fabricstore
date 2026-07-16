import Link from "next/link";
import Script from "next/script";
import { CartProvider } from "@/lib/cart-context";
import { CustomerAuthProvider } from "@/lib/customer-auth-context";
import CartLink from "./cart-link";
import AuthNav from "./auth-nav";
import MobileMenu from "./mobile-menu";

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CartProvider>
      <CustomerAuthProvider>
        <Script src="https://js.paystack.co/v1/inline.js" strategy="lazyOnload" />
        <header className="fixed top-0 left-0 right-0 h-16 bg-primary-500 text-white z-[300] flex items-center justify-between px-6">
          <Link
            href="/"
            className="font-heading text-h3 font-bold text-white no-underline"
          >
            FabricStore
          </Link>
          <nav className="flex gap-6 items-center max-md:hidden">
            <Link
              href="/catalogue"
              className="text-white/85 no-underline text-sm font-medium hover:text-white transition-colors"
            >
              Catalogue
            </Link>
            <Link
              href="/track"
              className="text-white/85 no-underline text-sm font-medium hover:text-white transition-colors"
            >
              Track Order
            </Link>
            <Link
              href="/contact"
              className="text-white/85 no-underline text-sm font-medium hover:text-white transition-colors"
            >
              Contact
            </Link>
            <CartLink />
            <AuthNav />
          </nav>
          <MobileMenu />
        </header>
        <main className="flex-1 pt-16">{children}</main>
        <footer className="bg-primary-500 text-white py-12 px-6">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-heading text-h3 font-bold mb-4">FabricStore</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Premium fabrics for every occasion. Serving customers locally and
                internationally.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Quick Links</h4>
              <div className="flex flex-col gap-2 text-sm text-white/70">
                <Link href="/catalogue" className="hover:text-white transition-colors">
                  Catalogue
                </Link>
                <Link href="/track" className="hover:text-white transition-colors">
                  Track Order
                </Link>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Contact</h4>
              <div className="text-sm text-white/70 leading-relaxed">
                <p>info@fabricstore.com</p>
                <p>Lagos, Nigeria</p>
              </div>
            </div>
          </div>
          <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-white/20 text-center text-sm text-white/50">
            &copy; {new Date().getFullYear()} FabricStore. All rights reserved.{" "}
            <Link href="/dashboard/login" className="text-white/30 hover:text-white/60 ml-2">
              Staff Login
            </Link>
          </div>
        </footer>
      </CustomerAuthProvider>
    </CartProvider>
  );
}
