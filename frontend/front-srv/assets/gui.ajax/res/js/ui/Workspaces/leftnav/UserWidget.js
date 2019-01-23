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

const React = require('react');
const {AsyncComponent} = require('pydio/http/resources-manager').requireLib('boot')
const {UserAvatar, IconButtonMenu, Toolbar} = require('pydio/http/resources-manager').requireLib('components')
const {IconButton, Paper} = require('material-ui');
import BookmarksList from './BookmarksList'

export default React.createClass({

    propTypes:{
        pydio: React.PropTypes.instanceOf(Pydio),
        style: React.PropTypes.object,
        avatarStyle: React.PropTypes.object,
        actionBarStyle: React.PropTypes.object,
        avatarOnly: React.PropTypes.bool,
    },

    applyAction(actionName){
        switch (actionName){
            case 'home':
                this.props.pydio.triggerRepositoryChange('homepage');
                break;
            case 'settings':
                this.props.pydio.triggerRepositoryChange('settings');
                break;
            case 'about_pydio':
                this.props.pydio.getController().fireAction('splash');
                break;
            default:
                break;
        }
    },

    render() {

        const messages = this.props.pydio.MessageHash;

        let avatar;
        let notificationsButton, currentIsSettings, bookmarksButton;
        let {pydio, displayLabel, mergeButtonInAvatar, avatarStyle, popoverDirection, color} = this.props;
        if(pydio.user){
            const user = this.props.pydio.user;
            currentIsSettings = user.activeRepository === 'settings';
            let buttonStyle = {color: color};
            let avatarSize;
            if(mergeButtonInAvatar){
                avatarStyle = {...avatarStyle, position:'relative'};
                buttonStyle = {...buttonStyle, opacity: 0};
                avatarSize = 30
            }
            avatar = (
                <UserAvatar
                    pydio={pydio}
                    userId={user.id}
                    style={avatarStyle}
                    className="user-display"
                    labelClassName="userLabel"
                    displayLabel={displayLabel}
                    labelStyle={{flex: 1, marginLeft: 5, color: color}}
                    avatarSize={avatarSize}
                >
                    <IconButtonMenu
                        pydio={pydio}
                        buttonClassName={'mdi mdi-dots-vertical'}
                        containerStyle={mergeButtonInAvatar?{position:'absolute', left: 4}:{}}
                        buttonStyle={buttonStyle}
                        buttonTitle={messages['165']}
                        toolbars={["aUser", "user", "zlogin"]}
                        controller={this.props.pydio.Controller}
                        popoverDirection={ popoverDirection ? popoverDirection : (mergeButtonInAvatar ? "right" : "left" )}
                        popoverTargetPosition={"bottom"}
                        menuProps={{display:'right', width:160, desktop:true}}
                    />
                </UserAvatar>
            );

            if(!this.props.hideNotifications){
                notificationsButton = (
                    <AsyncComponent
                        namespace="PydioActivityStreams"
                        componentName="UserPanel"
                        noLoader={true}
                        iconClassName="userActionIcon mdi mdi-bell-outline"
                        iconStyle={{color}}
                        {...this.props}
                    />
                );
            }
            bookmarksButton = (<BookmarksList pydio={this.props.pydio} iconStyle={{color}}/>);
        }


        // Do not display Home Button here for the moment
        const actionBarStyle = this.props.actionBarStyle || {};
        let actionBar;
        if(!currentIsSettings){
            actionBar = (
                <div className="action_bar" style={{display:'flex', ...actionBarStyle}}>
                    <Toolbar
                        {...this.props}
                        toolbars={['user-widget']}
                        renderingType="icon"
                        toolbarStyle={{display:'inline'}}
                        buttonStyle={{color: color, fontSize: 18}}
                        tooltipPosition="bottom-right"
                        className="user-widget-toolbar"
                    />
                    {notificationsButton}
                    {bookmarksButton}
                </div>
            );

        }

        if(this.props.children){
            return (
                <Paper zDepth={1} rounded={false} style={{...this.props.style, display:'flex'}} className="user-widget primaryColorDarkerPaper">
                    <div style={{flex: 1}}>
                        {avatar}
                        {actionBar}
                    </div>
                    {this.props.children}
                </Paper>
            );
        }else{
            return (
                <Paper zDepth={1} rounded={false} style={this.props.style} className="user-widget primaryColorDarkerPaper">
                    {avatar}
                    {this.props.style && this.props.style.display === 'flex' && <span style={{flex:1}}/>}
                    {actionBar}
                </Paper>
            );
        }
    }
});
