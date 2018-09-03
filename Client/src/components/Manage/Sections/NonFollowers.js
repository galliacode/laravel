import React from 'react';
import { connect } from 'react-redux';
import UserList from "../../UserList";
import { getNonFollowers } from '../../../requests/twitter/channels';
import channelSelector from '../../../selectors/channels';

class NonFollowers extends React.Component{
    state = {
        userItems: [],
        actions: 0,
        loading: this.props.channelsLoading
    }

    componentDidMount() {
        
        if(!this.props.channelsLoading){
            this.fetchData();
        }
    }

    componentDidUpdate(prevProps) {
        if((this.props.selectedChannel !== prevProps.selectedChannel)){
            this.fetchData();
        }
    }

    setLoading = (loading = false) => {
        this.setState(() => ({
            loading
        }));
    };

    fetchData = () => {
        this.setLoading(true);
        getNonFollowers()
            .then((response) => {
                this.setState(() => ({
                    userItems: response.items,
                    actions: response.actions,
                    loading: false
                }));
            }).catch((error) => {
                this.setLoading(false);
            });
    };

    render(){
        return (
            <div>
                <h2>NON-FOLLOWERS</h2>
                <UserList 
                    userItems={ this.state.userItems }
                    actionType="unfollow"
                    actions={this.state.actions}
                    loading={this.state.loading}
                    showSortOption={true}
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const selectedTwitterChannel = {selected: 1, provider: "twitter"};
    const selectedChannel = channelSelector(state.channels.list, selectedTwitterChannel);

    return {
        channelsLoading: state.channels.loading,
        selectedChannel: selectedChannel.length ? selectedChannel[0] : {}
    };
};

export default connect(mapStateToProps)(NonFollowers);