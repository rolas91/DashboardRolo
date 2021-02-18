import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Result } from "antd";
import { Layout, Menu, Breadcrumb } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  HomeOutlined,
  FileAddOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import "antd/dist/antd.css";
import "../style/nav.css";
//screens
import Home from "../pages/Home";
import Login from "../pages/auth/Login";
import NewJob from "../pages/NewJob";
// import Register from "../pages/auth/Register";
import User from "../components/User";
//Hooks
import useToken from "../hook/useToken";

const Notfound = () => (
  <Result
    status="404"
    title="404"
    subTitle="La dirreccion no existe."
    extra={<Link to="/">Regresar a inicio</Link>}
  />
);
const Routes = () => {
  const { token, setToken } = useToken();
  const { Header, Sider, Content, Footer } = Layout;
  const [collapsed, setcollapsed] = useState(false);
  const toggle = () => {
    setcollapsed(!collapsed);
  };
  return (
    <Router>
      {!token ? (
        <Login setToken={setToken} />
      ) : (
        <Layout>
          <Sider trigger={null} collapsible collapsed={collapsed}>
            <div className="logo" />
            <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
              <Menu.Item key="1" icon={<HomeOutlined />}>
                <Link to="/">Home</Link>
              </Menu.Item>
              <Menu.Item key="2" icon={<FileAddOutlined />}>
                <Link to="/newjob">Nuevo trabajo</Link>
              </Menu.Item>
              <Menu.Item
                key="3"
                onClick={() => {
                  setToken(null);
                }}
                icon={<LogoutOutlined />}
              >
                <Link to="/">log out</Link>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout className="site-layout">
            <Header className="site-layout-background" style={{ padding: 0 }}>
              {React.createElement(
                collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                {
                  className: "trigger",
                  onClick: toggle,
                  style: {
                    fontSize: "30px",
                    margin: "10px",
                    alignItems: "center",
                  },
                }
              )}
            </Header>
            <Breadcrumb style={{ margin: "16px 0" }}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>
                <div>
                  <User />
                </div>
              </Breadcrumb.Item>
            </Breadcrumb>
            <Content
              className="site-layout-background"
              style={{
                margin: "24px 16px",
                padding: 24,
                minHeight: 280,
                maxHeight: "100%",
              }}
            >
              <div>
                <Switch>
                  <Route path="/newjob" exact>
                    <NewJob />
                  </Route>
                  <Route path="/newuser"></Route>
                  <Route path="/" exact>
                    <Home />
                  </Route>
                  <Route component={Notfound} />
                </Switch>
              </div>
            </Content>

            <Footer style={{ textAlign: "center" }}>
              creado por un inutil
            </Footer>
          </Layout>
        </Layout>
      )}
    </Router>
  );
};

export default Routes;
