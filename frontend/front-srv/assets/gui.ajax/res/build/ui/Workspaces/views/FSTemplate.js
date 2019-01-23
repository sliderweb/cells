/*
 * Copyright 2007-2017 Charles du Jeu - Abstrium SAS <team (at) pyd.io>
 * This file is part of Pydio.
 *
 * Pydio is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Pydio is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Pydio.  If not, see <http://www.gnu.org/licenses/>.
 *
 * The latest code can be found at <https://pydio.com>.
 */

'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _pydio = require('pydio');

var _pydio2 = _interopRequireDefault(_pydio);

var _MessagesProviderMixin = require('../MessagesProviderMixin');

var _MessagesProviderMixin2 = _interopRequireDefault(_MessagesProviderMixin);

var _Breadcrumb = require('./Breadcrumb');

var _Breadcrumb2 = _interopRequireDefault(_Breadcrumb);

var _search = require('../search');

var _MainFilesList = require('./MainFilesList');

var _MainFilesList2 = _interopRequireDefault(_MainFilesList);

var _EditionPanel = require('./EditionPanel');

var _EditionPanel2 = _interopRequireDefault(_EditionPanel);

var _detailpanesInfoPanel = require('../detailpanes/InfoPanel');

var _detailpanesInfoPanel2 = _interopRequireDefault(_detailpanesInfoPanel);

var _WelcomeTour = require('./WelcomeTour');

var _WelcomeTour2 = _interopRequireDefault(_WelcomeTour);

var _CellChat = require('./CellChat');

var _CellChat2 = _interopRequireDefault(_CellChat);

var _materialUi = require('material-ui');

var _AddressBookPanel = require('./AddressBookPanel');

var _AddressBookPanel2 = _interopRequireDefault(_AddressBookPanel);

var _MasterLayout = require('./MasterLayout');

var _MasterLayout2 = _interopRequireDefault(_MasterLayout);

var _materialUiStyles = require('material-ui/styles');

var _pydioUtilDom = require('pydio/util/dom');

var _pydioUtilDom2 = _interopRequireDefault(_pydioUtilDom);

var _Pydio$requireLib = _pydio2['default'].requireLib('components');

var ButtonMenu = _Pydio$requireLib.ButtonMenu;
var Toolbar = _Pydio$requireLib.Toolbar;
var ListPaginator = _Pydio$requireLib.ListPaginator;

var FSTemplate = _react2['default'].createClass({
    displayName: 'FSTemplate',

    mixins: [_MessagesProviderMixin2['default']],

    propTypes: {
        pydio: _react2['default'].PropTypes.instanceOf(_pydio2['default'])
    },

    statics: {
        INFO_PANEL_WIDTH: 270
    },

    openRightPanel: function openRightPanel(name) {
        var _this = this;

        this.setState({ rightColumnState: name }, function () {
            var infoPanelOpen = _this.state.infoPanelOpen;

            if (name !== 'info-panel') {
                infoPanelOpen = true;
            }
            localStorage.setItem('pydio.layout.rightColumnState', name);
            localStorage.setItem('pydio.layout.infoPanelToggle', 'open');
            localStorage.setItem('pydio.layout.infoPanelOpen', infoPanelOpen ? 'open' : 'closed');
            _this.setState({ infoPanelToggle: true, infoPanelOpen: infoPanelOpen }, function () {
                return _this.resizeAfterTransition();
            });
        });
    },

    closeRightPanel: function closeRightPanel() {
        var _this2 = this;

        this.setState({ infoPanelToggle: false }, function () {
            _this2.resizeAfterTransition();
        });
        localStorage.setItem('pydio.layout.rightColumnState', '');
        localStorage.setItem('pydio.layout.infoPanelToggle', 'closed');
    },

    getInitialState: function getInitialState() {
        var rState = 'info-panel';
        if (localStorage.getItem('pydio.layout.rightColumnState') !== undefined && localStorage.getItem('pydio.layout.rightColumnState')) {
            rState = localStorage.getItem('pydio.layout.rightColumnState');
        }
        var closedToggle = localStorage.getItem('pydio.layout.infoPanelToggle') === 'closed';
        var closedInfo = localStorage.getItem('pydio.layout.infoPanelOpen') === 'closed';
        return {
            infoPanelOpen: !closedInfo,
            infoPanelToggle: !closedToggle,
            drawerOpen: false,
            rightColumnState: rState
        };
    },

    resizeAfterTransition: function resizeAfterTransition() {
        var _this3 = this;

        setTimeout(function () {
            if (_this3.refs.list) {
                _this3.refs.list.resize();
            }
            if (!_this3.state.infoPanelToggle) {
                _this3.setState({ rightColumnState: null });
            }
        }, 500);
    },

    infoPanelContentChange: function infoPanelContentChange(numberOfCards) {
        var _this4 = this;

        this.setState({ infoPanelOpen: numberOfCards > 0 }, function () {
            return _this4.resizeAfterTransition();
        });
    },

    openDrawer: function openDrawer(event) {
        event.stopPropagation();
        this.setState({ drawerOpen: true });
    },

    render: function render() {
        var _this5 = this;

        var mobile = this.props.pydio.UI.MOBILE_EXTENSIONS;
        var Color = MaterialUI.Color;
        var appBarTextColor = Color(this.props.muiTheme.appBar.textColor);

        var headerHeight = 72;
        var buttonsHeight = 23;
        var buttonsFont = 11;

        var styles = {
            appBarStyle: {
                zIndex: 1,
                backgroundColor: this.props.muiTheme.appBar.color,
                height: headerHeight,
                display: 'flex'
            },
            buttonsStyle: {
                width: 40,
                height: 40,
                padding: 10,
                borderRadius: '50%',
                color: appBarTextColor.fade(0.03).toString(),
                transition: _pydioUtilDom2['default'].getBeziersTransition()
            },
            buttonsIconStyle: {
                fontSize: 18,
                color: appBarTextColor.fade(0.03).toString()
            },
            activeButtonStyle: {
                backgroundColor: appBarTextColor.fade(0.9).toString()
            },
            activeButtonIconStyle: {
                color: 'rgba(255,255,255,0.97)'
            },
            raisedButtonStyle: {
                height: buttonsHeight,
                minWidth: 0
            },
            raisedButtonLabelStyle: {
                height: buttonsHeight,
                paddingLeft: 12,
                paddingRight: 8,
                lineHeight: buttonsHeight + 'px',
                fontSize: buttonsFont
            },
            flatButtonStyle: {
                height: buttonsHeight,
                lineHeight: buttonsHeight + 'px',
                minWidth: 0
            },
            flatButtonLabelStyle: {
                height: buttonsHeight,
                fontSize: buttonsFont,
                paddingLeft: 8,
                paddingRight: 8,
                color: appBarTextColor.fade(0.03).toString()
            },
            infoPanelStyle: {
                backgroundColor: 'transparent',
                top: headerHeight
            },
            otherPanelsStyle: {
                top: headerHeight,
                borderLeft: 0,
                margin: 10,
                width: 290
            }
        };

        // Merge active styles
        styles.activeButtonStyle = _extends({}, styles.buttonsStyle, styles.activeButtonStyle);
        styles.activeButtonIconStyle = _extends({}, styles.buttonsIconStyle, styles.activeButtonIconStyle);

        var _state = this.state;
        var infoPanelOpen = _state.infoPanelOpen;
        var drawerOpen = _state.drawerOpen;
        var infoPanelToggle = _state.infoPanelToggle;
        var rightColumnState = this.state.rightColumnState;

        var rightColumnWidth = undefined;

        var classes = ['vertical_layout', 'vertical_fit', 'react-fs-template'];
        if (infoPanelOpen && infoPanelToggle) {
            classes.push('info-panel-open');
            if (rightColumnState !== 'info-panel') {
                classes.push('info-panel-open-large');
            }
        }

        var mainToolbars = ["info_panel", "info_panel_share"];
        var mainToolbarsOthers = ["change", "other"];
        if (infoPanelOpen && infoPanelToggle && rightColumnState === 'info-panel') {
            mainToolbars = ["change_main"];
            mainToolbarsOthers = ["get", "change", "other"];
        }

        var pydio = this.props.pydio;

        var guiPrefs = pydio.user ? pydio.user.getPreference('gui_preferences', true) : [];
        var wTourEnabled = pydio.getPluginConfigs('gui.ajax').get('ENABLE_WELCOME_TOUR');

        var showChatTab = true;
        var showAddressBook = true;
        var repo = pydio.user.getRepositoriesList().get(pydio.user.activeRepository);
        if (repo && !repo.getOwner()) {
            showChatTab = false;
            if (rightColumnState === 'chat') {
                rightColumnState = 'info-panel';
            }
        }
        if (pydio.getPluginConfigs("action.advanced_settings").get("GLOBAL_DISABLE_CHATS")) {
            showChatTab = false;
        }
        if (pydio.getPluginConfigs("action.user").get("DASH_DISABLE_ADDRESS_BOOK")) {
            showAddressBook = false;
        }

        // Making sure we only pass the style to the parent element
        var _props = this.props;
        var style = _props.style;

        var props = _objectWithoutProperties(_props, ['style']);

        var tutorialComponent = undefined;
        if (wTourEnabled && !guiPrefs['WelcomeComponent.Pydio8.TourGuide.FSTemplate']) {
            tutorialComponent = _react2['default'].createElement(_WelcomeTour2['default'], { ref: 'welcome', pydio: this.props.pydio });
        }

        var searchForm = _react2['default'].createElement(
            'div',
            { style: { position: 'relative', width: 150 } },
            _react2['default'].createElement(_search.SearchForm, props)
        );
        var leftPanelProps = {
            headerHeight: headerHeight,
            userWidgetProps: {
                color: 'rgba(255,255,255,.93)',
                mergeButtonInAvatar: true,
                popoverDirection: 'left',
                actionBarStyle: {
                    marginTop: 0
                },
                style: {
                    height: headerHeight,
                    display: 'flex',
                    alignItems: 'center'
                }
            }
        };
        return _react2['default'].createElement(
            _MasterLayout2['default'],
            {
                pydio: pydio,
                style: _extends({}, style, { overflow: 'hidden' }),
                classes: classes,
                tutorialComponent: tutorialComponent,
                drawerOpen: drawerOpen,
                leftPanelProps: leftPanelProps,
                onCloseDrawerRequested: function () {
                    _this5.setState({ drawerOpen: false });
                }
            },
            _react2['default'].createElement(
                _materialUi.Paper,
                { zDepth: 1, style: styles.appBarStyle, rounded: false },
                _react2['default'].createElement(
                    'div',
                    { id: 'workspace_toolbar', style: { flex: 1, width: 'calc(100% - 430px)' } },
                    _react2['default'].createElement(
                        'span',
                        { className: 'drawer-button' },
                        _react2['default'].createElement(_materialUi.IconButton, { iconStyle: { color: 'white' }, iconClassName: 'mdi mdi-menu', onTouchTap: this.openDrawer })
                    ),
                    _react2['default'].createElement(_Breadcrumb2['default'], _extends({}, props, { startWithSeparator: false })),
                    _react2['default'].createElement(
                        'div',
                        { style: { height: 32, paddingLeft: 20, alignItems: 'center', display: 'flex' } },
                        _react2['default'].createElement(ButtonMenu, _extends({}, props, {
                            buttonStyle: styles.flatButtonStyle,
                            buttonLabelStyle: styles.flatButtonLabelStyle,
                            buttonBackgroundColor: 'rgba(255,255,255,0.17)',
                            buttonHoverColor: 'rgba(255,255,255,0.33)',
                            id: 'create-button-menu',
                            toolbars: ["upload", "create"],
                            buttonTitle: this.props.pydio.MessageHash['198'],
                            raised: false,
                            secondary: true,
                            controller: props.pydio.Controller,
                            openOnEvent: 'tutorial-open-create-menu'
                        })),
                        !mobile && _react2['default'].createElement(Toolbar, _extends({}, props, {
                            id: 'main-toolbar',
                            toolbars: mainToolbars,
                            groupOtherList: mainToolbarsOthers,
                            renderingType: 'button',
                            flatButtonStyle: styles.flatButtonStyle,
                            buttonStyle: styles.flatButtonLabelStyle
                        })),
                        mobile && _react2['default'].createElement('span', { style: { flex: 1 } }),
                        _react2['default'].createElement(ListPaginator, {
                            id: 'paginator-toolbar',
                            dataModel: props.pydio.getContextHolder(),
                            toolbarDisplay: true
                        })
                    )
                ),
                _react2['default'].createElement(
                    'div',
                    { style: { display: 'flex', alignItems: 'center' } },
                    _react2['default'].createElement(Toolbar, _extends({}, props, {
                        id: 'display-toolbar',
                        toolbars: ["display_toolbar"],
                        renderingType: 'icon-font',
                        mergeItemsAsOneMenu: true,
                        mergedMenuIcom: "mdi mdi-settings",
                        mergedMenuTitle: "Display Settings",
                        buttonStyle: styles.buttonsIconStyle,
                        flatButtonStyle: styles.buttonsStyle
                    })),
                    searchForm,
                    _react2['default'].createElement('div', { style: { borderLeft: '1px solid ' + appBarTextColor.fade(0.77).toString(), margin: '0 10px', height: 32 } }),
                    _react2['default'].createElement(
                        'div',
                        { style: { display: 'flex', paddingRight: 10 } },
                        _react2['default'].createElement(_materialUi.IconButton, {
                            iconClassName: "mdi mdi-information",
                            style: rightColumnState === 'info-panel' ? styles.activeButtonStyle : styles.buttonsStyle,
                            iconStyle: rightColumnState === 'info-panel' ? styles.activeButtonIconStyle : styles.buttonsIconStyle,
                            onTouchTap: function () {
                                _this5.openRightPanel('info-panel');
                            },
                            tooltip: pydio.MessageHash['341']
                        }),
                        showChatTab && _react2['default'].createElement(_materialUi.IconButton, {
                            iconClassName: "mdi mdi-message-text",
                            style: rightColumnState === 'chat' ? styles.activeButtonStyle : styles.buttonsStyle,
                            iconStyle: rightColumnState === 'chat' ? styles.activeButtonIconStyle : styles.buttonsIconStyle,
                            onTouchTap: function () {
                                _this5.openRightPanel('chat');
                            },
                            tooltip: pydio.MessageHash['635']
                        }),
                        showAddressBook && _react2['default'].createElement(_materialUi.IconButton, {
                            iconClassName: "mdi mdi-account-card-details",
                            style: rightColumnState === 'address-book' ? styles.activeButtonStyle : styles.buttonsStyle,
                            iconStyle: rightColumnState === 'address-book' ? styles.activeButtonIconStyle : styles.buttonsIconStyle,
                            onTouchTap: function () {
                                _this5.openRightPanel('address-book');
                            },
                            tooltip: pydio.MessageHash['592']
                        }),
                        _react2['default'].createElement(_materialUi.IconButton, {
                            iconClassName: "mdi mdi-close",
                            style: styles.buttonsStyle,
                            iconStyle: styles.buttonsIconStyle,
                            onTouchTap: function () {
                                _this5.closeRightPanel();
                            },
                            disabled: !rightColumnState,
                            tooltip: pydio.MessageHash['86']
                        })
                    )
                )
            ),
            _react2['default'].createElement(_MainFilesList2['default'], { ref: 'list', pydio: this.props.pydio, style: rightColumnWidth ? { marginRight: rightColumnWidth } : {} }),
            rightColumnState === 'info-panel' && _react2['default'].createElement(_detailpanesInfoPanel2['default'], _extends({}, props, {
                dataModel: props.pydio.getContextHolder(),
                onContentChange: this.infoPanelContentChange,
                style: styles.infoPanelStyle
            })),
            rightColumnState === 'chat' && _react2['default'].createElement(_CellChat2['default'], { pydio: pydio, style: styles.otherPanelsStyle, zDepth: 1 }),
            rightColumnState === 'address-book' && _react2['default'].createElement(_AddressBookPanel2['default'], { pydio: pydio, style: styles.otherPanelsStyle, zDepth: 1 }),
            _react2['default'].createElement(_EditionPanel2['default'], props)
        );
    }
});

//FSTemplate = dropProvider(FSTemplate);
//FSTemplate = withContextMenu(FSTemplate);
exports['default'] = FSTemplate = _materialUiStyles.muiThemeable()(FSTemplate);

exports['default'] = FSTemplate;
module.exports = exports['default'];
