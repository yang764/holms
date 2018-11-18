import React, { Component } from 'react';
import { VCardWidgetWrapper } from './style';
import { rtl } from '../../../config/withDirection';
import Button, { ButtonGroup } from '../../../components/uielements/button';

export default class VCardWidget extends Component {
  render() {
    const { src, alt, name, title, description, email, children, style, button } = this.props;
    const margin = {
          margin: rtl === 'rtl' ? '0px 8px 0px 450px' : '0px 8px 0px 450px'
    };

	  const parent = {
		  position: 'relative',
		  width: '100%',
          marginBottom: 55
	  };

	  const right = {
		  position: 'absolute',
		  top:0,
		  right: '20%'
	  };

    return (
      <VCardWidgetWrapper className="isoVCardWidgetWrapper" style={style}>

        <div style={parent}>
          <div style={right}>
              {button}
          </div>
        </div>


        <div className="isoVCardImage">
          <img src={src} alt={alt} />
        </div>

        <div className="isoVCardBody">
          <h3 className="isoName">
            {name}
          </h3>
          <span className="isoDesgTitle">
            {title}
          </span>

          <p className="isoDescription">
            {`Email: ${email}`}
          </p>

          <p className="isoDescription">
            {description}
          </p>

          <div className="isoWidgetSocial">
            {children}
          </div>
        </div>

        
      </VCardWidgetWrapper>
    );
  }
}
