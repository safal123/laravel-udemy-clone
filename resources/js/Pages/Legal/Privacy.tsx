import { Head } from "@inertiajs/react";
import AppLayout from "@/Layouts/AppLayout";
import { Shield, Lock, Eye, Database, Share2, Bell, Settings, HelpCircle } from "lucide-react";

const sections = [
  {
    icon: Shield,
    title: "Information We Collect",
    content:
      "We collect information that you provide directly to us, including name, email address, and payment information when you register for an account or make a purchase.",
  },
  {
    icon: Lock,
    title: "How We Use Your Information",
    content:
      "We use the information we collect to provide, maintain, and improve our services, to process your transactions, and to communicate with you.",
  },
  {
    icon: Eye,
    title: "Information Sharing",
    content:
      "We do not sell or share your personal information with third parties except as described in this policy or with your consent.",
  },
  {
    icon: Database,
    title: "Data Storage",
    content:
      "Your data is stored securely using industry-standard encryption and security measures. We retain your information for as long as necessary to provide our services.",
  },
  {
    icon: Share2,
    title: "Third-Party Services",
    content:
      "We may use third-party services that collect, monitor and analyze this type of information in order to increase our Service's functionality.",
  },
  {
    icon: Bell,
    title: "Communications",
    content:
      "We may use your email address to send you Service-related notices (including any notices required by law) and promotional messages.",
  },
  {
    icon: Settings,
    title: "Your Choices",
    content:
      "You can control your privacy settings and communication preferences through your account settings. You may also opt-out of promotional communications.",
  },
  {
    icon: HelpCircle,
    title: "Contact Us",
    content:
      "If you have any questions about this Privacy Policy, please contact us at privacy@example.com.",
  },
];

export default function Privacy() {
  return (
    <AppLayout>
      <Head title="Privacy Policy" />

      <div className="bg-white">
        {/* Hero Section */}
        <div className="relative bg-slate-900 py-24">
          <div className="absolute inset-0 bg-[radial-gradient(white_1px,transparent_1px)] [background-size:20px_20px] opacity-10" />
          <div className="container mx-auto px-4 relative">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Privacy Policy
              </h1>
              <p className="text-xl text-white/70">
                We care about your privacy and are committed to protecting your
                personal data.
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
                This Privacy Policy describes how we collect, use, and handle your
                personal information when you use our services. We take your
                privacy seriously and are committed to protecting your personal
                data.
              </p>
            </div>

            {/* Privacy Sections */}
            <div className="grid md:grid-cols-2 gap-8">
              {sections.map((section) => (
                <div
                  key={section.title}
                  className="bg-slate-50 rounded-xl p-6 space-y-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary">
                      <section.icon className="w-5 h-5" />
                    </div>
                    <h2 className="text-xl font-semibold">{section.title}</h2>
                  </div>
                  <p className="text-slate-600">{section.content}</p>
                </div>
              ))}
            </div>

            {/* Additional Information */}
            <div className="mt-16 pt-16 border-t prose prose-slate max-w-none">
              <h2 className="text-2xl font-bold mb-4">Changes to This Policy</h2>
              <p className="text-slate-600">
                We may update this Privacy Policy from time to time. We will notify
                you of any changes by posting the new Privacy Policy on this page
                and updating the "Last Updated" date.
              </p>

              <h2 className="text-2xl font-bold mb-4 mt-8">Contact Us</h2>
              <p className="text-slate-600">
                If you have any questions about this Privacy Policy, please contact
                us at{" "}
                <a
                  href="mailto:privacy@example.com"
                  className="text-primary hover:underline"
                >
                  privacy@example.com
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
