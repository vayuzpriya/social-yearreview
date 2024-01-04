import { Config } from "../config.js";
import { INSIGHTS_COUNT } from "../events/events.js";
import Service from "./Service.js";
import { Utility } from "./Utility.js";
import { writable, derived } from "svelte/store";
export const Byte=writable([]);
export const News=writable([]);
export const TotalRank=writable([]);
import $, { data } from "jquery";

  export async function getdetails(type, lastInsightsTime, limit, filter) {
    var url = Config.getBaseURL() + "byte/api/getmemoryData";
    Service.get(url, function (status, response) {
      if(response.mostlikedpost && response.mostlikedpost.length>0){
        Byte.update((value) => [...value, response.mostlikedpost[0]]);
      }
      if(response.mostviewedpost && response.mostviewedpost.length>0){
        News.update((value) => [...value, response.mostviewedpost[0]]);
      }
      if(response.allrank && response.allrank.length>0){
        TotalRank.update((value) => [...value, response.allrank[0]]);
      }
      if(response.shoutoutcount && response.shoutoutcount.length>0){
      $(".totalshoutout").text(response.shoutoutcount[0].count)
      }
      $(".totalbyte").text(response.totalByte)
      $(".totalevents").text(response.totalEvents)
      $(".totalinsights").text(response.totalInsight)
      $(".totalinsightread").text(response.totalInsightRead)
      $(".memoryshimmerdiv").addClass('d-none');
      $(".mainmemorydiv").removeClass('d-none');

      // for (var i = 0; i < response.data.length; i++) {
      //   var temp = response.data[i];
      //   Emojis.update((value) => [...value, temp]);
      // }
  
    });
  }
  export function getToken() {
    // var authToken =
    //   "Bearer: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoidXNlcl9pZF8xNjMzMDM0NjEyNTYyIiwicm9sZSI6InVzZXIiLCJpYXQiOjE2NjM3MzU4NTF9.jjF7taI-p9E6QauW-zwLfdGHZWybpr_3DDFo8vTrSlw";
    // localStorage.setItem("authToken", authToken);
    return localStorage.getItem("authToken");
  }
  export function getUserId() {
    // var userId = "user_id_1633034612562";
    // localStorage.setItem("UserId", userId);
    return localStorage.getItem("UserId");
  }
