import {openLayer, unmountComponentByNode} from "../mask/MaskLayerHelper";
import {Spin} from "antd";
import * as React from "react";
import * as ReactDOM from "react-dom";
import "./style.less";


let s = new Date().getTime().toString();
const str = s.substring(12, s.length);

let elementId = `__mask__layer_loading__${str}`;

/**
 * 加载中组件
 * @author wxup
 * @create 2018-09-08 16:46
 **/
export default class Loading {


    //默认的loading
    private static defaultLoading: React.ReactNode = <Spin size={"large"}
                                                           className={"wuxp_loading_content"}/>;

    /**
     * 设置全局的loading组件
     * @param loading
     */
    public static setLoading = (loading: React.ReactNode) => {
        Loading.defaultLoading = loading;
    };

    /**
     * 关闭所有的 loading
     */
    public static close = () => {
        const container = document.getElementById(elementId);
        unmountComponentByNode(container);
    };


    /**
     * 显示一个loading
     */
    public static show = (text: string = "加载中...") => {
        return openLayer({
                style: {
                    backgroundColor: "rgba(228, 219, 219, 0.1)"
                },

                children: <div className={"wuxp_loading_container"}>
                    {Loading.defaultLoading}
                    {text ? <div className={"wuxp_loading_text"}>{text}</div> : null}
                </div>
            }, elementId,
            //延迟200毫秒显示
            200);
    }
}

