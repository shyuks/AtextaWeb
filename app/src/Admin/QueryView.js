import React, { Component } from 'react';
import { connect } from 'react-redux';
import QueryTable from './QueryTable';
import ChartView from './ChartView';
import { MuiThemeProvider } from 'material-ui/styles';

class QueryView extends Component {
  constructor(props){
    super(props)
    
  }

  render(){
    let view = <div></div>

    if (this.props.viewType === 'T'){

      view = (<MuiThemeProvider>
                <QueryTable data={this.props.singleQuery}/>
              </MuiThemeProvider>
             )

    } else if (this.props.viewType === 'C') {
      
      view = <ChartView data={this.props.singleQuery} 
                        label={this.props.inputQueryName} 
                        chartOption={this.props.chartOption}/>
    }
    return (
      <div>{view}</div>
    )
  }
}

function MapStateToProps(state){
  return {
    singleQuery : state.admin.singleQuery,
    viewType : state.admin.viewType,
    chartOption : state.admin.chartOption,
    inputQueryName : state.admin.inputQueryName
  }
}

export default connect(MapStateToProps)(QueryView)