import { motion } from "framer-motion";
import { Shield, Lock, Eye, Database } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Badge } from "@/components/ui/badge";

const Privacy = () => {
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
              <Shield className="h-4 w-4 mr-2" />
              Privacy Protection
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Privacy{" "}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Policy
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Your privacy is our top priority. Learn how we protect your data and what information we collect.
            </p>
            <p className="text-sm text-muted-foreground mt-4">
              Last updated: January 2024
            </p>
          </motion.div>
        </div>
      </section>

      {/* Privacy Highlights */}
      <section className="py-12 bg-secondary/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { icon: Database, title: "Zero Storage", description: "No gift card data stored" },
              { icon: Lock, title: "Bank-Level Security", description: "AES-256 encryption" },
              { icon: Eye, title: "No Tracking", description: "No behavioral analytics" },
              { icon: Shield, title: "GDPR Compliant", description: "Full privacy protection" }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center p-6 rounded-xl bg-card/50 border border-primary/20 backdrop-blur-sm"
              >
                <item.icon className="h-8 w-8 mx-auto text-primary mb-3" />
                <div className="font-semibold text-sm mb-1">{item.title}</div>
                <div className="text-xs text-muted-foreground">{item.description}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Privacy Policy Content */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="bg-card/50 border border-primary/20 rounded-2xl p-8 backdrop-blur-sm"
          >
            <div className="prose prose-invert max-w-none">
              
              <h2 className="text-2xl font-bold mb-6">1. Information We Collect</h2>
              <p className="text-muted-foreground mb-4">
                GiftChecker is designed with privacy as a core principle. Here's what we collect and don't collect:
              </p>
              
              <h3 className="text-lg font-semibold mb-3 text-primary">Information We DO NOT Collect:</h3>
              <ul className="list-disc list-inside text-muted-foreground mb-6 space-y-2">
                <li>Gift card numbers or any payment card information</li>
                <li>Personal identification information</li>
                <li>Browsing history or behavioral data</li>
                <li>Location data beyond general country/region</li>
                <li>Contact information unless voluntarily provided</li>
              </ul>

              <h3 className="text-lg font-semibold mb-3 text-primary">Information We May Collect:</h3>
              <ul className="list-disc list-inside text-muted-foreground mb-6 space-y-2">
                <li>Basic technical information (browser type, device type) for service optimization</li>
                <li>General usage statistics (number of checks performed) for service improvements</li>
                <li>Error logs for troubleshooting (without personal data)</li>
                <li>Contact information only when you voluntarily provide it for support</li>
              </ul>

              <h2 className="text-2xl font-bold mb-6">2. How We Process Gift Card Information</h2>
              <div className="bg-primary/10 rounded-lg p-6 mb-6">
                <h3 className="font-semibold mb-3">Our Zero-Storage Promise</h3>
                <p className="text-muted-foreground">
                  When you enter a gift card number, it is immediately transmitted to the retailer's system using encrypted connections. 
                  The number is never written to our databases, log files, or any persistent storage. Once the balance check is complete, 
                  all traces of your gift card information are immediately purged from our systems.
                </p>
              </div>

              <h2 className="text-2xl font-bold mb-6">3. Data Security</h2>
              <p className="text-muted-foreground mb-4">
                We implement industry-standard security measures to protect your data:
              </p>
              <ul className="list-disc list-inside text-muted-foreground mb-6 space-y-2">
                <li>All data transmission uses TLS 1.3 encryption</li>
                <li>Our servers are protected by enterprise-grade firewalls</li>
                <li>Regular security audits and penetration testing</li>
                <li>Minimal data retention policies</li>
                <li>Secure coding practices and regular security updates</li>
              </ul>

              <h2 className="text-2xl font-bold mb-6">4. Third-Party Services</h2>
              <p className="text-muted-foreground mb-6">
                To provide gift card balance checking, we connect to retailer systems. We do not share any personal information with these third parties beyond the gift card number required for balance verification. Each retailer has their own privacy policy governing how they handle this information.
              </p>

              <h2 className="text-2xl font-bold mb-6">5. Cookies and Tracking</h2>
              <p className="text-muted-foreground mb-6">
                GiftChecker uses minimal, functional cookies only for service operation. We do not use tracking cookies, advertising cookies, or any form of behavioral tracking. Our analytics are aggregated and anonymized, focusing only on service performance metrics.
              </p>

              <h2 className="text-2xl font-bold mb-6">6. Your Rights</h2>
              <p className="text-muted-foreground mb-4">
                Under privacy laws including GDPR and CCPA, you have the right to:
              </p>
              <ul className="list-disc list-inside text-muted-foreground mb-6 space-y-2">
                <li>Know what personal information we collect (which is minimal)</li>
                <li>Request deletion of any data we may have</li>
                <li>Opt-out of any data processing</li>
                <li>Access any personal data we hold</li>
                <li>Correct any inaccurate information</li>
              </ul>

              <h2 className="text-2xl font-bold mb-6">7. Children's Privacy</h2>
              <p className="text-muted-foreground mb-6">
                GiftChecker does not knowingly collect personal information from children under 13. If you believe a child has provided us with personal information, please contact us immediately so we can remove such information.
              </p>

              <h2 className="text-2xl font-bold mb-6">8. Changes to This Policy</h2>
              <p className="text-muted-foreground mb-6">
                We may update this privacy policy to reflect changes in our practices or legal requirements. We will notify users of significant changes through our website. Your continued use of the service after changes constitutes acceptance of the updated policy.
              </p>

              <h2 className="text-2xl font-bold mb-6">9. Contact Us</h2>
              <p className="text-muted-foreground mb-6">
                If you have any questions about this Privacy Policy or our privacy practices, please contact us:
              </p>
              <div className="bg-primary/10 rounded-lg p-4">
                <p className="font-semibold mb-2">Privacy Officer</p>
                <p className="text-muted-foreground">Email: privacy@giftchecker.com</p>
                <p className="text-muted-foreground">Subject: Privacy Policy Inquiry</p>
                <p className="text-muted-foreground mt-2 text-sm">
                  We typically respond to privacy inquiries within 48 hours.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Privacy;