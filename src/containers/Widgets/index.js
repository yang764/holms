import React, { Component } from 'react';
import clone from 'clone';
import { Row, Col } from 'antd';
import basicStyle from '../../config/basicStyle';
import IsoWidgetsWrapper from './widgets-wrapper';
import IsoWidgetBox from './widget-box';
import CardWidget from './card/card-widgets';
import ProgressWidget from './progress/progress-widget';
import SingleProgressWidget from './progress/progress-single';
import ReportsWidget from './report/report-widget';
import StickerWidget from './sticker/sticker-widget';
import SaleWidget from './sale/sale-widget';
import VCardWidget from './vCard/vCard-widget';
import SocialWidget from './social-widget/social-widget';
import SocialProfile from './social-widget/social-profile-icon';
import userpic from '../../image/user1.png';
import { TableViews, tableinfos, dataList } from '../Tables/antTables';
import * as rechartConfigs from '../Charts/recharts/config';
import { StackedAreaChart } from '../Charts/recharts/charts/';
import { GoogleChart } from '../Charts/googleChart/';
import * as googleChartConfigs from '../Charts/googleChart/config';
import IntlMessages from '../../components/utility/intlMessages';
import PageHeader from '../../components/utility/pageHeader';
import { connect } from 'react-redux';
import Carousels from '../../components/uielements/carousel';
import LayoutWrapper from '../../components/utility/layoutWrapper';
import ContentHolder from '../../components/utility/contentHolder';
import CarouselWrapper from '../Uielements/Carousel/carousel.style';
import { Link } from 'react-router-dom';
import Firebase from '../../helpers/firebase/index';
import authAction from '../../redux/auth/actions';

const tableDataList = clone(dataList);
tableDataList.size = 5;
const { getUserData } = authAction;
const Carousel = props => (
  <CarouselWrapper>
    <Carousels {...props} />
  </CarouselWrapper>
);

class IsoWidgets extends Component {
  componentWillMount() {
    const { userInfo } = this.props;

    this.setState({
	    userInfo
    })

  }

  constructor() {
    super();


    this.state = {
	    userInfo: {}
    }
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

    const chartEvents = [
      {
        eventName: 'select',
        callback(Chart) {}
      }
    ];

    const stackConfig = {
      ...rechartConfigs.StackedAreaChart,
      width: window.innerWidth < 450 ? 300 : 500
    };

    const { userInfo:{firstName, middleName, lastName} } = this.state;
    return (
      <div style={wisgetPageStyle}>
      <PageHeader>{`Welcome ${firstName + " " + middleName + " " + lastName}!`}</PageHeader>

      <Row style={rowStyle} gutter={0} justify="start">
          <Col md={32} sm={24} xs={24} style={colStyle}>
            <IsoWidgetsWrapper>
              <Carousel autoplay effect="fade">
                  <div style={{'background': '#607D8B'}}>
                    <h3 style={{'color': 'white'}}>4 New Assignments Received: COMP4095</h3>
                  </div>
                  <div style={{'background': '#8B0000'}}>
                    <h3 style={{'color': 'white'}}>One Late Submission: COMP4007</h3>
                  </div>
                  <div style={{'background': '#008080'}}>
                    <h3 style={{'color': 'white'}}>New Teaching Assistant Request.<Link style={{'color': 'white'}} to="#">&nbsp;Click To View</Link></h3>
                  </div>
                </Carousel>
            </IsoWidgetsWrapper>
          </Col>
      </Row>


        

        <Row style={rowStyle} gutter={0} justify="start">
          <Col md={12} sm={12} xs={24} style={colStyle}>
            <IsoWidgetsWrapper gutterBottom={20}>
              {/* Card Widget */}
              <CardWidget
                icon="ion-ios-pie"
                iconcolor="#42A5F5"
                number={4}
                text={"Data Analysis Reports"}
              />
            </IsoWidgetsWrapper>

            <IsoWidgetsWrapper gutterBottom={20}>
              {/* Card Widget */}
              <CardWidget
                icon="ion-ios-compose"
                iconcolor="#F75D81"
                number={4}
                text={"Items on To-do-list"}
              />
            </IsoWidgetsWrapper>

            <IsoWidgetsWrapper>
              {/* Card Widget */}
              <CardWidget
                icon="ion-ios-paper"
                iconcolor="#FEAC01"
                number={22}
                text={"Assignments available for grading"}
              />
            </IsoWidgetsWrapper>
          </Col>


          <Col md={12} sm={24} xs={24} style={colStyle}>
            <IsoWidgetsWrapper>
              <IsoWidgetBox height={455}>
                <StackedAreaChart {...stackConfig} />
              </IsoWidgetBox>
            </IsoWidgetsWrapper>
          </Col>
        </Row>

        {/*<Row style={rowStyle} gutter={0} justify="start">
          <Col md={12} sm={24} xs={24} style={colStyle}>
            <IsoWidgetsWrapper>
              <IsoWidgetBox height={470}>
                <GoogleChart
                  {...googleChartConfigs.BarChart}
                  chartEvents={chartEvents}
                />
              </IsoWidgetBox>
            </IsoWidgetsWrapper>
          </Col>

          <Col md={12} sm={24} xs={24} style={colStyle}>
            <IsoWidgetsWrapper>
              <IsoWidgetBox height={470}>
                <GoogleChart {...googleChartConfigs.Histogram} />
              </IsoWidgetBox>
            </IsoWidgetsWrapper>
          </Col>
        </Row>*/}

        {/*<Row style={rowStyle} gutter={0} justify="start">
          <Col md={16} sm={32} xs={32} style={colStyle}>
            <IsoWidgetsWrapper>
              <IsoWidgetBox height={450}>
                <GoogleChart {...googleChartConfigs.TrendLines} />
              </IsoWidgetBox>
            </IsoWidgetsWrapper>
          </Col>

          <Col md={8} sm={24} xs={24} style={colStyle}>
            <IsoWidgetsWrapper>
              <IsoWidgetBox height={450}>
                <GoogleChart {...googleChartConfigs.ComboChart} />
              </IsoWidgetBox>
            </IsoWidgetsWrapper>
          </Col>

          
        </Row>*/}
      </div>
    );
  }
}

function mapStateToProps(state) {
    return {
	    userInfo: state.Auth.get('userInfo')
    }
}

export default connect(mapStateToProps, { getUserData })(IsoWidgets)
