"use strict";

import { generateResponse, parseBody } from "../../utilities";

import { addSystemMenu, listMenus, getMenu } from "../../models/menu";
import { findRoleById } from "../../models/roles";


export function addMenu(req, res) {
  let menuObj = parseBody(req);
  addSystemMenu(menuObj)
    .then(menu => {
      generateResponse(menu.success, menu.message, menu.data, res);
    })
    .catch(ex => {
      generateResponse(false, "Cant Create Menu, exception triggered", ex, res);
    });
}

export function listAllMenus(req, res) {
  listMenus()
    .then(resp => {
      generateResponse(resp.success, resp.message, resp.data, res);
    })
    .catch(ex => {
      generateResponse(false, "Cant list Menus, exception triggered", ex, res);
    });
}

export function fetchMenu(req, res) {
  let role = req.user.role
  console.log(req.user, "role")
  if (role) {
    getMenu(role).then(result => {
      if (result) {
        console.log(result.data)
        generateResponse(result.success, result.message, result.data, res)
      }
    })
  }

}


