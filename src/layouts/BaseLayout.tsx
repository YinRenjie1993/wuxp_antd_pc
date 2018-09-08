import * as React from "react";
import DocumentTitle from 'react-document-title';
import {renderRoutes} from "react-router-config";
import {ReduxRouterProps} from "wuxp_react_dynamic_router/src/model/redux/ReduxRouterProps";
import {isNullOrUndefined} from "util";
import {NamedRouteConfig} from "wuxp_react_dynamic_router/src/model/route/NamedRouteConfig";

export interface BaseLayoutProps extends ReduxRouterProps {

    routes: NamedRouteConfig[]
}

export default class BaseLayout<P extends BaseLayoutProps = BaseLayoutProps, S = any> extends React.Component<P, S> {


    render() {

        const {routes, location} = this.props;
        const pathname = location.pathname;

        return <DocumentTitle title={this.getPageTitle(pathname)}>
            {renderRoutes(routes)}
        </DocumentTitle>
    }


    /**
     * 根据路由获取视图名称
     * @param {string} pathname
     * @return {string}
     */
    getPageTitle = (pathname: string): string => {
        const {routes} = this.props;
        // console.log("--------pathname-------", pathname);
        const route = routes.find((item) => item.path === pathname);
        // console.log("--------route-------", route);
        return isNullOrUndefined(route) ? "" : isNullOrUndefined(route.name) ? '' : route.name;
    }
}

