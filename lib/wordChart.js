/**
 * Created by yongyuehuang on 2017/8/5.
 */
import React from 'react'
import echarts from "./common";
// require('echarts-wordcloud');
import 'echarts-wordcloud';
import {fromJS} from 'immutable'
import ReactResizeDetector from 'react-resize-detector';
import { isInteger } from 'lodash';
export default class WordChart extends React.Component {
  
  constructor(props) {
    super(props)
  }
  
  initChart=()=> {
    const { option={},config={handle:''}} = this.props;
    const{ chart }=this.state;
    chart.showLoading();
    chart.off('click');
    if(typeof config.handle=='function' ){
      chart.on('click',config.handle.bind(this));
    }
    chart.setOption(option,true);
    chart.hideLoading();
  }
  shouldComponentUpdate(nextProps,nextState){
    if(fromJS(nextProps)==fromJS(this.props)){
      return false
    }else{
      return true;
    }
  }
  componentDidMount(){
    let chart=echarts.init(this.id,'walden',{renderer: 'canvas'});
    this.setState({chart},()=>{
      this.initChart();
    });
    setTimeout(()=>{  chart.resize();},0);
  }
  componentDidUpdate() {
    this.initChart()
  }
  componentWillUnmount(){
    const{ chart }=this.state;
    chart.dispose();
  }
  chartResize=(width)=>{
    const { chart } = this.state;
    if(chart&&isInteger(width)) chart.resize();
  }
  render() {
    let { height="200px",width="100%"} = this.props.config||{};
   return <div>
    <div ref={id => (this.id = id)}style={{width, height}} />
    <ReactResizeDetector  handleWidth handleHeight onResize={this.chartResize.bind(this)}/>
   </div>
  }
}
