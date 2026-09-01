import { Component } from 'react';
import type { ErrorInfo, PropsWithChildren } from 'react';
import { AlertTriangle, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/Button';

type ErrorBoundaryProps = PropsWithChildren<{
  /** Replace the default fallback UI (still receives the reset callback). */
  fallback?: (state: ErrorBoundaryState) => React.ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}>;

export type ErrorBoundaryState = {
  error: Error | null;
};

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { error: null };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.props.onError?.(error, errorInfo);
    console.error('[ErrorBoundary]', error, errorInfo.componentStack);
  }

  reset = () => {
    this.setState({ error: null });
  };

  render() {
    if (this.state.error) {
      if (this.props.fallback) {
        return this.props.fallback(this.state);
      }

      return (
        <div role="alert" className="mx-auto grid max-w-md gap-4 px-4 py-16 text-center">
          <AlertTriangle className="mx-auto size-10 text-amber-500" aria-hidden="true" />
          <h1 className="text-xl font-bold">Something went wrong</h1>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            {this.state.error.message || 'An unexpected error occurred.'}
          </p>
          <Button variant="secondary" className="mx-auto" onClick={this.reset}>
            <RotateCcw className="size-4" aria-hidden="true" />
            Try again
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}
