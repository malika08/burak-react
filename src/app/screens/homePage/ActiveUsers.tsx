import React from "react";

import Card from "@mui/joy/Card";
import CardCover from "@mui/joy/CardCover";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import { CssVarsProvider } from "@mui/joy/styles";
import { AspectRatio, CardOverflow } from "@mui/joy";
import { Visibility } from "@mui/icons-material";
import { Box, Button, Container, Stack } from "@mui/material";
import { DescriptionOutlined } from "@mui/icons-material";

import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrieveTopUsers } from "./selector";
import { serverApi } from "../../../lib/config";
import { Member } from "../../../lib/types/member";

const topUsersRetriver = createSelector(retrieveTopUsers, (topUsers) => ({
  topUsers,
}));

export default function ActiveUsers() {
  const { topUsers } = useSelector(topUsersRetriver);

  console.log("topUsers:", topUsers);
  return (
    <div className={"active-users-frame"}>
      <Container>
        <Stack className={"main"}>
          <Box className={"category-title"}>Popular Dishes</Box>
          <Stack className={"cards-frame"}>
            {topUsers.length !== 0 ? (
              topUsers.map((member: Member) => {
                const imagePath = `${serverApi}/${member.memberImage}`;

                return (
                  <CssVarsProvider key={member._id}>
                    <Card className={"card"} sx={{ maxWidth: 345 }}>
                      <CardOverflow>
                        <AspectRatio ratio="1">
                          <img src={imagePath} alt="" />
                        </AspectRatio>
                      </CardOverflow>

                      <CardOverflow variant="soft">
                        <Stack>
                          <Stack flexDirection={"row"}>
                            <Typography className={"member-nickname"}>
                              {member.memberNick}
                            </Typography>
                          </Stack>
                        </Stack>
                      </CardOverflow>
                    </Card>
                  </CssVarsProvider>
                );
              })
            ) : (
              <Box className="no-data">New Products are not available!</Box>
            )}
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
