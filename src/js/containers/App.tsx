import React, {Component} from 'react';
import TextField from '../components/TextField';
import CheckBox from '../components/CheckBox';

import BabelPackage from '../models/BabelPackage';
import WebpackPackage from '../models/WebpackPackage';
import ReactPackage from '../models/ReactPackage';
import VuePAckage from '../models/VuePackage';

import '../../scss/app.scss';

interface AppProps {
}

interface AppState {
    packages: object;
    checkedItems: any;
}

class App extends Component<AppProps, AppState> {
    state = {
        packages: {
            babel: BabelPackage.getAllPackages(),
            webpack: WebpackPackage.getAllPackages(),
            react: ReactPackage.getAllPackages(),
            vue: VuePAckage.getAllPackages(),
        },
        checkedItems: new Map()
    };

    handleChangeCheckbox = (e) => {
        const item = e.target.name;
        const isChecked = e.target.checked;
        this.setState(prevState => ({ checkedItems: prevState.checkedItems.set(item, isChecked) }));
    };

    renderCheckBoxList = (list) => {
        return (<ul>
            {list.map((module) => {
                return (<li key={module}><CheckBox label={module} handleChangeCheckbox={this.handleChangeCheckbox}/></li>);
            })}
        </ul>)
    };

    renderCommands = (checkedItems): string => {
        let commands = 'npm install --save-dev ';
        checkedItems.forEach((value, key) => {
            if(value) commands += `${key} `;
        });

        return commands.trimRight();
    };

    render() {
        return (
            <div className={'wrap'}>
                <div className={'header'}>
                    <h1>Rapidity</h1>
                    <h3>Build up your project, Rapidly</h3>
                </div>
                <div className={'dashboard'}>
                    <div className={'package'}>
                        <h2 className={'name'}>Babel</h2>
                        {this.renderCheckBoxList(this.state.packages.babel)}
                    </div>
                    <div className={'package'}>
                        <h2 className={'name'}>Webpack</h2>
                        {this.renderCheckBoxList(this.state.packages.webpack)}
                    </div>
                    <div className={'package'}>
                        <h2 className={'name'}>React</h2>
                        {this.renderCheckBoxList(this.state.packages.react)}
                    </div>
                    <div className={'package'}>
                        <h2 className={'name'}>Vue</h2>
                        {this.renderCheckBoxList(this.state.packages.vue)}
                    </div>

                    <div>
                        <TextField value={this.renderCommands(this.state.checkedItems)}/>
                    </div>
                </div>
            </div>
        )
    }

}

export default App;

