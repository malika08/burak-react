import React, { useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardMedia,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import SearchIcon, { Visibility } from "@mui/icons-material";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Badge from "@mui/material/Badge";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { AspectRatio, CardOverflow } from "@mui/joy";
import { CssVarsProvider } from "@mui/joy/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Divider from "../../components/divider";

import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { setProducts } from "./slice";
import { retrieveProducts } from "./selector";
import { Product } from "../../../lib/types/product";
import "../../../css/home.css";
import ProductService from "../../services/ProductService";
import { ProductCollection } from "../../../lib/enums/product.enum";
import { serverApi } from "../../../lib/config";

/** REDUX SLICE & SELECTOR */
const actionDispatch = (dispatch: Dispatch) => ({
  setProducts: (data: Product[]) => dispatch(setProducts(data)),
});

const productsRetriver = createSelector(retrieveProducts, (products) => ({
  products,
}));

export default function Products() {
  const { setProducts } = actionDispatch(useDispatch());
  const { products } = useSelector(productsRetriver);
  useEffect(() => {
    //backend server data request => Data
    const product = new ProductService();
    product
      .getProducts({
        page: 1,
        limit: 8,
        order: "createdAt",
        productCollection: ProductCollection.DISH,
        search: "",
      })
      .then((data) => {
        console.log("data passed here:", data);
        setProducts(data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className={"products"}>
      <Container>
        <Stack flexDirection={"column"} alignItems={"center"}>
          <Stack className={"avatar-big-box"}>
            <Box className={"top-text"}>BURAK RESTAURANT</Box>
            <Stack component="form">
              <Stack className="search-container">
                <input
                  type="text"
                  placeholder="Type here"
                  className="search-input"
                />
                <button className="search-button">
                  SEARCH
                  <FontAwesomeIcon icon={faSearch} />
                </button>
              </Stack>
            </Stack>
          </Stack>
          <Stack className={"dishes-filter-section"}>
            <Stack className={"dishes-filter-box"}>
              <Button
                variant={"contained"}
                color={"primary"}
                sx={{
                  border: "none",
                  borderRadius: "10px",
                  cursor: "pointer",
                  transition: "box-shadow 0.3s ease",
                  "&:hover": {
                    filter: "box-shadow(1px)",
                  },
                }}
              >
                New
              </Button>
              <Button
                variant={"contained"}
                color={"secondary"}
                sx={{
                  border: "none",
                  borderRadius: "10px",
                  cursor: "pointer",
                  transition: "box-shadow 0.3s ease",
                  "&:hover": {
                    filter: "box-shadow(px)",
                  },
                }}
              >
                Price
              </Button>
              <Button
                variant={"contained"}
                color={"secondary"}
                sx={{
                  border: "none",
                  borderRadius: "10px",
                  cursor: "pointer",
                  transition: "box-shadow 0.3s ease",

                  "&:hover": {
                    filter: "box-shadow(1px)",
                  },
                }}
              >
                Views
              </Button>
            </Stack>
          </Stack>
          <Stack className={"list-category-section"}>
            <Stack className={"product-category"}>
              <div className={"category-main"}>
                <Button
                  variant={"contained"}
                  color={"secondary"}
                  className={"order"}
                >
                  Other
                </Button>
                <Button
                  variant={"contained"}
                  color={"secondary"}
                  className={"order"}
                >
                  Dessert
                </Button>
                <Button
                  variant={"contained"}
                  color={"secondary"}
                  className={"order"}
                >
                  Drink
                </Button>
                <Button
                  variant={"contained"}
                  color={"secondary"}
                  className={"order"}
                >
                  Salad
                </Button>
                <Button
                  variant={"contained"}
                  color={"primary"}
                  className={"order"}
                >
                  Dish
                </Button>
              </div>
            </Stack>
            <Stack className={"product-wrapper"}>
              {products.length !== 0 ? (
                products.map((product: Product) => {
                  const imagePath = `${serverApi}/${product.productImages[0]}`;
                  const sizeVolume =
                    product.productCollection === ProductCollection.DRINK
                      ? product.productVolume + "litre"
                      : product.productSize + " size";

                  return (
                    <Stack key={product._id} className={"product-card"}>
                      <Stack
                        className={"product-img"}
                        sx={{
                          backgroundImage: `url(${imagePath})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }}
                      >
                        <div className={"product-sale"}>{sizeVolume}</div>
                        <Button className={"shop-btn"}>
                          <img
                            src={"/icons/shopping-cart.svg"}
                            style={{ display: "flex" }}
                          />
                        </Button>
                        <Button className={"view-btn"} sx={{ right: "36px" }}>
                          <Badge
                            badgeContent={product.productViews}
                            color="secondary"
                          >
                            <RemoveRedEyeIcon
                              sx={{
                                color:
                                  product.productViews === 0 ? "gray" : "white",
                              }}
                            />
                          </Badge>
                        </Button>
                      </Stack>
                      <Box className={"product-desc"}>
                        <span className={"product-title"}>
                          {product.productName}
                        </span>
                        <div className={"product-price"}>
                          <MonetizationOnIcon /> {product.productPrice}
                        </div>
                      </Box>
                    </Stack>
                  );
                })
              ) : (
                <Box className="no-data">Products are not available!</Box>
              )}
            </Stack>
          </Stack>

          <Stack className={"pagination-section"}>
            <Pagination
              count={3}
              page={1}
              renderItem={(item) => (
                <PaginationItem
                  components={{
                    previous: ArrowBack,
                    next: ArrowForward,
                  }}
                  {...item}
                  color={"secondary"}
                />
              )}
            />
          </Stack>
        </Stack>
      </Container>

      <div className={"brands-logo"}>
        <Container className="family-brands">
          <Typography className={"title"}>Our Family Brands</Typography>
          <Stack>
            <Stack className="cards">
              <Card className="card">
                <CardMedia
                  component="img"
                  src="/img/gurme.webp"
                  alt=""
                ></CardMedia>
              </Card>
              <Card className="card">
                <CardMedia
                  component="img"
                  src="/img/seafood.webp"
                  alt=""
                ></CardMedia>
              </Card>
              <Card className="card">
                <CardMedia
                  component="img"
                  src="/img/sweets.webp"
                  alt=""
                ></CardMedia>
              </Card>
              <Card className="card">
                <CardMedia
                  component="img"
                  src="/img/doner.webp"
                  alt=""
                ></CardMedia>
              </Card>
            </Stack>
          </Stack>
        </Container>
      </div>
      <div className={"address"}>
        <Container>
          <Stack className={"address-area"}>
            <Box className={"title"}>Our Address</Box>
            <iframe
              style={{ marginTop: "60px" }}
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3009.5128350637474!2d28.98090107604184!3d41.035912971346654!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cab716d26c9505%3A0xaeb6cf03050318fe!2sCznBurak%20Restaurant!5e0!3m2!1suz!2skr!4v1720802104928!5m2!1suz!2skr"
              width="1320"
              height="500"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </Stack>
        </Container>
      </div>
    </div>
  );
}
