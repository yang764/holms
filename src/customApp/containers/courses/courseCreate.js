import React, { Component } from 'react';
import LayoutContentWrapper from '../../../components/utility/layoutWrapper';
import LayoutContent from '../../../components/utility/layoutContent';
import {connect} from "react-redux";
import courseActions from '../../../redux/course/actions';
import authActions from '../../../redux/auth/actions';
import { Card } from 'antd';
import Collapses from "../../../components/uielements/collapse";
import CollapseWrapper from '../../../containers/Uielements/Collapse/collapse.style';
import { Button, Modal, Form, Input, Radio } from 'antd';
import { Menu, Dropdown, Icon } from 'antd';
import Firebase from '../../../helpers/firebase/index';
const { openCoursePage } = courseActions;
const { updateUserData } = authActions;
const FormItem = Form.Item;




const tabListNoTitle = [{
	key: 'article',
	tab: 'All Courses',
}];

const menu = (
	<Menu>
		<Menu.Item>
			<a target="_blank" rel="noopener noreferrer" onClick={() => {}}>Mr. Chung Chak Lau</a>
		</Menu.Item>
		<Menu.Item>
			<a target="_blank" rel="noopener noreferrer" onClick={() => {}}>Mr. Li Lei</a>
		</Menu.Item>
	</Menu>
);

const Panel = Collapses.Panel;
const Collapse = props => (
	<CollapseWrapper>
		<Collapses {...props}>{props.children}</Collapses>
	</CollapseWrapper>
);

const CollectionCreateForm = Form.create()(
	class extends React.Component {
		render() {
			const { visible, onCancel, onCreate, form } = this.props;
			const { getFieldDecorator } = form;
			return (
				<Modal
					visible={visible}
					title="Create a new Course"
					okText="Create"
					onCancel={onCancel}
					onOk={onCreate}
				>
					<Form layout="vertical">
						<FormItem label="Code">
							{getFieldDecorator('code', {
								rules: [{ required: true, message: 'Please input a course code' }],
							})(
								<Input />
							)}
						</FormItem>
						<FormItem label="Title">
							{getFieldDecorator('title', {
								rules: [{ required: true, message: 'Please input a title of course!' }],
							})(
								<Input />
							)}
						</FormItem>
						<FormItem label="Venue">
							{getFieldDecorator('venue', {
								rules: [{ required: true, message: 'Please input the venue of the course!' }],
							})(
								<Input />
							)}
						</FormItem>

						<Dropdown overlay={menu}>
							<a className="ant-dropdown-link" href="#">
								Select a Teaching Assistant <Icon type="down" />
							</a>
						</Dropdown>
					</Form>
				</Modal>
			);
		}
	}
);



class CourseCreate extends Component {
	//Firebase.firestore.collection("courses").doc(id)
	constructor() {
		super();
		this.state = {
			key: 'tab1',
			noTitleKey: 'article',
			visible: false,
			userInfo: {}
		}
	}

	componentWillMount() {
		/*Firebase.firestore.collection("courses").get().then(function(querySnapshot) {
			querySnapshot.forEach(function(doc) {
				// doc.data() is never undefined for query doc snapshots
				console.log(doc.id, " => ", doc.data());
			});
		})*/
		this.setState({userInfo: this.props.userInfo})
	}

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
			const { userInfo } = this.state;
			const courseRef = Firebase.firestore.collection("courses").doc();
			values.owner = this.props.userInfo.uID;
			values.ownerName = `${this.props.userInfo.title} ${this.props.userInfo.firstName} ${this.props.userInfo.middleName} ${this.props.userInfo.lastName}`;
			values.ta = 'IONb4qOUUOVDI4x41sHxb1bck2s1';
			values.taName = 'Mr. Chung Chak Lau';
			values.aBoxes = [];
			values.materials = [];
			values.updates = [];

			courseRef.set(values).then(function() {
				userInfo.courseList.push({
					code: values.code,
					id: courseRef.id,
					title: values.title
				});
				Firebase.firestore.collection("users").doc(values.owner).update({
					courseList: userInfo.courseList
				}).then(function() {
					self.props.updateUserData(userInfo);
				})

				Firebase.firestore.collection("users").doc(values.ta).update({
					courseList: userInfo.courseList
				}).then(function() {

				})
				self.setState({userInfo});
			})
			form.resetFields();
			this.setState({ visible: false });
		});
	}
	saveFormRef = (formRef) => {
		this.formRef = formRef;
	}


	render() {
		return (
			<LayoutContentWrapper style={{ height: '100vh' }}>
				<LayoutContent>
				<div>
					<Card title={<h1>All Courses</h1>} extra={<div>
						<Button type="primary" onClick={this.showModal}>Add Course</Button>
						<CollectionCreateForm
							wrappedComponentRef={this.saveFormRef}
							visible={this.state.visible}
							onCancel={this.handleCancel}
							onCreate={this.handleCreate}
						/>
					</div>}style={{ width: '100%' }}>
						{this.renderList()}
					</Card>

				</div>
				</LayoutContent>
			</LayoutContentWrapper>
		);
	}

	renderList() {
		const { userInfo } = this.state;
		if(userInfo) {
			if(userInfo.courseList) {
				if(userInfo.courseList.length > 0) {
					return (
						<Collapse bordered={false} defaultActiveKey={['1']}>
							{userInfo.courseList.map((elm) => this.renderCourse(elm))}
						</Collapse>
					);
				}
				else {
					return <p>No Courses in System</p>
				}
			}
		}
		else {
			return <h1>ERROR LOADING COURSES. PLEASE LOGOUT AND TRY AGAIN</h1>
		}
	}

	renderCourse(elm) {
		let key = '_' + Math.random().toString(36).substr(2, 9);
		const { id, code, title } = elm;
		return (
			<Panel
				header={
					code
				}
				key={key}
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

export default connect(mapStateToProps, { openCoursePage, updateUserData })(CourseCreate);