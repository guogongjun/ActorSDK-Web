'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactMixin = require('react-mixin');

var _reactMixin2 = _interopRequireDefault(_reactMixin);

var _reactIntl = require('react-intl');

var _addons = require('react/addons');

var _addons2 = _interopRequireDefault(_addons);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _EmojiUtils = require('../../../utils/EmojiUtils');

var _PeerUtils = require('../../../utils/PeerUtils');

var _PeerUtils2 = _interopRequireDefault(_PeerUtils);

var _ActorAppConstants = require('../../../constants/ActorAppConstants');

var _reactVisibilitySensor = require('react-visibility-sensor');

var _reactVisibilitySensor2 = _interopRequireDefault(_reactVisibilitySensor);

var _DialogActionCreators = require('../../../actions/DialogActionCreators');

var _DialogActionCreators2 = _interopRequireDefault(_DialogActionCreators);

var _MessageActionCreators = require('../../../actions/MessageActionCreators');

var _MessageActionCreators2 = _interopRequireDefault(_MessageActionCreators);

var _ActivityActionCreators = require('../../../actions/ActivityActionCreators');

var _ActivityActionCreators2 = _interopRequireDefault(_ActivityActionCreators);

var _ComposeActionCreators = require('../../../actions/ComposeActionCreators');

var _ComposeActionCreators2 = _interopRequireDefault(_ComposeActionCreators);

var _UserStore = require('../../../stores/UserStore');

var _UserStore2 = _interopRequireDefault(_UserStore);

var _AvatarItem = require('../../common/AvatarItem.react');

var _AvatarItem2 = _interopRequireDefault(_AvatarItem);

var _State = require('./State.react');

var _State2 = _interopRequireDefault(_State);

var _Reactions = require('./Reactions.react');

var _Reactions2 = _interopRequireDefault(_Reactions);

var _Service = require('./Service.react');

var _Service2 = _interopRequireDefault(_Service);

var _Text = require('./Text.react');

var _Text2 = _interopRequireDefault(_Text);

var _PhotoReact = require('./Photo.react.js');

var _PhotoReact2 = _interopRequireDefault(_PhotoReact);

var _Document = require('./Document.react');

var _Document2 = _interopRequireDefault(_Document);

var _Voice = require('./Voice.react');

var _Voice2 = _interopRequireDefault(_Voice);

var _Contact = require('./Contact.react');

var _Contact2 = _interopRequireDefault(_Contact);

var _LocationReact = require('./Location.react.js');

var _LocationReact2 = _interopRequireDefault(_LocationReact);

var _ModernReact = require('./Modern.react.js');

var _ModernReact2 = _interopRequireDefault(_ModernReact);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2015 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

// Default message content components

var PureRenderMixin = _addons2.default.addons.PureRenderMixin;

var MessageItem = (function (_Component) {
  _inherits(MessageItem, _Component);

  function MessageItem(props) {
    _classCallCheck(this, MessageItem);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(MessageItem).call(this, props));

    _this.onClick = function () {
      var _this$props = _this.props;
      var message = _this$props.message;
      var peer = _this$props.peer;

      if (_PeerUtils2.default.equals(peer, message.sender.peer)) {
        _ActivityActionCreators2.default.show();
      } else {
        _DialogActionCreators2.default.selectDialogPeerUser(message.sender.peer.id);
      }
    };

    _this.onVisibilityChange = function (isVisible) {
      var message = _this.props.message;

      _this.props.onVisibilityChange(message, isVisible);
    };

    _this.handleDelete = function () {
      var _this$props2 = _this.props;
      var peer = _this$props2.peer;
      var message = _this$props2.message;

      _MessageActionCreators2.default.deleteMessage(peer, message.rid);
    };

    _this.handleReply = function () {
      var message = _this.props.message;

      var info = _UserStore2.default.getUser(message.sender.peer.id);
      var replyText = info.nick ? '@' + info.nick + ': ' : info.name + ': ';
      _ComposeActionCreators2.default.pasteText(replyText);
    };

    _this.handleQuote = function () {
      var message = _this.props.message;

      _ComposeActionCreators2.default.pasteText('> ' + message.content.text + ' \n');
    };

    _this.showActions = function () {
      _this.setState({ isActionsShown: true });
      document.addEventListener('click', _this.hideActions, false);
    };

    _this.hideActions = function () {
      _this.setState({ isActionsShown: false });
      document.removeEventListener('click', _this.hideActions, false);
    };

    _this.state = {
      isThisMyMessage: _UserStore2.default.getMyId() === props.message.sender.peer.id,
      isActionsShown: false
    };
    return _this;
  }

  _createClass(MessageItem, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var message = _props.message;
      var isSameSender = _props.isSameSender;
      var onVisibilityChange = _props.onVisibilityChange;
      var peer = _props.peer;
      var isThisLastMessage = _props.isThisLastMessage;
      var _state = this.state;
      var isThisMyMessage = _state.isThisMyMessage;
      var isActionsShown = _state.isActionsShown;
      var delegate = this.context.delegate;

      var Service = undefined,
          Text = undefined,
          Modern = undefined,
          Photo = undefined,
          Document = undefined,
          Voice = undefined,
          Contact = undefined,
          Location = undefined;
      if (delegate.components.dialog !== null && delegate.components.dialog.messages) {
        Service = delegate.components.dialog.messages.service || _Service2.default;
        Text = delegate.components.dialog.messages.text || _Text2.default;
        Modern = delegate.components.dialog.messages.modern || _ModernReact2.default;
        Photo = delegate.components.dialog.messages.photo || _PhotoReact2.default;
        Document = delegate.components.dialog.messages.document || _Document2.default;
        Voice = delegate.components.dialog.messages.voice || _Voice2.default;
        Contact = delegate.components.dialog.messages.contact || _Contact2.default;
        Location = delegate.components.dialog.messages.location || _LocationReact2.default;
      } else {
        Service = _Service2.default;
        Text = _Text2.default;
        Modern = _ModernReact2.default;
        Photo = _PhotoReact2.default;
        Document = _Document2.default;
        Voice = _Voice2.default;
        Contact = _Contact2.default;
        Location = _LocationReact2.default;
      }

      var header = null,
          messageContent = null,
          leftBlock = null;

      var messageSender = (0, _EmojiUtils.escapeWithEmoji)(message.sender.title);

      var messageClassName = (0, _classnames2.default)('message row', {
        'message--same-sender': isSameSender
      });

      var actionsDropdownClassName = (0, _classnames2.default)('message__actions__menu dropdown dropdown--small', {
        'dropdown--opened': isActionsShown,
        'dropdown--bottom': isThisLastMessage
      });

      if (isSameSender) {
        leftBlock = _react2.default.createElement(
          'div',
          { className: 'message__info text-right' },
          _react2.default.createElement(
            'time',
            { className: 'message__timestamp' },
            message.date
          ),
          _react2.default.createElement(_State2.default, { message: message })
        );
      } else {
        leftBlock = _react2.default.createElement(
          'div',
          { className: 'message__info message__info--avatar' },
          _react2.default.createElement(
            'a',
            { onClick: this.onClick },
            _react2.default.createElement(_AvatarItem2.default, { image: message.sender.avatar,
              placeholder: message.sender.placeholder,
              title: message.sender.title })
          )
        );
        header = _react2.default.createElement(
          'header',
          { className: 'message__header' },
          _react2.default.createElement(
            'h3',
            { className: 'message__sender' },
            _react2.default.createElement('a', { onClick: this.onClick, dangerouslySetInnerHTML: { __html: messageSender } })
          ),
          _react2.default.createElement(
            'time',
            { className: 'message__timestamp' },
            message.date
          ),
          _react2.default.createElement(_State2.default, { message: message })
        );
      }

      switch (message.content.content) {
        case _ActorAppConstants.MessageContentTypes.SERVICE:
          messageContent = _react2.default.createElement(Service, _extends({}, message.content, { className: 'message__content message__content--service' }));
          break;
        case _ActorAppConstants.MessageContentTypes.TEXT:
          messageContent = _react2.default.createElement(Text, _extends({}, message.content, { className: 'message__content message__content--text' }));
          break;
        case _ActorAppConstants.MessageContentTypes.PHOTO:
          messageContent = _react2.default.createElement(Photo, { content: message.content, className: 'message__content message__content--photo',
            loadedClassName: 'message__content--photo--loaded' });
          break;
        case _ActorAppConstants.MessageContentTypes.DOCUMENT:
          messageContent = _react2.default.createElement(Document, { content: message.content, className: 'message__content message__content--document' });
          break;
        case _ActorAppConstants.MessageContentTypes.VOICE:
          messageContent = _react2.default.createElement(Voice, { content: message.content, className: 'message__content message__content--voice' });
          break;
        case _ActorAppConstants.MessageContentTypes.CONTACT:
          messageContent = _react2.default.createElement(Contact, { content: message.content, className: 'message__content message__content--contact' });
          break;
        case _ActorAppConstants.MessageContentTypes.LOCATION:
          messageContent = _react2.default.createElement(Location, { content: message.content, className: 'message__content message__content--location' });
          break;
        case _ActorAppConstants.MessageContentTypes.TEXT_MODERN:
          messageContent = _react2.default.createElement(Modern, _extends({}, message.content, { className: 'message__content message__content--modern' }));
          break;
        default:
      }

      return _react2.default.createElement(
        'li',
        { className: messageClassName },
        leftBlock,
        _react2.default.createElement(
          'div',
          { className: 'message__body col-xs' },
          header,
          messageContent,
          onVisibilityChange ? _react2.default.createElement(_reactVisibilitySensor2.default, { onChange: this.onVisibilityChange }) : null
        ),
        _react2.default.createElement(
          'div',
          { className: 'message__actions' },
          _react2.default.createElement(_Reactions2.default, { peer: peer, message: message }),
          _react2.default.createElement(
            'div',
            { className: actionsDropdownClassName },
            _react2.default.createElement(
              'span',
              { className: 'dropdown__button', onClick: this.showActions },
              _react2.default.createElement('svg', { className: 'icon icon--dropdown',
                dangerouslySetInnerHTML: { __html: '<use xlink:href="assets/images/icons.svg#cog"/>' } })
            ),
            _react2.default.createElement(
              'ul',
              { className: 'dropdown__menu dropdown__menu--right' },
              _react2.default.createElement(
                'li',
                { className: 'dropdown__menu__item hide' },
                _react2.default.createElement(
                  'i',
                  { className: 'icon material-icons' },
                  'star_rate'
                ),
                ' ',
                this.getIntlMessage('message.pin')
              ),
              !isThisMyMessage ? _react2.default.createElement(
                'li',
                { className: 'dropdown__menu__item', onClick: this.handleReply },
                _react2.default.createElement(
                  'i',
                  { className: 'icon material-icons' },
                  'reply'
                ),
                ' ',
                this.getIntlMessage('message.reply')
              ) : null,
              message.content.content === _ActorAppConstants.MessageContentTypes.TEXT ? _react2.default.createElement(
                'li',
                { className: 'dropdown__menu__item', onClick: this.handleQuote },
                _react2.default.createElement(
                  'i',
                  { className: 'icon material-icons' },
                  'format_quote'
                ),
                ' ',
                this.getIntlMessage('message.quote')
              ) : null,
              _react2.default.createElement(
                'li',
                { className: 'dropdown__menu__item hide' },
                _react2.default.createElement(
                  'i',
                  { className: 'icon material-icons' },
                  'forward'
                ),
                ' ',
                this.getIntlMessage('message.forward')
              ),
              _react2.default.createElement(
                'li',
                { className: 'dropdown__menu__item', onClick: this.handleDelete },
                _react2.default.createElement(
                  'i',
                  { className: 'icon material-icons' },
                  'delete'
                ),
                ' ',
                this.getIntlMessage('message.delete')
              )
            )
          )
        )
      );
    }
  }]);

  return MessageItem;
})(_react.Component);

MessageItem.propTypes = {
  peer: _react.PropTypes.object.isRequired,
  message: _react.PropTypes.object.isRequired,
  isNewDay: _react.PropTypes.bool,
  isSameSender: _react.PropTypes.bool,
  isThisLastMessage: _react.PropTypes.bool,
  onVisibilityChange: _react.PropTypes.func
};
MessageItem.contextTypes = {
  delegate: _react.PropTypes.object
};

_reactMixin2.default.onClass(MessageItem, _reactIntl.IntlMixin);
_reactMixin2.default.onClass(MessageItem, PureRenderMixin);

exports.default = MessageItem;
//# sourceMappingURL=MessageItem.react.js.map