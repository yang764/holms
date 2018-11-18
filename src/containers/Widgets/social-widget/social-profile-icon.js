import React, { Component } from 'react';
import Tooltip from '../../../components/uielements/tooltip';

export default class SocialProfile extends Component {
  render() {
    const { url, icon, iconcolor } = this.props;
    const iconStyle = {
      color: iconcolor,
    };
    return (
      <li>
        <Tooltip placement="bottom" title={url}>
          <a href={url}>
            <i className={icon} style={iconStyle} />
          </a>
        </Tooltip>
      </li>
    );
  }
}
