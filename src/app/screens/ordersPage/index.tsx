import Stack from "@mui/joy/Stack";
import { Box, Container, Grid, Tab, TextField } from "@mui/material";
import { SyntheticEvent, useEffect, useState } from "react";
import "../../../css/order.css";
import TabContext from "@mui/lab/TabContext";
import Tabs from "@mui/material/Tabs";
import PausedOrders from "./PausedOrders";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ProcessOrders from "./ProcessOrders";
import FinishedOrders from "./FinishedOrders";

import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { setPausedOrders, setProcessOrders, setFinishedOrders } from "./slice";
import { Order, OrderInquiry } from "../../../lib/types/order";
import { useGlobal } from "../../hooks/useGlobal";
import { useHistory } from "react-router-dom";
import { OrderStatus } from "../../../lib/enums/order.enum";
import OrderService from "../../services/OrderService";
import { serverApi } from "../../../lib/config";
import { MemberType } from "../../../lib/enums/member.enum";

/** REDUX SLICE AND SELECTOR */
const actionDispatch = (dispatch: Dispatch) => ({
  setPausedOrders: (data: Order[]) => dispatch(setPausedOrders(data)),
  setProcessOrders: (data: Order[]) => dispatch(setProcessOrders(data)),
  setFinishedOrders: (data: Order[]) => dispatch(setFinishedOrders(data)),
});

export default function OrdersPage() {
  const { setPausedOrders, setProcessOrders, setFinishedOrders } =
    actionDispatch(useDispatch());
  const { orderBuilder, authMember } = useGlobal();
  const history = useHistory();
  const [value, setValue] = useState("1");

  const [orderInquiry, setOrderInquiry] = useState<OrderInquiry>({
    page: 1,
    limit: 5,
    orderStatus: OrderStatus.PAUSE,
  });

  useEffect(() => {
    const order = new OrderService();

    order
      .getMyOrders({ ...orderInquiry, orderStatus: OrderStatus.PAUSE })
      .then((data) => setPausedOrders(data))
      .catch((err) => console.log(err));

    order
      .getMyOrders({ ...orderInquiry, orderStatus: OrderStatus.PROCESS })
      .then((data) => setProcessOrders(data))
      .catch((err) => console.log(err));

    order
      .getMyOrders({ ...orderInquiry, orderStatus: OrderStatus.FINISH })
      .then((data) => setFinishedOrders(data))
      .catch((err) => console.log(err));
  }, [orderInquiry, orderBuilder]);

  const handleChange = (e: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  if (!authMember) history.push("/");
  return (
    <div className={"order-page"}>
      <Container className="order-container">
        <Stack className={"order-left"}>
          <TabContext value={value}>
            <Box className={"order-nav-frame"}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                  className={"table-list"}
                >
                  <Tab label="PAUSED ORDERS" value={"1"} />
                  <Tab label="PROCESS ORDERS" value={"2"} />
                  <Tab label="FINISHED ORDERS" value={"3"} />
                </Tabs>
              </Box>
            </Box>
            <Stack className={"order-main-content"}>
              <PausedOrders setValue={setValue} />
              <ProcessOrders setValue={setValue} />
              <FinishedOrders />
            </Stack>
          </TabContext>
        </Stack>

        <Stack className={"order-right"}>
          <Box className={"order-info-box"}>
            <Box className={"member-box"}>
              <div className={"order-user-img"}>
                <img
                  src={
                    authMember?.memberImage
                      ? `${serverApi}/${authMember.memberImage}`
                      : "/icons/default-user.svg"
                  }
                  className={"order-user-avatar"}
                />
                <div className={"order-user-icon-box"}>
                  <img
                    src={
                      authMember?.memberType === MemberType.RESTAURANT
                        ? "/icons/restaurant.svg"
                        : "/icons/user-badge.svg"
                    }
                    className={"order-user-prof-img"}
                  />
                </div>
              </div>
              <span className={"order-user-name"}>
                {" "}
                {authMember?.memberNick}
              </span>
              <span className={"order-user-prof"}>
                {" "}
                {authMember?.memberType}
              </span>
            </Box>
            <Box className={"liner"}></Box>
            <Box className={"order-user-address"}>
              <div style={{ display: "flex" }}>
                <LocationOnIcon />
                <p className={"spec-address-txt"}>
                  {" "}
                  {authMember?.memberAddress
                    ? authMember.memberAddress
                    : "Do not exist!"}
                </p>
              </div>
            </Box>
          </Box>
          <Box className={"card-input"}>
            <Container maxWidth="sm">
              <Box>
                <Box
                  sx={{
                    borderRadius: 2,
                    p: 3,
                    mb: 2,
                  }}
                >
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        label="Card number"
                        value="5243 4090 2002 7495"
                        InputProps={{
                          readOnly: true,
                        }}
                        fullWidth
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        label="Expiry date"
                        value="07 / 24"
                        InputProps={{
                          readOnly: true,
                        }}
                        fullWidth
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        label="CVV"
                        value="010"
                        InputProps={{
                          readOnly: true,
                        }}
                        fullWidth
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label="Card holder"
                        value="Justin Robertson"
                        InputProps={{
                          readOnly: true,
                        }}
                        fullWidth
                        variant="outlined"
                      />
                    </Grid>
                  </Grid>
                </Box>
                <Box className={"cards-box"}>
                  <img
                    src={"/icons/western-card.svg"}
                    alt="Western Union"
                    style={{ width: "60px", height: "auto" }}
                  />
                  <img
                    src={"/icons/master-card.svg"}
                    alt="MasterCard"
                    style={{ width: "60px", height: "auto" }}
                  />
                  <img
                    src={"/icons/paypal-card.svg"}
                    alt="PayPal"
                    style={{ width: "60px", height: "auto" }}
                  />
                  <img
                    src={"/icons/visa-card.svg"}
                    alt="Visa"
                    style={{ width: "60px", height: "auto" }}
                  />
                </Box>
              </Box>
            </Container>
          </Box>
        </Stack>
      </Container>
    </div>
  );
}
