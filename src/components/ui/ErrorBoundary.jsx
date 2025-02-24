import { Component } from "react";

export default class ErrorBoundary extends Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-red-500 text-center">
            <h1 className="text-2xl font-bold">Something went wrong</h1>
            <p>{this.state.error?.message || "Unknown error"}</p>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
