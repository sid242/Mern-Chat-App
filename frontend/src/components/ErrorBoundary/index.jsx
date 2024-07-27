import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
  }

  render() {
    if (this?.state?.error) {
      return (
        <div className="m-10 p-5 bg-black text-white">
          <h3 className="text-red-600">Error: Something is wrong!</h3>
          <div className="text-red-600">{this?.state?.error?.toString()}</div>
          <hr className="border border-solid border-2 border-red-400 my-3" />
          <div>{this.state.errorInfo.componentStack}</div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
