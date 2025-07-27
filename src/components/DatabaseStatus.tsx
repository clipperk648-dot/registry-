import { useState, useEffect } from "react";
import { Database, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { api } from "@/lib/api";

export const DatabaseStatus = () => {
  const [status, setStatus] = useState<'checking' | 'connected' | 'error'>('checking');
  const [details, setDetails] = useState<any>(null);
  const [isRetrying, setIsRetrying] = useState(false);

  const checkConnection = async () => {
    try {
      setStatus('checking');
      const response = await api.healthCheck();
      setDetails(response);
      setStatus('connected');
    } catch (error) {
      console.error('Database connection check failed:', error);
      setStatus('error');
      setDetails({ error: error instanceof Error ? error.message : 'Connection failed' });
    }
  };

  const handleRetry = async () => {
    setIsRetrying(true);
    await checkConnection();
    setIsRetrying(false);
  };

  useEffect(() => {
    checkConnection();
  }, []);

  const getStatusIcon = () => {
    switch (status) {
      case 'checking':
        return <Loader2 className="h-4 w-4 animate-spin" />;
      case 'connected':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Database className="h-4 w-4" />;
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'checking':
        return 'Checking...';
      case 'connected':
        return 'Connected';
      case 'error':
        return 'Disconnected';
      default:
        return 'Unknown';
    }
  };

  const getStatusVariant = () => {
    switch (status) {
      case 'connected':
        return 'default' as const;
      case 'error':
        return 'destructive' as const;
      default:
        return 'secondary' as const;
    }
  };

  return (
    <div className="flex items-center gap-3 p-4 rounded-lg border bg-card/50 backdrop-blur-sm">
      <div className="flex items-center gap-2">
        {getStatusIcon()}
        <span className="text-sm font-medium">Database:</span>
        <Badge variant={getStatusVariant()}>
          {getStatusText()}
        </Badge>
      </div>
      
      {details && status === 'connected' && (
        <div className="text-xs text-muted-foreground">
          MongoDB: {details.mongodb}
        </div>
      )}
      
      {details && status === 'error' && (
        <div className="text-xs text-red-500">
          {details.error}
        </div>
      )}
      
      {status === 'error' && (
        <Button
          size="sm"
          variant="outline"
          onClick={handleRetry}
          disabled={isRetrying}
          className="ml-auto"
        >
          {isRetrying ? (
            <Loader2 className="h-3 w-3 animate-spin mr-1" />
          ) : null}
          Retry
        </Button>
      )}
    </div>
  );
};
