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

const activeUsers = [
  { memberNick: "Martin", imagePath: "/img/martin.webp" },
  { memberNick: "Justin", imagePath: "/img/justin.webp" },
  { memberNick: "Rose", imagePath: "/img/rose.webp" },
  { memberNick: "Nusret", imagePath: "/img/nusret.webp" },
];

export default function ActiveUsers() {
  return (
    <div className={"active-users-frame"}>
      <Container>
        <Stack className={"main"}>
          <Box className={"category-title"}>Popular Dishes</Box>
          <Stack className={"cards-frame"}>
            {activeUsers.length !== 0 ? (
              activeUsers.map((ele, index) => {
                return (
                  <CssVarsProvider key={index}>
                    <Card className={"card"} sx={{ maxWidth: 345 }}>
                      <CardOverflow>
                        <AspectRatio ratio="1">
                          <img src={ele.imagePath} alt="" />
                        </AspectRatio>
                      </CardOverflow>

                      <CardOverflow variant="soft">
                        <Stack>
                          <Stack flexDirection={"row"}>
                            <Typography className={"member-nickname"}>
                              {ele.memberNick}
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
