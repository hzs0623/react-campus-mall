import { HashRouter as Router, Switch, Route, Redirect } from "react-router-dom";
// import { hot } from "react-hot-loader/root";
import React from "react";
import routers from "../config/routes";
import path from "path";
import { interfaceRouter } from "../config/routes";
import store from "../redux";
import { getToken } from "../constant";

const RouteItem = (props: interfaceRouter) => {
  const { redirect, path: routePath, component, key } = props;
  if (redirect) {
    // 重定向
    return <Redirect exact key={key} from={routePath} to={redirect} />;
  }

  // 路由配置
  return <Route key={key} path={routePath} component={component} />;
};

const formatRouteItem = (props: interfaceRouter, id: number) => {
  const { component: RouteComponent, children, path: FatherPath, auth = ''} = props;
  return (
    <RouteComponent key={id} {...props}>
      <Switch>
        {children.map((routeChild: interfaceRouter, idx: number) => {
          const { redirect, path: childPath, component } = routeChild;
          if(auth && !store.getState().global.token && !getToken  ) {
            window.location.href = `${window.location.origin}/#/login`
          }
          return RouteItem({  
            key: `${id}-${idx}`,
            redirect,
            path: childPath && path.join(FatherPath, childPath),
            component,
          });
        })}
      </Switch>
    </RouteComponent>
  );
};

const route = () => {
  return (
    <Router>
      {/* Switch匹配到第一个路由就不会继续匹配了*/}
      <Switch>
        {routers.map((item: interfaceRouter, id: number) => {
          const { children = [], ...others } = item;
          return (
            <Route
              key={id}
              {...others}
              component={() => {
                return children.length ? (
                  formatRouteItem(item, id)
                ) : (
                  <>
                    {RouteItem({
                      key: id,
                      ...item,
                    })}
                  </>
                );
              }}
            ></Route>
          );
        })}
      </Switch>
    </Router>
  );
};

export default route;
