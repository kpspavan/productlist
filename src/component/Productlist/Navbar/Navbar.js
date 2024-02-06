import React from "react";
import { Link } from "react-router-dom";
import { styled } from "@mui/system";

// Define styles using styled
const Nav = styled("nav")({
  backgroundColor: "#2196f3", // You can customize the background color
  padding: "10px",
  textAlign: "center",
});

const Ul = styled("ul")({
  listStyle: "none",
  padding: 0,
  display: "flex",
  justifyContent: "center",
});

const Li = styled("li")({
  margin: "0 15px",
});

const CustomLink = styled(Link)({
  textDecoration: "none",
  color: "white", // You can customize the text color
  fontSize: "18px",
  fontWeight: "bold",
});

const Navbar = () => {
  return (
    <Nav>
      <Ul>
        <Li>
          <CustomLink to="/">Home</CustomLink>
        </Li>
        <Li>
          <CustomLink to="/cart">Shopping Cart</CustomLink>
        </Li>
      </Ul>
    </Nav>
  );
};

export default Navbar;
