export default function ContactPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-h2 font-heading font-bold text-neutral-900 mb-6">Contact Us</h1>
      <div className="bg-white border border-neutral-200 rounded-md p-6 flex flex-col gap-4">
        <div>
          <h3 className="font-semibold text-neutral-900">Address</h3>
          <p className="text-neutral-600">Lagos, Nigeria</p>
        </div>
        <div>
          <h3 className="font-semibold text-neutral-900">Email</h3>
          <p className="text-neutral-600">info@fabricstore.com</p>
        </div>
        <div>
          <h3 className="font-semibold text-neutral-900">Phone</h3>
          <p className="text-neutral-600">+234 800 000 0000</p>
        </div>
        <div>
          <h3 className="font-semibold text-neutral-900">Business Hours</h3>
          <p className="text-neutral-600">Monday – Saturday: 8:00 AM – 6:00 PM</p>
        </div>
      </div>
    </div>
  );
}
