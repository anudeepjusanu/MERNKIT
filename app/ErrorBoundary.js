import React from 'react';
import { Grid, Typography, Link, Button } from '@material-ui/core';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorObj: '', infoObj: '' };
  }

  componentDidCatch(error, info) {
    // Display fallback UI
    this.setState({ hasError: true, errorObj: error, infoObj: info });
    // You can also log the error to an error reporting service
    console.error(error, info);
  }
  navigateBack = () => {
    window.location.reload({ forceReload: true });
  };
  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div>
          <Grid item xs={12}>
            <Grid
              container
              spacing={3}
              className="sign_body noPage_content"
            >
              <Grid item xs={12}>
                <Typography className="" variant="h6" color="primary">
                  {/* Something went wrong */}
                  An error occurred. Please try again later.
                </Typography>
                {/* <Typography variant="body2" gutterBottom>
                  <p>{this.state.errorObj.stack}</p>
                </Typography> */}
                <Button onClick={this.navigateBack} variant="contained" color="secondary" type="submit" className="btn large">Home</Button>
              </Grid>
            </Grid>
          </Grid>
        </div>
      );
    }
    return this.props.children;
  }
}
