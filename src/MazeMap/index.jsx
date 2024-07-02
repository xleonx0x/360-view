// @flow
import type { Node } from 'react';
import * as React from 'react';

import * as Mazemap from "node_modules/mazemap/mazemap.min.js"
import "node_modules/mazemap/mazemap.min.css"
import "./mazemap-wrapper.css"
window.Mazemap = Mazemap;

type Props = {
    map: Mazemap.Map,
    children?: Node,
    className?: string,
};

export function makeMazeMapInstance(options: Object): Mazemap.Map {
    const mazemapRoot = document.createElement('div');
    mazemapRoot.className = 'mapRoot';
    const defaultOptions = {
        container: mazemapRoot,
        campuses: 'default',
        center: {lng: 30, lat: 30},
        zoom: 1,
        zLevel: 1,
    };

    const mapOptions = Object.assign({}, defaultOptions, options);

    const map = new Mazemap.Map(mapOptions);
    /* For debugging, it helps to add the map to global window
       to quickly access methods like window.mazemapinstance.getZoom(), etc.
       To do so, add the line below

       window.mazemapinstance = map;
    */
    return map;
}

export class MazeMapWrapper extends React.Component<Props> {

    _onResizeBound: any;

    componentDidMount(){
        this.props.map.on('resize', this._onResize);
        this._onResize();
    }

    componentWillUnmount(){
        this.props.map.off('resize', this._onResize);
    }

    _onResize = () => {
        this._updateZLevelControlHeight();
    }

    _updateZLevelControlHeight(){
        // Update the zLevelControl maxHeight, if it exists
        const map = this.props.map;

        if(map.zLevelControl){
            var height = map.getCanvas().clientHeight;
            var maxHeight = height - 50; // 50 pixels account for margins and spacing
            map.zLevelControl.setMaxHeight(maxHeight);
        }
    }

    render() {
        if( !this.props.map ){
            return null;
        }

        return (
            <div ref={ (ref) => {
                    ref && ref.appendChild(this.props.map.getContainer() );
                    this.props.map.resize();
                }
            } className={['mazemapWrapper', this.props.className].join(' ')}> {this.props.children}</div>
        );
    }

}