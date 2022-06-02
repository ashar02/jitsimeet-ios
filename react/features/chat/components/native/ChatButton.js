// @flow

import { NativeEventEmitter, NativeModules } from 'react-native';

import { CHAT_ENABLED, getFeatureFlag } from '../../../base/flags';
import { IconChat, IconChatUnread } from '../../../base/icons';
import { connect } from '../../../base/redux';
import {
    AbstractButton,
    type AbstractButtonProps
} from '../../../base/toolbox/components';
import { getUnreadCount } from '../../functions';

const { ExternalAPI } = NativeModules;
const eventEmitter = new NativeEventEmitter(ExternalAPI);

type Props = AbstractButtonProps & {

    /**
     * The unread message count.
     */
    _unreadMessageCount: number,

    dispatch: Function
};

/**
 * Implements an {@link AbstractButton} to open the chat screen on mobile.
 */
class ChatButton extends AbstractButton<Props, *> {
    accessibilityLabel = 'toolbar.accessibilityLabel.chat';
    icon = IconChat;
    label = 'toolbar.chat';
    toggledIcon = IconChatUnread;

    /**
     * Handles clicking / pressing the button, and opens the appropriate dialog.
     *
     * @private
     * @returns {void}
     */
    _handleClick() {
    }

    /**
     * Renders the button toggled when there are unread messages.
     *
     * @protected
     * @returns {boolean}
     */
    _isToggled() {
        return Boolean(this.props._unreadMessageCount);
    }

    /**
     * Sets event listener for chat message.
     *
     * @inheritdoc
     * @returns {void}
     */
    componentWillMount() {
        console.log('Chat button component will mount.');

        this.eventListener = eventEmitter.addListener(ExternalAPI.HIGHLIGHT_CHAT_BUTTON, ({ highlight }) => {
            console.log(`Event highlight chat button ${highlight}.`);
        });
    }

    /**
     * Removes all listeners.
     *
     * @inheritdoc
     * @returns {void}
     */
    componentWillUnmount() {
        console.log('Chat button component will unmount.');
        this.eventListener.remove();
    }
}

/**
 * Maps part of the redux state to the component's props.
 *
 * @param {Object} state - The Redux state.
 * @param {Object} ownProps - The properties explicitly passed to the component instance.
 * @returns {Props}
 */
function _mapStateToProps(state, ownProps) {
    const enabled = getFeatureFlag(state, CHAT_ENABLED, true);
    const { visible = enabled } = ownProps;

    return {
        _unreadMessageCount: getUnreadCount(state),
        visible
    };
}

export default connect(_mapStateToProps)(ChatButton);
