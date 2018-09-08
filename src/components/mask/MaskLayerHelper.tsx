import * as React from "react";
import * as ReactDOM from "react-dom";
import MaskLayer, {MaskLayerProps} from "./MaskLayer";


export interface MaskLayerHelper {

    destroy: () => void;

}

/**
 * 动态显示一个layer
 * @param props
 * @param elementId
 * @param delay
 */
export function openLayer(props: MaskLayerProps, elementId: string, delay?: number): MaskLayerHelper {

    let container = document.getElementById(elementId);

    if (container == null) {
        container = document.createElement('div');
        container.id = elementId;
        document.body.appendChild(container);
    }

    let timerId;
    if (delay == null) {
        render(props, container);
    } else {
        timerId = setTimeout(() => {
            render(props, container);
        }, delay);
    }


    function destroy() {
        if (timerId) {
            clearTimeout(timerId);
        }
        unmountComponentByNode(container);
    }

    return {
        destroy
    }
}

function render(props: MaskLayerProps, container) {
    ReactDOM.render(<MaskLayer {...props} />, container);
}

export function unmountComponentByNode(container) {
    const unmountResult = ReactDOM.unmountComponentAtNode(container);
    const parentNode = container.parentNode;
    if (unmountResult && parentNode) {
        parentNode.removeChild(container);
    }
}



