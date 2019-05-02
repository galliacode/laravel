import React from 'react';
import Loader from 'react-loader-spinner';
import { pageInsightsByType } from "../../../../requests/twitter/channels";

class LinkedinOverviewCard extends React.Component{
    state = {
        count: null,
        loading: false
    };

    componentDidMount(){
        // this.fetchAnalytics();
    };

    componentDidUpdate(prevProps){
        if(prevProps.selectedAccount != this.props.selectedAccount || prevProps.calendarChange != this.props.calendarChange)
        {
            // this.fetchAnalytics();
        }
    }

    fetchAnalytics = () => {
        this.setState(() => ({
            loading: true
        }));
        try {
            pageInsightsByType(this.props.selectedAccount, this.props.startDate, this.props.endDate, this.props.type)            
            .then((response) => {
                this.setState(() => ({
                    count: response,
                    loading: false
                }));
            }).catch(error => {
                this.setState(() => ({
                    loading: false
                }));
                return Promise.reject(error);
            }); 
        } catch (error) {
            
        }        
    };

    render(){
        const {name, description} = this.props;
        return (
            <div className="overview-card analytics-card">
                <div className="card-header">
                    <img className="card-img" src="/images/linkedin-logo.png"></img> {name}
                    <i className="fa fa-question-circle" data-toggle="tooltip" data-placement="top" title="Tooltip on top"></i>
                </div>
                <div className="card-analytics-body">
                    <div className="card-number">
                        {this.state.loading ?  <Loader type="Bars" color="#46a5d1" height={60} width={60} /> : this.state.count !=null && this.state.count}
                    </div>
                    <div className="card-description">{description}</div>
                </div>
                <div className="card-footer">
                </div>
            </div>
            );
    }
}

export default LinkedinOverviewCard;