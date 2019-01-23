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

import React from 'react'
import ConfigLogo from './ConfigLogo'
import {Paper, IconButton, Badge, Color} from 'material-ui'
import WelcomeTour from './WelcomeTour'
import Pydio from 'pydio'
import HomeSearchForm from './HomeSearchForm'
import SmartRecents from '../recent/SmartRecents'
const {MasterLayout} = Pydio.requireLib('workspaces');

class AltDashboard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {unreadStatus: 0, drawerOpen: true};
        // setTimeout(()=>{this.setState({drawerOpen: false})}, 2000);
    }

    openDrawer(event) {
        event.stopPropagation();
        this.setState({drawerOpen: true});
    }

    render() {

        const {pydio, muiTheme} = this.props;
        const {drawerOpen} = this.state;

        const appBarColor = new Color(muiTheme.appBar.color);
        const guiPrefs = pydio.user ? pydio.user.getPreference('gui_preferences', true) : [];
        const wTourEnabled = pydio.getPluginConfigs('gui.ajax').get('ENABLE_WELCOME_TOUR');
        const colorHue = Color(muiTheme.palette.primary1Color).hsl().array()[0];
        const lightBg = new Color({h:colorHue,s:35,l:98});
        const fontColor =  Color(muiTheme.palette.primary1Color).darken(0.1).alpha(0.87);


        const styles = {
            appBarStyle : {
                backgroundColor: 'rgba(255, 255, 255, 0.50)',
                height: 200,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            },
            buttonsStyle : {
                color: muiTheme.appBar.textColor
            },
            iconButtonsStyle :{
                color: appBarColor.darken(0.4).toString()
            },
            wsListsContainerStyle: {
                flex: 1,
                display:'flex',
                flexDirection:'column',
                alignItems:'center',
                backgroundColor: 'white',
                position:'relative',
            },
            wsListStyle:{
                backgroundColor     : lightBg.toString(),
                color               : fontColor.toString(),
            }
        };

        let mainClasses = ['vertical_layout', 'vertical_fit', 'react-fs-template', 'user-dashboard-template'];

        let tutorialComponent;
        if (wTourEnabled && !guiPrefs['WelcomeComponent.Pydio8.TourGuide.Welcome']) {
            tutorialComponent = <WelcomeTour ref="welcome" pydio={pydio}/>;
        }

        // Not used - to be used for toggling left menu
        const drawerIcon = (
            <span className="drawer-button" style={{position:'absolute', top: 0, left: 0}}>
                <IconButton
                    iconStyle={{color: null}}
                    iconClassName="mdi mdi-menu"
                    onTouchTap={this.openDrawer.bind(this)}/>
            </span>
        );
        const headerHeight = 72;
        const leftPanelProps = {
            style: {backgroundColor: 'transparent'},
            headerHeight:headerHeight,
            userWidgetProps: {
                color: fontColor,
                mergeButtonInAvatar:true,
                popoverDirection:'left',
                actionBarStyle:{
                    marginTop:0
                },
                style:{
                    height: headerHeight,
                    display:'flex',
                    alignItems:'center',
                    backgroundColor:lightBg.toString(),
                    boxShadow: 'none'
                }
            },
            workspacesListProps:{
                style:styles.wsListStyle
            }
        };


        return (

            <MasterLayout
                pydio={pydio}
                classes={mainClasses}
                tutorialComponent={tutorialComponent}
                leftPanelProps={leftPanelProps}
                drawerOpen={drawerOpen}
                onCloseDrawerRequested={() => {
                    this.setState({drawerOpen: false})
                }}
            >
                <Paper zDepth={0} style={{...styles.appBarStyle}} rounded={false}>
                    {drawerIcon}
                    <div style={{width: 250}}>
                        <ConfigLogo
                            className="home-top-logo"
                            pydio={this.props.pydio}
                            pluginName="gui.ajax"
                            pluginParameter="CUSTOM_DASH_LOGO"
                        />
                    </div>
                </Paper>
                <HomeSearchForm zDepth={0} {...this.props} style={styles.wsListsContainerStyle}>
                    <div style={{flex:1, overflowY:'scroll', marginTop: 40}} id="history-block">
                        <SmartRecents {...this.props} style={{maxWidth: 610, width:'100%'}} emptyStateProps={{style:{backgroundColor:'white'}}}/>
                    </div>
                </HomeSearchForm>
            </MasterLayout>

        );

    }
}

AltDashboard = MaterialUI.Style.muiThemeable()(AltDashboard);

export {AltDashboard as default};
