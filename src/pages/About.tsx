import { motion } from "framer-motion";
import { Shield, Users, Zap, Award, CheckCircle, Target } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Badge } from "@/components/ui/badge";

const About = () => {
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
              <Award className="h-4 w-4 mr-2" />
              About GiftChecker
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Your Trusted{" "}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Gift Card
              </span>
              <br />
              Balance Checker
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We're on a mission to make gift card management simple, secure, and accessible for everyone. 
              Founded in 2024, we've already helped thousands of users check their balances safely.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <p className="text-muted-foreground mb-6">
                GiftChecker was born from a simple frustration: checking gift card balances was 
                either slow, unreliable, or required sharing personal information with unknown websites.
              </p>
              <p className="text-muted-foreground mb-6">
                Our team of security experts and developers came together to create a solution that 
                prioritizes speed, security, and user privacy above all else.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-4">
                  <div className="text-2xl font-bold text-primary mb-2">50K+</div>
                  <div className="text-sm text-muted-foreground">Balances Checked</div>
                </div>
                <div className="text-center p-4">
                  <div className="text-2xl font-bold text-primary mb-2">100%</div>
                  <div className="text-sm text-muted-foreground">Secure</div>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-gradient-primary p-8 rounded-2xl">
                <div className="bg-background/10 backdrop-blur-sm rounded-xl p-6">
                  <Shield className="h-12 w-12 text-primary-foreground mb-4" />
                  <h3 className="text-xl font-semibold text-primary-foreground mb-2">
                    Security First
                  </h3>
                  <p className="text-primary-foreground/80">
                    We never store your gift card information. All data is processed 
                    in real-time and immediately discarded.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-secondary/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-4">Our Core Values</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              These principles guide everything we do and every decision we make.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: "Privacy & Security",
                description: "Your data is your data. We use bank-level encryption and never store personal information."
              },
              {
                icon: Zap,
                title: "Speed & Reliability",
                description: "Lightning-fast results with 99.9% uptime. We respect your time and deliver instant results."
              },
              {
                icon: Users,
                title: "User-Centric Design",
                description: "Every feature is designed with you in mind. Simple, intuitive, and accessible to everyone."
              }
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="text-center p-8 rounded-2xl bg-card/50 border border-primary/20 backdrop-blur-sm hover:shadow-glow-primary/20 transition-all duration-300"
              >
                <div className="inline-flex p-4 rounded-full bg-gradient-primary mb-6">
                  <value.icon className="h-8 w-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-4">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Target className="h-16 w-16 mx-auto text-primary mb-6" />
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-lg text-muted-foreground mb-8">
              To democratize gift card management by providing a secure, fast, and reliable platform 
              that puts user privacy first. We believe everyone deserves to know their gift card 
              balances without compromising their personal information.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              {[
                { label: "Zero Data Storage", icon: Shield },
                { label: "Instant Results", icon: Zap },
                { label: "Universal Support", icon: CheckCircle }
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-center space-x-2 p-4 rounded-lg bg-primary/10">
                  <item.icon className="h-5 w-5 text-primary" />
                  <span className="font-medium">{item.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;