import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    // eslint-disable-next-line react/no-unused-state
    this.state = { error: null, errorInfo: null };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      // eslint-disable-next-line react/no-unused-state
      error,
      errorInfo,
    });

    // Log error info somewhere
  }

  render() {
    // eslint-disable-next-line react/destructuring-assignment
    if (this.state.errorInfo) {
      // eslint-disable-next-line react/destructuring-assignment
      return (
        <div style={{
          display: 'flex',
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          // eslint-disable-next-line react/destructuring-assignment
          minHeight: this.props.isFull ? '100vh' : 'auto',
        }}
        >
          <h2>... something went wrong!</h2>
        </div>
      );
    }

    // eslint-disable-next-line react/destructuring-assignment
    return this.props.children;
  }
}
