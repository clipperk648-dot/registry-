
import { useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";

interface GiftCardSubmission {
  id: string;
  card_number: string;
  balance: number;
  date_checked: string;
}

const Settings = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [isClearing, setIsClearing] = useState(false);

  const { data: submissions, isLoading } = useQuery({
    queryKey: ["giftCardSubmissions"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("gift_card_submissions")
        .select("*")
        .order("date_checked", { ascending: false });

      if (error) throw error;
      return data as GiftCardSubmission[];
    },
  });

  const handleClearSubmissions = async () => {
    if (!submissions?.length) {
      toast({
        title: "No submissions to clear",
        description: "The database is already empty",
      });
      return;
    }

    setIsClearing(true);
    try {
      // Using a simpler delete query that will remove all records
      const { error } = await supabase
        .from("gift_card_submissions")
        .delete()
        .not("id", "is", null); // This will match all records since id can't be null

      if (error) throw error;

      // Force a fresh fetch of the data
      await queryClient.invalidateQueries({ queryKey: ["giftCardSubmissions"] });

      toast({
        title: "Submissions cleared",
        description: "All gift card submissions have been deleted",
      });
    } catch (error) {
      console.error('Delete error:', error);
      toast({
        variant: "destructive",
        title: "Error clearing submissions",
        description: "Please try again later",
      });
    } finally {
      setIsClearing(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen w-full bg-white p-4 sm:p-6"
    >
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/")}
              className="hover:bg-slate-100"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl font-semibold text-slate-900">
              Gift Card Submissions
            </h1>
          </div>
          <Button
            variant="destructive"
            onClick={handleClearSubmissions}
            className="flex items-center gap-2"
            disabled={isClearing || isLoading || submissions?.length === 0}
          >
            <Trash2 className="h-4 w-4" />
            {isClearing ? "Clearing..." : "Clear Submissions"}
          </Button>
        </div>

        {isLoading ? (
          <div className="text-center py-8 text-slate-500">Loading...</div>
        ) : submissions?.length === 0 ? (
          <div className="text-center py-8 text-slate-500">
            No gift card submissions yet
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50">
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Card Number
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Balance
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Date Checked
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {submissions?.map((submission) => (
                    <tr key={submission.id} className="hover:bg-slate-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 font-medium">
                        {submission.card_number}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                        ${submission.balance.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                        {new Date(submission.date_checked).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Settings;
