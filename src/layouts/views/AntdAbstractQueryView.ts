import AbstractSimpleQueryView, {SimpleQueryViewState} from "wuxp_react_dynamic_router/src/layout/view/AbstractSimpleQueryView";
import * as React from "react";
import {ViewProps} from "wuxp_react_dynamic_router/src/layout/view/AbstractSimpleView";
import {ApiQueryReq} from "typescript_api_sdk/src/api/model/ApiQueryReq";


export interface AntdAbstractQueryViewProps extends ViewProps {

}

export interface AntdAbstractQueryViewState extends SimpleQueryViewState {

}

/**
 * 基于antd 的查询视图
 * @author wxup
 * @create 2018-09-10 11:12
 **/
export default abstract class AntdAbstractQueryView<Q extends ApiQueryReq,
    E,
    P extends AntdAbstractQueryViewProps,
    S extends AntdAbstractQueryViewState>
    extends AbstractSimpleQueryView<Q, E, P, S> {



}
