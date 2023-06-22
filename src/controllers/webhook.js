import React from "react";

export const get = async (req, res) => {
  let mode = req.query["hub.mode"];
  let challenge = req.query["hub.challenge"];
  let token = req.query["hub.verify_token"];
  const mytoken = "prasath";
  if (mode && token) {
    if (mode === "subcribe" && token === mytoken) {
      res.status(200).send(challenge);
    } else {
      res.status(403);
    }
  }
};
export const create = async (req, res) => {
  let body = req.body;
  console.log(JSON.stringify(body, null, 21));
};
