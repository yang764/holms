import React, { Component } from 'react';
import { connect } from 'react-redux';
import Popover from '../uielements/popover';
import IntlMessages from '../utility/intlMessages';
import userpic from '../../image/user1.png';
import authAction from '../../redux/auth/actions';
import TopbarDropdownWrapper from './topbarDropdown.style';
import { Link } from 'react-router-dom';

const { logout } = authAction;

class TopbarUser extends Component {
  componentDidMount() {
    const { user: { photoURL } } = this.props;
    this.setState({ photoURL });
  }
  constructor(props) {
    super(props);
    this.handleVisibleChange = this.handleVisibleChange.bind(this);
    this.hide = this.hide.bind(this);
    this.state = {
      visible: false,
      photoURL: userpic
    };
  }
  hide() {
    this.setState({ visible: false });
  }
  handleVisibleChange() {
    this.setState({ visible: !this.state.visible });
  }

  render() {
    const content = (
      <TopbarDropdownWrapper className="isoUserDropdown">
        <Link className="isoDropdownLink" to='/dashboard/account'>
          <IntlMessages id="themeSwitcher.account" />
        </Link>
        <a className="isoDropdownLink">
          <IntlMessages id="sidebar.feedback" />
        </a>
        <a className="isoDropdownLink">
          <IntlMessages id="topbar.help" />
        </a>
        <a className="isoDropdownLink" onClick={this.props.logout}>
          <IntlMessages id="topbar.logout" />
        </a>
      </TopbarDropdownWrapper>
    );

    const { photoURL } = this.state;

    return (
      <Popover
        content={content}
        trigger="click"
        visible={this.state.visible}
        onVisibleChange={this.handleVisibleChange}
        arrowPointAtCenter={true}
        placement="bottomLeft"
      >
        <div className="isoImgWrapper">
          <img alt="user" src={photoURL} />
          <span className="userActivity online" />
        </div>
      </Popover>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.Auth.get('user'),
    /*userData: state.User.get('user_data')*/
  }
}

export default connect(mapStateToProps, { logout })(TopbarUser);
