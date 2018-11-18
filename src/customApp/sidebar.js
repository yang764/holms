import React from 'react';
import { Link } from 'react-router-dom';
import Menu from '../components/uielements/menu';
import IntlMessages from '../components/utility/intlMessages';

export default function(url, submenuColor) {
  const sidebars = [];
  sidebars.push(
      <Menu.Item key="account">
        <Link to={`${url}/account`}>
          <span className="isoMenuHolder" style={submenuColor}>
            <i className="ion-ios-paper" />
            <span className="nav-text">
            <IntlMessages id="sidebar.dashboard" />
            </span>
          </span>
        </Link>
      </Menu.Item>
  );
  sidebars.push(
     <Menu.Item key="courses">
        <Link to={`${url}/courses`}>
          <span className="isoMenuHolder" style={submenuColor}>
            <i className="ion-university" />
            <span className="nav-text">
            <IntlMessages id="sidebar.courses" />
            </span>
          </span>
        </Link>
      </Menu.Item>
  );
	sidebars.push(
		<Menu.Item key="grading">
			<Link to={`${url}/grading/:id`}>
          <span className="isoMenuHolder" style={submenuColor}>
            <i className="ion-android-list" />
            <span className="nav-text">
                Submissions
            </span>
          </span>
			</Link>
		</Menu.Item>);
  return sidebars;
  // <IntlMessages id="sidebar.blankPage" />
}
