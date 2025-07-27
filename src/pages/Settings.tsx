import { useState, useEffect } from "react";
import { motion } from "framer-motion";

import { ArrowLeft, Trash2, Database, FileText, Lock, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

import { useToast } from "@/components/ui/use-toast";
import { api, type GiftCardSubmission as ApiGiftCardSubmission } from "@/lib/api";

interface GiftCardSubmission {
  id: string;
  card_number: string;
  balance: number;
  date_checked: string;
}

const Settings = () => {
  const navigate = useNavigate();

  const { toast } = useToast();
  const [isClearing, setIsClearing] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const CORRECT_PASSWORD = "5251";

  useEffect(() => {
    // Check if user is already authenticated (stored in sessionStorage)
    const authStatus = sessionStorage.getItem("settings_authenticated");
    if (authStatus === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuthenticating(true);

    // Simulate a small delay for better UX
    setTimeout(() => {
      if (password === CORRECT_PASSWORD) {
        setIsAuthenticated(true);
        sessionStorage.setItem("settings_authenticated", "true");
        toast({
          title: "Access granted",
          description: "Welcome to the settings page",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Access denied",
          description: "Incorrect password. Please try again.",
        });
        setPassword("");
      }
      setIsAuthenticating(false);
    }, 500);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("settings_authenticated");
    setPassword("");
  };

  const [submissions, setSubmissions] = useState<GiftCardSubmission[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load submissions from localStorage
  const loadSubmissions = () => {
    try {
      const stored = localStorage.getItem('giftCardSubmissions');
      const data = stored ? JSON.parse(stored) : [];
      setSubmissions(data.sort((a: any, b: any) => new Date(b.date_checked).getTime() - new Date(a.date_checked).getTime()));
    } catch (error) {
      console.error('Error loading submissions:', error);
      setSubmissions([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadSubmissions();
  }, [isAuthenticated]);

  const handleClearSubmissions = async () => {
    if (!submissions?.length) {
      toast({
        title: "No data to clear",
        description: "Your data storage is already empty",
      });
      return;
    }

    setIsClearing(true);
    try {
      // Clear localStorage
      localStorage.removeItem('giftCardSubmissions');
      setSubmissions([]);

      toast({
        title: "Data cleared successfully",
        description: "All stored gift card data has been removed",
      });
    } catch (error) {
      console.error('Delete error:', error);
      toast({
        variant: "destructive",
        title: "Error clearing data",
        description: "Failed to clear stored data. Please try again later",
      });
    } finally {
      setIsClearing(false);
    }
  };

  // Show password prompt if not authenticated
  if (!isAuthenticated) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="min-h-screen w-full bg-white p-4 sm:p-6 flex items-center justify-center"
      >
        <div className="w-full max-w-md">
          <div className="bg-white rounded-xl border border-slate-200 p-8 shadow-lg">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-full mb-4">
                <Lock className="h-8 w-8 text-primary-foreground" />
              </div>
              <h1 className="text-2xl font-semibold text-slate-900 mb-2">
                Protected Access
              </h1>
              <p className="text-slate-600">
                Enter the password to access settings
              </p>
            </div>

            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pr-10"
                  disabled={isAuthenticating}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>

              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={() => navigate("/")}
                  disabled={isAuthenticating}
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
                <Button
                  type="submit"
                  className="flex-1"
                  disabled={!password || isAuthenticating}
                >
                  {isAuthenticating ? "Verifying..." : "Access Settings"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </motion.div>
    );
  }

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
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-primary">
                <Database className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-semibold text-slate-900">
                  User Data Storage
                </h1>
                <p className="text-sm text-slate-600">
                  View and manage your stored gift card data
                </p>
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={handleLogout}
              className="flex items-center gap-2"
            >
              <Lock className="h-4 w-4" />
              Logout
            </Button>
            <Button
              variant="destructive"
              onClick={handleClearSubmissions}
              className="flex items-center gap-2"
              disabled={isClearing || isLoading || submissions?.length === 0}
            >
              <Trash2 className="h-4 w-4" />
              {isClearing ? "Clearing..." : "Clear All Data"}
            </Button>
          </div>
        </div>

        {/* Data Storage Summary */}
        {!isLoading && submissions && submissions.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-100">
                  <FileText className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-600">Total Entries</p>
                  <p className="text-2xl font-semibold text-slate-900">{submissions.length}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-green-100">
                  <Database className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-600">Total Balance</p>
                  <p className="text-2xl font-semibold text-slate-900">
                    ${submissions.reduce((sum, sub) => sum + sub.balance, 0).toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-purple-100">
                  <CreditCard className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-600">Last Check</p>
                  <p className="text-2xl font-semibold text-slate-900">
                    {new Date(submissions[0].date_checked).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {isLoading ? (
          <div className="text-center py-12">
            <Database className="h-12 w-12 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-500">Loading your stored data...</p>
          </div>
        ) : submissions?.length === 0 ? (
          <div className="text-center py-12">
            <FileText className="h-16 w-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-900 mb-2">
              No data stored yet
            </h3>
            <p className="text-slate-500 mb-6">
              Start using the gift card checker to store your input data here
            </p>
            <Button onClick={() => navigate("/")} className="inline-flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              Check Gift Cards
            </Button>
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50">
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Gift Card Number
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Balance Found
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Date Stored
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
