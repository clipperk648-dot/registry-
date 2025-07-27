import { motion } from "framer-motion";
import { FileText, Scale, Shield } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Badge } from "@/components/ui/badge";

const Terms = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0 bg-gradient-primary opacity-5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <Badge variant="secondary" className="mb-4 px-4 py-2">
              <FileText className="h-4 w-4 mr-2" />
              Legal Information
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Terms of{" "}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Service
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Please read these terms and conditions carefully before using GiftChecker.
            </p>
            <p className="text-sm text-muted-foreground mt-4">
              Last updated: January 2024
            </p>
          </motion.div>
        </div>
      </section>

      {/* Terms Content */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="bg-card/50 border border-primary/20 rounded-2xl p-8 backdrop-blur-sm"
          >
            <div className="prose prose-invert max-w-none">
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                {[
                  { icon: Scale, title: "Fair Use", description: "Clear guidelines for service usage" },
                  { icon: Shield, title: "Privacy First", description: "Your data protection is our priority" },
                  { icon: FileText, title: "Transparent", description: "Plain language, no hidden clauses" }
                ].map((item, index) => (
                  <div key={index} className="text-center p-4 rounded-lg bg-primary/10">
                    <item.icon className="h-8 w-8 mx-auto text-primary mb-3" />
                    <h3 className="font-semibold mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                ))}
              </div>

              <h2 className="text-2xl font-bold mb-6">1. Acceptance of Terms</h2>
              <p className="text-muted-foreground mb-6">
                By accessing and using GiftChecker ("the Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>

              <h2 className="text-2xl font-bold mb-6">2. Description of Service</h2>
              <p className="text-muted-foreground mb-4">
                GiftChecker provides a gift card balance checking service that allows users to verify the remaining balance on their gift cards from various retailers. The service includes:
              </p>
              <ul className="list-disc list-inside text-muted-foreground mb-6 space-y-2">
                <li>Real-time balance checking for supported gift card brands</li>
                <li>Secure processing without data storage</li>
                <li>Multi-device accessibility</li>
                <li>Customer support services</li>
              </ul>

              <h2 className="text-2xl font-bold mb-6">3. User Responsibilities</h2>
              <p className="text-muted-foreground mb-4">
                As a user of GiftChecker, you agree to:
              </p>
              <ul className="list-disc list-inside text-muted-foreground mb-6 space-y-2">
                <li>Provide accurate gift card information</li>
                <li>Use the service only for legitimate gift cards you own</li>
                <li>Not attempt to bypass security measures</li>
                <li>Not use the service for any illegal or unauthorized purpose</li>
                <li>Respect the intellectual property rights of GiftChecker</li>
              </ul>

              <h2 className="text-2xl font-bold mb-6">4. Privacy and Data Protection</h2>
              <p className="text-muted-foreground mb-6">
                We are committed to protecting your privacy. Gift card numbers and personal information are processed in real-time and are not stored on our servers. All data transmission is encrypted using industry-standard security protocols. For detailed information about our data practices, please refer to our Privacy Policy.
              </p>

              <h2 className="text-2xl font-bold mb-6">5. Service Availability</h2>
              <p className="text-muted-foreground mb-6">
                While we strive to maintain 99.9% uptime, GiftChecker reserves the right to modify, suspend, or discontinue the service at any time without notice. We are not liable for any downtime or service interruptions that may affect your ability to check gift card balances.
              </p>

              <h2 className="text-2xl font-bold mb-6">6. Limitation of Liability</h2>
              <p className="text-muted-foreground mb-6">
                GiftChecker provides balance information as received from third-party retailers. We are not responsible for:
              </p>
              <ul className="list-disc list-inside text-muted-foreground mb-6 space-y-2">
                <li>Inaccurate balance information provided by retailers</li>
                <li>Gift card issues not related to our service</li>
                <li>Financial losses resulting from gift card problems</li>
                <li>Third-party website or service issues</li>
              </ul>

              <h2 className="text-2xl font-bold mb-6">7. Prohibited Uses</h2>
              <p className="text-muted-foreground mb-4">
                You may not use our service:
              </p>
              <ul className="list-disc list-inside text-muted-foreground mb-6 space-y-2">
                <li>To check balances on gift cards you do not own</li>
                <li>For any fraudulent or illegal activities</li>
                <li>To overload our systems with excessive requests</li>
                <li>To reverse engineer or copy our technology</li>
                <li>To resell or redistribute our services</li>
              </ul>

              <h2 className="text-2xl font-bold mb-6">8. Intellectual Property</h2>
              <p className="text-muted-foreground mb-6">
                The GiftChecker service, including its design, functionality, and content, is protected by intellectual property laws. Users may not copy, modify, distribute, or create derivative works based on our service without explicit written permission.
              </p>

              <h2 className="text-2xl font-bold mb-6">9. Changes to Terms</h2>
              <p className="text-muted-foreground mb-6">
                GiftChecker reserves the right to modify these terms at any time. Users will be notified of significant changes through our website or email. Continued use of the service after changes constitutes acceptance of the new terms.
              </p>

              <h2 className="text-2xl font-bold mb-6">10. Contact Information</h2>
              <p className="text-muted-foreground mb-6">
                If you have any questions about these Terms of Service, please contact us at:
              </p>
              <div className="bg-primary/10 rounded-lg p-4">
                <p className="font-semibold mb-2">GiftChecker Support</p>
                <p className="text-muted-foreground">Email: legal@giftchecker.com</p>
                <p className="text-muted-foreground">Subject: Terms of Service Inquiry</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Terms;