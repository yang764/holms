import React, { Component } from 'react';
import LayoutContentWrapper from '../../../components/utility/layoutWrapper';
import LayoutContent from '../../../components/utility/layoutContent';
import Collapses from '../../../components/uielements/collapse';
import CollapseWrapper from '../../../containers/Uielements/Collapse/collapse.style';
import {connect} from "react-redux";
import courseActions from '../../../redux/course/actions';

const { openCoursePage } = courseActions;

const Panel = Collapses.Panel;
const Collapse = props => (
	<CollapseWrapper>
		<Collapses {...props}>{props.children}</Collapses>
	</CollapseWrapper>
);

class CourseIndex extends Component {
  render() {
    return (
      <LayoutContentWrapper style={{ height: '100vh' }}>
        <LayoutContent>
          <h1>All Courses</h1>
	        <Collapse bordered={false} defaultActiveKey={['1']}>
		        {this.props.userInfo.courseList.map(elm => this.renderCourse(elm))}
	        </Collapse>
        </LayoutContent>
      </LayoutContentWrapper>
    );
  }

  renderCourse(elm) {
	  const { id, code, title } = elm;
	  return (
		  <Panel
			  header={
				  code
			  }
			  key="3"
		  >
			  <a onClick={() => this.props.openCoursePage(id)}>{title}</a>
		  </Panel>
	  );

  }
}

function mapStateToProps(state) {
	return {
		user: state.Auth.get('user'),
		userInfo: state.Auth.get('userInfo'),
	}
}

export default connect(mapStateToProps, { openCoursePage })(CourseIndex);
