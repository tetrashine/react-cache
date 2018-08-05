import React from "react";
import { render } from "react-dom";

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AppBar from "@material-ui/core/AppBar";

import { Map } from 'react-arcgis';

class Page extends React.Component {
    constructor(props) {
        super(props);

        this.state = { left: false }
        this.toggleDrawer = (side, open) => () => {
            this.setState({
                [side]: open,
            });
        };
    }

    render() {
        let sideList = <React.Fragment>
            <IconButton onClick={this.toggleDrawer('left', false)}>
                <ChevronLeftIcon />
            </IconButton>
            <Map loaderOptions={{
                url: "/4.8/init.js"
            }} />
        </React.Fragment>;

        return (<React.Fragment>
            <AppBar position="static">
                <Toolbar>
                    <IconButton color="inherit" aria-label="Menu" onClick={this.toggleDrawer('left', true)}>
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Drawer open={this.state.left} onClose={this.toggleDrawer('left', false)}>
                <div
                    tabIndex={0}
                    role="button"
                    style={{width:"800px"}}
                >
                    { sideList }
                </div>
            </Drawer>
            <div>hello world</div>
        </React.Fragment>);
    }
}

render(<Page />, document.getElementById("epl"));
