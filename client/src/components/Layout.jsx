import Header from "./Header/Header";
import propTypes from "prop-types";

export default function Layout({ children }) {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
}

Layout.propTypes = {
  children: propTypes.node.isRequired,
};
