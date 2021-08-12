import React from "react";
import { Link } from "react-router-dom";
import {USER_EVENTS_FRAGMENT} from "./UserEvents"
export function ReturnToProfile(props) {
  return (
    <div className="base-container" ref={props.containerRef}>
      <div className="header">Return To Profile</div>
      <div className="content">
        <div className="image">
          <img src={"/img/sport.svg"} alt={"sport"} />
        </div>
        <div className="form"></div>
      </div>

      <div className="footer">
        <Link to="/">
          <button type="button" className="btn">
            Return To Profile
          </button>
        </Link>
      </div>
    </div>
  );
}
