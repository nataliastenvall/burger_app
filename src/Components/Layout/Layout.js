import React, {Component} from 'react';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
import { connect } from 'react-redux';

class Layout extends Component {
  state = {
    showSideDrawer: true
  }
  sideDrawerClosedHandler = () => {
      this.setState({showSideDrawer: false});
  }

  sideDrawerToggleHandler = () => {
    this.setState((prevState) => {
      return {showSideDrawer: !prevState.showSideDrawer }
    });
  }

  render() {
    return(
      <React.Fragment>
      <Toolbar
          isAuth={this.props.isAuthenticated}
          drawerToggleClicked={this.sideDrawerToggleHandler}/>
      <SideDrawer
          open={this.state.showSideDrawer}
          closed={this.sideDrawerClosedHandler}
          isAuth={this.props.isAuthenticated} />
      <main className={classes.content}>
        {this.props.children}
      </main>
      </React.Fragment>
    )

  }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !=null
    };
};

export default connect(mapStateToProps)(Layout);
