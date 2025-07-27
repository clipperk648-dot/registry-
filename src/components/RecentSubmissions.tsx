import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Database, Eye, Clock, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { api } from "@/lib/api";

interface GiftCardSubmission {
  _id?: string;
  input_data?: string;
  card_number?: string;
  balance: number;
  date_checked: string;
}

export const RecentSubmissions = () => {
  const [submissions, setSubmissions] = useState<GiftCardSubmission[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadRecentSubmissions = async () => {
      try {
        setError(null);
        const data = await api.getGiftCards();
        // Show only the 3 most recent submissions
        setSubmissions(data.slice(0, 3));
      } catch (error) {
        console.error('Error loading recent submissions:', error);
        setError('Failed to load recent submissions');
      } finally {
        setIsLoading(false);
      }
    };

    loadRecentSubmissions();
  }, []);

  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="max-w-4xl mx-auto mt-20"
      >
        <div className="text-center">
          <Database className="h-8 w-8 text-primary mx-auto mb-4 animate-pulse" />
          <p className="text-muted-foreground">Loading recent submissions...</p>
        </div>
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="max-w-4xl mx-auto mt-20"
      >
        <div className="text-center p-6 rounded-2xl bg-destructive/10 border border-destructive/20">
          <Database className="h-8 w-8 text-destructive mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-destructive mb-2">Database Connection Issue</h3>
          <p className="text-sm text-muted-foreground mb-4">{error}</p>
          <Button 
            variant="outline" 
            onClick={() => window.location.reload()}
            className="border-destructive/30 hover:bg-destructive/10"
          >
            Retry Connection
          </Button>
        </div>
      </motion.div>
    );
  }

  if (submissions.length === 0) {
    return null; // Don't show anything if no submissions
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.8 }}
      className="max-w-4xl mx-auto mt-20"
    >
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-4">Recent Code Checks</h2>
        <p className="text-muted-foreground">Your latest balance checks are stored securely</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {submissions.map((submission, index) => (
          <motion.div
            key={submission._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-card/50 border border-primary/20 rounded-2xl p-6 backdrop-blur-sm hover:shadow-glow-primary/20 transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-4">
              <CreditCard className="h-6 w-6 text-primary" />
              <div className="flex items-center text-xs text-muted-foreground">
                <Clock className="h-3 w-3 mr-1" />
                {new Date(submission.date_checked).toLocaleDateString()}
              </div>
            </div>
            
            <div className="space-y-2">
              <div>
                <p className="text-xs text-muted-foreground">Code</p>
                <p className="font-mono text-sm truncate">
                  {(submission.input_data || submission.card_number)?.slice(0, 8)}...
                </p>
              </div>
              
              <div>
                <p className="text-xs text-muted-foreground">Balance</p>
                <p className="text-lg font-bold text-primary">
                  ${submission.balance.toFixed(2)}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="text-center">
        <Button 
          onClick={() => navigate("/settings")}
          variant="outline"
          className="inline-flex items-center gap-2"
        >
          <Eye className="h-4 w-4" />
          View All Submissions
        </Button>
      </div>
    </motion.div>
  );
};
