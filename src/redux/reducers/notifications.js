import {
    REINIT_MESSAGES, MESSAGE_TOP_CENTER_OPEN, SET_MESSAGE_TOP_CENTER, 
    MESSAGE_BOTTOM_LEFT_OPEN, SET_MESSAGE_BOTTOM_LEFT
} from '../actionsTypes';

export const NOTIFICATIONS = "notifications"

export const notificationsInitialState = {
    messageTopCenterOpen: false,
    messageSeverity: "",
    messageTopCenter: "",
    messageBottomLeftOpen: false,
    messageBottomLeft: ""
}

export default function(state = notificationsInitialState, action) {
    switch (action.type) {
        case REINIT_MESSAGES: {
            return {
                ...notificationsInitialState
            }
        }
        case MESSAGE_TOP_CENTER_OPEN: {
            return {
                ...state,
                messageTopCenterOpen: action.payload.messageTopCenterOpen
            }
        }
        case SET_MESSAGE_TOP_CENTER: {
            return {
                ...state,
                messageSeverity: action.payload.messageSeverity,
                messageTopCenter: action.payload.messageTopCenter
            }
        }
        case MESSAGE_BOTTOM_LEFT_OPEN: {
            return {
                ...state,
                messageBottomLeftOpen: action.payload.messageBottomLeftOpen
            }
        }
        case SET_MESSAGE_BOTTOM_LEFT: {
            return {
                ...state,
                messageBottomLeft: action.payload.messageBottomLeft
            }
        }
        default:
            return state
    }
};