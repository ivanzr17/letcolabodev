"use client";

import React from "react";
import ReactTimeago from "react-timeago";

const TimeStamp = ({ date }: { date: string }) => {
  return (
    <div>
      <ReactTimeago date={date} />
    </div>
  );
};

export default TimeStamp;
