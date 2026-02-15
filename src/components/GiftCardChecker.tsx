import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { api, ApiError, ApiTimeoutError } from "@/lib/api";

export const GiftCardChecker = () => {
  const [inputData, setInputData] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ id: string; submittedAt: string; cardNumber: string } | null>(null);
  const { toast } = useToast();

  const formatAlphanumeric = (input: string) => {
    // Accept letters, numbers, spaces, and dashes
    const cleaned = input.replace(/[^A-Za-z0-9\s\-]/g, "").toUpperCase();
    
    // Format in groups of 4
    const formatted = cleaned.match(/.{1,4}/g)?.join(" ") || cleaned;
    
    // Limit to 19 characters (16 chars + 3 spaces)
    return formatted.slice(0, 19);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const formatted = formatAlphanumeric(value);
    setInputData(formatted);
  };

  const isValidInput = (input: string) => {
    const cleaned = input.replace(/\s/g, "");
    return cleaned.length === 16 && /^[A-Za-z0-9]{16}$/.test(cleaned);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValidInput(inputData)) {
      toast({
        variant: "destructive",
        title: "Invalid input format",
        description: "Please enter exactly 16 alphanumeric characters (letters and numbers only)",
      });
      return;
    }

    // Remove spaces for API submission
    const cardNumber = inputData.replace(/\s/g, "");

    setLoading(true);
    setResult(null);

    // Show wake-up message if taking too long
    const wakeTimer = setTimeout(() => {
      toast({
        title: "Waking up the server...",
        description: "First request can take 30-60 seconds on free tier. Please wait.",
      });
    }, 8000);

    try {
      const res = await api.submitCard(cardNumber);

      setResult({ 
        id: res.id, 
        submittedAt: res.submittedAt,
        cardNumber: res.cardNumber 
      });

      toast({
        title: "Success!",
        description: res.message || "Card registered successfully",
      });

      // Clear input after success
      setInputData("");
    } catch (err) {
      if (err instanceof ApiTimeoutError) {
        toast({
          variant: "destructive",
          title: "Server is taking too long",
          description: "The backend may be waking up. Please try again shortly.",
        });
      } else if (err instanceof ApiError && err.status === 409) {
        toast({
          variant: "destructive",
          title: "Card already registered",
          description: err.message,
        });
      } else if (err instanceof ApiError) {
        toast({
          variant: "destructive",
          title: "Request failed",
          description: err.message,
        });
      } else {
        toast({
          variant: "destructive",
          title: "Unexpected error",
          description: "Please try again.",
        });
      }
    } finally {
      clearTimeout(wakeTimer);
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md mx-auto p-8 bg-card rounded-lg shadow-lg border border-border"
    >
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-2">Card Registry</h2>
        <p className="text-muted-foreground text-sm">
          Enter your 16-character alphanumeric card number
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Input
            type="text"
            placeholder="ABCD EFGH IJKL MNOP"
            value={inputData}
            onChange={handleInputChange}
            disabled={loading}
            className="text-center text-lg tracking-wider font-mono"
            maxLength={19}
          />
          <p className="text-xs text-muted-foreground text-center">
            {inputData.replace(/\s/g, "").length}/16 characters
          </p>
        </div>

        <Button
          type="submit"
          disabled={loading || !isValidInput(inputData)}
          className="w-full"
          size="lg"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Registering...
            </>
          ) : (
            "Register Card"
          )}
        </Button>
      </form>

      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="mt-8 pt-6 border-t border-primary/20"
          >
            <div className="text-center space-y-3">
              <div className="text-sm text-muted-foreground tracking-wide">
                ✅ Card Registered
              </div>

              <div className="bg-secondary/50 rounded-lg p-4 space-y-2">
                <p className="text-xs text-muted-foreground">Card Number</p>
                <p className="text-sm font-mono font-semibold">
                  {result.cardNumber}
                </p>
              </div>

              <div className="text-xs text-muted-foreground">
                Registered: {new Date(result.submittedAt).toLocaleString()}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
