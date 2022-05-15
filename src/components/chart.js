import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';
import PropTypes from 'prop-types';
// import macarons from 'echarts/theme/macarons';

export default class Chart extends Component {
    render() {
        return (
            <ReactEcharts option={this.props.option} style={{height: this.props.height || '100%', width: this.props.width||'100%',marginTop: this.props.marginTop|| ''}} onEvents={this.props.events ? this.props.events : null} theme={this.props.theme || 'macarons'} notMerge/>
        );
    }
}

Chart.propTypes = {
    option: PropTypes.object.isRequired,
    height: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    width: PropTypes.number,
    theme: PropTypes.string
};
