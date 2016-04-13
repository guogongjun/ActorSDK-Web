'use strict';

exports.__esModule = true;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _utils = require('flux/utils');

var _ActorAppDispatcher = require('../dispatcher/ActorAppDispatcher');

var _ActorAppDispatcher2 = _interopRequireDefault(_ActorAppDispatcher);

var _ActorAppConstants = require('../constants/ActorAppConstants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
 */

var INITIAL_MESSAGES_COUNT = 20;
var MESSAGE_COUNT_STEP = 20;

var MessageStore = function (_ReduceStore) {
  (0, _inherits3.default)(MessageStore, _ReduceStore);

  function MessageStore() {
    (0, _classCallCheck3.default)(this, MessageStore);
    return (0, _possibleConstructorReturn3.default)(this, _ReduceStore.apply(this, arguments));
  }

  MessageStore.prototype.getInitialState = function getInitialState() {
    return {
      messages: [],
      overlay: [],
      isLoaded: false,
      receiveDate: 0,
      readDate: 0,
      count: INITIAL_MESSAGES_COUNT,
      selected: new _immutable2.default.Set()
    };
  };

  MessageStore.prototype.getAll = function getAll() {
    return this.getState().messages;
  };

  MessageStore.prototype.getRenderMessagesCount = function getRenderMessagesCount() {
    return this.getState().count;
  };

  MessageStore.prototype.getMessages = function getMessages() {
    return this.getState().messages;
  };

  MessageStore.prototype.getOverlay = function getOverlay() {
    return this.getState().overlay;
  };

  MessageStore.prototype.isLoaded = function isLoaded() {
    return this.getState().isLoaded;
  };

  MessageStore.prototype.isAllRendered = function isAllRendered() {
    var _getState = this.getState();

    var messages = _getState.messages;
    var count = _getState.count;

    return messages.length === count;
  };

  MessageStore.prototype.getSelected = function getSelected() {
    return this.getState().selected;
  };

  MessageStore.prototype.reduce = function reduce(state, action) {
    switch (action.type) {
      case _ActorAppConstants.ActionTypes.BIND_DIALOG_PEER:
        return (0, _extends3.default)({}, state, {
          count: INITIAL_MESSAGES_COUNT,
          selected: state.selected.clear()
        });

      case _ActorAppConstants.ActionTypes.MESSAGES_CHANGED:
        return (0, _extends3.default)({}, state, {
          messages: action.messages,
          overlay: action.overlay,
          isLoaded: action.isLoaded,
          receiveDate: action.receiveDate,
          readDate: action.readDate,
          count: Math.min(action.messages.length, state.count)
        });

      case _ActorAppConstants.ActionTypes.MESSAGES_SET_SELECTED:
        return (0, _extends3.default)({}, state, {
          selected: action.selectedMesages
        });

      case _ActorAppConstants.ActionTypes.MESSAGES_LOAD_MORE:
        return (0, _extends3.default)({}, state, {
          count: Math.min(state.messages.length, state.count + MESSAGE_COUNT_STEP)
        });

      default:
        return state;
    }
  };

  return MessageStore;
}(_utils.ReduceStore);

exports.default = new MessageStore(_ActorAppDispatcher2.default);
//# sourceMappingURL=MessageStore.js.map