import React, { Component } from 'react';
import LayoutContentWrapper from '../../../components/utility/layoutWrapper';
import LayoutContent from '../../../components/utility/layoutContent';
import ContentHolder from '../../../components/utility/contentHolder';
import Card from '../../../containers/Uielements/Card/card.style';
import Box from '../../../components/utility/box';
import IntlMessages from '../../../components/utility/intlMessages';
import basicStyle from '../../../config/basicStyle';
import { rtl } from '../../../config/withDirection';
import { Row, Col } from 'antd';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import IsoWidgetsWrapper from '../../../containers/Widgets/widgets-wrapper';
import IsoWidgetBox from '../../../containers/Widgets/widget-box';
import { GoogleChart } from '../../../containers/Charts/googleChart/index';
import * as configs from '../../../containers/Charts/googleChart/config';
import Button, { ButtonGroup } from '../../../components/uielements/button';
import Firebase from '../../../helpers/firebase/index';
import Input, {
	InputSearch,
	InputGroup,
	Textarea,
} from '../../../components/uielements/input';
import Dropzone from '../dropzone/index';
import { notification } from '../../../components';
import MyPDFViewer from './mypdfviewer';


class Grading extends Component {
	componentWillMount() {

		const {id} = this.props.match.params;



	}

	constructor(){
		super();
		this.state = {
			score1: 0,
			score2: 0,
			score3: 0,
			score4: 0,
			score5: 0,
			score6: 0,
			score7: 0,
			score8: 0,
		}
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
			overflow: 'hidden'
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
			right:0
		}



		const userProfile = JSON.parse(localStorage.getItem('user_profile'));
		return (
			<LayoutContentWrapper style={wisgetPageStyle}>
				<LayoutContent>
					<h1 >COMP4095 Assignment 2 Submission</h1><br />
					<Row style={rowStyle} gutter={0} justify="start">
						<Col md={16} sm={24} xs={24} style={colStyle}>
							<IsoWidgetsWrapper>
								<Box
								>
									<MyPDFViewer/>
								</Box>
							</IsoWidgetsWrapper>
						</Col>
						<Col md={8} sm={24} xs={24} style={colStyle}>
							<IsoWidgetsWrapper>
								<Box
									title={`Student: GROVER KARAN YOGESH `}
								>
									<p style={{ 'font-size': '0.9em'}}>{`ID: 16227018`}</p>
									<p style={{ 'font-size': '0.9em'}}>{`Section: 00001`}</p>

									<ContentHolder>
										<div style={{fontSize: '1.3em'}}>
											<h1>Criteria</h1>
											<p>Problem Definition&nbsp;&nbsp;<i className="ion-plus-circled" />&nbsp;&nbsp;<i className="ion-minus-circled"  />&nbsp;&nbsp;<input style={{width: '30px'}} type="text" name="score" value="3"/>/5</p><br/>
											<p>CATWOE Analysis&nbsp;&nbsp;<i className="ion-plus-circled" />&nbsp;&nbsp;<i className="ion-minus-circled" />&nbsp;&nbsp;<input style={{width: '30px'}} type="text" name="score" value="10"/>/20</p><br/>
											<p>Activity Model&nbsp;&nbsp;<i className="ion-plus-circled" />&nbsp;&nbsp;<i className="ion-minus-circled" />&nbsp;&nbsp;<input style={{width: '30px'}} type="text" name="score" value="3"/>/10</p><br/>
											<p>Cognitive Categories&nbsp;&nbsp;<i className="ion-plus-circled" />&nbsp;&nbsp;<i className="ion-minus-circled" />&nbsp;&nbsp;<input style={{width: '30px'}} type="text" name="score" value="0"/>/10</p><br/>
											<p>Associations&nbsp;&nbsp;<i className="ion-plus-circled" />&nbsp;&nbsp;<i className="ion-minus-circled" />&nbsp;&nbsp;<input style={{width: '30px'}} type="text" name="score" value="0"/>/10</p><br/>
											<p>Data Dictionary&nbsp;&nbsp;<i className="ion-plus-circled" />&nbsp;&nbsp;<i className="ion-minus-circled" />&nbsp;&nbsp;<input style={{width: '30px'}} type="text" name="score" value="0"/>/5</p><br/>
											<p>Clarity&nbsp;&nbsp;<i className="ion-plus-circled" />&nbsp;&nbsp;<i className="ion-minus-circled" />&nbsp;&nbsp;<input style={{width: '30px'}} type="text" name="score" value="0"/>/10</p><br/>
											<p>Explanation&nbsp;&nbsp;<i className="ion-plus-circled" />&nbsp;&nbsp;<i className="ion-minus-circled" />&nbsp;&nbsp;<input style={{width: '30px'}} type="text" name="score" value="0"/>/10</p><br/>
										</div>
										<p style={{textAlign: 'center'}}>
											<Button type="primary">
												Finish
											</Button>
										</p>
									</ContentHolder>
								</Box>
							</IsoWidgetsWrapper>
						</Col>
					</Row>
				</LayoutContent>
			</LayoutContentWrapper>
		);
	}





	renderCardElement(mat) {
		const { topic, desc, files, timestamp} = mat;
		return (
			<Row>
				<ContentHolder style={{ overflow: 'hidden' }}>
					<Col md={32} sm={24} xs={24} style={{ padding: '0 8px' }}>
						<Card
							title={topic}
							style={{ width: '100%' }}
						>
							<a href={files[0]}>{desc}</a>
						</Card>
					</Col>
				</ContentHolder>
			</Row>
		);
	}




}

function mapDispatchToProps(state) {
	return {
		userInfo: state.Auth.get('userInfo')
	}
}


export default connect(mapDispatchToProps)(Grading);
