import { Config } from "../config";
import Service from "./Service";
import { Utility } from "./Utility";



import $, { data } from "jquery";

export function loadScript(src) {
    return new Promise(function (resolve, reject) {
      var s;
      s = document.createElement("script");
      s.src = src;
      s.onload = resolve;
      s.onerror = reject;
      document.head.appendChild(s);
    });
  }