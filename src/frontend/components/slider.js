import React from "react";
import Carousel from "react-material-ui-carousel";
import { Avatar, Typography } from "@material-ui/core";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import NavigatePrevIcon from "@material-ui/icons/NavigateBefore";

import linkedinLogo from '../../assets/images/LI-In-Bug.png'

// Material ui imports
import { makeStyles, useMediaQuery, Link } from "@material-ui/core";

export default function slider(props) {
  return (
    <div className="carousel">
      <Carousel
        animation={"slide"}
        navButtonsAlwaysVisible={true}
        activeIndicatorIconButtonProps={{ style: { color: "#4ED0CE" } }}
        fullHeightHover={false}
        navButtonsProps={{
          style: {
            color: "#4ED0CE",
            backgroundColor: "rgba(100, 100, 100, 0)",
          },
        }}
        navButtonsWrapperProps={{
          style: {
            bottom: "0",
            top: "unset",
          },
        }}
        NextIcon={<NavigateNextIcon fontSize="large" />}
        PrevIcon={<NavigatePrevIcon fontSize="large" />}
        reverseEdgeAnimationDirection={false}
        interval={7000}
      >
        {props?.items.map((item, i) => (
          <Item key={i} item={item} />
        ))}
      </Carousel>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  header: {
    alignItems: "center",
    textAlign: "center"
  },
}));

function Item(props) {
  // useMediaQuery maxWidth: 460
  const mobile = useMediaQuery("(max-width: 460px)");
  const classes = useStyles();
  return (
    <div style={{ paddingBottom: "64px" }}>
      <div className={`personDescription ${mobile && classes.header}`}>
        <div>
          <div className="secondaryFont fwt700 testimonialName mgt16">
            {props.item.name}
          </div>
          <div className="caption secondaryFont designation">
            {props.item.designation}
          </div>
          <div className="caption secondaryFont designation">
            {props.item.company}
          </div>
          <div className="caption secondaryFont designation">
            {props.item.location}
          </div>
          <Link target="_blank" href={props.item.linkedin}>
            <img src={linkedinLogo} width="30px"/>
          </Link>
        </div>
        {props.item?.img && (
          <Avatar
            src={props.item.img && props.item.img}
            alt="reviewer's avatar"
            className="testimonialAvatar"
          />
        )}
      </div>
      <div className="caption secondaryFont pdt64 testimonialContainer">
        "{props.item.review}"
      </div>
    </div>
  );
}
