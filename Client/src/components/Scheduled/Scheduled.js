import React from 'react';
import { connect } from "react-redux";
import VerticalMenu from "../Menus/VerticalMenu";
import channelSelector from "../../selectors/channels";
import { selectGlobalChannel } from '../../actions/channels';

const menuItems = [
    {   
        id: "scheduled_posts",
        displayName: "Scheduled Posts",
        uri: "/scheduled/posts" 
    },
    {   
        id: "scheduled_past",
        displayName: "Past Scheduled",
        uri: "/scheduled/past" 
    }
];

const Scheduled = ({channels, selectedChannel, selectChannel}) => (
    <div>This is the Scheduled page.
        <VerticalMenu 
            menuItems={menuItems} 
            channels={channels} 
            selectedChannel={selectedChannel}
            selectChannel={selectChannel}
            />
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
    selectChannel: (id) => dispatch(selectGlobalChannel(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Scheduled);