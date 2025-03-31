import { Head } from "@inertiajs/react";
import AppLayout from "@/Layouts/AppLayout";

const sections = [
  {
    title: "1. Terms of Use",
    content:
      "By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.",
  },
  {
    title: "2. User Account",
    content:
      "To access certain features of the platform, you may be required to create an account. You are responsible for maintaining the confidentiality of your account information.",
  },
  {
    title: "3. Course Content",
    content:
      "All content provided on this platform is for educational purposes only. Users may not reproduce, distribute, or create derivative works without explicit permission.",
  },
  {
    title: "4. User Conduct",
    content:
      "Users agree to use the platform in a manner consistent with all applicable laws and regulations. Any misuse of the platform may result in immediate termination of your account.",
  },
  {
    title: "5. Payment Terms",
    content:
      "Payments for courses are processed securely. Refunds are available according to our refund policy. All prices are subject to change without notice.",
  },
  {
    title: "6. Intellectual Property",
    content:
      "The platform and its original content, features, and functionality are owned by the company and are protected by international copyright, trademark, and other intellectual property laws.",
  },
  {
    title: "7. Privacy Policy",
    content:
      "Your use of the platform is also governed by our Privacy Policy. Please review our Privacy Policy to understand our practices.",
  },
  {
    title: "8. Limitation of Liability",
    content:
      "The company shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your access to or use of the platform.",
  },
];

export default function Terms() {
  return (
    <AppLayout>
      <Head title="Terms of Service" />

      <div className="bg-white">
        {/* Hero Section */}
        <div className="relative bg-slate-900 py-24">
          <div className="absolute inset-0 bg-[radial-gradient(white_1px,transparent_1px)] [background-size:20px_20px] opacity-10" />
          <div className="container mx-auto px-4 relative">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Terms of Service
              </h1>
              <p className="text-xl text-white/70">
                Please read these terms carefully before using our platform.
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 py-24">
          <div className="max-w-4xl mx-auto">
            {/* Last Updated */}
            <div className="mb-12 pb-12 border-b">
              <p className="text-slate-600">
                Last Updated: {new Date().toLocaleDateString()}
              </p>
            </div>

            {/* Introduction */}
            <div className="prose prose-slate max-w-none mb-16">
              <p className="lead">
                Welcome to our platform. These Terms of Service ("Terms") govern
                your access to and use of our website, services, and products.
                These Terms constitute a legally binding agreement between you and
                our company.
              </p>
            </div>

            {/* Terms Sections */}
            <div className="space-y-12">
              {sections.map((section) => (
                <div key={section.title} className="prose prose-slate max-w-none">
                  <h2 className="text-2xl font-bold mb-4">{section.title}</h2>
                  <p className="text-slate-600">{section.content}</p>
                </div>
              ))}
            </div>

            {/* Contact Section */}
            <div className="mt-16 pt-16 border-t">
              <h2 className="text-2xl font-bold mb-4">Questions or Concerns?</h2>
              <p className="text-slate-600">
                If you have any questions about these Terms, please contact us at{" "}
                <a
                  href="mailto:legal@example.com"
                  className="text-primary hover:underline"
                >
                  legal@example.com
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
