import React, { Component } from 'react';
import LayoutContentWrapper from '../../../components/utility/layoutWrapper';
import LayoutContent from '../../../components/utility/layoutContent';
import ContentHolder from '../../../components/utility/contentHolder';
import Card from '../../../containers/Uielements/Card/card.style';
import Box from '../../../components/utility/box';
import IntlMessages from '../../../components/utility/intlMessages';
import { Upload, message } from 'antd';
import basicStyle from '../../../config/basicStyle';
import { rtl } from '../../../config/withDirection';
import { Row, Col } from 'antd';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import IsoWidgetsWrapper from '../../../containers/Widgets/widgets-wrapper';
import CardWidget from '../../../containers/Widgets/card/card-widgets';
import IsoWidgetBox from '../../../containers/Widgets/widget-box';
import { GoogleChart } from '../../../containers/Charts/googleChart/index';
import * as configs from '../../../containers/Charts/googleChart/config';
import { Modal, Form, Radio } from 'antd';
import Button, { ButtonGroup } from '../../../components/uielements/button';
import Firebase from '../../../helpers/firebase/index';
import Input, {
	InputSearch,
	InputGroup,
	Textarea,
} from '../../../components/uielements/input';
import Dropzone from '../dropzone/index';
import { notification } from '../../../components';
import courseActions from '../../../redux/course/actions';
import { DatePicker } from 'antd';
import { Alert } from 'antd';
import moment from 'moment';
import { Popconfirm, pMessage } from 'antd';
import { Calendar, Affix } from 'antd';
import { Card as MyCard } from 'antd';
import { Spin, Icon } from 'antd';
import './course.css';
const FormItem = Form.Item;

const Dragger = Upload.Dragger;
const { RangePicker } = DatePicker;



const { fetchCourse, updateCourse, addMaterial, removeMaterial, getCourse, addABox, removeABox, toggleAssignBox } = courseActions;

const antIcon = <Icon type="loading" style={{ fontSize: 50 }} spin />;

const mainDiv = {
	position: 'fixed',
	width: '100%',
	height:'100%',
	display: 'flex',
	alignItems: 'center',
	top: 0
};

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
						<FormItem label="Update">
							{getFieldDecorator('update', {
								rules: [{ required: true, message: 'Please input an update!' }],
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


class Course extends Component {
  componentWillMount() {
  	const {id} = this.props.match.params;
	this.setState({id});
	this.props.getCourse(id, () => {
		  if(this.props.courseData) {
			  if(this.props.courseData[id]) {
				  this.setState(this.props.courseData[id]);
				  this.setState({pageLoaded: true});
			  }
		  }

	  })

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
			const { id, updates } = this.state;
			updates.push(values.update)
			Firebase.firestore.collection("courses").doc(id).update({
				updates
			}).then(function() {

			})
			this.setState({updates});
			form.resetFields();
			this.setState({ visible: false });
		});
	}
	saveFormRef = (formRef) => {
		this.formRef = formRef;
	}



	constructor(){
  	super();
  	this.state = {
  		code: '',
  		title: 'This course',
  		ta: '',
	    taName: '',
  		venue: '',
  		owner: '',
	    ownerName: '',
	    displayForm: false,
	    filesAdded: [],
	    materials: [],
	    aBoxes: [],
	    updates: [],
	    id: '',
	    desc: '',
	    topic: '',
	    buttonV: 'inline-block',
	    butLoading: false,
	    aButLoading: false,
	    edit: false,
	    editLabel: 'Edit',
	    delLoading: false,
	    aBoxForm: false,
	    aDesc: '',
	    aTitle: '',
		aDueDateString: '',
	    aDateField: true,
	    aDelButLoading: false,
	    aDisButLoading: false,
	    pageLoaded: false,
	    visible: false
  	}
  }

  addFiles(file) {
  	const { filesAdded } = this.state;
	  this.state.filesAdded.push(file);
  }

  onSubmit() {
  	  const { filesAdded, id, desc, topic, materials } = this.state;
	  //snapshot.downloadURL

	  if(id !== '' && desc !== '' && topic !== '' && filesAdded.length >= 1) {
		  this.setState({butLoading: true});
		this.props.addMaterial(filesAdded, id, desc, topic, materials, () => {
			this.setState({desc: '', topic: '', filesAdded: [], butLoading: false});
			this.toggleMatForm();
			if(this.props.courseData) {
				if(this.props.courseData[id]) {
					this.setState(this.props.courseData[id]);
				}
			}
		})


	  }
	  else {
		  notification('error', 'one or more fields are empty or input is invalid');
	  }
  }


  updateCourse(materials) {


  }







  componentDidMount() {
  
  }

  render() {
    const chartEvents = [
      {
        eventName: 'select',
        callback(Chart) {}
      }
    ];
  	const { rowStyle, colStyle, gutter } = basicStyle;

	const wisgetPageStyle = {
	  display: 'flex',
      flexFlow: 'row wrap',
	  alignItems: 'flex-start',
	  padding: '15px',
	  overflow: 'hidden',
    };
    const margin = {
      margin: rtl === 'rtl' ? '0 0 8px 8px' : '0 8px 8px 225px'
    };

    const parent = {
	    position: 'relative',
	    width: '100%'
	  };

	  const right = {
			  position: 'absolute',
			  top:0,
			  right:0,
		      display: this.state.buttonV
	  };

	  const left = {
		  position: 'absolute',
		  top:0,
		  right:'90px',
		  display: this.state.buttonV
	  };

	  const aBox = {
		  position: 'absolute',
		  top:0,
		  right:'245px',
		  display: this.state.buttonV
	  };

	  const plus = {
		  display: 'flex',
		  margin: '0 auto',
		  right: '200'
	  }




  	const {code, title, taName, ownerName, ta, venue, owner, pageLoaded} = this.state;
	  const userProfile = JSON.parse(localStorage.getItem('user_profile'));
	  const { type } = this.props.userInfo;
    if(pageLoaded) {
	    return (
		    <LayoutContentWrapper style={wisgetPageStyle}>
			    <LayoutContent>
				    <h1>{code.toUpperCase() + " " + title}</h1><br/>
				    <Row style={rowStyle} gutter={0} justify="start">
					    <Col md={14} sm={24} xs={24} style={colStyle}>
						    <IsoWidgetsWrapper>
							    <Box
							    >
								    {(owner === userProfile.uID) ? (<div style={parent}>
									    <Button type="dashed" style={right} onClick={this.onEditClick.bind(this)}>
										    {this.state.editLabel}
									    </Button>
									    <Button type="primary" style={left} onClick={this.toggleMatForm.bind(this)}>
										    Add Materials
									    </Button>
									    <Button type="primary" style={aBox} onClick={this.toggleAssignForm.bind(this)}>
										    Add Assignment box
									    </Button>
								    </div>) : ""
								    }
								    <br/>
								    {(this.state.displayForm) ?
									    this.renderMatForm() : ""}
								    {(this.state.aBoxForm) ? this.renderAssignForm() : ""}

								    {(type === 'prof' || type === 'ta') ? this.state.aBoxes.map(elm => this.renderAssignScreen(elm)) : this.state.aBoxes.map(elm => this.renderAssignBox(elm))}
								    {this.state.materials.map(elm => this.renderCardElement(elm))}
								    {(this.state.materials.length < 1 && this.state.aBoxes.length < 1)?<div style={{margin: '50px'}}><p>Click the buttons above to add materials or assignment boxes</p></div>:""}

								    <br/>

							    </Box>
						    </IsoWidgetsWrapper>
					    </Col>
					    <Col md={10} sm={24} xs={24} style={colStyle}>
						    <IsoWidgetsWrapper>
							    <Box
								    title={`Taught by ${ownerName}`}
							    >
								    <p style={{fontSize: '0.9em'}}>{`Teaching Assistant: ${taName}`}</p>
								    <p style={{fontSize: '0.9em'}}>{`Venue: ${venue}`}</p>
								    <br/>
								    <br/>
								    <MyCard title="Updates" bordered={false} style={{width: '100%'}}
								            extra={(type === 'prof' || type === 'ta')?<div>
									            <Button shape="circle" icon="plus" onClick={this.showModal}/>
									            <CollectionCreateForm
										            wrappedComponentRef={this.saveFormRef}
										            visible={this.state.visible}
										            onCancel={this.handleCancel}
										            onCreate={this.handleCreate}
									            />
								            </div>:""}>
									    {this.state.updates.map((elm) => this.renderUpdates(elm))}
									    {(this.state.updates.length < 1)?"No New Updates":""}
								    </MyCard>
								    <br/>
								    <Calendar fullscreen={false} onPanelChange={(value, mode) => {
									    this.onPanelChange(value, mode)
								    }}/>
							    </Box>
						    </IsoWidgetsWrapper>
					    </Col>
				    </Row>
			    </LayoutContent>
		    </LayoutContentWrapper>
	    );
    }
    else {
		return (
			<div className='loadSpin'>
				<Spin indicator={antIcon}/>
			</div>
		)
    }
  }

  launchForm() {

  }

	onPanelChange(value, mode) {
		console.log(value, mode);
	}

	renderUpdates(elem) {
		let key = '_' + Math.random().toString(36).substr(2, 9);
  	    return (
  	    	<div key={key} style={{ marginBottom: '15px'}}>
  	    	    <p>{elem}</p>
	        </div>
        )
	}

	toggleMatForm() {
  	if(this.state.displayForm) {
  		this.setState({displayForm: false, buttonV: 'inline-block'});
    }
    else {
	    this.setState({displayForm: true, buttonV: 'none', edit: false, editLabel: 'Edit'});

    }
  }

	toggleAssignForm() {
		if(this.state.aBoxForm) {
			this.setState({aBoxForm: false, buttonV: 'inline-block'});
		}
		else {
			this.setState({aBoxForm: true, buttonV: 'none', edit: false, editLabel: 'Edit'});

		}
	}

  deleteMaterial(key) {
  	const { materials, id } = this.state;
  	this.setState({delLoading: true});
  	this.props.removeMaterial(id, key, materials, () => {
	    this.setState(this.props.courseData[id]);
	    this.setState({delLoading: false, edit: false, editLabel: 'Edit'});
    });
  }




  renderCardElement(mat) {
  	const { topic, desc, files, timestamp, key} = mat;
  	const style = {
  		top: '0px'
    };
  	const edit = {
		  top: '0px',
	      right: '4px'
    };


  	return (
  		<Row key={key}>
			<ContentHolder style={{ overflow: 'hidden' }}>
                <Col md={32} sm={24} xs={24} style={{ padding: '0 8px' }}>

                    <Card
                      title={topic}
                      style={{ width: '100%'}}
                      extra={(this.state.edit)?(
                      	<div>
	                        <Button type="primary" shape="circle" style={edit}><i className="ion-edit" /></Button>
	                        <Popconfirm title="Are you sure you want to delete these materials?" onConfirm={() => {
		                        this.deleteMaterial(key)
	                        }} onCancel={this.cancel.bind(this)}  okText="Yes" cancelText="No">
	                        <Button type="danger" shape="circle" style={style} loading={this.state.delLoading} icon="close"/>
	                        </Popconfirm>
                      </div>):''}
                    >
	                    <h3>{desc}</h3>
	                    <ul>
		                    {files.map(elm => (<li key={desc + Math.random()}><a href={elm.url} target="_blank">{elm.name}</a></li>))}
	                    </ul>
                    </Card>
			 	</Col>
     		</ContentHolder>
		</Row>
  	);
  }

  onEditClick() {
  	const {edit} = this.state;
  	if(edit) {
		this.setState({edit: false, editLabel: 'Edit'})
    }
    else {
  		this.setState({edit: true, editLabel: 'Done'})
    }
  }


  getCourseArr(list, id) {
  	const temp = _.values(list);
  	for(var i = 0; i < temp.length; i++) {
  		if(temp[i].code == id.toUpperCase()) {
  			return temp[i];
  		}
  	}
  }



  renderAssignBox(aBox) {
  	  const self = this;
	  const { aTitle, aDueDateString, aDesc, key, timestamp, enabled, id} = aBox;
	  const style = {
		  top: '0px'
	  };
	  const edit = {
		  top: '0px',
		  right: '4px'
	  };


	  // Firebase.firestore.collection("courses").doc(id)
		//   .onSnapshot(function(doc) {
		// 	  if(self.props.courseData[id] === doc.data()) {
		// 		  console.log("SAME");
		// 	  }
		// 	  else {
		// 		  console.log("WHAT I RETRIEVED");
		// 		  console.log(self.props.courseData[id])
		// 		  console.log("FIREBASE LISTENER");
		// 		  console.log(doc.data());
		// 	  }
	  //
		//   });

	  const dragProps = {
		  name: 'file',
		  multiple: true,
		  action: '//jsonplaceholder.typicode.com/posts/',
		  disabled: true,
		  onChange(info) {
			  const status = info.file.status;
			  if (status !== 'uploading') {
				  console.log(info.file, info.fileList);
			  }
			  if (status === 'done') {
				  message.success(`${info.file.name} file uploaded successfully.`);
			  } else if (status === 'error') {
				  message.error(`${info.file.name} file upload failed.`);
			  }
		  },
	  };


	  let day = moment.unix(timestamp).fromNow();
	  let message =  `Created ${day}`;
	  return (
		  <Row key={key}>
			  <ContentHolder style={{ overflow: 'hidden' }}>
				  <Col md={32} sm={24} xs={24} style={{ padding: '0 8px' }}>

					  <Card
						  title={aTitle}
						  style={{ width: '100%'}}
					  >

						  <Alert style={{ marginBottom: '15px', width: '100%' }} message={message} type="success" />
						  <p>{aDesc}</p>
						  <p>{"Due Date: " + moment(aDueDateString).format("dddd, MMMM Do YYYY, h:mm:ss a")}</p>
						  <Dragger {...dragProps}>
						  <p className="ant-upload-drag-icon">
						  <Icon type="inbox" />
						  </p>
						  <p className="ant-upload-text">Click or drag file to this area to upload</p>
						  <p className="ant-upload-hint">Support for a single or bulk upload.</p>
						  </Dragger>
						  <div style={{paddingTop: '20px', paddingBottom: '40px', position: 'relative', width: '100%'}}>
							  <div style={{ position: 'absolute', right:0}}>
								  <Button type="primary" onClick={() => { console.log('submit')}} style={{marginLeft: '25px'}}  loading={this.state.aButLoading}>
									  Submit
								  </Button>
							  </div>
						  </div>
					  </Card>
				  </Col>
			  </ContentHolder>
		  </Row>
	  );
  }





  renderAssignScreen(aBox) {

	  const { aTitle, aDueDateString, aDesc, key, timestamp, enabled, submissions} = aBox;
	  const style = {
		  top: '0px'
	  };
	  const edit = {
		  top: '0px',
		  right: '4px'
	  };

	  let day = moment.unix(timestamp).fromNow();
	  let message;
	  let aType;
	  if(enabled) {
		  message = `Activated ${day}`;
		  aType = "success";
	  }
	  else {
	  	 message = "Currently Deactivated";
	  	 aType = "error"
	  }

	  return (
		  <Row key={key}>
			  <ContentHolder style={{ overflow: 'hidden' }}>
				  <Col md={32} sm={24} xs={24} style={{ padding: '0 8px' }}>

					  <Card
						  title={aTitle}
						  style={{ width: '100%'}}
						  extra={(this.state.edit)?(
							  <div>
								  <Popconfirm title="Are you sure you want to delete this assignment box?" onConfirm={() => {
								  	this.confirmDelete(key);
								  }} onCancel={this.cancel.bind(this)}  okText="Yes" cancelText="No">
									  <Button type="danger" shape="circle" style={style} loading={this.state.aDelButLoading} icon="close" />
								  </Popconfirm>
							  </div>):''}
					  >

						  <Alert style={{ marginBottom: '15px', width: '100%' }} message={message} type={aType} />
						  <p>{aDesc}</p>
						  <p>{"Due Date: " + moment(aDueDateString).format("dddd, MMMM Do YYYY, h:mm:ss a")}</p>
						  <p>{"Submissions: " + submissions.length}</p>
						  <div style={{paddingTop: '20px', paddingBottom: '40px', position: 'relative', width: '100%'}}>
							  <div style={{ position: 'absolute', right:0}}>
								  {this.renderToggleButton(enabled, key)}
							  </div>
						  </div>
					  </Card>
				  </Col>
			  </ContentHolder>
		  </Row>
	  );
  }


    confirmDelete(key) {
  	    //(id, key, aBoxes, callback)
	    const { id, aBoxes } = this.state;
	    this.setState({aDelButLoading: true});
	    this.props.removeABox(id, key, aBoxes, () => {
		    this.setState({aDelButLoading: false});
		    if(this.props.courseData) {
			    if(this.props.courseData[id]) {
				    this.setState(this.props.courseData[id]);
			    }
		    }
	    })

    }

    confirmDisable(key) {
	    //(id, key, aBoxes, callback)
	    const { id, aBoxes } = this.state;
		this.props.toggleAssignBox(id, key, aBoxes, () => {
			this.setState({aDisButLoading: false});
			if(this.props.courseData) {
				if(this.props.courseData[id]) {
					this.setState(this.props.courseData[id]);
				}
			}
		})
    }

    renderToggleButton(enabled, key) {
	    if(enabled) {
		    return (
			    <Button type="danger" style={{marginLeft: '25px'}} ghost loading={this.state.aDisButLoading}
			            onClick={() => {
				            this.setState({aDisButLoading: true})
				            this.confirmDisable(key);
			            }}>
				    Disable
			    </Button>
		    );
	    }

	    else {
		    return (
			    <Button type="primary" style={{marginLeft: '25px'}} loading={this.state.aDisButLoading}
			            onClick={() => {
				            this.setState({aDisButLoading: true})
				            this.confirmDisable(key);
			            }}>
				    Enable
			    </Button>
		    );
	    }

    }

	cancel(e) {

	}

	onAssignSubmit() {
		const { id, aTitle, aDueDateString, aDesc, aBoxes } = this.state;

		//snapshot.downloadURL

		if(aTitle !== '' && aDesc !== '' && aDueDateString !== '') {
			this.setState({aButLoading: true, aDateField: false});
			this.props.addABox(id, aTitle, aDueDateString, aDesc, aBoxes, () => {
				this.setState({aDesc: '', aTitle: '', aDueDateString: '', aButLoading: false, aDateField: true});
				this.setState({aBoxForm: false, buttonV: 'inline-block'});
				if(this.props.courseData) {
					if(this.props.courseData[id]) {
						this.setState(this.props.courseData[id]);
					}
				}
			})


		}
		else {
			notification('error', 'one or more fields are empty or input is invalid');
		}
	}

	onDateChange(value, dateString) {
		console.log('Selected Time: ', value);
		console.log('THE STRING: ', dateString);
		this.setState({aDueDateString: dateString});
		//console.log('Formatted Selected Time: ', dateString);
	}

	onDateOk(value) {
		//console.log('onOk: ', value);
	}

  renderAssignForm() {
  	return (
	    <Row>
		    <ContentHolder style={{ overflow: 'hidden' }}>
			    <Col md={32} sm={24} xs={24} style={{ padding: '0 8px' }}>
				    <Card
					    title="Add Assignment Box"
				    >
					    {/*<Spin size="large" />*/}
					    <Input
						    size="large"
						    placeholder="Title"
						    style={{ marginBottom: '15px' }}
						    onChange={event => {
							    this.setState({ aTitle: event.target.value });
						    }}
					    />

					    {this.renderADatePicker()}


					    <Textarea placeholder="Description" rows={3}  style={{ marginBottom: '15px'}} onChange={event => {
						    this.setState({ aDesc: event.target.value });
					    }}/>

					    <div style={{paddingTop: '20px', paddingBottom: '40px', position: 'relative', width: '100%'}}>
						    <div style={{ position: 'absolute', right:0}}>
							    <Button type="primary" onClick={this.toggleAssignForm.bind(this)} loading={this.state.aButLoading}>
								    Cancel
							    </Button>

							    <Button type="primary" onClick={this.onAssignSubmit.bind(this)} style={{marginLeft: '25px'}}  loading={this.state.aButLoading}>
								    Create
							    </Button>
						    </div>
					    </div>

				    </Card>
			    </Col>
		    </ContentHolder>
	    </Row>
    )
  }

  renderMatForm() {
  	return (
	    <Row>
		    <ContentHolder style={{ overflow: 'hidden' }}>
			    <Col md={32} sm={24} xs={24} style={{ padding: '0 8px' }}>
				    <Card
					    title="Add Materials"
				    >
					    {/*<Spin size="large" />*/}
					    <Input
						    size="large"
						    placeholder="Topic"
						    style={{ marginBottom: '15px' }}
						    onChange={event => {
							    this.setState({ topic: event.target.value });
						    }}
					    />

					    <Textarea placeholder="Description" rows={3} onChange={event => {
						    this.setState({ desc: event.target.value });
					    }}/>
					    <Dropzone callback={this.addFiles.bind(this)}/>
					    <div style={{paddingTop: '20px', paddingBottom: '40px', position: 'relative', width: '100%'}}>
						    <div style={{ position: 'absolute', right:0}}>
							    <Button type="primary" onClick={this.toggleMatForm.bind(this)} loading={this.state.butLoading}>
								    Cancel
							    </Button>

							    <Button type="primary" onClick={this.onSubmit.bind(this)} style={{marginLeft: '25px'}}  loading={this.state.butLoading}>
								    Confirm
							    </Button>
						    </div>
					    </div>

				    </Card>
			    </Col>
		    </ContentHolder>
	    </Row>
    );
  }

  renderADatePicker() {
  	if(this.state.aDateField) {
  		return (
		    <DatePicker
			    showTime
			    format="YYYY-MM-DD HH:mm:ss"
			    placeholder="Select Deadline"
			    showToday={false}
			    style={{ marginBottom: '15px', width: '100%'}}
			    onChange={this.onDateChange.bind(this)}
			    onOk={this.onDateOk.bind(this)}
		    />
	    );
    }

    else {
	    return (
		    <DatePicker
			    showTime
			    format="YYYY-MM-DD HH:mm:ss"
			    placeholder="Select Deadline"
			    showToday={false}
			    style={{ marginBottom: '15px', width: '100%'}}
			    onChange={this.onDateChange.bind(this)}
			    onOk={this.onDateOk.bind(this)}
			    disabled
		    />
	    );
    }

  }




}

function mapDispatchToProps(state) {
	return {
		courseData: state.Course.get('course_data'),
		userInfo: state.Auth.get('userInfo')
	}
}


export default connect(mapDispatchToProps, { fetchCourse, updateCourse, addMaterial, removeMaterial, getCourse, addABox, removeABox, toggleAssignBox})(Course);

/*
return _.map(this.props.posts, post => {
			return (
				<li className="list-group-item" key={post.id}>
					<Link to={`/posts/${post.id}`}>
						{post.title}
					</Link>
				</li>
			)
		})
 */
