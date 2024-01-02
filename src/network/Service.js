const axios = require("axios").default;
// import { Config } from "../config/config.js";
import { Utility } from "./Utility.js";
const $ = require("jquery");

class Service {
  constructor() {
    let service = null;
    // if (Meteor.isClient) {
    service = axios.create({
      headers: {
        "Authorization": localStorage.getItem("authToken"),
        "user_id": localStorage.getItem("UserId"),
      },
    });
    service.interceptors.response.use(this.handleSuccess, this.handleError);
    this.service = service;
  }
  dispatch(obj) {
    if (obj.type != undefined && obj.type == "success") {
      document.dispatchEvent(
        new CustomEvent("successReceived", { detail: obj })
      );
      return false;
    }
    document.dispatchEvent(new CustomEvent("errorReceived", { detail: obj }));
  }
  static dispatch(obj) {
    document.dispatchEvent(new CustomEvent("errorReceived", { detail: obj }));
  }
  createDummyObject(response) {
    var obj = {};
    if (response) {
      obj.message = response.data.message;
      obj.code = response.data.code;
    } else {
      obj.message = "Invalid JSON response";
      obj.code = 500;
    }
    return obj;
  }
  static createDummyObject(response) {
    var obj = {};
    if (response) {
      obj.message = response.data.message;
      obj.code = response.data.code;
    } else {
      obj.message = "Invalid JSON response";
      obj.code = 500;
    }
    return obj;
  }

  handleSuccess(response) {
    return response;
  }

  handleError(error) {
    // switch (error.response.status) {
    //   case 401:
    //     this.redirectTo(document, '/')
    //     break;
    //   case 404:
    //     this.redirectTo(document, '/404')
    //     break;
    //   default:
    //     this.redirectTo(document, '/500')
    //     break;
    // }
    return { status: 444 };
    // return error.response.status;
  }

  redirectTo(document, path) {
    document.location = path;
  }

  get(path, callback) {
    // Session.set("isLoading", true);
    return this.service.get(path).then(function (response) {
      //  console.log(response);
      // Session.set("isLoading", false);
      if (Utility.isObject(response.data)) {
        if (response.data.code == 200) {
          callback(response.status, response.data);
        }
        //  else if (response.data.code == 404) {
        //   Service.dispatch(Service.createDummyObject(response));
        //   FlowRouter.go("/admin/404");
        // }
        else if (response.data.code == 403) {
          Service.dispatch(Service.createDummyObject(response));
          // FlowRouter.go("/");
        } else {
          Service.dispatch(Service.createDummyObject(response));
        }
      } else {
        Service.dispatch(Service.createDummyObject());
      }
    });
  }
  getWithResponse(path, callback) {
    return this.service
      .get(Config.getBaseURL() + path)
      .then(function (response) {
        //  console.log(response);
        if (Utility.isObject(response.data)) {
          callback(response.status, response.data);
        } else {
          Service.dispatch(Service.createDummyObject());
        }
      });
  }

  patch(path, payload, callback) {
    return this.service
      .request({
        method: "PATCH",
        url: Config.getBaseURL() + path,
        responseType: "json",
        data: payload,
      })
      .then((response) => callback(response.status, response.data));
  }

  post(path, payload, callback) {
    if (payload.loader) {
      if (payload.button_id) {
        $("#" + payload.button_id).addClass("disabled");
      }
      $("#" + payload.loader).removeClass("display_hidden");
    }

    return this.service
      .request({
        method: "POST",
        url: path,
        responseType: "json",
        data: payload,
      })
      .then(function (response) {
        if (payload.button_id) {
          $("#" + payload.button_id).removeClass("disabled");
        }
        if (response.status == 200) {
          if (payload.loader)
            $("#" + payload.loader).addClass("display_hidden");
          if (Utility.isObject(response.data)) {
            if (response.data.code >= 200 && response.data.code <= 210) {
              callback(response.status, response.data);
            }
            // else if (response.data.code == 404) {
            //   Service.dispatch(Service.createDummyObject(response));
            //   FlowRouter.go("/admin/404");
            // }
            else if (response.data.code == 403) {
              Service.dispatch(Service.createDummyObject(response));
              // FlowRouter.go("/");
            } else {
              Service.dispatch(Service.createDummyObject(response));
            }
          }
        } else {
          Service.dispatch(Service.createDummyObject());
        }
      });
  }

  put(path, payload, callback) {
    if (payload.loader) {
      if (payload.button_id) {
        $("#" + payload.button_id).addClass("disabled");
      }
      $("#" + payload.loader).removeClass("display_hidden");
    }

    return this.service
      .request({
        method: "PUT",
        url: Config.getBaseURL() + path,
        responseType: "json",
        data: payload,
      })
      .then(function (response) {
        //console.log(response);
        if (payload.button_id) {
          $("#" + payload.button_id).removeClass("disabled");
        }
        if (response.status == 200) {
          if (payload.loader) {
            $("#" + payload.loader).addClass("display_hidden");
          }
          if (Utility.isObject(response.data)) {
            if (response.data.code == 200) {
              callback(response.status, response.data);
            }
            // else if (response.data.code == 404) {
            //   Service.dispatch(Service.createDummyObject(response));
            //   FlowRouter.go("/admin/404");
            // }
            else if (response.data.code == 403) {
              Service.dispatch(Service.createDummyObject(response));
              // FlowRouter.go("/");
            } else {
              Service.dispatch(Service.createDummyObject(response));
            }
          }
        } else {
          Service.dispatch(Service.createDummyObject());
        }
      });
  }


  delete(path, payload, callback) {
    if (payload.loader) {
      if (payload.button_id) {
        $("#" + payload.button_id).addClass("disabled");
      }
      $("#" + payload.loader).removeClass("display_hidden");
    }

    return this.service
      .request({
        method: "DELETE",
        url: path,
        responseType: "json",
        data: payload,
      })
      .then(function (response) {
        if (payload.button_id) {
          $("#" + payload.button_id).removeClass("disabled");
        }
        if (response.status == 200) {
          if (payload.loader)
            $("#" + payload.loader).addClass("display_hidden");
          if (Utility.isObject(response.data)) {
            if (response.data.code >= 200 && response.data.code <= 210) {
              callback(response.status, response.data);
            }
            // else if (response.data.code == 404) {
            //   Service.dispatch(Service.createDummyObject(response));
            //   FlowRouter.go("/admin/404");
            // }
            else if (response.data.code == 403) {
              Service.dispatch(Service.createDummyObject(response));
              // FlowRouter.go("/");
            } else {
              Service.dispatch(Service.createDummyObject(response));
            }
          }
        } else {
          Service.dispatch(Service.createDummyObject());
        }
      });
  }


}

export default new Service();
