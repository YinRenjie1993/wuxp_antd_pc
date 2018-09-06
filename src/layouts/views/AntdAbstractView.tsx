import AbstractSimpleView, {
    ViewProps,
    ViewState,
    ViewRenderHelper
} from "wuxp_react_dynamic_router/src/layout/view/AbstractSimpleView";
import * as React from "react";


export interface AntdAbstractViewProps extends ViewProps {

}

export interface AntdAbstractViewState extends ViewState {

}




export default abstract class AntdAbstractView<P extends AntdAbstractViewProps, S extends AntdAbstractViewState>
    extends AbstractSimpleView<P, S> {


    constructor(props: P, context: any) {
        super(props, context);
    }

}
