import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { api } from "@/lib/api";
import { Loader2 } from "lucide-react";

interface Card {
  _id: string;
  cardNumber: string;
  submittedAt: string;
}

export const RecentSubmissions = () => {
  const [submissions, setSubmissions] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRecentSubmissions();
  }, []);

  const loadRecentSubmissions = async () => {
    try {
      const data = await api.getAllCards();
      setSubmissions(data.cards.slice(0, 5)); // Show latest 5
    } catch (error) {
      console.error("Failed to load submissions:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (submissions.length === 0) {
    return (
      <div className="text-center p-8 text-muted-foreground">
        No cards registered yet
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      <h3 className="text-xl font-semibold mb-4">Recent Registrations</h3>
      <div className="space-y-3">
        {submissions.map((card, index) => (
          <motion.div
            key={card._id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-4 bg-card border border-border rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="font-mono font-semibold">{card.cardNumber}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {new Date(card.submittedAt).toLocaleString()}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
