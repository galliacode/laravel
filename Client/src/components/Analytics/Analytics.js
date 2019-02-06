import React from 'react';
import { connect } from "react-redux";
import VerticalAnalyticsMenu from "../Menus/VerticalAnalyticsMenu";
import channelSelector from "../../selectors/channels";
import { setGlobalChannel } from '../../actions/channels';
import AnalyticsRouter from '../../routes/AnalyticsRouter';

const menuItems = [
    {   
        id: "overview",
        displayName: "Overview",
        uri: "/analytics/overview" 
    },
    {   
        id: "advanced",
        displayName: "Advanced",
        uri: "/analytics/advanced" 
    }
];

const Analytics = () => (
    <div>
        <VerticalAnalyticsMenu 
            menuItems={menuItems} 
            />
            <div className="body-container">
                <div className="main-section">
                    <AnalyticsRouter />
                </div>
            </div>
    </div>
);

const mapStateToProps = (state) => {

    const unselectedGlobalChannels = {selected: 0, provider: undefined};
    const selectedGlobalChannel = {selected: 1, provider: undefined};
    
    const channels = channelSelector(state.channels.list, unselectedGlobalChannels);
    const selectedChannel = channelSelector(state.channels.list, selectedGlobalChannel);

    return {
        channels,
        selectedChannel: selectedChannel.length ? selectedChannel[0] : {}
    };
};

const mapDispatchToProps = (dispatch) => ({
    selectChannel: (id) => dispatch(setGlobalChannel(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Analytics);