import { Component, type ErrorInfo, type ReactNode } from "react"

type Props = {
  children: ReactNode
}

type State = {
  hasError: boolean
  error?: Error
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Unhandled error:", error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 40, textAlign: "center" }}>
          <h1>Something went wrong.</h1>
          <p>{this.state.error?.message || "An unexpected error occurred."}</p>
          <p>Please reload the page or check the console for details.</p>
        </div>
      )
    }

    return this.props.children
  }
}
