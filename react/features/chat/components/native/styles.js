// @flow

import { ColorSchemeRegistry, schemeColor } from '../../../base/color-scheme';
import { BoxModel, ColorPalette } from '../../../base/styles';

const BUBBLE_RADIUS = 8;

/**
 * The styles of the feature chat.
 *
 * NOTE: Sizes and colors come from the 8x8 guidelines. This is the first
 * component to receive this treating, if others happen to have similar, we
 * need to extract the brand colors and sizes into a branding feature (planned
 * for the future).
 */
export default {

    /**
     * Wrapper View for the avatar.
     */
    avatarWrapper: {
        marginRight: 8,
        width: 32
    },

    chatLink: {
        color: ColorPalette.blue
    },

    /**
     * Wrapper for the details together, such as name, message and time.
     */
    detailsWrapper: {
        alignItems: 'flex-start',
        flex: 1,
        flexDirection: 'column'
    },

    emptyComponentWrapper: {
        alignSelf: 'center',
        flex: 1,
        padding: BoxModel.padding,
        paddingTop: '10%'
    },

    /**
     * A special padding to avoid issues on some devices (such as Android devices with custom suggestions bar).
     */
    extraBarPadding: {
        paddingBottom: 30
    },

    inputBar: {
        alignItems: 'center',
        borderTopColor: 'rgb(209, 219, 231)',
        borderTopWidth: 1,
        flexDirection: 'row',
        paddingHorizontal: BoxModel.padding
    },

    inputField: {
        color: '#fff',
        flex: 1,
        height: 48
    },

    messageBubble: {
        alignItems: 'center',
        borderRadius: BUBBLE_RADIUS,
        flexDirection: 'row'
    },

    messageContainer: {
        flex: 1
    },

    /**
     * Wrapper View for the entire block.
     */
    messageWrapper: {
        alignItems: 'flex-start',
        flex: 1,
        flexDirection: 'row',
        marginHorizontal: 17,
        marginVertical: 4
    },

    /**
     * Style modifier for the {@code detailsWrapper} for own messages.
     */
    ownMessageDetailsWrapper: {
        alignItems: 'flex-end'
    },

    replyWrapper: {
        alignItems: 'center',
        flexDirection: 'row'
    },

    sendButtonIcon: {
        color: '#D2A622',
        fontSize: 22
    },

    /**
     * Style modifier for system (error) messages.
     */
    systemMessageBubble: {
        backgroundColor: 'rgb(247, 215, 215)'
    },

    /**
     * Wrapper for the name and the message text.
     */
    textWrapper: {
        alignItems: 'flex-start',
        flexDirection: 'column',
        padding: 9
    },

    /**
     * Text node for the timestamp.
     */
    timeText: {
        color: '#fff',
        fontSize: 13
    }
};

ColorSchemeRegistry.register('Chat', {
    /**
     * Background of the chat screen.
     */
    backdrop: {
        backgroundColor: '#181818',
        flex: 1
    },

    /**
     * The text node for the display name.
     */
    displayName: {
        color: '#fff',
        fontSize: 13
    },

    emptyComponentText: {
        color: '#fff',
        textAlign: 'center'
    },

    localMessageBubble: {
        backgroundColor: '#DADADA',
        borderTopRightRadius: 0
    },

    messageRecipientCancelIcon: {
        color: schemeColor('icon'),
        fontSize: 18
    },

    messageRecipientContainer: {
        alignItems: 'center',
        backgroundColor: schemeColor('privateMsgBackground'),
        flexDirection: 'row',
        padding: BoxModel.padding
    },

    messageRecipientText: {
        color: '#fff',
        flex: 1
    },

    privateNotice: {
        color: '#fff',
        fontSize: 11,
        marginTop: 6
    },

    privateMessageBubble: {
        backgroundColor: 'rgb(204,172,55)'
    },

    remoteMessageBubble: {
        backgroundColor: 'rgb(204,172,55)',
        borderTopLeftRadius: 0
    },

    replyContainer: {
        alignSelf: 'stretch',
        borderLeftColor: schemeColor('replyBorder'),
        borderLeftWidth: 1,
        justifyContent: 'center'
    },

    replyStyles: {
        iconStyle: {
            color: schemeColor('replyIcon'),
            fontSize: 22,
            padding: 8
        }
    }
});
