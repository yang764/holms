import React, { Component } from 'react';
import LayoutContentWrapper from '../../../components/utility/layoutWrapper';
import LayoutContent from '../../../components/utility/layoutContent';
import VCardWidget from '../../../containers/Widgets/vCard/vCard-widget';
import userpic from '../../../image/user1.png';
import IsoWidgetsWrapper from '../../../containers/Widgets/widgets-wrapper';
import IntlMessages from '../../../components/utility/intlMessages';
import SocialWidget from '../../../containers/Widgets/social-widget/social-widget';
import SocialProfile from '../../../containers/Widgets/social-widget/social-profile-icon';
import { connect } from 'react-redux';
import Firebase from '../../../helpers/firebase/index';
import { rtl } from '../../../config/withDirection';
import { TableViews, dataList } from '../../../containers/Tables/antTables';
import clone from 'clone';
import IsoWidgetBox from '../../../containers/Widgets/widget-box';
import { Row, Col } from 'antd';
import basicStyle from '../../../config/basicStyle';
import courseActions from '../../../redux/course/actions'
import { Modal, Form, Radio } from 'antd';
import { columns, tableInfo} from '../utilities/config';
import TableProvider from '../utilities/TableProvider';
import Card from '../../../containers/Uielements/Card/card.style'; 
import Box from '../../../components/utility/box';
import Tooltip from '../../../components/uielements/tooltip';
import _ from 'lodash';
import actions from '../../../redux/auth/actions';
import Collapses from '../../../components/uielements/collapse';
import CollapseWrapper from '../../../containers/Uielements/Collapse/collapse.style';
import Carousels from '../../../components/uielements/carousel';
import CarouselWrapper from '../../../containers/Uielements/Carousel/carousel.style';
import { Link } from 'react-router-dom';
import { Button, Select, Menu, Dropdown, Icon, message  } from 'antd';
import Input, {
	InputSearch,
	InputGroup,
	Textarea,
} from '../../../components/uielements/input';
import './userProfile.css';
const  { updateUserData } = actions;
const FormItem = Form.Item;
const Option = Select.Option;


//tableDataList.size = 5;
const Carousel = props => (
  <CarouselWrapper>
    <Carousels {...props} />
  </CarouselWrapper>
);

const Panel = Collapses.Panel;
const Collapse = props => (
	<CollapseWrapper>
		<Collapses {...props}>{props.children}</Collapses>
	</CollapseWrapper>
);

const { fetchCourse, openCoursePage } = courseActions;

const CollectionCreateForm = Form.create()(
	class extends React.Component {
		handleButtonClick(e) {
			console.log('click left button', e);
		}

		handleMenuClick(e) {
			console.log('click', e);
		}

		render() {
			const { visible, onCancel, onCreate, form } = this.props;
			const { getFieldDecorator } = form;


			return (
				<Modal
					visible={visible}
					title="Update your profile"
					okText="Update"
					onCancel={onCancel}
					onOk={onCreate}
				>
					<Form layout="vertical">
						<FormItem label="Firstname">
							{getFieldDecorator('firstName', {
								rules: [{ required: true, message: 'Please input a new first name' }],
							})(
								<Input />
							)}
						</FormItem>
						<FormItem label="Middlename">
							{getFieldDecorator('middleName', {
								rules: [{ required: true, message: 'Please input a new middle name' }],
							})(
								<Input />
							)}
						</FormItem>
						<FormItem label="Lastname">
							{getFieldDecorator('lastName', {
								rules: [{ required: true, message: 'Please input the venue of the course!' }],
							})(
								<Input />
							)}
						</FormItem>
						<FormItem label="Description">
							{getFieldDecorator('description', {
								rules: [{ required: true, message: 'Please input a course code' }],
							})(
								<Input />
							)}
						</FormItem>
						<FormItem label="Facebook">
							{getFieldDecorator('facebook', {
								rules: [{ required: true, message: 'Please input a title of course!' }],
							})(
								<Input />
							)}
						</FormItem>
						<FormItem label="Twitter">
							{getFieldDecorator('twitter', {
								rules: [{ required: true, message: 'Please input the venue of the course!' }],
							})(
								<Input />
							)}
						</FormItem>
						<FormItem label="Google+">
							{getFieldDecorator('googlePlus', {
								rules: [{ required: true, message: 'Please input the venue of the course!' }],
							})(
								<Input />
							)}
						</FormItem>
						<FormItem label="LinkedIn">
							{getFieldDecorator('linkedIn', {
								rules: [{ required: true, message: 'Please input the venue of the course!' }],
							})(
								<Input />
							)}
						</FormItem>
					</Form>

				</Modal>
			);
		}
	}
);




class UserDashboard extends Component {
	/*
	 "antTable.title.courseCode": "Course Code",
  "antTable.title.courseName": "Course Name",
  "antTable.title.courseStudentNum": "No. of Students",
  "antTable.title.professors": "Professors",
  "antTable.title.teachingA": "Teaching Assistants",
  "antTable.title.venue": "Venue"
	*/
	showModal = () => {
		this.setState({ visible: true });
	}
	handleCancel = () => {
		this.setState({ visible: false });
	}
	handleCreate = () => {
		const form = this.formRef.props.form;
		form.validateFields((err, values) => {
			if (err) {
				return;
			}
			const self = this;
			const { firstName, middleName, lastName, description, facebook, twitter, googlePlus, linkedIn } = values

			Firebase.firestore.collection("users").doc(this.state.uID).update({ firstName,
				middleName,
				lastName,
				description,
				facebook,
				twitter,
				googlePlus,
				linkedIn }).then(function() {
				self.setState({ firstName,
					middleName,
					lastName,
					description,
					facebook,
					twitter,
					googlePlus,
					linkedIn });
					self.props.updateUserData({
						firstName,
						middleName,
						lastName,
						title: self.state.title,
						imgSrc: self.state.imgSrc,
						email: self.state.email,
						description,
						facebook,
						twitter,
						googlePlus,
						linkedIn,
						courseList: self.state.courseList,
						uID: self.state.uID,
						activated: true,
						id: self.state.id,
						notes: self.state.notes,
						type: self.state.type
					})
				})

			form.resetFields();
			this.setState({ visible: false });
		});
	}
	saveFormRef = (formRef) => {
		this.formRef = formRef;
	}
	
	constructor() {
		super();

		this.state = {
			firstName: 'loading',
			middleName: 'loading',
			lastName: 'loading',
			title: 'loading',
			imgSrc: userpic,
			email: 'loading', 
			description: '',
			facebook: '',
			twitter: '', 
			googlePlus: '',
			updates: [],
			linkedIn: '',
			courseList: new TableProvider([]),
			uID: '',
			id: '',
			notes: [],
			notifications: [],
			type: ''
		}
		
	}

	componentWillMount() {
		//const tableDataList = new TableProvider(userData);
		const {userInfo} = this.props;
		let arr;

		if(!userInfo.firstName) {
			const self = this;
			const profile = JSON.parse(localStorage.getItem('user_profile'));
			if(profile) {
				this.setState(profile);
				this.setState({courseList: profile.courseList});
			}
			else {

			}
		}
		else {
			this.setState(userInfo);
			console.log(userInfo);
			const { courseList } = userInfo;
			console.log(courseList);
		}
	}

	handleButtonClick() {
		// this.props.fetchUserProfile('LWAeRTvFuvXISHW5ZVnaTcfX41a2');
		// this.setState(this.props.userInfo);
		const temp = this.state;
		const { user: { uid } } = this.props;
		const profile = JSON.parse(localStorage.getItem('user_profile'));


		// Firebase.firestore.collection("users").doc('LWAeRTvFuvXISHW5ZVnaTcfX41a2').set(profile)
		// 	.then(function(docRef) {
		// 		//console.log("Document written with ID: ", docRef);
		// 	})
		// 	.catch(function(error) {
		// 		console.error("Error adding document: ", error);
		// 	});

		
	}

	render() {
		const { rowStyle, colStyle } = basicStyle;

	    const wisgetPageStyle = {
	      display: 'flex',
	      flexFlow: 'row wrap',
	      alignItems: 'flex-start',
	      padding: '15px',
	      overflow: 'hidden'
	    };

	  	const { firstName, lastName, middleName, title, type, imgSrc, email, description, facebook, twitter, googlePlus, linkedIn } = this.state;

	  	const margin = {
      		margin: rtl === 'rtl' ? '0 0 8px 8px' : '0 8px 8px 0'
    	};
    	
	    return (
	    <div style={wisgetPageStyle}>
	    <Row style={rowStyle} gutter={0} justify="start">
          <Col md={32} sm={24} xs={24} style={colStyle}>
	          <IsoWidgetsWrapper>
	              {/* VCard Widget */}
	              <VCardWidget
	                style={{ height: '500px', width: '100%'}}
	                src={imgSrc}
	                alt="User"
	                name={title + " " + firstName + " " + middleName + " " + lastName}
	                title={(type === 'prof')?'University Professor':((type === 'ta')?'Teaching Assistant':'Student')}
	                email={email}
	                description={
	                  description
	                }
	                button={<div>
		                <Button type="dashed" onClick={this.showModal}>Edit Profile</Button>
		                <CollectionCreateForm
			                wrappedComponentRef={this.saveFormRef}
			                visible={this.state.visible}
			                onCancel={this.handleCancel}
			                onCreate={this.handleCreate}
		                />
	                </div>}
	              >
	                <SocialWidget>
	                   {(facebook)?<SocialProfile url={facebook} icon="ion-social-facebook" iconcolor="#3b5998"/>:''}
	                   {(twitter)?<SocialProfile url={twitter} icon="ion-social-twitter" iconcolor="#00aced"/>:''}
	                   {(googlePlus)?<SocialProfile url={googlePlus} icon="ion-social-googleplus" iconcolor="#dd4b39"/>:''}
	                   {(linkedIn)?<SocialProfile url={linkedIn} icon="ion-social-linkedin-outline" iconcolor="#007bb6"/>:''}
	                </SocialWidget>
	              </VCardWidget>
	            </IsoWidgetsWrapper>
	          </Col>
        	</Row>

        	<Row style={rowStyle} gutter={0} justify="start">
		          <Col md={32} sm={24} xs={24} style={colStyle}>
		            <IsoWidgetsWrapper>
		              <Carousel autoplay effect="fade">
		                  <div style={{'background': '#607D8B'}}>
		                    <h3 style={{'color': 'white'}}>Welcome to EALAS</h3>
		                  </div>
			              <div style={{'background': '#008080'}}>
				              <h3 style={{'color': 'white'}}>Save tasks with the built-in notes app</h3>
			              </div>
		                  <div style={{'background': '#8B0000'}}>
		                    <h3 style={{'color': 'white'}}>Plan your week with Calendar</h3>
		                  </div>

		                </Carousel>
		            </IsoWidgetsWrapper>
		          </Col>
      		</Row>

        	<Row style={rowStyle} gutter={0} justify="start">
          
             
          <Col md={32} sm={24} xs={24} style={colStyle}>
            <IsoWidgetsWrapper>
              <IsoWidgetBox>
              	<h1>Your Courses</h1><br/>
	              <Collapse bordered={false} defaultActiveKey={['1']}>
		              {(this.state.courseList)?this.state.courseList.map(x => this.renderCourse(x)):<h1>Unexpected error occured while loading courses</h1>}
	              </Collapse>
              </IsoWidgetBox>
            </IsoWidgetsWrapper>
          </Col>
        </Row>
        </div>

        	
	    );
	 }




	renderCourse(course) {
		let key = '_' + Math.random().toString(36).substr(2, 9);
		const { id, code, title } = course;
		return (
			<Panel
				header={
					code
				}
				key={key}
			>
				<a onClick={() => {this.props.openCoursePage(id)}}>{title}</a>
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

export default connect(mapStateToProps, { fetchCourse, openCoursePage, updateUserData })(UserDashboard);



