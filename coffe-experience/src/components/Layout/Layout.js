import React, {Fragment} from "react";
import Header from "./Header";

const Layout = (props) => {
  return (
    <Fragment>
      <Header></Header>
      <main>
        {props.children}
      </main>
    </Fragment>
  )
};

export default Layout;
