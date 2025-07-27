import { motion } from "framer-motion";
import { Shield, Zap, Clock, Star, CheckCircle, CreditCard } from "lucide-react";
import { GiftCardChecker } from "@/components/GiftCardChecker";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-primary opacity-5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-16">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <Badge variant="secondary" className="mb-4 px-4 py-2">
                <Star className="h-4 w-4 mr-2" />
                Trusted by thousands
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Check Your{" "}
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  Code Balance
                </span>
                <br />
                Instantly & Securely
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
                The fastest and most secure way to check balances for 16-character alphanumeric codes.
                Enter exactly 16 letters and numbers to get instant balance results.
              </p>
            </motion.div>
          </div>

          {/* Code Checker */}
          <div className="max-w-lg mx-auto mb-20">
            <GiftCardChecker />
          </div>

          {/* Features */}
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              {
                icon: Shield,
                title: "Bank-Level Security",
                description: "Your data is processed securely and stored safely"
              },
              {
                icon: Zap,
                title: "Instant Results",
                description: "Get your balance in seconds, not minutes"
              },
              {
                icon: Clock,
                title: "24/7 Available",
                description: "Check your balance anytime, anywhere"
              }
            ].map((feature, index) => (
              <div key={index} className="text-center p-6 rounded-2xl bg-card/50 border border-primary/20 backdrop-blur-sm hover:shadow-glow-primary/20 transition-all duration-300">
                <div className="inline-flex p-3 rounded-full bg-gradient-primary mb-4">
                  <feature.icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Supported Brands */}
      <section className="py-20 bg-secondary/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Supported Code Types</h2>
            <p className="text-muted-foreground">We support 16-character alphanumeric codes for balance checking</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {["Gift Cards", "Voucher Codes", "Promo Codes", "Access IDs", "Serial Numbers", "Ticket Codes", "Coupon Codes", "Auth Tokens", "License Keys", "Reference IDs", "Product Codes", "Activation Keys"].map((brand, index) => (
              <motion.div
                key={brand}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-card/50 border border-primary/20 rounded-xl p-4 text-center backdrop-blur-sm hover:shadow-glow-primary/10 transition-all duration-300"
              >
                <CreditCard className="h-8 w-8 mx-auto mb-2 text-primary" />
                <span className="text-sm font-medium">{brand}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What Our Users Say</h2>
            <p className="text-muted-foreground">Join thousands of satisfied customers</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                text: "Finally, a code checker that actually works! Super fast and secure.",
                rating: 5
              },
              {
                name: "Mike Chen",
                text: "I love how simple it is to use. Checked 5 codes in under a minute.",
                rating: 5
              },
              {
                name: "Emily Davis",
                text: "The security features give me peace of mind. Highly recommended!",
                rating: 5
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="bg-card/50 border border-primary/20 rounded-2xl p-6 backdrop-blur-sm"
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-primary fill-current" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">"{testimonial.text}"</p>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground font-semibold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <span className="ml-3 font-medium">{testimonial.name}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-background/10"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
            Ready to Check Your Codes?
          </h2>
          <p className="text-primary-foreground/80 text-lg mb-8">
            Join thousands of users who trust CodeChecker for their 16-character code balance needs.
          </p>
          <Button 
            size="lg" 
            variant="secondary"
            className="bg-background text-foreground hover:bg-background/90"
            onClick={() => document.getElementById('inputData')?.focus()}
          >
            <CheckCircle className="mr-2 h-5 w-5" />
            Get Started Now
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
