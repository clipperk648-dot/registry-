import { motion } from "framer-motion";
import { HelpCircle, Shield, Zap, CreditCard, CheckCircle } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      question: "How does GiftChecker work?",
      answer: "Simply enter your 16-character gift card number (letters and numbers), and our system will instantly check the balance with the retailer. The process takes just seconds and your information is never stored."
    },
    {
      question: "Is it safe to enter my gift card number?",
      answer: "Absolutely! We use bank-level encryption and never store your gift card information. All data is processed in real-time and immediately discarded after checking your balance."
    },
    {
      question: "Which gift cards are supported?",
      answer: "We support gift cards from all major retailers including Amazon, Apple, Target, Walmart, Best Buy, Starbucks, Netflix, Spotify, Google Play, Steam, Xbox, PlayStation, and many more."
    },
    {
      question: "How fast are the results?",
      answer: "Balance checks are typically completed within 1-3 seconds. Our optimized system connects directly to retailer databases for instant results."
    },
    {
      question: "Do you store my gift card information?",
      answer: "No, we never store any gift card information. Your data is processed in real-time and immediately discarded. We don't keep any logs or records of your card numbers."
    },
    {
      question: "What if my gift card shows an error?",
      answer: "If you receive an error, please double-check that you've entered the full 16-character code correctly. If the issue persists, the card may be inactive, expired, or need to be activated at the point of purchase."
    },
    {
      question: "Can I check multiple gift cards?",
      answer: "Yes! You can check as many gift cards as you need. Each check is processed independently and securely."
    },
    {
      question: "Is there a cost to use GiftChecker?",
      answer: "GiftChecker is completely free to use. We believe everyone should have access to secure gift card balance checking without any fees."
    },
    {
      question: "What if my balance is incorrect?",
      answer: "Our system shows real-time balances directly from the retailer. If you believe there's an error, we recommend contacting the retailer's customer service directly."
    },
    {
      question: "Can I use GiftChecker on mobile devices?",
      answer: "Yes! GiftChecker is fully responsive and works perfectly on all devices including smartphones, tablets, and desktop computers."
    }
  ];

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
              <HelpCircle className="h-4 w-4 mr-2" />
              Frequently Asked Questions
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Got{" "}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Questions?
              </span>
              <br />
              We've Got Answers
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Find answers to the most common questions about GiftChecker, 
              gift card security, and how our service works.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-12 bg-secondary/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { icon: Shield, label: "100% Secure", value: "Bank-Level Encryption" },
              { icon: Zap, label: "Lightning Fast", value: "< 3 Seconds" },
              { icon: CreditCard, label: "All Major Brands", value: "50+ Retailers" },
              { icon: CheckCircle, label: "Always Free", value: "No Hidden Fees" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center p-6 rounded-xl bg-card/50 border border-primary/20 backdrop-blur-sm"
              >
                <stat.icon className="h-8 w-8 mx-auto text-primary mb-3" />
                <div className="font-semibold text-sm text-primary mb-1">{stat.label}</div>
                <div className="text-xs text-muted-foreground">{stat.value}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="bg-card/50 border border-primary/20 rounded-2xl p-8 backdrop-blur-sm"
          >
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left font-medium hover:text-primary transition-colors">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>

      {/* Still Need Help */}
      <section className="py-20 bg-gradient-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-background/10"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
              Still Need Help?
            </h2>
            <p className="text-primary-foreground/80 text-lg mb-8">
              Can't find the answer you're looking for? Our support team is here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-background text-foreground font-medium hover:bg-background/90 transition-colors"
              >
                Contact Support
              </a>
              <a
                href="mailto:support@giftchecker.com"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-primary-foreground/20 text-primary-foreground font-medium hover:bg-primary-foreground/10 transition-colors"
              >
                Email Us
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FAQ;