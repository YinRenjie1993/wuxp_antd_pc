import * as React from "react";
import DocumentTitle from 'react-document-title';
import {renderRoutes} from "react-router-config";
import {ReduxRouterProps} from "wuxp_react_dynamic_router/src/model/redux/ReduxRouterProps";
import {isNullOrUndefined} from "util";
import {NamedRouteConfig} from "wuxp_react_dynamic_router/src/model/route/NamedRouteConfig";
import {Route} from "react-router-dom";
import {parse} from "querystring";

export interface BaseLayoutProps extends ReduxRouterProps {

    routes: NamedRouteConfig[]
}

const webTitle = process.env.WEB_TITLE || "";

export default class BaseLayout<P extends BaseLayoutProps = BaseLayoutProps, S = any> extends React.Component<P, S> {


    render() {

        const {routes, location} = this.props;
        const pathname = location.pathname;

        return <DocumentTitle title={this.getPageTitle(pathname)}>
            {this.renderRoutes(routes)}
        </DocumentTitle>
    }


    protected renderRoutes = (routes) => {

        return renderRoutes(routes);
    };

    /**
     * 根据路由获取视图名称
     * @param {string} pathname
     * @return {string}
     */
    getPageTitle = (pathname: string): string => {
        const {routes} = this.props;
        const route = routes.find((item) => item.path === pathname);
        // console.log("--------pathname-------", pathname);
        // console.log("--------route-------", route);
        return isNullOrUndefined(route) ? webTitle : isNullOrUndefined(route.name) ? webTitle : route.name;
    }
}

// wrap <Route> and use this everywhere instead, then when
// sub routes are added to any route it'll work
//渲染路由
export const RouteWithSubRoutes = route => (

    <Route path={route.path}
           exact={route.exact}
           strict={route.strict}
           render={props => {
               const {location} = props;
               const {state, search} = location;
               return (
                   // pass the sub-routes down to keep nesting

                   //将路由的state 查询参数设置到组件的props中
                   <route.component {...props}
                                    {...state}
                                    {...parse(search ? search.split("?")[1] : "{}")}
                                    routes={route.routes}/>
               )
           }}
    />
);
