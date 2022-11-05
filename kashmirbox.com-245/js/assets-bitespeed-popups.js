function loadScript(url, callback, async = true, defer = false, id = "") {
  const script = document.createElement("script");
  script.type = "text/javascript";
  script.async = async;
  script.defer = defer;
  script.id = id;
  if (script.readyState) {
    // IE
    script.onreadystatechange = function () {
      if (
        script.readyState == "loaded" ||
        script.readyState == "complete"
      ) {
        script.onreadystatechange = null;

        callback();
      }
    };
  } else {
    // Others
    script.onload = function () {
      callback();
    };
  }
  script.src = url;
  document.getElementsByTagName("head")[0].appendChild(script);
}
const getIsFb = async () => {
    try {
  
        var axiosScript = document.createElement('script');  
            axiosScript.setAttribute('src','https://unpkg.com/axios/dist/axios.min.js');
            document.head.appendChild(axiosScript);
       
      var indexOfwww = location.hostname.indexOf("www");
      var shopDomainStripped =
        indexOfwww === -1
          ? "." + location.hostname
          : location.hostname.substr(indexOfwww + 3);
      var globalShopUrl =
        indexOfwww === -1
          ? location.hostname
          : location.hostname.substr(indexOfwww + 4);
    let res = await axios({
      method: "get",
      url: `https://9pkplnrgv3.execute-api.us-east-1.amazonaws.com/prod/isfb?shopUrl=${globalShopUrl}`,
    });
    return res.data;
    } catch (error) {
     console.log(error) 
    }
    
  };
  var showWAChatWidget;
  var waHandler;
  var hideWAChatWidget;
  var setClass;
  var hidePopup;
  var closeWheel;
  var getSpinTheWheelCode;
  const pickScript = (isFb) => {
    console.log(isFb)
    const whatsappFunc = async () => {
      console.log("WHATSAPP RAN()--")
      var indexOfwww = location.hostname.indexOf("www");
      var fbLoggedInStatus = "unknown";
      var shopDomainStripped =
        indexOfwww === -1
          ? "." + location.hostname
          : location.hostname.substr(indexOfwww + 3);
      var globalShopUrl =
        indexOfwww === -1
          ? location.hostname
          : location.hostname.substr(indexOfwww + 4);
  
      let globalPopups;
      let globalWAPageId;
      let globalPhoneNoObjs = {};
      const closedPopups = [];
      let globalFinalHtml;
      let globalPageId;
      var noRepeat = "";
      let spaceReplacedDiscountCode;
      let discountCode;
      let discountText;
      let globalDegree;
      let isLogsEnabled;
      const popups = {};
  
      (async function () {
        try {
          // TODO: remove disable jquery
          // Object.defineProperty(window, 'jQuery', {
          //   value: undefined,
          //   writable: false
          // });
          // Object.defineProperty(window, '$', {
          //   value: undefined,
          //   writable: false
          // });
  
          // initialize global variables
  
          // let hasFBPopups = false;
          // const keys = Object.keys(globalPopups);
          // keys.forEach(async (popupId) => {
          //   if (globalPopups[popupId].channel != "WA") {
          //     hasFBPopups = true;
          //   }
          // });
  
          // // load the script only when you have FB popups
          // if (hasFBPopups) {
          //   if (typeof FB === "undefined") {
          //   //   console.log("LOADING FB SCRIPT");
          //     loadScript(
          //       "https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js",
          //       () => {
          //       //   console.log("FB INIT, below else");
          //         window.fbAsyncInit = function () {
          //           FB.init({
          //             appId: "2616438408370023",
          //             autoLogAppEvents: true,
          //             xfbml: true,
          //             status: true,
          //             cookie: true,
          //             version: "v4.0",
          //           });
          //         };
          //         window.FB.Event.subscribe(
          //           "auth.authResponseChange",
          //           statusChangeCallback
          //         );
          //         checkLoginState();
          //         appendAll();
          //       },
          //       true,
          //       true,
          //       "facebook-jssdk"
          //     );
  
          //     //WHATSAPP
  
          //     loadScript(
          //       "https://cdn.bitespeed.co/whatsapp-snippets/intlTelInput.min.js",
          //       () => {
          //       //   console.log("intlTell loaded");
          //       }
          //     );
          //     loadScript(
          //       "https://cdn.bitespeed.co/whatsapp-snippets/utils.js",
          //       () => {
          //       //   console.log("util.js loaded");
          //       }
          //     );
          //   } else {
          //   //   console.log("2222-2222");
          //     // $(document).ready(function () {
          //     document.addEventListener("DOMContentLoaded", function () {
          //       // console.log("FB INIT, below else, else");
          //       function facebookReady() {
          //         FB.init({
          //           appId: "2616438408370023",
          //           status: true,
          //           cookie: true,
          //           xfbml: true,
          //           version: "v4.0",
          //         });
          //         (function (d, s, id) {
          //           var js,
          //             fjs = d.getElementsByTagName(s)[0];
          //           if (d.getElementById(id)) return;
          //           js = d.createElement(s);
          //           js.id = id;
          //           js.src =
          //             "https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js";
          //           fjs.parentNode.insertBefore(js, fjs);
          //         })(document, "script", "facebook-jssdk");
          //         window.FB.Event.subscribe(
          //           "auth.authResponseChange",
          //           statusChangeCallback
          //         );
          //         checkLoginState();
          //         appendAll();
          //       }
  
          //       if (window.FB) {
          //         facebookReady();
          //       } else {
          //         window.fbAsyncInit = facebookReady;
          //       }
          //     });
          //     //WHATSAPP
          //     loadScript(
          //       "https://cdn.bitespeed.co/whatsapp-snippets/intlTelInput.min.js",
          //       () => {
          //       //   console.log("intlTell loaded");
          //       }
          //     );
          //     loadScript(
          //       "https://cdn.bitespeed.co/whatsapp-snippets/utils.js",
          //       () => {
          //       //   console.log("util.js loaded");
          //       }
          //     );
          //   }
          // } else {
            //WHATSAPP
            await getFinalHtml();
            loadScript(
              "https://unpkg.com/axios/dist/axios.min.js",
              () => {}
            );
            loadScript(
              "https://cdn.bitespeed.co/whatsapp-snippets/intlTelInput.min.js",
              () => {
                // console.log("intlTell loaded");
              }
            );
            loadScript(
              "https://cdn.bitespeed.co/whatsapp-snippets/utils.js",
              () => {
                // console.log("util.js loaded");
                appendAll();
              }
            );
            // console.log("intlTell loaded");
          // }
          

        } catch (err) {
          console.log("Error while loading Bitespeed popup script");
          console.log(err);
        }
      })();
  
      function loadScript(url, callback, async = true, defer = false, id = "") {
        const script = document.createElement("script");
        script.type = "text/javascript";
        script.async = async;
        script.defer = defer;
        script.id = id;
        if (script.readyState) {
          // IE
          script.onreadystatechange = function () {
            if (
              script.readyState == "loaded" ||
              script.readyState == "complete"
            ) {
              script.onreadystatechange = null;
  
              callback();
            }
          };
        } else {
          // Others
          script.onload = function () {
            callback();
          };
        }
        script.src = url;
        document.getElementsByTagName("head")[0].appendChild(script);
      }
  
      statusChangeCallback = async (response) => {
        if (response.status === "connected") {
          //Do real shit
          fbLoggedInStatus = true;
          // this.testAPI();
        } else if (response.status === "not_authorized") {
          fbLoggedInStatus = true;
          //Show Login Button
          // console.log("Please log into this app.");
        } else {
          fbLoggedInStatus = false;
          //Show login button
        }
      };
  
      function checkLoginState() {
        window.FB.getLoginStatus(
          function (response) {
            if (response.status === "connected") {
              //Do real shit
              fbLoggedInStatus = true;
              // this.testAPI();
            } else if (response.status === "not_authorized") {
              fbLoggedInStatus = true;
              //Show Login Button
              // console.log("Please log into this app.");
            } else {
              fbLoggedInStatus = false;
              //Show login button
            }
          }.bind(this),
          true
        );
      }
  
      // Load the script
      async function appendAll() {
        // $(async() => {
        // document.addEventListener("DOMContentLoaded", async() => {
        var tempDisplayedPopups = getCookie("displayedPopups");
  
        if (tempDisplayedPopups) {
          try {
            noRepeat = JSON.parse(tempDisplayedPopups);
          } catch (err) {
            noRepeat = tempDisplayedPopups;
          }
        //   console.log("IN APPEND ALL");
        }
        appendCSS();
        await renderPopups();
        // });
      }
  
      function create_UUID() {
        var e = new Date().getTime();
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
          /[xy]/g,
          function (t) {
            var o = (e + 16 * Math.random()) % 16 | 0;
            return (
              (e = Math.floor(e / 16)), ("x" == t ? o : (3 & o) | 8).toString(16)
            );
          }
        );
      }
  
      function appendCSS() {
        // console.log("IN APPEND CSS");
        var links;
        if (window.innerWidth < 768) {
          links =
            '<link rel="stylesheet" href="https://cdn.bitespeed.co/snippets/bitespeed-popup-mob-min.css"> <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.2/animate.min.css"> <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">';
        } else {
          links =
            '<link rel="stylesheet" href="https://cdn.bitespeed.co/snippets/bitespeed-popup-min.css"> <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.2/animate.min.css"> <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">';
        }
        //WHATSAPP
        links +=
          '<link rel="stylesheet" href="https://cdn.bitespeed.co/whatsapp-snippets/demo.css">';
        links +=
          '<link rel="stylesheet" href="https://cdn.bitespeed.co/whatsapp-snippets/intlTelInput.min.css">';
        links +=
          '<link rel="stylesheet" href="https://cdn.bitespeed.co/whatsapp-snippets/bitespeed-wa.css">';
        try {
          // $("head").append(links);
          document.head.insertAdjacentHTML("beforeend", links);
        //   console.log("SUCCESSFULLY APPENDED CSS");
        } catch (err) {
          console.log("Error while appending CSS ", err);
        }
      }
  
      function isValidObj(obj) {
        if (
          obj === null ||
          obj === "null" ||
          obj === "" ||
          obj === undefined ||
          obj === "undefined"
        )
          return false;
        return true;
      }
  
      function setCookie(name, value) {
        document.cookie =
          name + "=" + value + ";domain=" + shopDomainStripped + "; path=/";
      }
  
      function setCookieWithExpiry(name, value, days) {
        let currDate = new Date();
        currDate.setTime(currDate.getTime() + 24 * days * 60 * 60 * 1000);
        document.cookie =
          name + "=" + value + ";expires=" + currDate.toUTCString();
      }
  
      function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length == 2) return parts.pop().split(";").shift();
      }
  
      function makeid(len) {
        var id = [];
        var letters =
          "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        var n = letters.length;
        for (let i = 0; i < len; i++) {
          id.push(letters.charAt(Math.floor(Math.random() * n)));
        }
        return id.join("");
      }
  
      // generates unique user ID and sets "refb" cookie; Returns uuid
      function createRef() {
        let uuid = create_UUID();
        document.cookie =
          "refb=" +
          uuid +
          ";expires=" +
          new Date(new Date().setFullYear(new Date().getFullYear() + 10)) +
          ";domain=" +
          shopDomainStripped +
          "; path=/";
        return uuid;
      }
  
      // sends impression to db, updates noRepeat, sets "displayedPopups" cookie
      async function sendImpression(impression, id) {
        if (!noRepeat.includes(impression)) {
          noRepeat = noRepeat + "+" + impression;
          try {
            let res = await axios({
              method: "post",
              url: `https://9pkplnrgv3.execute-api.us-east-1.amazonaws.com/prod/conversionAndImpressionHandler?id=${id}&field=impressions`,
            });
            setCookie("displayedPopups", noRepeat);
            if (res.status != 200) {
              throw res.data; // throws the error message
            }
            // if (isLogsEnabled) console.log(res.data);
          } catch (err) {
            if (isLogsEnabled) console.log("Error while sending impression", err);
            throw err;
          }
        }
      }
  
      // sends WA text based on shopUrl(language) and display width
      function sendWAText(id) {
        let text = encodeURIComponent(
          "https://" +
            window.location.hostname +
            window.location.pathname +
            "\n\n" +
            globalPopups[id].generalSettings.defaultText
        );
        // handle text in other languages
        switch (globalWAPageId) {
          case "dogal-koy-sepetim.myshopify.com":
            text = encodeURIComponent(
              "Ürünleriniz hakkında detaylı bilgi alabilir miyim ?"
            );
            break;
          case "2b-eco.myshopify.com":
            text = encodeURIComponent("Pode me ajudar?");
            break;
          case "leginfi.myshopify.com":
            text = encodeURIComponent(
              "Estoy interesado en este producto y tengo algunas preguntas. ¿Pueden ayudarme?"
            );
            break;
        }
        if (window.innerWidth < 768) {
          window.open(
            "https://api.whatsapp.com/send?phone=" +
              globalPopups[id].generalSettings.supportNumber.replace("-","") +
              "&text=" +
              text
          );
        //   if (isLogsEnabled) console.log("SENT WA TEXT", " device=mobile");
        } else {
          window.open(
            "https://web.whatsapp.com/send?phone=" +
              globalPopups[id].generalSettings.supportNumber.replace("-","") +
              "&text=" +
              text
          );
        //   if (isLogsEnabled) console.log("SENT WA TEXT", " device=desktop");
        }
      }
  
      // Called when 'send' button of any Opt-in tools is clicked
      // collects phoneNo and data, and dispatches new 'message' event
      waHandler = (data, id, isChatWidget = false) => {
        if (isChatWidget) {
        //   if (isLogsEnabled) console.log("SENDING WA TEXT");
          sendWAText(id);
        }
  
        let phoneNo = globalPhoneNoObjs[id].getNumber();
phoneNo = phoneNo.replace("+", "");
        if(phoneNo.slice(0, 2) == 91 && phoneNo.slice(2).length != 10){
          return
        }
// if (isLogsEnabled) console.log("THIS IS PHONE NUMBER", phoneNo);
  
        let dataStr = JSON.stringify(data.split("."));
  
        let event = new CustomEvent("message", {
          detail: {
            isWA: true,
            data: dataStr,
            phoneNo: phoneNo,
          },
        });
        window.dispatchEvent(event);
      };
  
      showWAChatWidget = (id) => {
        // console.log("whatsapp showWaChatWidget");
        if (globalPopups[id].generalSettings.collectPhone) {
          //   if ($("#wa-chat-bubble").length) {
          //     $("#wa-chat-bubble").show();
          //     $("#wa-chat-bubble").removeClass("bounceDown");
          //     $("#wa-chat-bubble").addClass("bounceUp");
          //     $("#wa-chat-btn-root").hide();
          //     return;
          //   }
          if (document.querySelector("#wa-chat-bubble")) {
            document.querySelector("#wa-chat-bubble").style.display = "block";
            document
              .querySelector("#wa-chat-bubble")
              .classList.remove("bounceDown");
            document.querySelector("#wa-chat-bubble").classList.add("bounceUp");
            document.querySelector("#wa-chat-btn-root").style.display = "none";
            return;
          }
        } else {
          sendWAText(id);
        }
      };
  
      hideWAChatWidget = () => {
        // if($("#wa-chat-btn-root").length) {
        //   $("#wa-chat-btn-root").show();
        //   $("#wa-chat-bubble").addClass("bounceDown");
        //   $("#wa-chat-bubble").removeClass("bounceUp");
        //   $("#wa-chat-bubble").hide();
        //   return;
        // }
        if (document.querySelector("#wa-chat-btn-root")) {
          document.querySelector("#wa-chat-btn-root").style.display = "block";
          document.querySelector("#wa-chat-bubble").classList.remove("bounceUp");
          document.querySelector("#wa-chat-bubble").classList.add("bounceDown");
          document.querySelector("#wa-chat-bubble").style.display = "none";
          return;
        }
      };
  
      // calls the 'popupHtml' lambda function and initializes values of global variable
      async function getFinalHtml() {
        let uuid = getCookie("refb");
        if (!isValidObj(uuid)) {
          uuid = createRef();
        }
        // initializes globalDegree variables
        globalDegree = 900 + Math.random() * 1080;
        // console.log("THIS WILLL TRIGGER THE LAMBDA");
        //  Access-Control-Allow-Origin
        try {
          var res = await axios({
            method: "post",
            url: "https://9pkplnrgv3.execute-api.us-east-1.amazonaws.com/prod/getPopupHtml",
            params: {
              shopUrl: globalShopUrl,
              // shopUrl: "www.petglam.in",
              key: "key",
              userId: getCookie("BS_UNIQUE_USER_ID"),
              uuid: uuid,
              screenWidth: window.innerWidth,
              spinDegree: globalDegree,
            },
            headers: { "access-control-allow-origin": "*" },
          });
        } catch (error) {
          console.log(" in better form: ", error);
        }
        res = res.data;
  
        // initialize global variables
        globalFinalHtml = res.finalHtml;
        globalPopups = res.activePopups.popups;
        globalWAPageId = res.activePopups.shopUrl;
        globalPageId = res.activePopups.pageId[0];
        isLogsEnabled = false;
        if (res.spinTheWheelObj) {
          discountCode = res.spinTheWheelObj.code;
          spaceReplacedDiscountCode = discountCode.split(" ").join("bsp");
          discountText = res.spinTheWheelObj.text;
        }
      }
  
      function appendHtml(finalHtml) {
        // if (isLogsEnabled) console.log("IN APPEND HTML");
        for (let i = 0; i < finalHtml.length; i++) {
          finalHtml[i] = unescape(finalHtml[i]);
          finalHtml[i] = finalHtml[i].replace(/\\n/g, "");
          finalHtml[i] = finalHtml[i].replace(/\`/g, "");
          if (finalHtml[i])
            // $("body").append(finalHtml[i]);
            document.body.insertAdjacentHTML("beforeend", finalHtml[i]);
        }
      }
  
      async function popupDisplayDecider(popup, id, popupType) {
        try {
          if (popup.behaviour.when.showAt == "exit") {
            await displayOnExit(popupType, id);
            // if (isLogsEnabled)
            //   console.log(
            //     "RENDERING " +
            //       popupType +
            //       " showAt=" +
            //       popup.behaviour.when.showAt
            //   );
          }
          if (
            popup.behaviour.when.showAt == "time" ||
            popup.behaviour.when.showAt == "welcome"
          ) {
            await displayWithTime(popupType, popup.behaviour.when.value, id);
            // if (isLogsEnabled)
            //   console.log(
            //     "RENDERING " +
            //       popupType +
            //       " showAt=" +
            //       popup.behaviour.when.showAt
            //   );
          }
          if (popup.behaviour.when.showAt == "scroll") {
            await displayOnScroll(popupType, popup.behaviour.when.value, id);
            // if (isLogsEnabled)
            //   console.log(
            //     "RENDERING " +
            //       popupType +
            //       " showAt=" +
            //       popup.behaviour.when.showAt
            //   );
          }
        } catch (err) {
          throw err;
        }
      }
  
      async function renderPopups() {
        let userId = getCookie("BS_UNIQUE_USER_ID");
        if (!isValidObj(userId)) {
          let currDate = new Date();
          setCookieWithExpiry(
            "BS_UNIQUE_USER_ID",
            (userId = String(currDate.getTime()) + makeid(10)),
            15
          );
        }
        // handle special case
        try {
          if (
            window.location.href.includes("https://www.beachdazetowel.com") &&
            !window.location.href.includes(
              "https://www.beachdazetowel.com/pages/wholesale"
            )
          ) {
            return;
          }
        } catch (err) {
          if (isLogsEnabled) console.error(err);
        }
  
        try {
          // // initialize global variables
          // await getFinalHtml();
  
          keys = Object.keys(globalPopups);
          if (keys[0]) {
            if (globalPopups[keys[0]].channel != "WA") {
              let optedIn = String(getCookie("bitespeedOptedIn"));
            //   console.log(
            //     "optin status = ",
            //     optedIn,
            //     globalPopups[keys[0]].behaviour.who.showAt
            //   );
  
              if (
                !(
                  isValidObj(optedIn) &&
                  globalPopups[keys[0]].behaviour.who.showAt == "unOpted"
                ) ||
                globalPopups[keys[0]].behaviour.who.showAt != "unOpted"
              ) {
                //RENDERING FACEBOOK POPUPS
                if (isLogsEnabled) console.log("RENDERING FACEBOOK POPUPS");
                // append all the html strings
                appendHtml(globalFinalHtml);
  
                // iterate over each active popup
                keys.forEach(async (popupId) => {
                  await renderPopup(globalPopups, globalPopups[popupId], popupId);
                });
              }
            } else {
              let optedInWA = String(getCookie("bitespeedOptedInWA"));
            //   console.log(
            //     "optin status = ",
            //     optedInWA,
            //     globalPopups[keys[0]].behaviour.who.showAt
            //   );
  
              if (
                !(
                  isValidObj(optedInWA) &&
                  globalPopups[keys[0]].behaviour.who.showAt == "unOpted"
                ) ||
                globalPopups[keys[0]].behaviour.who.showAt != "unOpted"
              ) {
                //RENDERING WHATSAPP POPUPS
                if (isLogsEnabled) console.log("RENDERING WHATSAPP POPUPS");
                // append all the html strings
                appendHtml(globalFinalHtml);
  
                // iterate over each active popup
                keys.forEach(async (popupId) => {
                //   console.log("is logs enabled = ", isLogsEnabled);
                  await renderPopup(globalPopups, globalPopups[popupId], popupId);
                });
              }
            }
          }
        } catch (err) {
          if (isLogsEnabled) console.log(err);
        }
      }
  
      async function renderPopup(popups, popup, id) {
        // persistent pill
        if ("collapsed" in popup) {
          if (!noRepeat.includes(id)) {
            // console.log("Before calling sendImpression");
            await sendImpression("pillImpressionSent", id);
            if (isLogsEnabled)
              console.log("RENDERING PERSISTENT DISCOUNT WIDGET");
          }
        }
        // customer chat widget
        else if (
          popup.type == "customerChatWidget" ||
          popup.type == "customerChatWidgetWA"
        ) {
          await sendImpression("widgetImpressionSent", id);
          if (typeof FB !== "undefined") FB.XFBML.parse();
          if (isLogsEnabled) console.log("RENDERING CUSTOMER CHAT WIDGET");
        } else if (popup.type == "orderUpdates") {
          try {
            // TODO: verify if this is correct, orderUpdates not working
            let res = await axios({
              method: "post",
              url: `https://9pkplnrgv3.execute-api.us-east-1.amazonaws.com/prod/conversionAndImpressionHandler?id=${id}&field=impressions`,
            });
            if (res.status != 200) {
              throw res.data; // throws the error message
            }
  
            if (isLogsEnabled) console.log("SUCCESFULLY SENT ORDER UPDATE");
          } catch (err) {
            if (isLogsEnabled)
              console.log("Error while sending order updates ", err);
            // throw err;
          }
        }
        // visual popup or spin the wheel
        else if (popup.open) {
          try {
            switch (popup.open.type) {
              case "modalImageAtTop":
                await popupDisplayDecider(popup, id, "visualPopupImageAtTop");
                break;
              case "modalImageBehind":
                await popupDisplayDecider(popup, id, "visualPopupImageBehind");
                break;
              case "modalImageAtRight":
                await popupDisplayDecider(popup, id, "visualPopupImageAtRight");
                break;
              case "spinTheWheel":
              case "spinTheWheelWA":
                wheelLoad(popups, popup.id);
                await popupDisplayDecider(popup, id, "wheelContainer");
                break;
              default:
                break;
            }
          } catch (err) {}
        }
  
        //WHATSAPP
        try {
          if (globalPopups[id].channel == "WA") {
            if (isLogsEnabled) console.log("IN intlTelInput handler");
            let input = document.querySelector("#bitespeed-phone-" + id);
            let telClassName = "";
            if (popup.type == "customerChatWidget") {
              telClassName = "bitespeed-phone-customer-chat-widget";
            }
            let iti = await window.intlTelInput(input, {
              geoIpLookup: async function (callback) {
                const data = await axios.get(
                  "https://get.geojs.io/v1/ip/country.json"
                );
                if (data && data.country) callback(data.country);
                else callback("IN");
              },
              initialCountry: "auto",
              separateDialCode: true,
              customContainer: telClassName,
            });
            if (popup.type == "customerChatWidget") {
              // $("#wa-chat-bubble").css('display', 'none');
              // $("#wa-chat-bubble").css('visibility', 'initial');
              document.querySelector("#wa-chat-bubble").style.display = "none";
              document.querySelector("#wa-chat-bubble").style.visibility =
                "initial";
            }
            // globalPhoneNoObjs initialized here
            globalPhoneNoObjs[id] = iti;
            if (isLogsEnabled) console.log("intlTelInput HANDLED SUCCESSFULLY");
          }
        } catch (err) {
          if (isLogsEnabled)
            console.error("Error while handling intlTelInput", err);
          throw err;
        }
      }
  
      setClass = (popupPosition, id) => {
        const keys = Object.keys(globalPopups);
        let type;
        let classLayout;
        for (let i = 0; i < keys.length; i++) {
          if ("collapsed" in globalPopups[keys[i]]) {
            type = globalPopups[keys[i]].open.type;
            break;
          }
        }
        if (type == "modalImageAtTop") classLayout = "popupImageAtPillClick";
        else classLayout = "popupImageAtPillClickBehind";
  
        document.getElementById(
          classLayout
        ).className = `popup onPillClick p${popupPosition}`;
        document.getElementById("pillPopup").style.display = "flex";
        document.getElementById("permanentPill").style.display = "none";
      };
  
      function showPopup() {
        document.getElementById("popupImageAtTopDiv").style.display = "flex";
        document.getElementById("permanentPill").style.display = "none";
      }
  
      async function displayOnExit(popupType, id) {
        document.addEventListener(
          "mouseleave",
          async (e) => {
            if (e.y <= 0 && !closedPopups.includes(popupType)) {
              if (!noRepeat.includes(id)) {
                if (popupType == "wheelContainer") {
                  document.getElementById("wheelContainer").style.transform =
                    "translate(100%, 0)";
                } else {
                  $(`#${popupType}`).fadeIn();
                }
                try {
                  await sendImpression(id, id);
                } catch (err) {
                  throw err;
                }
              }
            }
          },
          false
        );
      }
  
      // function fadeIn(el, time) {
      //   el.style.opacity = 0;
  
      //   var last = +new Date();
      //   var tick = function() {
      //     el.style.opacity = +el.style.opacity + (new Date() - last) / time;
      //     last = +new Date();
  
      //     if (+el.style.opacity < 1) {
      //       (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16);
      //     }
      //   };
  
      //   tick();
      // }
  
      async function displayOnScroll(popupType, percentage, id) {
        window.addEventListener("scroll", async () => {
          // const scrollTop = $(window).scrollTop();
          const scrollTop = document.documentElement.scrollTop;
          // const docHeight = $(document).height();
          const docHeight = document.body.clientHeight;
          // const winHeight = $(window).height();
          const winHeight = document.documentElement.clientHeight;
          const scrollPercent = scrollTop / (docHeight - winHeight);
          const scrollPercentRounded = Math.round(scrollPercent * 100);
          if (
            scrollPercentRounded > percentage &&
            !closedPopups.includes(popupType)
          ) {
            if (!noRepeat.includes(id)) {
              if (popupType == "wheelContainer") {
                document.getElementById("wheelContainer").style.transform =
                  "translate(100%, 0)";
              } else {
                // $(`#${popupType}`).fadeIn();
                // var el = document.getElementById(`${popupType}`);
                // fadeIn(el, 10000);
                // console.log("comes here ", el);
                // TODO: is fadeIn required?
                document.getElementById(`${popupType}`).style.display = "flex";
              }
              try {
                await sendImpression(id, id);
              } catch (err) {
                throw err;
              }
            }
          }
        });
      }
  
      async function displayWithTime(popupType, time, id) {
        setTimeout(async () => {
          if (!noRepeat.includes(id)) {
            if (popupType == "wheelContainer") {
              document.getElementById("wheelContainer").style.transform =
                "translate(100%, 0)";
            } else {
              // $(`#${popupType}`).fadeIn();
              // TODO: is fadeIn required?
              document.getElementById(`${popupType}`).style.display = "flex";
            }
            try {
              await sendImpression(id, id);
            } catch (err) {
              throw err;
            }
          }
        }, time * 1000);
      }
  
      hidePopup = (popupType) => {
        // $(`#${popupType}`).css("display", "none");
        document.getElementById(`${popupType}`).style.display = "none";
        if (popupType === "permanentPill") {
          document.getElementById("pillPopup").style.display = "none";
        }
        // initializes and modifies closedPopups
        closedPopups.push(popupType);
      };
  
      closeWheel = () => {
        document.getElementById("wheelContainer").style.transform =
          "translate(0%, 0)";
      };
  
      function spin(degree) {
        const finalAngles = [];
        let winningValue;
        const dash1 = `${degree + 15}deg`;
        finalAngles.push((degree + 15) % 360);
        const dash2 = `${degree + 45}deg`;
        finalAngles.push((degree + 45) % 360);
        const dash3 = `${degree + 75}deg`;
        finalAngles.push((degree + 75) % 360);
        const dash4 = `${degree + 105}deg`;
        finalAngles.push((degree + 105) % 360);
        const dash5 = `${degree + 135}deg`;
        finalAngles.push((degree + 135) % 360);
        const dash6 = `${degree + 165}deg`;
        finalAngles.push((degree + 165) % 360);
        const dash7 = `${degree + 195}deg`;
        finalAngles.push((degree + 195) % 360);
        const dash8 = `${degree + 225}deg`;
        finalAngles.push((degree + 225) % 360);
        const dash9 = `${degree + 255}deg`;
        finalAngles.push((degree + 255) % 360);
        const dash10 = `${degree + 285}deg`;
        finalAngles.push((degree + 285) % 360);
        const dash11 = `${degree + 315}deg`;
        finalAngles.push((degree + 315) % 360);
        const dash12 = `${degree + 345}deg`;
        finalAngles.push((degree + 345) % 360);
        const spinAngle = `${degree}deg`;
        for (let i = 0; i < 12; i++) {
          if (finalAngles[i] > 300 && finalAngles[i] < 330) {
            const num = String(6);
            setTimeout(() => {
              // document.getElementById("offerMessage").innerHTML = "";
              // popups[num].props.data[i].discountCode;
            }, 3000);
            winningValue = i + 1;
          }
        }
        document.getElementById("dash-1").style.transform = `rotateZ(${dash1})`;
        document.getElementById("dash-2").style.transform = `rotateZ(${dash2})`;
        document.getElementById("dash-3").style.transform = `rotateZ(${dash3})`;
        document.getElementById("dash-4").style.transform = `rotateZ(${dash4})`;
        document.getElementById("dash-5").style.transform = `rotateZ(${dash5})`;
        document.getElementById("dash-6").style.transform = `rotateZ(${dash6})`;
        document.getElementById("dash-7").style.transform = `rotateZ(${dash7})`;
        document.getElementById("dash-8").style.transform = `rotateZ(${dash8})`;
        document.getElementById("dash-9").style.transform = `rotateZ(${dash9})`;
        document.getElementById("dash-10").style.transform = `rotateZ(${dash10})`;
        document.getElementById("dash-11").style.transform = `rotateZ(${dash11})`;
        document.getElementById("dash-12").style.transform = `rotateZ(${dash12})`;
        document.getElementById(
          "dash-act"
        ).style.transform = `rotateZ(${spinAngle})`;
        document.getElementById(
          "wheelLogo"
        ).style.transform = `rotateZ(${spinAngle})`;
        if (isLogsEnabled) console.log("SPINNING THE WHEEL");
      }
  
      function wheelLoad(popups, id) {
        const { length } = popups[id].data;
        let dataIndex = 0;
        for (let i = 0; i < 12; i++) {
          if (dataIndex === length) {
            dataIndex = 0;
          }
  
          const div = document.createElement("div");
          div.className = `dash dash${i + 1}`;
          const currentDiv = `dash-${i + 1}`;
          div.id = currentDiv;
          document.getElementById("wheelContainer").appendChild(div);
          document.getElementById(currentDiv).style.fontFamily =
            popups[id].open.props.offerFont;
          if (popups[id].dashColorLight) {
            if ((i + 1) % 2 === 0) {
              document.getElementById(currentDiv).style.color =
                popups[id].dashColorLight;
            } else {
              document.getElementById(currentDiv).style.color =
                popups[id].dashColorDark;
            }
          }
          const innerDiv = document.createElement("div");
          innerDiv.innerHTML = `${popups[id].data[dataIndex].text}`;
          innerDiv.className = "dashInner";
          document.getElementById(currentDiv).appendChild(innerDiv);
          if (window.innerWidth < 767) {
            document.getElementById(currentDiv).style.top = "85%";
            document.getElementById(currentDiv).style.left = "12.5vh";
          } else {
            document.getElementById(currentDiv).style.top = "80%";
            document.getElementById(currentDiv).style.left = "19vh";
          }
  
          dataIndex += 1;
        }
      }
  
      window.addEventListener("message", async (message) => {
        try {
          let res;
          if (message.detail && message.detail.EUCustomer) {
            res = JSON.parse(message.detail.data);
          } else if (message.detail && message.detail.isWA) {
            res = JSON.parse(message.detail.data);
            await axios.post("https://app.bitespeed.co/fbWebhook", {
              object: "page",
              channel: "WA",
              entry: [
                {
                  id: globalWAPageId,
                  time: new Date().getTime(),
                  messaging: [
                    {
                      recipient: {
                        id: globalWAPageId,
                      },
                      timestamp: new Date().getTime(),
                      sender: {
                        id: message.detail.phoneNo,
                      },
                      optin: {
                        ref: res.join("."),
                      },
                    },
                  ],
                },
              ],
            });
            let queryRes = await axios({
              method: "post",
              url: `https://9pkplnrgv3.execute-api.us-east-1.amazonaws.com/prod/conversionAndImpressionHandler?id=${res[0]}&field=conversions`,
            })
            if (queryRes.status != 200) {
            //   console.log("queryRes.status", queryRes)
              throw queryRes.data; // throws the error message
            }
            if (isLogsEnabled) console.log(queryRes.data);
          } else {
            // console.log("message","data", message.data);
            res = JSON.parse(JSON.stringify(message.data));
          }
  
          // make phone no container transparent
          try {
            // let intlPhoneNoContainer = $(`.${res[1]}`).find("#intlPhoneNoContainer");
            // console.log(document)
            let intlPhoneNoContainer = document
              .querySelector(`.${res[1]}`)
              .querySelector("#intlPhoneNoContainer");
            // intlPhoneNoContainer && intlPhoneNoContainer.css({
            //     opacity: 0
            // });
            if (intlPhoneNoContainer) intlPhoneNoContainer.style.opacity = "0";
          } catch (e) {
            // console.log("BEST," ,e)
          }
  
          if (res[0] && globalPopups[res[0]] && res[1] != "customerChatWidget") {
            // console.log("ATLEAST HERE")
            var CookieDate = new Date();
            CookieDate.setFullYear(CookieDate.getFullYear() + 1);
            if (message.detail && message.detail.isWA) {
            //   console.log("MAYBE HERE")
              document.cookie =
                "bitespeedOptedInWA=true" +
                ";expires=" +
                CookieDate.toUTCString() +
                ";domain=" +
                shopDomainStripped +
                ";path=/";
  
              if (isLogsEnabled) console.log("COOKIE SET");
            } else {
            //   console.log("WAS HERE AT document.cookie = bitespeedOptedIn=true")
              document.cookie =
                "bitespeedOptedIn=true" +
                ";expires=" +
                CookieDate.toUTCString() +
                ";domain=" +
                shopDomainStripped +
                ";path=/";
            }
            if (
              res[1] == "masterContainerImageAtTopPhill" ||
              res[1] == "masterContainerImageBehindPhill"
            ) {
              noRepeat = noRepeat + "+" + res[0];
              setCookie("displayedPopups", noRepeat);
            }
            if (res[1] == "spinTheWheelContainer") {
              let tempTitle = globalPopups[res[0]].completed.props.title.text;
              if (tempTitle.indexOf("{OFFER WON}") !== -1) {
                setTimeout(() => {
                  let completedTitle =
                    tempTitle.substr(0, tempTitle.indexOf("{OFFER WON}")) +
                    discountText +
                    tempTitle.substr(tempTitle.indexOf("{OFFER WON}") + 11);
                  // $(`#${res[1]}title`).html(completedTitle);
                  document.getElementById(`${res[1]}title`).innerHTML =
                    completedTitle;
                  // $(`#${res[1]}title`).css({
                  //   color: globalPopups[res[0]].completed.props.title.color,
                  //   "font-family":
                  //     globalPopups[res[0]].completed.props.title.fontFamily,
                  // });
                  document.getElementById(`${res[1]}title`).style.color =
                    globalPopups[res[0]].completed.props.title.color;
                  document.getElementById(`${res[1]}title`).style["font-family"] =
                    globalPopups[res[0]].completed.props.title.fontFamily;
                }, 3000);
              } else {
                // $(`#${res[1]}title`).html(
                //   globalPopups[res[0]].completed.props.title.text
                // );
                document.getElementById(`${res[1]}title`).innerHTML =
                  globalPopups[res[0]].completed.props.title.text;
                // $(`#${res[1]}title`).css({
                //   color: globalPopups[res[0]].completed.props.title.color,
                //   "font-family": globalPopups[res[0]].completed.props.title.fontFamily,
                // });
                document.getElementById(`${res[1]}title`).style.color =
                  globalPopups[res[0]].completed.props.title.color;
                document.getElementById(`${res[1]}title`).style["font-family"] =
                  globalPopups[res[0]].completed.props.title.fontFamily;
              }
  
              setTimeout(() => {
                // $(`#${res[1]}text`).html(discountText + "-" + discountCode);
                // $(`#${res[1]}text`).html("Discount Code - " + discountCode);
                document.getElementById(`${res[1]}text`).innerHTML =
                  "Discount Code - " + discountCode;
              }, 3000);
              // $(`#${res[1]}text`).css({
              //   color: globalPopups[res[0]].completed.props.text.color,
              //   "font-family": globalPopups[res[0]].completed.props.text.fontFamily,
              // });
              document.getElementById(`${res[1]}text`).style.color =
                globalPopups[res[0]].completed.props.text.color;
              document.getElementById(`${res[1]}text`).style["font-family"] =
                globalPopups[res[0]].completed.props.text.fontFamily;
              // $(`#${res[1]}wheelLogo`).attr(
              //   "src",
              //   globalPopups[res[0]].completed.props.wheelLogoUrl
              // );
              document.getElementById(`${res[1]}wheelLogo`).src =
                globalPopups[res[0]].completed.props.wheelLogoUrl;
              // $(`#${res[1]}heroLogo`).attr(
              //   "src",
              //   globalPopups[res[0]].completed.props.heroLogo
              // );
              if (document.getElementById(`${res[1]}heroLogo`))
                document.getElementById(`${res[1]}heroLogo`).src =
                  globalPopups[res[0]].completed.props.heroLogo;
              spin(globalDegree);
            } else {
              // $(`#${res[1]}title`).html(
              //   globalPopups[res[0]].completed.props.title.text
              // );
              document.getElementById(`${res[1]}title`).innerHTML =
                globalPopups[res[0]].completed.props.title.text;
              // $(`#${res[1]}title`).css({
              //   color: globalPopups[res[0]].completed.props.title.color,
              //   "font-family": globalPopups[res[0]].completed.props.title.fontFamily,
              // });
              document.getElementById(`${res[1]}text`).style.color =
                globalPopups[res[0]].completed.props.title.color;
              document.getElementById(`${res[1]}text`).style["font-family"] =
                globalPopups[res[0]].completed.props.title.fontFamily;
              if (globalPopups[res[0]].discountOption == "Yes") {
                // $(`#${res[1]}subtitle`).html(
                //   globalPopups[res[0]].generalSettings.discountCode
                // );
                document.getElementById(`${res[1]}subtitle`).innerHTML =
                  globalPopups[res[0]].generalSettings.discountCode;
                // $(`#${res[1]}subtitle`).css({
                //   "font-size":
                //     globalPopups[res[0]].completed.props.subtitle.fontSize + "vh",
                // });
                document.getElementById(`${res[1]}subtitle`).style["font-size"] =
                  globalPopups[res[0]].completed.props.subtitle.fontSize + "vh";
              } else {
                // $(`#${res[1]}subtitle`).html(
                //   globalPopups[res[0]].completed.props.subtitle.text
                // );
                document.getElementById(`${res[1]}subtitle`).innerHTML =
                  globalPopups[res[0]].completed.props.subtitle.text;
              }
              // $(`#${res[1]}subtitle`).css({
              //   color: globalPopups[res[0]].completed.props.subtitle.color,
              //   "font-family":
              //     globalPopups[res[0]].completed.props.subtitle.fontFamily,
              // });
              document.getElementById(`${res[1]}subtitle`).style.color =
                globalPopups[res[0]].completed.props.subtitle.color;
              document.getElementById(`${res[1]}subtitle`).style["font-family"] =
                globalPopups[res[0]].completed.props.subtitle.fontFamily;
  
              // $(`#${res[1]}text`).html(globalPopups[res[0]].completed.props.text.text);
              document.getElementById(`${res[1]}text`).innerHTML =
                globalPopups[res[0]].completed.props.text.text;
              // $(`#${res[1]}text`).css({
              //   color: globalPopups[res[0]].completed.props.text.color,
              //   "font-family": globalPopups[res[0]].completed.props.text.fontFamily,
              //   "font-size": globalPopups[res[0]].completed.props.text.fontSize + "vh",
              // });
              document.getElementById(`${res[1]}text`).style.color =
                globalPopups[res[0]].completed.props.text.color;
              document.getElementById(`${res[1]}text`).style["font-family"] =
                globalPopups[res[0]].completed.props.text.fontFamily;
              document.getElementById(`${res[1]}text`).style["font-size"] =
                globalPopups[res[0]].completed.props.text.fontSize + "vh";
  
              // $(`#${res[1]}mainImage`).css({
              //   "background-image": `url(${globalPopups[res[0]].completed.props.imageUrl
              //     })`,
              // });
              if (document.getElementById(`${res[1]}mainImage`))
                document.getElementById(`${res[1]}mainImage`).style[
                  "background-image"
                ] = `url(${globalPopups[res[0]].completed.props.imageUrl})`;
              // $(`#${res[1]}popupDiv`).css({
              //   "background-image": `url(${globalPopups[res[0]].completed.props.imageUrl
              //     })`,
              // });
              if (document.getElementById(`${res[1]}popupDiv`))
                document.getElementById(`${res[1]}popupDiv`).style[
                  "background-image"
                ] = `url(${globalPopups[res[0]].completed.props.imageUrl})`;
  
              if (res[1] == "masterContainerImageBehindPhill") {
                // $("#popupImageAtPillClick").css({
                //   "background-image": `url(${globalPopups[res[0]].completed.props.imageUrl
                //     })`,
                // });
                if (document.getElementById("popupImageAtPillClick"))
                  document.getElementById("popupImageAtPillClick").style[
                    "background-image"
                  ] = `url(${globalPopups[res[0]].completed.props.imageUr})`;
              }
              // $(`#${res[1]}textContainer`).css({
              //   "background-color":
              //     globalPopups[res[0]].completed.props.content.backgroundColor,
              // });
              if (document.getElementById(`${res[1]}textContainer`))
                document.getElementById(`${res[1]}textContainer`).style[
                  "background-image"
                ] = globalPopups[res[0]].completed.props.content.backgroundColor;
            }
            // TODO: shift conversionFBStatus call
            // try {
            //   await axios({
            //     method: 'post',
            //     url: 'https://app.bitespeed.co/redis/conversionFBStatus',
            //     data: {fbLoggedInStatus: fbLoggedInStatus},
            //     headers: {'Access-Control-Allow-Origin': '*'}
            //   });
            // } catch (err) {
            //   if(isLogsEnabled) console.log("Error sending conversion FB status");
            // }
          }
        } catch (err) {
          // error
          if (isLogsEnabled) console.log("Error occured", err);
        }
      });
    };
    const FacebookFunc = async () => {
      console.log("FACEBOOK RAN")
      var noRepeat = "",
        indexOfwww = location.hostname.indexOf("www"),
        fbLoggedInStatus = "unknown",
        shopDomainStripped =
          -1 === indexOfwww
            ? "." + location.hostname
            : location.hostname.substr(indexOfwww + 3);
  
      function create_UUID() {
        var e = new Date().getTime();
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
          /[xy]/g,
          function (t) {
            var o = (e + 16 * Math.random()) % 16 | 0;
            return (
              (e = Math.floor(e / 16)), ("x" == t ? o : (3 & o) | 8).toString(16)
            );
          }
        );
      }
      let globalPopup, globalWAPageId;
      !(function () {
        try {
          function e(e, t, o = !0, i = !1, r = "") {
            const a = document.createElement("script");
            (a.type = "text/javascript"),
              (a.async = o),
              (a.defer = i),
              (a.id = r),
              a.readyState
                ? (a.onreadystatechange = function () {
                    ("loaded" != a.readyState && "complete" != a.readyState) ||
                      ((a.onreadystatechange = null), t());
                  })
                : (a.onload = function () {
                    t();
                  }),
              (a.src = e),
              document.getElementsByTagName("head")[0].appendChild(a);
          }
  
          function t() {
            // window.FB.getLoginStatus(function(e) {
            //     fbLoggedInStatus = "connected" === e.status || "not_authorized" === e.status
            // }.bind(this), !0)
          }
  
          function o(e) {
            e(() => {
              var e = getCookie("displayedPopups");
              if (e)
                try {
                  noRepeat = JSON.parse(e);
                } catch (t) {
                  noRepeat = e;
                }
            appendCSS(), renderPopups();
            });
          }
          (statusChangeCallback = async (e) => {
            fbLoggedInStatus =
              "connected" === e.status || "not_authorized" === e.status;
          }),
            "undefined" == typeof jQuery || parseFloat(jQuery.fn.jquery) < 1.7
              ? (console.log(''),
                e(
                  // "https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js",
                  () => {
                    var i = jQuery.noConflict(!0);
                    "undefined" == typeof FB
                      ? e(
                          "https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js",
                          () => {
                              (window.fbAsyncInit = function () {
                                  FB.init({
                                    appId: "2616438408370023",
                                    autoLogAppEvents: !0,
                                    status: !0,
                                    cookie: !0,
                                    xfbml: !0,
                                    version: "v4.0",
                                  });
                              }),
                              window.FB.Event.subscribe(
                                "auth.authResponseChange",
                                statusChangeCallback
                              ),
                              t(),
                              o(i);
                          },
                          !0,
                          !0,
                          "facebook-jssdk"
                        )
                      : (console.log(""),
                        (window.fbAsyncInit = function () {
                        //   console.log("FB INIT CALLED", typeof FB, "typeof FB"),
                            FB.init({
                              appId: "2616438408370023",
                              autoLogAppEvents: !0,
                              status: !0,
                              cookie: !0,
                              xfbml: !0,
                              version: "v4.0",
                            });
                        }),
                        (function (e, t, o) {
                          var i,
                            r = e.getElementsByTagName(t)[0];
                          e.getElementById(o) ||
                            (((i = e.createElement(t)).id = o),
                            (i.src =
                              "https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js"),
                            r.parentNode.insertBefore(i, r));
                        })(document, "script", "facebook-jssdk"),
                        window.FB.Event.subscribe(
                          "auth.authResponseChange",
                          statusChangeCallback
                        ),
                        t(),
                        o(i));
                  }
                ),
                e(
                  "https://cdn.bitespeed.co/whatsapp-snippets/intlTelInput.min.js",
                  () => {
                    // console.log("intlTell loaded!!!!");
                  }
                ),
                e("https://cdn.bitespeed.co/whatsapp-snippets/utils.js", () => {
                //   console.log("util.js loaded");
                }))
              : (console.log(""),
                "undefined" == typeof FB
                  ? (console.log(""),
                    e(
                      "https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js",
                      () => {
                        // console.log("FB INIT, below else"),
                          (window.fbAsyncInit = function () {
                            FB.init({
                              appId: "2616438408370023",
                              autoLogAppEvents: !0,
                              xfbml: !0,
                              status: !0,
                              cookie: !0,
                              version: "v4.0",
                            });
                          }),
                          //  window.FB.Event.subscribe("auth.authResponseChange", statusChangeCallback),
                          t(),
                          o(jQuery);
                      },
                      !0,
                      !0,
                      "facebook-jssdk"
                    ))
                  : (console.log(""),
                    $(document).ready(function () {
                      function e() {
                        var e, i, r, a, l;
                        FB.init({
                          appId: "2616438408370023",
                          status: !0,
                          cookie: !0,
                          xfbml: !0,
                          version: "v4.0",
                        }),
                          (e = document),
                          (i = "script"),
                          (r = "facebook-jssdk"),
                          (l = e.getElementsByTagName(i)[0]),
                          e.getElementById(r) ||
                            (((a = e.createElement(i)).id = r),
                            (a.src =
                              "https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js"),
                            l.parentNode.insertBefore(a, l)),
                          window.FB.Event.subscribe(
                            "auth.authResponseChange",
                            statusChangeCallback
                          ),
                          t(),
                          o(jQuery);
                      }
                      console.log(""),
                        window.FB ? e() : (window.fbAsyncInit = e);
                    })),
                e(
                  "https://cdn.bitespeed.co/whatsapp-snippets/intlTelInput.min.js",
                  () => {
                    console.log("");
                  }
                ),
                e("https://cdn.bitespeed.co/whatsapp-snippets/utils.js", () => {
                  console.log("");
                }));
        } catch (e) {
        //   console.log("ERROR"), console.log(e);
        }
      })();
      const closedPopups = [];
      let spaceReplacedDiscountCode,
        discountCode,
        discountText,
        globalDegree,
        globalPageId,
        globalPhoneNo,
        globalPhoneNoObjs = {},
        EUCustomer = !1;
  
      function setCookie(e, t) {
        document.cookie =
          e + "=" + t + ";domain=" + shopDomainStripped + "; path=/";
      }
  
      function setCookieWithExpiry(e, t, o) {
        let i = new Date();
        i.setTime(i.getTime() + 24 * o * 60 * 60 * 1e3),
          (document.cookie = e + "=" + t + ";expires=" + i.toUTCString());
      }
  
      function getCookie(e) {
        const t = `; ${document.cookie}`.split(`; ${e}=`);
        if (2 == t.length) return t.pop().split(";").shift();
      }
  
      function makeid(e) {
        for (
          var t = [],
            o = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
            i = o.length,
            r = 0;
          r < e;
          r++
        )
          t.push(o.charAt(Math.floor(Math.random() * i)));
        return t.join("");
      }
  
      function createRef() {
        let e = create_UUID();
        return (
          (document.cookie =
            "refb=" +
            e +
            ";expires=" +
            new Date(new Date().setFullYear(new Date().getFullYear() + 10)) +
            ";domain=" +
            shopDomainStripped +
            "; path=/"),
          e
        );
      }
  
      function STMforEUhandler(e) {
        let t = JSON.stringify(e.split(".")),
          o = new CustomEvent("message", {
            detail: {
              EUCustomer: !0,
              data: t,
            },
          });
        window.dispatchEvent(o);
      }
  
      waHandler = (e, t, o = !1) => {
        if (o) {
          let e = encodeURIComponent(
            "https://" +
              window.location.hostname +
              window.location.pathname +
              "\n\n" +
              globalPopup[t].generalSettings.defaultText
          );
          "dogal-koy-sepetim.myshopify.com" == globalWAPageId &&
            (e = encodeURIComponent(
              "Ürünleriniz hakkında detaylı bilgi alabilir miyim ?"
            )),
            "2b-eco.myshopify.com" == globalWAPageId &&
              (e = encodeURIComponent("Pode me ajudar?")),
            "leginfi.myshopify.com" == globalWAPageId &&
              (e = encodeURIComponent(
                "Estoy interesado en este producto y tengo algunas preguntas. ¿Pueden ayudarme?"
              )),
            window.innerWidth < 768
              ? window.open(
                  "https://api.whatsapp.com/send?phone=" +
                    globalPopup[t].generalSettings.supportNumber.replace("-","") +
                    "&text=" +
                    e
                )
              : window.open(
                  "https://web.whatsapp.com/send?phone=" +
                    globalPopup[t].generalSettings.supportNumber.replace("-","") +
                    "&text=" +
                    e
                );
        }
        let i = globalPhoneNoObjs[t].getNumber();
         (i = i.replace("+", ""));
        let r = JSON.stringify(e.split(".")),
          a = new CustomEvent("message", {
            detail: {
              isWA: !0,
              data: r,
              phoneNo: i,
            },
          });
        window.dispatchEvent(a);
      };
  
      showWAChatWidget = (e) => {
        if (globalPopup[e].generalSettings.collectPhone) {
          if ($("#wa-chat-bubble").length)
            return (
              $("#wa-chat-bubble").show(),
              $("#wa-chat-bubble").removeClass("bounceDown"),
              $("#wa-chat-bubble").addClass("bounceUp"),
              void $("#wa-chat-btn-root").hide()
            );
        } else {
          let t = encodeURIComponent(
            "https://" +
              window.location.hostname +
              window.location.pathname +
              "\n\nI'm interested in this product and I have a few questions. Can you help?"
          );
          "dogal-koy-sepetim.myshopify.com" == globalWAPageId &&
            (t = encodeURIComponent(
              "Ürünleriniz hakkında detaylı bilgi alabilir miyim ?"
            )),
            "2b-eco.myshopify.com" == globalWAPageId &&
              (t = encodeURIComponent("Pode me ajudar?")),
            "leginfi.myshopify.com" == globalWAPageId &&
              (t = encodeURIComponent(
                "Estoy interesado en este producto y tengo algunas preguntas. ¿Pueden ayudarme?"
              )),
            window.innerWidth < 768
              ? window.open(
                  "https://api.whatsapp.com/send?phone=" +
                    globalPopup[e].generalSettings.supportNumber.replace("-","") +
                    "&text=" +
                    t
                )
              : window.open(
                  "https://web.whatsapp.com/send?phone=" +
                    globalPopup[e].generalSettings.supportNumber.replace("-","") +
                    "&text=" +
                    t
                );
        }
      };
  
      hideWAChatWidget = () => {
        if ($("#wa-chat-btn-root").length)
          return (
            $("#wa-chat-btn-root").show(),
            $("#wa-chat-bubble").addClass("bounceDown"),
            $("#wa-chat-bubble").removeClass("bounceUp"),
            void $("#wa-chat-bubble").hide()
          );
      };
  
      function getHtml(e, t, o) {
        let i = getCookie("refb");
        (null !== i && "" !== i && void 0 !== i && "undefined" !== i) ||
          (i = createRef());
        const r = {
          pill: `<div class="permanentPill $$behaviour.where.desktop.position$$" id="permanentPill"\n       style="display:inline-block;background-color:$$collapsed.props.content.backgroundColor$$"> <a href="#"\n         class="cross" onclick="hidePopup('permanentPill')" style="color: $$collapsed.props.closeButtonColor$$"> <i class="fa fa-times" aria-hidden="true"></i> </a> <a href="#"\n         class="offer" onclick="setClass('$$behaviour.where.desktop.position$$', '${o}')">\n         <h3\n           style="font-family: $$collapsed.props.text.fontFamily$$;font-weight: $$collapsed.props.text.fontWeight$$;color: $$collapsed.props.text.color$$; text-align: center;">\n           $$collapsed.props.text.text$$ </h3>\n       </a> </div>`,
          pillPhone: `<div class="permanentPill $$behaviour.where.phone.position$$" id="permanentPill"\n       style="display:inline-block;background-color:$$collapsed.props.content.backgroundColor$$"> <a href="#"\n         class="cross" onclick="hidePopup('permanentPill')" style="color: $$collapsed.props.closeButtonColor$$"> <i class="fa fa-times" aria-hidden="true"></i> </a> <a href="#"\n         class="offer" onclick="setClass('$$behaviour.where.desktop.position$$', '${o}')">\n         <h3\n           style="font-family: $$collapsed.props.text.fontFamily$$;font-weight: $$collapsed.props.text.fontWeight$$;color: $$collapsed.props.text.color$$; text-align: center;">\n           $$collapsed.props.text.text$$ </h3>\n       </a> </div>`,
          modalImageAtTop:
            `<div class="masterContainerImageAtTop" id="visualPopupImageAtTop" style="display:none">        <div class="popup" id="popupImageAtTopDiv" style="display:flex">            <div class="bs_overlay">                <button class="closeButton" onclick="hidePopup('visualPopupImageAtTop')">                    <i class="fa fa-times closeIcon" style="color: $$${e}.props.closeButtonColor$$" aria-hidden="true"></i>` +
            '                </button>                <div class="contentContainer">                    <div class="mainImage" id="masterContainerImageAtTopmainImage" style="background-image:                        url(\'$$open.props.imageUrl$$\')"></div>' +
            `                    <div class="textContainer" id="masterContainerImageAtToptextContainer" style="background-color:$$${e}.props.content.backgroundColor$$">` +
            `                        <div class="title" id="masterContainerImageAtToptitle" style="color: $$${e}.props.title.color$$;font-family: $$${e}.props.title.fontFamily$$;font-size: $$${e}.props.title.fontSize$$vh">$$${e}.props.title.text$$</div>` +
            `                        <div class="subtitle" id="masterContainerImageAtTopsubtitle" style="color: $$${e}.props.subtitle.color$$;font-size: $$${e}.props.subtitle.fontSize$$vh;font-family: $$${e}.props.subtitle.fontFamily$$">$$${e}.props.subtitle.text$$</div>` +
            `                        <div class="bs_text" id="masterContainerImageAtToptext" style="color: $$${e}.props.text.color$$;font-size: $$${e}.props.text.fontSize$$vh !important;font-family: $$${e}.props.text.fontFamily$$">$$${e}.props.text.text$$` +
            "                        </div>" +
            `<iframe src="https://cdn.bitespeed.co/snippets/build/index.html?color=$$generalSettings.optinColor$$&ctaText=$$generalSettings.optinText.value$$&pageId=${globalPageId}&dataRef=${o}.masterContainerImageAtTop.${i}.$$generalSettings.discountCode$$.bitespeed" height="74px" scrolling="no" style="align-self:center;border:none;width:160px" width="160px"></iframe>` +
            "                    </div>                </div>            </div>        </div>    </div>",
          modalImageAtPillClick:
            `<div class="masterContainerImageAtTopPhill" id="pillPopup" style="display: none">        <div class="popup onPillClick" id="popupImageAtPillClick" style="display:flex">            <div class="bs_overlay">                <button class="closeButton" ">                    <i class="fa fa-times closeIcon" onclick="hidePopup('pillPopup')" style="color: $$${e}.props.closeButtonColor$$" aria-hidden="true"></i>` +
            '                </button>                <div class="contentContainer">                    <div class="mainImage" id="masterContainerImageAtTopPhillmainImage"style="background-image:' +
            `                        url('$$${e}.props.imageUrl$$')"></div>` +
            `                    <div class="textContainer" id="masterContainerImageAtTopPhilltextContainer" style="background-color:$$${e}.props.content.backgroundColor$$">` +
            `                        <div class="title" id="masterContainerImageAtTopPhilltitle" style="color: $$${e}.props.title.color$$;font-size: $$${e}.props.title.fontSize$$vh;font-family: $$${e}.props.title.fontFamily$$">$$${e}.props.title.text$$</div>` +
            `                        <div class="subtitle" id="masterContainerImageAtTopPhillsubtitle" style="color: $$${e}.props.subtitle.color$$;font-size: $$${e}.props.subtitle.fontSize$$vh;font-family: $$${e}.props.subtitle.fontFamily$$">$$${e}.props.subtitle.text$$</div>` +
            `                        <div class="bs_text" id="masterContainerImageAtTopPhilltext"style="color: $$${e}.props.text.color$$;font-size: $$${e}.props.text.fontSize$$vh !important;font-family: $$${e}.props.text.fontFamily$$">$$${e}.props.text.text$$` +
            "                        </div>" +
            `<iframe src="https://cdn.bitespeed.co/snippets/build/index.html?color=$$generalSettings.optinColor$$&ctaText=$$generalSettings.optinText.value$$&pageId=${globalPageId}&dataRef=${o}.masterContainerImageAtTopPhill.${i}.$$generalSettings.discountCode$$.bitespeed" height="74px" scrolling="no" style="align-self:center;border:none; margin-left:50%;margin-bottom:-8%;transform: translateX(-50%);width:160px" width="160px"></iframe>` +
            "                    </div>                </div>            </div>        </div>    </div>",
          modalImageAtPillClickBehind:
            `<div class="masterContainerImageBehindPhill" id="pillPopup" style="display: none" >        <div class="popup onPillClick" id="popupImageAtPillClickBehind" style="display:flex;background-image: url('$$${e}.props.imageUrl$$')">` +
            '            <div class="bs_overlay" style="background-color:\'transparent\'">' +
            `                <button class="closeButton" style="color: $$${e}.props.closeButtonColor$$" >` +
            '                    <i onclick="hidePopup(\'pillPopup\')" class="fa fa-times closeIcon" aria-hidden="true"></i>                </button>' +
            `                <div class="title" id="masterContainerImageBehindPhilltitle" style="color: $$${e}.props.title.color$$;font-size: $$${e}.props.title.fontSize$$vh;font-family: $$${e}.props.title.fontFamily$$">$$${e}.props.title.text$$</div>` +
            `                <div class="subtitle" id="masterContainerImageBehindPhillsubtitle" style="color: $$${e}.props.subtitle.color$$;font-size: $$${e}.props.subtitle.fontSize$$vh;font-family: $$${e}.props.subtitle.fontFamily$$">$$${e}.props.subtitle.text$$` +
            "                    </div>" +
            `                <div class="bs_text" class="masterContainerImageBehindPhilltext" style="color: $$${e}.props.text.color$$;font-size: $$${e}.props.text.fontSize$$vh !important;font-family: $$${e}.props.text.fontFamily$$">$$${e}.props.text.text$$` +
            "                    </div>" +
            `<iframe src="https://cdn.bitespeed.co/snippets/build/index.html?color=$$generalSettings.optinColor$$&ctaText=$$generalSettings.optinText.value$$&pageId=${globalPageId}&dataRef=${o}.masterContainerImageBehindPhill.${i}.$$generalSettings.discountCode$$.bitespeed" height="74px" scrolling="no" style="align-self:center;border:none; margin-left:50%;transform: translateX(-50%);width:160px" width="160px"></iframe>` +
            "                </div>            </div>        </div>    </div>",
          wheelio: `<div class="spinTheWheelContainer" $$backgroundStyle$$ id="wheelContainer"> <div> <div class="dash wheelImage" style="max-width: 200% !important;" id="dash-act"><svg preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="100%" height="100%" viewBox="0 0 1078.143 1077.914"> <defs> <filter id="borderCircle" x="49.538" y="48.975" width="980" height="980" filterUnits="userSpaceOnUse"> <feOffset input="SourceAlpha" /> <feGaussianBlur stdDeviation="10" result="blur" /> <feFlood flood-opacity="0.161" /> <feComposite operator="in" in2="blur" /> <feComposite in="SourceGraphic" /> </filter> <filter id="Dark" x="518.86" y="141.951" width="417.474" height="417.299" filterUnits="userSpaceOnUse"> <feOffset input="SourceAlpha" /> <feGaussianBlur stdDeviation="3" result="blur-2" /> <feFlood flood-opacity="0.161" /> <feComposite operator="in" in2="blur-2" /> <feComposite in="SourceGraphic" /> </filter> <filter id="Light" x="326.877" y="0" width="563.604" height="563.54" filterUnits="userSpaceOnUse"> <feOffset input="SourceAlpha" /> <feGaussianBlur stdDeviation="3" result="blur-3" /> <feFlood flood-opacity="0.161" /> <feComposite operator="in" in2="blur-3" /> <feComposite in="SourceGraphic" /> </filter> <filter id="Dark-2" x="189.117" y="0" width="563.604" height="563.54" filterUnits="userSpaceOnUse"> <feOffset input="SourceAlpha" /> <feGaussianBlur stdDeviation="3" result="blur-4" /> <feFlood flood-opacity="0.161" /> <feComposite operator="in" in2="blur-4" /> <feComposite in="SourceGraphic" /> </filter> <filter id="Light-2" x="141.81" y="141.951" width="417.474" height="417.299" filterUnits="userSpaceOnUse"> <feOffset input="SourceAlpha" /> <feGaussianBlur stdDeviation="3" result="blur-5" /> <feFlood flood-opacity="0.161" /> <feComposite operator="in" in2="blur-5" /> <feComposite in="SourceGraphic" /> </filter> <filter id="Dark-3" x="0" y="187.245" width="563.604" height="563.54" filterUnits="userSpaceOnUse"> <feOffset input="SourceAlpha" /> <feGaussianBlur stdDeviation="3" result="blur-6" /> <feFlood flood-opacity="0.161" /> <feComposite operator="in" in2="blur-6" /> <feComposite in="SourceGraphic" /> </filter> <filter id="Light-3" x="0" y="325.679" width="563.604" height="563.54" filterUnits="userSpaceOnUse"> <feOffset input="SourceAlpha" /> <feGaussianBlur stdDeviation="3" result="blur-7" /> <feFlood flood-opacity="0.161" /> <feComposite operator="in" in2="blur-7" /> <feComposite in="SourceGraphic" /> </filter> <filter id="Dark-4" x="141.81" y="518.664" width="417.474" height="417.299" filterUnits="userSpaceOnUse"> <feOffset input="SourceAlpha" /> <feGaussianBlur stdDeviation="3" result="blur-8" /> <feFlood flood-opacity="0.161" /> <feComposite operator="in" in2="blur-8" /> <feComposite in="SourceGraphic" /> </filter> <filter id="Light-4" x="189.117" y="514.374" width="563.604" height="563.54" filterUnits="userSpaceOnUse"> <feOffset input="SourceAlpha" /> <feGaussianBlur stdDeviation="3" result="blur-9" /> <feFlood flood-opacity="0.161" /> <feComposite operator="in" in2="blur-9" /> <feComposite in="SourceGraphic" /> </filter> <filter id="Dark-5" x="326.878" y="514.374" width="563.604" height="563.54" filterUnits="userSpaceOnUse"> <feOffset input="SourceAlpha" /> <feGaussianBlur stdDeviation="3" result="blur-10" /> <feFlood flood-opacity="0.161" /> <feComposite operator="in" in2="blur-10" /> <feComposite in="SourceGraphic" /> </filter> <filter id="Light-5" x="518.86" y="518.664" width="417.474" height="417.299" filterUnits="userSpaceOnUse"> <feOffset input="SourceAlpha" /> <feGaussianBlur stdDeviation="3" result="blur-11" /> <feFlood flood-opacity="0.161" /> <feComposite operator="in" in2="blur-11" /> <feComposite in="SourceGraphic" /> </filter> <filter id="Dark-6" x="514.539" y="325.679" width="563.604" height="563.54" filterUnits="userSpaceOnUse"> <feOffset input="SourceAlpha" /> <feGaussianBlur stdDeviation="3" result="blur-12" /> <feFlood flood-opacity="0.161" /> <feComposite operator="in" in2="blur-12" /> <feComposite in="SourceGraphic" /> </filter> <filter id="Light-6" x="514.54" y="187.245" width="563.604" height="563.54" filterUnits="userSpaceOnUse"> <feOffset input="SourceAlpha" /> <feGaussianBlur stdDeviation="3" result="blur-13" /> <feFlood flood-opacity="0.161" /> <feComposite operator="in" in2="blur-13" /> <feComposite in="SourceGraphic" /> </filter> <filter id="centerWheel" x="400.66" y="399.755" width="277.72" height="277.72" filterUnits="userSpaceOnUse"> <feOffset input="SourceAlpha" /> <feGaussianBlur stdDeviation="7.5" result="blur-14" /> <feFlood flood-opacity="0.161" /> <feComposite operator="in" in2="blur-14" /> <feComposite in="SourceGraphic" /> </filter> </defs> <g id="Spin_Wheel" data-name="Spin Wheel" transform="translate(-1143.372 -164.599)"> <g transform="matrix(1, 0, 0, 1, 1143.37, 164.6)" filter="url(#borderCircle)"> <path id="borderCircle-2" data-name="borderCircle" d="M460,0C714.051,0,920,205.949,920,460S714.051,920,460,920,0,714.051,0,460,205.949,0,460,0Z" transform="translate(999.54 998.97) rotate(180)" fill="$$wheelColorDark$$" /> </g> <g transform="matrix(1, 0, 0, 1, 1143.37, 164.6)" filter="url(#Dark)"> <path id="Dark-7" data-name="Dark" d="M1707.936,759.976c-71.13-119.83-160.354-162.393-160.354-162.393l-222.623,383.15Z" transform="translate(-786.11 -441.43)" fill="$$wheelColorDark$$" stroke="#fff" stroke-linecap="round" stroke-width="8" /> </g> <g transform="matrix(1, 0, 0, 1, 1143.37, 164.6)" filter="url(#Light)"> <path id="Light-7" data-name="Light" d="M382.977,162.393C311.846,42.563,222.623,0,222.623,0L0,383.15Z" transform="translate(347.99 207.74) rotate(-30)" fill="$$wheelColorLight$$" stroke="#fff" stroke-linecap="round" stroke-width="8" /> </g> <g transform="matrix(1, 0, 0, 1, 1143.37, 164.6)" filter="url(#Dark-2)"> <path id="Dark-8" data-name="Dark" d="M382.976,220.757C311.846,340.586,222.623,383.15,222.623,383.15L0,0Z" transform="translate(540.03 539.56) rotate(-150)" fill="$$wheelColorDark$$" stroke="#fff" stroke-linecap="round" stroke-width="8" /> </g> <g transform="matrix(1, 0, 0, 1, 1143.37, 164.6)" filter="url(#Light-2)"> <path id="Light-8" data-name="Light" d="M382.977,220.757C311.846,340.587,222.623,383.15,222.623,383.15L0,0Z" transform="translate(539.29 539.3) rotate(-180)" fill="$$wheelColorLight$$" stroke="#fff" stroke-linecap="round" stroke-width="8" /> </g> <g transform="matrix(1, 0, 0, 1, 1143.37, 164.6)" filter="url(#Dark-3)"> <path id="Dark-9" data-name="Dark" d="M382.977,220.757C311.846,340.586,222.623,383.15,222.623,383.15L0,0Z" transform="translate(539.61 538.06) rotate(150)" fill="$$wheelColorDark$$" stroke="#fff" stroke-linecap="round" stroke-width="8" /> </g> <g transform="matrix(1, 0, 0, 1, 1143.37, 164.6)" filter="url(#Light-3)"> <path id="Light-9" data-name="Light" d="M382.977,162.393C311.846,42.563,222.623,0,222.623,0L0,383.15Z" transform="translate(348.04 870.22) rotate(-150)" fill="$$wheelColorLight$$" stroke="#fff" stroke-linecap="round" stroke-width="8" /> </g> <g transform="matrix(1, 0, 0, 1, 1143.37, 164.6)" filter="url(#Dark-4)"> <path id="Dark-10" data-name="Dark" d="M382.977,162.393C311.846,42.563,222.623,0,222.623,0L0,383.15Z" transform="translate(539.29 921.77) rotate(-180)" fill="$$wheelColorDark$$" stroke="#fff" stroke-linecap="round" stroke-width="8" /> </g> <g transform="matrix(1, 0, 0, 1, 1143.37, 164.6)" filter="url(#Light-4)"> <path id="Light-10" data-name="Light" d="M382.977,162.393C311.846,42.563,222.623,0,222.623,0L0,383.15Z" transform="translate(731.6 870.17) rotate(150)" fill="$$wheelColorLight$$" stroke="#fff" stroke-linecap="round" stroke-width="8" /> </g> <g transform="matrix(1, 0, 0, 1, 1143.37, 164.6)" filter="url(#Dark-5)"> <path id="Dark-11" data-name="Dark" d="M382.977,220.757C311.846,340.587,222.623,383.15,222.623,383.15L0,0Z" transform="translate(539.57 538.35) rotate(30)" fill="$$wheelColorDark$$" stroke="#fff" stroke-linecap="round" stroke-width="8" /> </g> <g transform="matrix(1, 0, 0, 1, 1143.37, 164.6)" filter="url(#Light-5)"> <path id="Light-11" data-name="Light" d="M382.977,220.757C311.846,340.587,222.623,383.15,222.623,383.15L0,0Z" transform="translate(538.85 538.62)" fill="$$wheelColorLight$$" stroke="#fff" stroke-linecap="round" stroke-width="8" /> </g> <g transform="matrix(1, 0, 0, 1, 1143.37, 164.6)" filter="url(#Dark-6)"> <path id="Dark-12" data-name="Dark" d="M382.977,220.757C311.846,340.587,222.623,383.15,222.623,383.15L0,0Z" transform="translate(538.53 538.41) rotate(-30)" fill="$$wheelColorDark$$" stroke="#fff" stroke-linecap="round" stroke-width="8" /> </g> <g transform="matrix(1, 0, 0, 1, 1143.37, 164.6)" filter="url(#Light-6)"> <path id="Light-12" data-name="Light" d="M382.977,162.393C311.846,42.563,222.623,0,222.623,0L0,383.15Z" transform="translate(730.11 206.24) rotate(30)" fill="$$wheelColorLight$$" stroke="#fff" stroke-linecap="round" stroke-width="8" /> </g> <g transform="matrix(1, 0, 0, 1, 1143.37, 164.6)" filter="url(#centerWheel)"> <path id="centerWheel-2" data-name="centerWheel" d="M116.36,0A116.36,116.36,0,1,1,0,116.36,116.36,116.36,0,0,1,116.36,0Z" transform="translate(655.88 654.97) rotate(180)" fill="#fff" /> </g> </g> </svg> </div><div class="marker"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink1078.143 1077.914"> <defs> <filter id="borderCircle" x="49.538" y="48.975" width="980" height="980" filterUnits="userSpaceOnUse"> <feOffset input="SourceAlpha" /> <feGaussianBlur stdDeviation="10" result="blur" /> <feFlood flood-opacity="0.161" /> <feComposite operator="in" in2="blur" /> <feComposite in="SourceGraphic" /> </filter> <filter id="Dark" x="518.86" y="141.951" width="417.474" height="417.299" filterUnits="userSpaceOnUse"> <feOffset input="SourceAlpha" /> <feGaussianBlur stdDeviation="3" result="blur-2" /> <feFlood flood-opacity="0.161" /> <feComposite operator="in" in2="blur-2" /> <feComposite in="SourceGraphic" /> </filter> <filter id="Light" x="326.877" y="0" width="563.604" height="563.54" filterUnits="userSpaceOnUse"> <feOffset input="SourceAlpha" /> <feGaussianBlur stdDeviation="3" result="blur-3" /> <feFlood flood-opacity="0.161" /> <feComposite operator="in" in2="blur-3" /> <feComposite in="SourceGraphic" /> </filter> <filter id="Dark-2" x="189.117" y="0" width="563.604" height="563.54" filterUnits="userSpaceOnUse"> <feOffset input="SourceAlpha" /> <feGaussianBlur stdDeviation="3" result="blur-4" /> <feFlood flood-opacity="0.161" /> <feComposite operator="in" in2="blur-4" /> <feComposite in="SourceGraphic" /> </filter> <filter id="Light-2" x="141.81" y="141.951" width="417.474" height="417.299" filterUnits="userSpaceOnUse"> <feOffset input="SourceAlpha" /> <feGaussianBlur stdDeviation="3" result="blur-5" /> <feFlood flood-opacity="0.161" /> <feComposite operator="in" in2="blur-5" /> <feComposite in="SourceGraphic" /> </filter> <filter id="Dark-3" x="0" y="187.245" width="563.604" height="563.54" filterUnits="userSpaceOnUse"> <feOffset input="SourceAlpha" /> <feGaussianBlur stdDeviation="3" result="blur-6" /> <feFlood flood-opacity="0.161" /> <feComposite operator="in" in2="blur-6" /> <feComposite in="SourceGraphic" /> </filter> <filter id="Light-3" x="0" y="325.679" width="563.604" height="563.54" filterUnits="userSpaceOnUse"> <feOffset input="SourceAlpha" /> <feGaussianBlur stdDeviation="3" result="blur-7" /> <feFlood flood-opacity="0.161" /> <feComposite operator="in" in2="blur-7" /> <feComposite in="SourceGraphic" /> </filter> <filter id="Dark-4" x="141.81" y="518.664" width="417.474" height="417.299" filterUnits="userSpaceOnUse"> <feOffset input="SourceAlpha" /> <feGaussianBlur stdDeviation="3" result="blur-8" /> <feFlood flood-opacity="0.161" /> <feComposite operator="in" in2="blur-8" /> <feComposite in="SourceGraphic" /> </filter> <filter id="Light-4" x="189.117" y="514.374" width="563.604" height="563.54" filterUnits="userSpaceOnUse"> <feOffset input="SourceAlpha" /> <feGaussianBlur stdDeviation="3" result="blur-9" /> <feFlood flood-opacity="0.161" /> <feComposite operator="in" in2="blur-9" /> <feComposite in="SourceGraphic" /> </filter> <filter id="Dark-5" x="326.878" y="514.374" width="563.604" height="563.54" filterUnits="userSpaceOnUse"> <feOffset input="SourceAlpha" /> <feGaussianBlur stdDeviation="3" result="blur-10" /> <feFlood flood-opacity="0.161" /> <feComposite operator="in" in2="blur-10" /> <feComposite in="SourceGraphic" /> </filter> <filter id="Light-5" x="518.86" y="518.664" width="417.474" height="417.299" filterUnits="userSpaceOnUse"> <feOffset input="SourceAlpha" /> <feGaussianBlur stdDeviation="3" result="blur-11" /> <feFlood flood-opacity="0.161" /> <feComposite operator="in" in2="blur-11" /> <feComposite in="SourceGraphic" /> </filter> <filter id="Dark-6" x="514.539" y="325.679" width="563.604" height="563.54" filterUnits="userSpaceOnUse"> <feOffset input="SourceAlpha" /> <feGaussianBlur stdDeviation="3" result="blur-12" /> <feFlood flood-opacity="0.161" /> <feComposite operator="in" in2="blur-12" /> <feComposite in="SourceGraphic" /> </filter> <filter id="Light-6" x="514.54" y="187.245" width="563.604" height="563.54" filterUnits="userSpaceOnUse"> <feOffset input="SourceAlpha" /> <feGaussianBlur stdDeviation="3" result="blur-13" /> <feFlood flood-opacity="0.161" /> <feComposite operator="in" in2="blur-13" /> <feComposite in="SourceGraphic" /> </filter> <filter id="centerWheel" x="400.66" y="399.755" width="277.72" height="277.72" filterUnits="userSpaceOnUse"> <feOffset input="SourceAlpha" /> <feGaussianBlur stdDeviation="7.5" result="blur-14" /> <feFlood flood-opacity="0.161" /> <feComposite operator="in" in2="blur-14" /> <feComposite in="SourceGraphic" /> </filter> </defs> <g id="Spin_Wheel" data-name="Spin Wheel" transform="translate(-1143.372 -164.599)"> <g transform="matrix(1, 0, 0, 1, 1143.37, 164.6)" filter="url(#borderCircle)"> <path id="borderCircle-2" data-name="borderCircle" d="M460,0C714.051,0,920,205.949,920,460S714.051,920,460,920,0,714.051,0,460,205.949,0,460,0Z" transform="translate(999.54 998.97) rotate(180)" fill="$$wheelColorDark$$" /> </g> <g transform="matrix(1, 0, 0, 1, 1143.37, 164.6)" filter="url(#Dark)"> <path id="Dark-7" data-name="Dark" d="M1707.936,759.976c-71.13-119.83-160.354-162.393-160.354-162.393l-222.623,383.15Z" transform="translate(-786.11 -441.43)" fill="$$wheelColorDark$$" stroke="#fff" stroke-linecap="round" stroke-width="8" /> </g> <g transform="matrix(1, 0, 0, 1, 1143.37, 164.6)" filter="url(#Light)"> <path id="Light-7" data-name="Light" d="M382.977,162.393C311.846,42.563,222.623,0,222.623,0L0,383.15Z" transform="translate(347.99 207.74) rotate(-30)" fill="$$wheelColorLight$$" stroke="#fff" stroke-linecap="round" stroke-width="8" /> </g> <g transform="matrix(1, 0, 0, 1, 1143.37, 164.6)" filter="url(#Dark-2)"> <path id="Dark-8" data-name="Dark" d="M382.976,220.757C311.846,340.586,222.623,383.15,222.623,383.15L0,0Z" transform="translate(540.03 539.56) rotate(-150)" fill="$$wheelColorDark$$" stroke="#fff" stroke-linecap="round" stroke-width="8" /> </g> <g transform="matrix(1, 0, 0, 1, 1143.37, 164.6)" filter="url(#Light-2)"> <path id="Light-8" data-name="Light" d="M382.977,220.757C311.846,340.587,222.623,383.15,222.623,383.15L0,0Z" transform="translate(539.29 539.3) rotate(-180)" fill="$$wheelColorLight$$" stroke="#fff" stroke-linecap="round" stroke-width="8" /> </g> <g transform="matrix(1, 0, 0, 1, 1143.37, 164.6)" filter="url(#Dark-3)"> <path id="Dark-9" data-name="Dark" d="M382.977,220.757C311.846,340.586,222.623,383.15,222.623,383.15L0,0Z" transform="translate(539.61 538.06) rotate(150)" fill="$$wheelColorDark$$" stroke="#fff" stroke-linecap="round" stroke-width="8" /> </g> <g transform="matrix(1, 0, 0, 1, 1143.37, 164.6)" filter="url(#Light-3)"> <path id="Light-9" data-name="Light" d="M382.977,162.393C311.846,42.563,222.623,0,222.623,0L0,383.15Z" transform="translate(348.04 870.22) rotate(-150)" fill="$$wheelColorLight$$" stroke="#fff" stroke-linecap="round" stroke-width="8" /> </g> <g transform="matrix(1, 0, 0, 1, 1143.37, 164.6)" filter="url(#Dark-4)"> <path id="Dark-10" data-name="Dark" d="M382.977,162.393C311.846,42.563,222.623,0,222.623,0L0,383.15Z" transform="translate(539.29 921.77) rotate(-180)" fill="$$wheelColorDark$$" stroke="#fff" stroke-linecap="round" stroke-width="8" /> </g> <g transform="matrix(1, 0, 0, 1, 1143.37, 164.6)" filter="url(#Light-4)"> <path id="Light-10" data-name="Light" d="M382.977,162.393C311.846,42.563,222.623,0,222.623,0L0,383.15Z" transform="translate(731.6 870.17) rotate(150)" fill="$$wheelColorLight$$" stroke="#fff" stroke-linecap="round" stroke-width="8" /> </g> <g transform="matrix(1, 0, 0, 1, 1143.37, 164.6)" filter="url(#Dark-5)"> <path id="Dark-11" data-name="Dark" d="M382.977,220.757C311.846,340.587,222.623,383.15,222.623,383.15L0,0Z" transform="translate(539.57 538.35) rotate(30)" fill="$$wheelColorDark$$" stroke="#fff" stroke-linecap="round" stroke-width="8" /> </g> <g transform="matrix(1, 0, 0, 1, 1143.37, 164.6)" filter="url(#Light-5)"> <path id="Light-11" data-name="Light" d="M382.977,220.757C311.846,340.587,222.623,383.15,222.623,383.15L0,0Z" transform="translate(538.85 538.62)" fill="$$wheelColorLight$$" stroke="#fff" stroke-linecap="round" stroke-width="8" /> </g> <g transform="matrix(1, 0, 0, 1, 1143.37, 164.6)" filter="url(#Dark-6)"> <path id="Dark-12" data-name="Dark" d="M382.977,220.757C311.846,340.587,222.623,383.15,222.623,383.15L0,0Z" transform="translate(538.53 538.41) rotate(-30)" fill="$$wheelColorDark$$" stroke="#fff" stroke-linecap="round" stroke-width="8" /> </g> <g transform="matrix(1, 0, 0, 1, 1143.37, 164.6)" filter="url(#Light-6)"> <path id="Light-12" data-name="Light" d="M382.977,162.393C311.846,42.563,222.623,0,222.623,0L0,383.15Z" transform="translate(730.11 206.24) rotate(30)" fill="$$wheelColorLight$$" stroke="#fff" stroke-linecap="round" stroke-width="8" /> </g> <g transform="matrix(1, 0, 0, 1, 1143.37, 164.6)" filter="url(#centerWheel)"> <path id="centerWheel-2" data-name="centerWheel" d="M116.36,0A116.36,116.36,0,1,1,0,116.36,116.36,116.36,0,0,1,116.36,0Z" transform="translate(655.88 654.97) rotate(180)" fill="#fff" /> </g> </g> </svg> </div><div class="marker"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink1078.143 1077.914"> <defs> <filter id="borderCircle" x="49.538" y="48.975" width="980" height="980" filterUnits="userSpaceOnUse"> <feOffset input="SourceAlpha" /> <feGaussianBlur stdDeviation="10" result="blur" /> <feFlood flood-opacity="0.161" /> <feComposite operator="in" in2="blur" /> <feComposite in="SourceGraphic" /> </filter> <filter id="Dark" x="518.86" y="141.951" width="417.474" height="417.299" filterUnits="userSpaceOnUse"> <feOffset input="SourceAlpha" /> <feGaussianBlur stdDeviation="3" result="blur-2" /> <feFlood flood-opacity="0.161" /> <feComposite operator="in" in2="blur-2" /> <feComposite in="SourceGraphic" /> </filter> <filter id="Light" x="326.877" y="0" width="563.604" height="563.54" filterUnits="userSpaceOnUse"> <feOffset input="SourceAlpha" /> <feGaussianBlur stdDeviation="3" result="blur-3" /> <feFlood flood-opacity="0.161" /> <feComposite operator="in" in2="blur-3" /> <feComposite in="SourceGraphic" /> </filter> <filter id="Dark-2" x="189.117" y="0" width="563.604" height="563.54" filterUnits="userSpaceOnUse"> <feOffset input="SourceAlpha" /> <feGaussianBlur stdDeviation="3" result="blur-4" /> <feFlood flood-opacity="0.161" /> <feComposite operator="in" in2="blur-4" /> <feComposite in="SourceGraphic" /> </filter> <filter id="Light-2" x="141.81" y="141.951" width="417.474" height="417.299" filterUnits="userSpaceOnUse"> <feOffset input="SourceAlpha" /> <feGaussianBlur stdDeviation="3" result="blur-5" /> <feFlood flood-opacity="0.161" /> <feComposite operator="in" in2="blur-5" /> <feComposite in="SourceGraphic" /> </filter> <filter id="Dark-3" x="0" y="187.245" width="563.604" height="563.54" filterUnits="userSpaceOnUse"> <feOffset input="SourceAlpha" /> <feGaussianBlur stdDeviation="3" result="blur-6" /> <feFlood flood-opacity="0.161" /> <feComposite operator="in" in2="blur-6" /> <feComposite in="SourceGraphic" /> </filter> <filter id="Light-3" x="0" y="325.679" width="563.604" height="563.54" filterUnits="userSpaceOnUse"> <feOffset input="SourceAlpha" /> <feGaussianBlur stdDeviation="3" result="blur-7" /> <feFlood flood-opacity="0.161" /> <feComposite operator="in" in2="blur-7" /> <feComposite in="SourceGraphic" /> </filter> <filter id="Dark-4" x="141.81" y="518.664" width="417.474" height="417.299" filterUnits="userSpaceOnUse"> <feOffset input="SourceAlpha" /> <feGaussianBlur stdDeviation="3" result="blur-8" /> <feFlood flood-opacity="0.161" /> <feComposite operator="in" in2="blur-8" /> <feComposite in="SourceGraphic" /> </filter> <filter id="Light-4" x="189.117" y="514.374" width="563.604" height="563.54" filterUnits="userSpaceOnUse"> <feOffset input="SourceAlpha" /> <feGaussianBlur stdDeviation="3" result="blur-9" /> <feFlood flood-opacity="0.161" /> <feComposite operator="in" in2="blur-9" /> <feComposite in="SourceGraphic" /> </filter> <filter id="Dark-5" x="326.878" y="514.374" width="563.604" height="563.54" filterUnits="userSpaceOnUse"> <feOffset input="SourceAlpha" /> <feGaussianBlur stdDeviation="3" result="blur-10" /> <feFlood flood-opacity="0.161" /> <feComposite operator="in" in2="blur-10" /> <feComposite in="SourceGraphic" /> </filter> <filter id="Light-5" x="518.86" y="518.664" width="417.474" height="417.299" filterUnits="userSpaceOnUse"> <feOffset input="SourceAlpha" /> <feGaussianBlur stdDeviation="3" result="blur-11" /> <feFlood flood-opacity="0.161" /> <feComposite operator="in" in2="blur-11" /> <feComposite in="SourceGraphic" /> </filter> <filter id="Dark-6" x="514.539" y="325.679" width="563.604" height="563.54" filterUnits="userSpaceOnUse"> <feOffset input="SourceAlpha" /> <feGaussianBlur stdDeviation="3" result="blur-12" /> <feFlood flood-opacity="0.161" /> <feComposite operator="in" in2="blur-12" /> <feComposite in="SourceGraphic" /> </filter> <filter id="Light-6" x="514.54" y="187.245" width="563.604" height="563.54" filterUnits="userSpaceOnUse"> <feOffset input="SourceAlpha" /> <feGaussianBlur stdDeviation="3" result="blur-13" /> <feFlood flood-opacity="0.161" /> <feComposite operator="in" in2="blur-13" /> <feComposite in="SourceGraphic" /> </filter> <filter id="centerWheel" x="400.66" y="399.755" width="277.72" height="277.72" filterUnits="userSpaceOnUse"> <feOffset input="SourceAlpha" /> <feGaussianBlur stdDeviation="7.5" result="blur-14" /> <feFlood flood-opacity="0.161" /> <feComposite operator="in" in2="blur-14" /> <feComposite in="SourceGraphic" /> </filter> </defs> <g id="Spin_Wheel" data-name="Spin Wheel" transform="translate(-1143.372 -164.599)"> <g transform="matrix(1, 0, 0, 1, 1143.37, 164.6)" filter="url(#borderCircle)"> <path id="borderCircle-2" data-name="borderCircle" d="M460,0C714.051,0,920,205.949,920,460S714.051,920,460,920,0,714.051,0,460,205.949,0,460,0Z" transform="translate(999.54 998.97) rotate(180)" fill="$$wheelColorDark$$" /> </g> <g transform="matrix(1, 0, 0, 1, 1143.37, 164.6)" filter="url(#Dark)"> <path id="Dark-7" data-name="Dark" d="M1707.936,759.976c-71.13-119.83-160.354-162.393-160.354-162.393l-222.623,383.15Z" transform="translate(-786.11 -441.43)" fill="$$wheelColorDark$$" stroke="#fff" stroke-linecap="round" stroke-width="8" /> </g> <g transform="matrix(1, 0, 0, 1, 1143.37, 164.6)" filter="url(#Light)"> <path id="Light-7" data-name="Light" d="M382.977,162.393C311.846,42.563,222.623,0,222.623,0L0,383.15Z" transform="translate(347.99 207.74) rotate(-30)" fill="$$wheelColorLight$$" stroke="#fff" stroke-linecap="round" stroke-width="8" /> </g> <g transform="matrix(1, 0, 0, 1, 1143.37, 164.6)" filter="url(#Dark-2)"> <path id="Dark-8" data-name="Dark" d="M382.976,220.757C311.846,340.586,222.623,383.15,222.623,383.15L0,0Z" transform="translate(540.03 539.56) rotate(-150)" fill="$$wheelColorDark$$" stroke="#fff" stroke-linecap="round" stroke-width="8" /> </g> <g transform="matrix(1, 0, 0, 1, 1143.37, 164.6)" filter="url(#Light-2)"> <path id="Light-8" data-name="Light" d="M382.977,220.757C311.846,340.587,222.623,383.15,222.623,383.15L0,0Z" transform="translate(539.29 539.3) rotate(-180)" fill="$$wheelColorLight$$" stroke="#fff" stroke-linecap="round" stroke-width="8" /> </g> <g transform="matrix(1, 0, 0, 1, 1143.37, 164.6)" filter="url(#Dark-3)"> <path id="Dark-9" data-name="Dark" d="M382.977,220.757C311.846,340.586,222.623,383.15,222.623,383.15L0,0Z" transform="translate(539.61 538.06) rotate(150)" fill="$$wheelColorDark$$" stroke="#fff" stroke-linecap="round" stroke-width="8" /> </g> <g transform="matrix(1, 0, 0, 1, 1143.37, 164.6)" filter="url(#Light-3)"> <path id="Light-9" data-name="Light" d="M382.977,162.393C311.846,42.563,222.623,0,222.623,0L0,383.15Z" transform="translate(348.04 870.22) rotate(-150)" fill="$$wheelColorLight$$" stroke="#fff" stroke-linecap="round" stroke-width="8" /> </g> <g transform="matrix(1, 0, 0, 1, 1143.37, 164.6)" filter="url(#Dark-4)"> <path id="Dark-10" data-name="Dark" d="M382.977,162.393C311.846,42.563,222.623,0,222.623,0L0,383.15Z" transform="translate(539.29 921.77) rotate(-180)" fill="$$wheelColorDark$$" stroke="#fff" stroke-linecap="round" stroke-width="8" /> </g> <g transform="matrix(1, 0, 0, 1, 1143.37, 164.6)" filter="url(#Light-4)"> <path id="Light-10" data-name="Light" d="M382.977,162.393C311.846,42.563,222.623,0,222.623,0L0,383.15Z" transform="translate(731.6 870.17) rotate(150)" fill="$$wheelColorLight$$" stroke="#fff" stroke-linecap="round" stroke-width="8" /> </g> <g transform="matrix(1, 0, 0, 1, 1143.37, 164.6)" filter="url(#Dark-5)"> <path id="Dark-11" data-name="Dark" d="M382.977,220.757C311.846,340.587,222.623,383.15,222.623,383.15L0,0Z" transform="translate(539.57 538.35) rotate(30)" fill="$$wheelColorDark$$" stroke="#fff" stroke-linecap="round" stroke-width="8" /> </g> <g transform="matrix(1, 0, 0, 1, 1143.37, 164.6)" filter="url(#Light-5)"> <path id="Light-11" data-name="Light" d="M382.977,220.757C311.846,340.587,222.623,383.15,222.623,383.15L0,0Z" transform="translate(538.85 538.62)" fill="$$wheelColorLight$$" stroke="#fff" stroke-linecap="round" stroke-width="8" /> </g> <g transform="matrix(1, 0, 0, 1, 1143.37, 164.6)" filter="url(#Dark-6)"> <path id="Dark-12" data-name="Dark" d="M382.977,220.757C311.846,340.587,222.623,383.15,222.623,383.15L0,0Z" transform="translate(538.53 538.41) rotate(-30)" fill="$$wheelColorDark$$" stroke="#fff" stroke-linecap="round" stroke-width="8" /> </g> <g transform="matrix(1, 0, 0, 1, 1143.37, 164.6)" filter="url(#Light-6)"> <path id="Light-12" data-name="Light" d="M382.977,162.393C311.846,42.563,222.623,0,222.623,0L0,383.15Z" transform="translate(730.11 206.24) rotate(30)" fill="$$wheelColorLight$$" stroke="#fff" stroke-linecap="round" stroke-width="8" /> </g> <g transform="matrix(1, 0, 0, 1, 1143.37, 164.6)" filter="url(#centerWheel)"> <path id="centerWheel-2" data-name="centerWheel" d="M116.36,0A116.36,116.36,0,1,1,0,116.36,116.36,116.36,0,0,1,116.36,0Z" transform="translate(655.88 654.97) rotate(180)" fill="#fff" /> </g> </g> </svg> </div><div class="marker"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink1078.143 1077.914"> <defs> <filter id="borderCircle" x="49.538" y="48.975" width="980" height="980" filterUnits="userSpaceOnUse"> <feOffset input="SourceAlpha" /> <feGaussianBlur stdDeviation="10" result="blur" /> <feFlood flood-opacity="0.161" /> <feComposite operator="in" in2="blur" /> <feComposite in="SourceGraphic" /> </filter> <filter id="Dark" x="518.86" y="141.951" width="417.474" height="417.299" filterUnits="userSpaceOnUse"> <feOffset input="SourceAlpha" /> <feGaussianBlur stdDeviation="3" result="blur-2" /> <feFlood flood-opacity="0.161" /> <feComposite operator="in" in2="blur-2" /> <feComposite in="SourceGraphic" /> </filter> <filter id="Light" x="326.877" y="0" width="563.604" height="563.54" filterUnits="userSpaceOnUse"> <feOffset input="SourceAlpha" /> <feGaussianBlur stdDeviation="3" result="blur-3" /> <feFlood flood-opacity="0.161" /> <feComposite operator="in" in2="blur-3" /> <feComposite in="SourceGraphic" /> </filter> <filter id="Dark-2" x="189.117" y="0" width="563.604" height="563.54" filterUnits="userSpaceOnUse"> <feOffset input="SourceAlpha" /> <feGaussianBlur stdDeviation="3" result="blur-4" /> <feFlood flood-opacity="0.161" /> <feComposite operator="in" in2="blur-4" /> <feComposite in="SourceGraphic" /> </filter> <filter id="Light-2" x="141.81" y="141.951" width="417.474" height="417.299" filterUnits="userSpaceOnUse"> <feOffset input="SourceAlpha" /> <feGaussianBlur stdDeviation="3" result="blur-5" /> <feFlood flood-opacity="0.161" /> <feComposite operator="in" in2="blur-5" /> <feComposite in="SourceGraphic" /> </filter> <filter id="Dark-3" x="0" y="187.245" width="563.604" height="563.54" filterUnits="userSpaceOnUse"> <feOffset input="SourceAlpha" /> <feGaussianBlur stdDeviation="3" result="blur-6" /> <feFlood flood-opacity="0.161" /> <feComposite operator="in" in2="blur-6" /> <feComposite in="SourceGraphic" /> </filter> <filter id="Light-3" x="0" y="325.679" width="563.604" height="563.54" filterUnits="userSpaceOnUse"> <feOffset input="SourceAlpha" /> <feGaussianBlur stdDeviation="3" result="blur-7" /> <feFlood flood-opacity="0.161" /> <feComposite operator="in" in2="blur-7" /> <feComposite in="SourceGraphic" /> </filter> <filter id="Dark-4" x="141.81" y="518.664" width="417.474" height="417.299" filterUnits="userSpaceOnUse"> <feOffset input="SourceAlpha" /> <feGaussianBlur stdDeviation="3" result="blur-8" /> <feFlood flood-opacity="0.161" /> <feComposite operator="in" in2="blur-8" /> <feComposite in="SourceGraphic" /> </filter> <filter id="Light-4" x="189.117" y="514.374" width="563.604" height="563.54" filterUnits="userSpaceOnUse"> <feOffset input="SourceAlpha" /> <feGaussianBlur stdDeviation="3" result="blur-9" /> <feFlood flood-opacity="0.161" /> <feComposite operator="in" in2="blur-9" /> <feComposite in="SourceGraphic" /> </filter> <filter id="Dark-5" x="326.878" y="514.374" width="563.604" height="563.54" filterUnits="userSpaceOnUse"> <feOffset input="SourceAlpha" /> <feGaussianBlur stdDeviation="3" result="blur-10" /> <feFlood flood-opacity="0.161" /> <feComposite operator="in" in2="blur-10" /> <feComposite in="SourceGraphic" /> </filter> <filter id="Light-5" x="518.86" y="518.664" width="417.474" height="417.299" filterUnits="userSpaceOnUse"> <feOffset input="SourceAlpha" /> <feGaussianBlur stdDeviation="3" result="blur-11" /> <feFlood flood-opacity="0.161" /> <feComposite operator="in" in2="blur-11" /> <feComposite in="SourceGraphic" /> </filter> <filter id="Dark-6" x="514.539" y="325.679" width="563.604" height="563.54" filterUnits="userSpaceOnUse"> <feOffset input="SourceAlpha" /> <feGaussianBlur stdDeviation="3" result="blur-12" /> <feFlood flood-opacity="0.161" /> <feComposite operator="in" in2="blur-12" /> <feComposite in="SourceGraphic" /> </filter> <filter id="Light-6" x="514.54" y="187.245" width="563.604" height="563.54" filterUnits="userSpaceOnUse"> <feOffset input="SourceAlpha" /> <feGaussianBlur stdDeviation="3" result="blur-13" /> <feFlood flood-opacity="0.161" /> <feComposite operator="in" in2="blur-13" /> <feComposite in="SourceGraphic" /> </filter> <filter id="centerWheel" x="400.66" y="399.755" width="277.72" height="277.72" filterUnits="userSpaceOnUse"> <feOffset input="SourceAlpha" /> <feGaussianBlur stdDeviation="7.5" result="blur-14" /> <feFlood flood-opacity="0.161" /> <feComposite operator="in" in2="blur-14" /> <feComposite in="SourceGraphic" /> </filter> </defs> <g id="Spin_Wheel" data-name="Spin Wheel" transform="translate(-1143.372 -164.599)"> <g transform="matrix(1, 0, 0, 1, 1143.37, 164.6)" filter="url(#borderCircle)"> <path id="borderCircle-2" data-name="borderCircle" d="M460,0C714.051,0,920,205.949,920,460S714.051,920,460,920,0,714.051,0,460,205.949,0,460,0Z" transform="translate(999.54 998.97) rotate(180)" fill="$$wheelColorDark$$" /> </g> <g transform="matrix(1, 0, 0, 1, 1143.37, 164.6)" filter="url(#Dark)"> <path id="Dark-7" data-name="Dark" d="M1707.936,759.976c-71.13-119.83-160.354-162.393-160.354-162.393l-222.623,383.15Z" transform="translate(-786.11 -441.43)" fill="$$wheelColorDark$$" stroke="#fff" stroke-linecap="round" stroke-width="8" /> </g> <g transform="matrix(1, 0, 0, 1, 1143.37, 164.6)" filter="url(#Light)"> <path id="Light-7" data-name="Light" d="M382.977,162.393C311.846,42.563,222.623,0,222.623,0L0,383.15Z" transform="translate(347.99 207.74) rotate(-30)" fill="$$wheelColorLight$$" stroke="#fff" stroke-linecap="round" stroke-width="8" /> </g> <g transform="matrix(1, 0, 0, 1, 1143.37, 164.6)" filter="url(#Dark-2)"> <path id="Dark-8" data-name="Dark" d="M382.976,220.757C311.846,340.586,222.623,383.15,222.623,383.15L0,0Z" transform="translate(540.03 539.56) rotate(-150)" fill="$$wheelColorDark$$" stroke="#fff" stroke-linecap="round" stroke-width="8" /> </g> <g transform="matrix(1, 0, 0, 1, 1143.37, 164.6)" filter="url(#Light-2)"> <path id="Light-8" data-name="Light" d="M382.977,220.757C311.846,340.587,222.623,383.15,222.623,383.15L0,0Z" transform="translate(539.29 539.3) rotate(-180)" fill="$$wheelColorLight$$" stroke="#fff" stroke-linecap="round" stroke-width="8" /> </g> <g transform="matrix(1, 0, 0, 1, 1143.37, 164.6)" filter="url(#Dark-3)"> <path id="Dark-9" data-name="Dark" d="M382.977,220.757C311.846,340.586,222.623,383.15,222.623,383.15L0,0Z" transform="translate(539.61 538.06) rotate(150)" fill="$$wheelColorDark$$" stroke="#fff" stroke-linecap="round" stroke-width="8" /> </g> <g transform="matrix(1, 0, 0, 1, 1143.37, 164.6)" filter="url(#Light-3)"> <path id="Light-9" data-name="Light" d="M382.977,162.393C311.846,42.563,222.623,0,222.623,0L0,383.15Z" transform="translate(348.04 870.22) rotate(-150)" fill="$$wheelColorLight$$" stroke="#fff" stroke-linecap="round" stroke-width="8" /> </g> <g transform="matrix(1, 0, 0, 1, 1143.37, 164.6)" filter="url(#Dark-4)"> <path id="Dark-10" data-name="Dark" d="M382.977,162.393C311.846,42.563,222.623,0,222.623,0L0,383.15Z" transform="translate(539.29 921.77) rotate(-180)" fill="$$wheelColorDark$$" stroke="#fff" stroke-linecap="round" stroke-width="8" /> </g> <g transform="matrix(1, 0, 0, 1, 1143.37, 164.6)" filter="url(#Light-4)"> <path id="Light-10" data-name="Light" d="M382.977,162.393C311.846,42.563,222.623,0,222.623,0L0,383.15Z" transform="translate(731.6 870.17) rotate(150)" fill="$$wheelColorLight$$" stroke="#fff" stroke-linecap="round" stroke-width="8" /> </g> <g transform="matrix(1, 0, 0, 1, 1143.37, 164.6)" filter="url(#Dark-5)"> <path id="Dark-11" data-name="Dark" d="M382.977,220.757C311.846,340.587,222.623,383.15,222.623,383.15L0,0Z" transform="translate(539.57 538.35) rotate(30)" fill="$$wheelColorDark$$" stroke="#fff" stroke-linecap="round" stroke-width="8" /> </g> <g transform="matrix(1, 0, 0, 1, 1143.37, 164.6)" filter="url(#Light-5)"> <path id="Light-11" data-name="Light" d="M382.977,220.757C311.846,340.587,222.623,383.15,222.623,383.15L0,0Z" transform="translate(538.85 538.62)" fill="$$wheelColorLight$$" stroke="#fff" stroke-linecap="round" stroke-width="8" /> </g> <g transform="matrix(1, 0, 0, 1, 1143.37, 164.6)" filter="url(#Dark-6)"> <path id="Dark-12" data-name="Dark" d="M382.977,220.757C311.846,340.587,222.623,383.15,222.623,383.15L0,0Z" transform="translate(538.53 538.41) rotate(-30)" fill="$$wheelColorDark$$" stroke="#fff" stroke-linecap="round" stroke-width="8" /> </g> <g transform="matrix(1, 0, 0, 1, 1143.37, 164.6)" filter="url(#Light-6)"> <path id="Light-12" data-name="Light" d="M382.977,162.393C311.846,42.563,222.623,0,222.623,0L0,383.15Z" transform="translate(730.11 206.24) rotate(30)" fill="$$wheelColorLight$$" stroke="#fff" stroke-linecap="round" stroke-width="8" /> </g> <g transform="matrix(1, 0, 0, 1, 1143.37, 164.6)" filter="url(#centerWheel)"> <path id="centerWheel-2" data-name="centerWheel" d="M116.36,0A116.36,116.36,0,1,1,0,116.36,116.36,116.36,0,0,1,116.36,0Z" transform="translate(655.88 654.97) rotate(180)" fill="#fff" /> </g> </g> </svg> </div><div class="marker"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="100%" height="100%" viewBox="0 0 200.683 200.683">\n  <defs>\n    <filter id="Marker" x="0" y="0" width="200.683" height="200.683" filterUnits="userSpaceOnUse">\n      <feOffset input="SourceAlpha"/>\n      <feGaussianBlur stdDeviation="10" result="blur"/>\n      <feFlood flood-opacity="0.161"/>\n      <feComposite operator="in" in2="blur"/>\n      <feComposite in="SourceGraphic"/>\n    </filter>\n  </defs>\n  <g transform="matrix(1, 0, 0, 1, 0, 0)" filter="url(#Marker)">\n    <path id="Marker-2" data-name="Marker" d="M72.208,110.541a11.047,11.047,0,0,1-8.223-3.669C57.973,100.163,28,65.648,28,44.208a44.208,44.208,0,0,1,88.415,0c0,21.441-29.973,55.956-35.985,62.664A11.047,11.047,0,0,1,72.208,110.541Zm0-88.437a22.126,22.126,0,0,0-22.1,22.1c0,6.841,10.367,23.419,22.1,38.151,11.726-14.655,22.1-31.111,22.1-38.151A22.126,22.126,0,0,0,72.208,22.1Z" transform="translate(88.37 10.2) rotate(45)" fill="$$markerColor$$"/>\n  </g>\n</svg>\n</div> <div class="wheelLogo" id="wheelLogo"> <img id="spinTheWheelContainerwheelLogo" src=$$${e}.props.wheelLogoUrl$$ style="width: 100%" /> </div> </div> <div class="topRow"> <div class="shopLogo" style="display:flex; align-items: center;"> <img id="spinTheWheelContainerhereLogo" src=$$${e}.props.heroLogoUrl$$ style="height: 50%" /> </div> <div class="closeSection"> <img class="closeWheel" onclick="closeWheel()" src="https://cdn.bitespeed.co/assets/popups/icon-close1.svg" /> </div> </div> <div class="row1"> <div id="spinTheWheelContainertitle" style="font-family: $$${e}.props.title.fontFamily$$; color: $$${e}.props.title.color$$" class="offerMessage" id="offerMessage"> $$${e}.props.title.text$$ </div> </div> <div class="row2"> <div id="spinTheWheelContainertext" style="font-family: $$${e}.props.text.fontFamily$$; color: $$${e}.props.text.color$$" class="offerText1"> $$${e}.props.text.text$$ </div> </div> <div class="row3"> <div class="faceBook"> <div class="faceBookPosition"> <div id="sendToMessengerDiv msg" style="position: absolute; right: 4%;"> <iframe src="https://cdn.bitespeed.co/snippets/build/index.html?color=$$generalSettings.optinColor$$&ctaText=$$generalSettings.optinText.value$$&pageId=${globalPageId}&dataRef=${o}.spinTheWheelContainer.${i}.${spaceReplacedDiscountCode}.bitespeed" height="74px" scrolling="no" style="border:none; margin-left:50%;transform: translateX(-50%);width:160px" width="160px"></iframe> </div> </div> </div> </div> </div>\n`,
          modalImageBehind:
            `<div class="masterContainerImageBehind" id="visualPopupImageBehind" style="display:none" >        <div class="popup" id="masterContainerImageBehindpopupDiv" style="display:flex;background-image: url('$$${e}.props.imageUrl$$')">` +
            '            <div class="bs_overlay" style="background-color:transparent">' +
            `                <button class="closeButton" style="color: $$${e}.props.closeButtonColor$$" onclick="hidePopup('visualPopupImageBehind')">` +
            '                    <i class="fa fa-times closeIcon" aria-hidden="true"></i>                </button>' +
            `                <div class="title" id="masterContainerImageBehindtitle" style="color: $$${e}.props.title.color$$;font-size: $$${e}.props.title.fontSize$$vh;font-family: $$${e}.props.title.fontFamily$$">$$${e}.props.title.text$$</div>` +
            `                <div class="subtitle" id="masterContainerImageBehindsubtitle" style="color: $$${e}.props.subtitle.color$$;font-size: $$${e}.props.subtitle.fontSize$$vh;font-family: $$${e}.props.subtitle.fontFamily$$">$$${e}.props.subtitle.text$$` +
            "                    </div>" +
            `                <div class="bs_text" id="masterContainerImageBehindtext" style="color: $$${e}.props.text.color$$;font-size: $$${e}.props.text.fontSize$$vh !important;font-family: $$${e}.props.text.fontFamily$$">$$${e}.props.text.text$$` +
            "                    </div>" +
            `<iframe src="https://cdn.bitespeed.co/snippets/build/index.html?color=$$generalSettings.optinColor$$&ctaText=$$generalSettings.optinText.value$$&pageId=${globalPageId}&dataRef=${o}.masterContainerImageBehind.${i}.$$generalSettings.discountCode$$.${discountText}.bitespeed" height="74px" scrolling="no" style="align-self:center;border:none;width:160px" width="160px"></iframe>` +
            "                </div>                </div>            </div>        </div>    </div>",
          modalImageAtRight:
            `<div class="masterContainerImageAtRight" id="visualPopupImageAtRight" style="display:none">        <div class="popup" id="popupDiv" >            <div class="bs_overlay">                <button class="closeButton" onclick="hidePopup('visualPopupImageAtRight')">                    <i class="fa fa-times closeIcon" style="color: $$${e}.props.closeButtonColor$$" aria-hidden="true"></i>` +
            '                </button>                <div class="contentContainer">' +
            `                    <div class="textContainer" id="masterContainerImageAtRighttextContainer" style="background-color:$$${e}.props.content.backgroundColor$$">` +
            `                        <div class="title" id="masterContainerImageAtRighttitle" style="color: $$${e}.props.title.color$$;font-size: $$${e}.props.title.fontSize$$vh;font-family: $$${e}.props.title.fontFamily$$">$$${e}.props.title.text$$` +
            "                        </div>" +
            `                        <div class="subtitle" id="masterContainerImageAtRightsubtitle" style="color: $$${e}.props.subtitle.color$$;font-size: $$${e}.props.subtitle.fontSize$$vh;font-family: $$${e}.props.subtitle.fontFamily$$">` +
            `                            $$${e}.props.subtitle.text$$</div>` +
            `                        <div class="bs_text" id="masterContainerImageAtRighttext" style="color: $$${e}.props.text.color$$;font-size: $$${e}.props.text.fontSize$$vh !important;font-family: $$${e}.props.text.fontFamily$$">$$${e}.props.text.text$$` +
            "                                                        </div> " +
            `<iframe src="https://cdn.bitespeed.co/snippets/build/index.html?color=$$generalSettings.optinColor$$&ctaText=$$generalSettings.optinText.value$$&pageId=${globalPageId}&dataRef=${o}.masterContainerImageAtRight.${i}.$$generalSettings.discountCode$$.bitespeed" height="74px" scrolling="no" style="border:none; transform: translateX(7%);width:160px" width="160px"></iframe>` +
            ' </div>                    <div class="mainImage" id="masterContainerImageAtRightmainImage"style="background-image:' +
            `                        url('$$${e}.props.imageUrl$$')">` +
            "                    </div>                </div>            </div>        </div>    </div>",
          customerChatWidget: `<div class="fb-customerchat" page_id="${globalPageId}" ref="${o}.customerChatWidget.${i}.$$generalSettings.discountCode$$.bitespeed" theme_color="$$generalSettings.themeColor$$" logged_in_greeting="$$generalSettings.loggedInGreetingText$$" logged_out_greeting="$$generalSettings.loggedOutGreetingText$$" greeting_dialog_display="$$behaviour.when.showAt$$" greeting_dialog_delay=$$behaviour.when.value$$> </div>`,
          waCustomerChatWidget:
            `<div onclick="showWAChatWidget('${o}')" id="wa-chat-btn-root"` +
            '        class="wa-chat-btn-fixed wa-splmn-chat-btn-offset wa-custom-chat-btn btn_custom_class: wa-chat-btn-base-cta wa-chat-btn-container-size-big wa-chat-btn-theme-cta-new-inverted"' +
            `        style="background: $$generalSettings.themeColor$$; ${
              globalWAPageId == "havaay.myshopify.com" ? "right:6%;" : ""
            }"> ` +
            '       <div class="wa-chat-btn-icon-cta-big wa-custom-icon wa-icon-mask" style="background: #ffffff; display: inherit !important;"></div>        <div class="wa-chat-button-cta-text" style="color: #ffffff; display:initial !important">$$generalSettings.widgetText$$</div>    </div>    <div id="wa-chat-bubble" style="visibility: hidden;z-index:100000; color:black;"        class="wa-chat-bubble-floating-popup animated wa-greeting-widget-z-index wa-chat-bubble-pos-right bounceUp">        <div class="wa-chat-bubble-header-common wa-chat-bubble-header-301"            style="background-image: linear-gradient(110.56deg, $$generalSettings.chatColorLeft$$ 0%, $$generalSettings.chatColorRight$$ 100%);">            <div onclick="hideWAChatWidget()" class="wa-chat-bubble-close-btn"><img style="display: table-row"                    src="https://cdn.shopify.com/s/files/1/0070/3666/5911/files/Vector.png?574"></div>            <div class="wa-chat-bubble-header-title" style="color: rgb(255, 255, 255);">$$generalSettings.chatHeading$$</div>            <div class="wa-chat-bubble-header-desc" style="color: rgb(255, 255, 255);">$$generalSettings.chatSubheading$$</div>        </div>        <div class="wa-chat-bubble-chat">            <div class="wa-chat-multiple-cs">                <div class="wa-message">                    <span>$$generalSettings.greetingText$$</span>                </div>                <div id="intlPhoneNoContainer"                    style="position: absolute;bottom: 0;display: flex;flex-direction: row;align-items: center;width: 100%;">' +
            `                    <input id="bitespeed-phone-${o}" style="width: 100%; font-size: 18px" id="bitespeed-phone" name="phone" type="tel">` +
            `                    <img onclick="waHandler('${o}.customerChatWidget.${i}.$$generalSettings.discountCode$$.bitespeed','${o}',true)" style="width: 60px;cursor:pointer"` +
            '                        src="https://cdn.bitespeed.co/whatsapp-snippets/wa-customer-chat-send.png" alt="" />                </div>            </div>        </div>    </div>',
        };
        if (EUCustomer) {
          let e = r[t];
          if (e.includes("iframe")) {
            e.match(/<iframe.*?<\/iframe>/g)[0];
            let t = e.match(/.*src="([^"]*)".*/)[1],
              o = new URL(t).searchParams.get("dataRef"),
              i = `<a onclick="STMforEUhandler('${o}')" id="bitespeedSTMforEU" href="https://m.me/${globalPageId}?ref=${o}" target="_blank"> <div id="messenger_button"> <div class="messenger_column btn_icon"> <img src="https://bitespeed-app.s3.amazonaws.com/snippets/messenger_icon.svg" id="msngr_btn_icon"> </div><div class="messenger_column btn_label"> <span>Send to Messenger</span> </div></div></a>`;
            i = i.split("$$").join("$$$");
            let r = e.replace(/<iframe.*?<\/iframe>/g, i);
            return r;
          }
        }
        if ("WA" == globalPopup[o].channel) {
          "customerChatWidget" == t && (t = "waCustomerChatWidget");
          let e = r[t];
          if (e.includes("iframe")) {
            e.match(/<iframe.*?<\/iframe>/g)[0];
            let i,
              r = e.match(/.*src="([^"]*)".*/)[1],
              a = new URL(r).searchParams.get("dataRef");
            i = (i =
              "modalImageAtRight" == t
                ? `<div id="intlPhoneNoContainer" style="display:flex;justify-content:center;flex-direction:column"><input id="bitespeed-phone-${o}" name="phone" type="tel"><button style="width: 100%" onclick="waHandler('${a}','${o}')">Submit</button></div>`
                : `<div id="intlPhoneNoContainer" style="display:flex;justify-content:center;"><input id="bitespeed-phone-${o}" name="phone" type="tel"><button onclick="waHandler('${a}','${o}')" style="width: auto;">Submit</button></div>`)
              .split("$$")
              .join("$$$");
            let l = e.replace(/<iframe.*?<\/iframe>/g, i);
            return  l;
          }
          if (
            "dogal-koy-sepetim.myshopify.com" == globalWAPageId &&
            "waCustomerChatWidget" == t
          ) {
            return e.replace("Chat with us", "Bizimle İletişime Geçin!");
          }
          if ('laboboa.myshopify.com' == globalWAPageId && "waCustomerChatWidget" == t) {
            console.log(globalWAPageId, "serviceNameGoogleAnalytics")
            return e.replace("Chat with us", "Contactez nous rapidement🔮");
          }
          if (('manta-ray.store' == globalWAPageId || 'mantaraystore.myshopify.com' == globalWAPageId  )&& "waCustomerChatWidget" == t) {
            console.log(globalWAPageId, "serviceNameGoogleAnalytics")
            return e.replace("Chat with us", "היי, אשמח לקבל עזרה");
          }
          if (
            "2b-eco.myshopify.com" == globalWAPageId &&
            "waCustomerChatWidget" == t
          ) {
            return e.replace("Chat with us", "Fale com a gente");
          }
          if (
            "ponteplace.myshopify.com" == globalWAPageId &&
            "waCustomerChatWidget" == t
          ) {
            return e.replace("Chat with us", "Converse conosco");
          }
          if (
            "leginfi.myshopify.com" == globalWAPageId &&
            "waCustomerChatWidget" == t
          ) {
            return e.replace("Chat with us", "habla con nosotros");
          }
          
        }
        return r[t];
      }
      const popups = {};
  
      function offset(e) {
        const t = e.getBoundingClientRect(),
          o = window.pageXOffset || document.documentElement.scrollLeft,
          i = window.pageYOffset || document.documentElement.scrollTop;
        return {
          top: t.top + i,
          left: t.left + o,
        };
      }
  
      function appendScripts() {
        const e = document.createElement("script");
        (e.type = "text/javascript"),
          (e.async = "true"),
          (e.defer = "true"),
          (e.src = "https://connect.facebook.net/en_US/sdk.js"),
          (e.crossOrigin = "anonymous"),
          document.getElementsByTagName("head")[0].appendChild(e);
      }
  
      function appendCSS() {
        var e;
          (e =
            window.innerWidth < 768
              ? '<link rel="stylesheet" href="https://cdn.bitespeed.co/snippets/bitespeed-popup-mob-min.css"> <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.2/animate.min.css"> <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">'
              : '<link rel="stylesheet" href="https://cdn.bitespeed.co/snippets/bitespeed-popup-min.css"> <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.2/animate.min.css"> <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">'),
          (e +=
            ' <link rel="stylesheet" href="https://cdn.bitespeed.co/whatsapp-snippets/demo.css">'),
          (e +=
            ' <link rel="stylesheet" href="https://cdn.bitespeed.co/whatsapp-snippets/intlTelInput.min.css">'),
          (e +=
            ' <link rel="stylesheet" href="https://cdn.bitespeed.co/whatsapp-snippets/bitespeed-wa.css">');
        try {
          $("head").append(e);
        } catch (e) {
          console.log("This is tyhe eror", e);
        }
      }
  
      function appendHtml(e) {
        e && $("body").append(e);
      }
  
      function renderPopups() {
        let e = getCookie("BS_UNIQUE_USER_ID");
        if (!e || "" === e) {
          let t = new Date();
          setCookieWithExpiry(
            "BS_UNIQUE_USER_ID",
            (e = String(t.getTime()) + makeid(10)),
            15
          );
        }
        fetch(
          `https://app.bitespeed.co/redis/getActivePopups?fbStatus=${fbLoggedInStatus}&userId=${e}`,
          {
            headers: {
              "Access-Control-Allow-Origin": "*",
            },
          }
        )
          .then((e) => e.json())
          .then((e) => {
            const { popups: t } = e;
            (EUCustomer = e.isEUAffected),
              (globalPopup = t),
              (globalPageId = e.pageId),
              (globalWAPageId = e.shopUrl),
              "1234567893" == e.pageId && (globalPageId = "101161615262691"),
              (keys = Object.keys(t));
            let o = String(getCookie("bitespeedOptedIn")),
              i = String(getCookie("bitespeedOptedInWA"));
            keys[0] &&
              (((null === i ||
                "" === i ||
                void 0 === i ||
                "undefined" === i ||
                "null" === i) &&
                "unOpted" == t[keys[0]].behaviour.who.showAt) ||
              "unOpted" != t[keys[0]].behaviour.who.showAt
                ? Object.keys(e.popups).forEach((e, o) => {
                    "WA" == t[e].channel &&
                      t.hasOwnProperty(e) &&
                      (window.innerWidth < 767 &&
                        "modalImageAtRight" == t[e].open.type &&
                        ((t[e].open.type = "modalImageAtTop"),
                        (t[e].completed.type = "modalImageAtTop")),
                      window.innerWidth < 767 &&
                      t[e].behaviour.where.phone.enabled
                        ? renderPopup(t, t[e], e)
                        : window.innerWidth >= 767 &&
                          t[e].behaviour.where.desktop.enabled &&
                          renderPopup(t, t[e], e));
                  })
                : Object.keys(e.popups).forEach((e, o) => {
                    t.hasOwnProperty(e) &&
                      (window.innerWidth < 767 &&
                      t[e].behaviour.where.phone.enabled &&
                      "WA" == t[e].channel &&
                      "customerChatWidget" == t[e].type
                        ? renderPopup(t, t[e], e)
                        : window.innerWidth >= 767 &&
                          t[e].behaviour.where.desktop.enabled &&
                          "WA" == t[e].channel &&
                          "customerChatWidget" == t[e].type &&
                          renderPopup(t, t[e], e));
                  }),
              (((null !== o &&
                "" !== o &&
                void 0 !== o &&
                "undefined" !== o &&
                "null" !== o) ||
                "unOpted" != t[keys[0]].behaviour.who.showAt) &&
                "unOpted" == t[keys[0]].behaviour.who.showAt) ||
                Object.keys(e.popups).forEach((e, o) => {
                  "WA" != t[e].channel &&
                    t.hasOwnProperty(e) &&
                    (window.innerWidth < 767 &&
                      "modalImageAtRight" == t[e].open.type &&
                      ((t[e].open.type = "modalImageAtTop"),
                      (t[e].completed.type = "modalImageAtTop")),
                    window.innerWidth < 767 && t[e].behaviour.where.phone.enabled
                      ? renderPopup(t, t[e], e)
                      : window.innerWidth >= 767 &&
                        t[e].behaviour.where.desktop.enabled &&
                        renderPopup(t, t[e], e));
                }));
          })
          .catch((e) => {});
      }
  
      function renderPopup(e, t, o) {
        let i;
        try {
          if (
            window.location.href.includes("https://www.beachdazetowel.com") &&
            !window.location.href.includes(
              "https://www.beachdazetowel.com/pages/wholesale"
            )
          )
            return;
        } catch (e) {
          console.error(e);
        }
        if ("collapsed" in t) {
          if (!noRepeat.includes(o)) {
            if (((state = "open"), !noRepeat.includes("pillImpressionSent")))
              try {
                axios.post(
                  "https://app.bitespeed.co/database/api/optinTools/impressions",
                  {
                    id: o,
                  }
                ),
                  setCookie(
                    "displayedPopups",
                    (noRepeat += "+pillImpressionSent")
                  );
              } catch (e) {}
            appendHtml(
              (i =
                window.innerWidth < 768
                  ? parseHTML(getHtml("collapsed", "pillPhone", o), t)
                  : parseHTML(getHtml("collapsed", "pill", o), t))
            ),
              "modalImageAtTop" == t.open.type
                ? (window.innerWidth < 768 &&
                    ((t.completed.props.subtitle.fontSize =
                      1 * t.completed.props.subtitle.fontSize * 1.3),
                    (t.completed.props.text.fontSize =
                      1 * t.completed.props.text.fontSize * 2)),
                  appendHtml(
                    (i = parseHTML(
                      getHtml("open", "modalImageAtPillClick", o),
                      t
                    ))
                  ))
                : (window.innerWidth < 768 &&
                    ((t.completed.props.subtitle.fontSize =
                      1 * t.completed.props.subtitle.fontSize * 1.2),
                    (t.completed.props.text.fontSize =
                      1 * t.completed.props.text.fontSize * 1.2)),
                  appendHtml(
                    (i = parseHTML(
                      getHtml("open", "modalImageAtPillClickBehind", o),
                      t
                    ))
                  ));
          }
        } else if (
          "customerChatWidget" == t.type ||
          "customerChatWidgetWA" == t.type
        )
          try {
            if (
              (t.behaviour.when.value || (t.behaviour.when.value = "0"),
              t.generalSettings.themeColor &&
                t.generalSettings.themeColor.length >= 7 &&
                (t.generalSettings.themeColor =
                  t.generalSettings.themeColor.slice(0, 7)),
              appendHtml(
                (i = parseHTML(getHtml("", "customerChatWidget", o), t))
              ),
              FB.XFBML.parse(),
              !noRepeat.includes("widgetImpressionSent"))
            )
              try {
                axios.post(
                  "https://app.bitespeed.co/database/api/optinTools/impressions",
                  {
                    id: o,
                  }
                ),
                  setCookie(
                    "displayedPopups",
                    (noRepeat += "+widgetImpressionSent")
                  );
              } catch (e) {}
          } catch (e) {
            console.log("ERROR", e);
          }
        else if ("orderUpdates" == t.type) {
          let e = getCookie("refb");
          if (
            ((null !== e && "" !== e && void 0 !== e && "undefined" !== e) ||
              (e = createRef()),
            t.generalSettings.title &&
              t.generalSettings.subtitle &&
              globalPageId &&
              o &&
              e)
          ) {
            window.innerWidth < 767
              ? Shopify.Checkout.OrderStatus.addContentBox(
                  `<div style="display: flex; width:100%; flex-direction:column;"><div><h2 style="margin-bottom: 10px;">${t.generalSettings.title}</h2><h3>${t.generalSettings.subtitle}</h3></div><div style="vertical-align: middle;display: flex;align-items: center; margin-top:15px"><iframe src="https://bitespeed-app.s3.amazonaws.com/snippets/build/index.html?color=${t.generalSettings.optinColor}&ctaText=${t.generalSettings.optinText.value}&pageId=${globalPageId}&dataRef=${o}.orderUpdates.${e}.${t.generalSettings.discountCode}.bitespeed" height="60px" scrolling="no" style="align-self:center;border:none;width:170px " width="170px"></iframe></div></div>`
                )
              : Shopify.Checkout.OrderStatus.addContentBox(
                  `<div style="display: flex; width:100%;"><div style="width: 65%; margin-right: 5%"><h2 style="margin-bottom: 10px;">${t.generalSettings.title}</h2><h3>${t.generalSettings.subtitle}</h3></div><div style="width: 30%;vertical-align: middle;display: flex;justify-content: center;align-items: center;"><iframe src="https://bitespeed-app.s3.amazonaws.com/snippets/build/index.html?color=${t.generalSettings.optinColor}&ctaText=${t.generalSettings.optinText.value}&pageId=${globalPageId}&dataRef=${o}.orderUpdates.${e}.${t.generalSettings.discountCode}.bitespeed" height="60px" scrolling="no" style="align-self:center;border:none;width:170px " width="170px"></iframe></div></div>`
                );
            try {
              var r = {
                method: "POST",
                body: JSON.stringify({
                  id: o,
                }),
                headers: {
                  "Content-Type": "application/json",
                },
              };
              fetch(
                "https://app.bitespeed.co/database/api/optinTools/impressions",
                r
              );
            } catch (e) {
              console.log("IMPRESSIONS ERROR", e);
            }
          }
        } else if (t.open)
          switch (t.open.type) {
            case "modalImageAtTop":
              window.innerWidth < 768 &&
                ((t.completed.props.title.fontSize =
                  1 * t.completed.props.title.fontSize * 1.2),
                (t.completed.props.subtitle.fontSize =
                  1 * t.completed.props.subtitle.fontSize * 1.5),
                (t.completed.props.text.fontSize =
                  1 * t.completed.props.text.fontSize * 1.5)),
                (state = "open"),
                appendHtml(
                  (i = parseHTML(getHtml("open", "modalImageAtTop", o), t))
                ),
                "exit" == t.behaviour.when.showAt &&
                  displayOnExit("visualPopupImageAtTop", o),
                ("time" != t.behaviour.when.showAt &&
                  "welcome" != t.behaviour.when.showAt) ||
                  displayWithTime(
                    "visualPopupImageAtTop",
                    t.behaviour.when.value,
                    o
                  ),
                "scroll" == t.behaviour.when.showAt &&
                  displayOnScroll(
                    "visualPopupImageAtTop",
                    t.behaviour.when.value,
                    o
                  );
              break;
            case "modalImageBehind":
              (state = "open"),
                (t.open.props.title.fontSize = 1.5 * t.open.props.title.fontSize),
                (t.open.props.subtitle.fontSize =
                  1.2 * t.open.props.subtitle.fontSize),
                (t.open.props.text.fontSize =
                  1 * t.open.props.text.fontSize * 1.2),
                (t.completed.props.title.fontSize =
                  1 * t.completed.props.title.fontSize * 1.5),
                (t.completed.props.subtitle.fontSize =
                  1 * t.completed.props.subtitle.fontSize * 1.2),
                (t.completed.props.text.fontSize =
                  1 * t.completed.props.text.fontSize * 1.2),
                appendHtml(
                  (i = parseHTML(getHtml("open", "modalImageBehind", o), t))
                ),
                "exit" == t.behaviour.when.showAt &&
                  displayOnExit("visualPopupImageBehind", o),
                ("time" != t.behaviour.when.showAt &&
                  "welcome" != t.behaviour.when.showAt) ||
                  displayWithTime(
                    "visualPopupImageBehind",
                    t.behaviour.when.value,
                    o
                  ),
                "scroll" == t.behaviour.when.showAt &&
                  displayOnScroll(
                    "visualPopupImageBehind",
                    t.behaviour.when.value,
                    o
                  );
              break;
            case "modalImageAtRight":
              appendHtml(
                (i = parseHTML(getHtml("open", "modalImageAtRight", o), t))
              ),
                "exit" == t.behaviour.when.showAt &&
                  displayOnExit("visualPopupImageAtRight", o),
                ("time" != t.behaviour.when.showAt &&
                  "welcome" != t.behaviour.when.showAt) ||
                  displayWithTime(
                    "visualPopupImageAtRight",
                    t.behaviour.when.value,
                    o
                  ),
                "scroll" == t.behaviour.when.showAt &&
                  displayOnScroll(
                    "visualPopupImageAtRight",
                    t.behaviour.when.value,
                    o
                  );
              break;
            case "spinTheWheel":
              let r = getSpinTheWheelCode(
                (globalDegree = 900 + 1080 * Math.random()),
                t
              );
              (discountCode = r.code),
                (spaceReplacedDiscountCode = discountCode.split(" ").join("bsp")),
                (discountText = r.text),
                (state = "open"),
                appendHtml((i = parseHTML(getHtml("open", "wheelio", o), t))),
                wheelLoad(e, t.id),
                "exit" == t.behaviour.when.showAt &&
                  displayOnExit("wheelContainer", o),
                ("time" != t.behaviour.when.showAt &&
                  "welcome" != t.behaviour.when.showAt) ||
                  displayWithTime("wheelContainer", t.behaviour.when.value, o),
                "scroll" == t.behaviour.when.showAt &&
                  displayOnScroll("wheelContainer", t.behaviour.when.value, o);
              break;
            case "spinTheWheelWA":
              let a = getSpinTheWheelCode(
                (globalDegree = 900 + 1080 * Math.random()),
                t
              );
              (discountCode = a.code),
                (spaceReplacedDiscountCode = discountCode.split(" ").join("bsp")),
                (discountText = a.text),
                (state = "open"),
                appendHtml((i = parseHTML(getHtml("open", "wheelio", o), t))),
                wheelLoad(e, t.id),
                "exit" == t.behaviour.when.showAt &&
                  displayOnExit("wheelContainer", o),
                ("time" != t.behaviour.when.showAt &&
                  "welcome" != t.behaviour.when.showAt) ||
                  displayWithTime("wheelContainer", t.behaviour.when.value, o),
                "scroll" == t.behaviour.when.showAt &&
                  displayOnScroll("wheelContainer", t.behaviour.when.value, o);
              break;
            case "modalImageAtPillClick":
              (state = "open"),
                appendHtml((i = parseHTML(popupHtml.modalImageAtPillClick, t)));
          }
        try {
          if ("WA" == globalPopup[o].channel) {
            let e = document.querySelector("#bitespeed-phone-" + o),
              i = "";
            "customerChatWidget" == t.type &&
              (i = "bitespeed-phone-customer-chat-widget");
            let r = window.intlTelInput(e, {
              geoIpLookup: function (e) {
                axios
                  .get("https://get.geojs.io/v1/ip/country.json")
                  .then(({ data: t }) => {
                    t && t.country ? e(t.country) : e("IN");
                  });
              },
              initialCountry: "auto",
              separateDialCode: !0,
              customContainer: i,
            });
            (globalPhoneNoObjs[o] = r),
              "customerChatWidget" == t.type &&
                r.promise.then(() => {
                  $("#wa-chat-bubble").css("display", "none"),
                    $("#wa-chat-bubble").css("visibility", "initial");
                });
          }
        } catch (e) {}
      }
  
      function parseHTML(e, t) {
        const o = /(\$\$(\w|\W)+?\$\$)/g;
        const flatten = (e) => {
          const t = {};
          return (
            (function e(o, i) {
              if (Object(o) !== o) t[i] = o;
              else if (Array.isArray(o)) {
                const r = o.length;
                for (let t = 0; t < r; t++) e(o[t], `${i}.${t}`);
                0 === r && (t[i] = []);
              } else {
                let r = !0;
                for (const t in o) (r = !1), e(o[t], i ? `${i}.${t}` : t);
                r && i && (t[i] = {});
              }
            })(e, ""),
            t
          );
        };
        flatProps = flatten(t);
        try {
          const t = e.match(o);
          let i;
          return (
            null != t &&
              t.forEach((t) => {
                const o = t.replace(/\$\$/g, "");
                if (Object.prototype.hasOwnProperty.call(flatProps, o))
                  flatProps[o] || 0 === flatProps[o]
                    ? (i =
                        "string" != typeof flatProps[o]
                          ? flatProps[o].toString()
                          : flatProps[o])
                    : ("generalSettings.optinText.value" == o && (i = " "),
                      console.log(""));
                else
                  switch ((o)) {
                    case "generalSettings.optinText.value":
                    (i = " ");
                      break;
                    case "wheelUrl":
                      i = "https://cdn.bitespeed.co/assets/popups/wheel.png";
                      break;
                    case "wheelColorLight":
                      i = "#eaf3ff";
                      break;
                    case "wheelColorDark":
                      i = "#3b55e6";
                      break;
                    case "markerColor":
                      i = "#273043";
                      break;
                    case "behaviour.when.value":
                      i = "0";
                      break;
                    case "generalSettings.optinText.value":
                      i = " ";
                      break;
                    default:
                      i = "";
                  }
                e = e.replace(t, i);
              }),
            e
          );
        } catch (e) {
          throw e;
        }
      }
  
      setClass = (e, t) => {
        const o = Object.keys(globalPopup);
        let i, r;
        for (let e = 0; e < o.length; e++)
          if ("collapsed" in globalPopup[o[e]]) {
            i = globalPopup[o[e]].open.type;
            break;
          }
        (r =
          "modalImageAtTop" == i
            ? "popupImageAtPillClick"
            : "popupImageAtPillClickBehind"),
          (document.getElementById(r).className = `popup onPillClick p${e}`),
          (document.getElementById("pillPopup").style.display = "flex"),
          (document.getElementById("permanentPill").style.display = "none");
      };
  
      function showPopup() {
        (document.getElementById("popupImageAtTopDiv").style.display = "flex"),
          (document.getElementById("permanentPill").style.display = "none");
      }
  
      function displayOnExit(e, t) {
        document.addEventListener(
          "mouseleave",
          (o) => {
            if (o.y <= 0 && !closedPopups.includes(e) && !noRepeat.includes(t)) {
              setCookie("displayedPopups", (noRepeat = noRepeat + "+" + t)),
                "wheelContainer" == e
                  ? (document.getElementById("wheelContainer").style.transform =
                      "translate(100%, 0)")
                  : $(`#${e}`).fadeIn();
              try {
                axios.post(
                  "https://app.bitespeed.co/database/api/optinTools/impressions",
                  {
                    id: t,
                  }
                );
              } catch (e) {}
            }
          },
          !1
        );
      }
  
      function displayOnScroll(e, t, o) {
        window.addEventListener("scroll", () => {
          const i =
            $(window).scrollTop() / ($(document).height() - $(window).height());
          if (
            Math.round(100 * i) > t &&
            !closedPopups.includes(e) &&
            !noRepeat.includes(o)
          ) {
            setCookie("displayedPopups", (noRepeat = noRepeat + "+" + o)),
              "wheelContainer" == e
                ? (document.getElementById("wheelContainer").style.transform =
                    "translate(100%, 0)")
                : $(`#${e}`).fadeIn();
            try {
              axios.post(
                "https://app.bitespeed.co/database/api/optinTools/impressions",
                {
                  id: o,
                }
              );
            } catch (e) {}
          }
        });
      }
  
      function displayWithTime(e, t, o) {
        setTimeout(() => {
          if (!noRepeat.includes(o)) {
            setCookie("displayedPopups", (noRepeat = noRepeat + "+" + o)),
              "wheelContainer" == e
                ? (document.getElementById("wheelContainer").style.transform =
                    "translate(100%, 0)")
                : $(`#${e}`).fadeIn();
            try {
              axios.post(
                "https://app.bitespeed.co/database/api/optinTools/impressions",
                {
                  id: o,
                }
              );
            } catch (e) {}
          }
        }, 1e3 * t);
      }
  
      hidePopup = (e) => {
        $(`#${e}`).css("display", "none"),
          "permanentPill" === e &&
            (document.getElementById("pillPopup").style.display = "none"),
          closedPopups.push(e);
      };
  
      var data = [];
  
      closeWheel = (e) => {
        document.getElementById("wheelContainer").style.transform =
          "translate(0%, 0)";
      };
  
      function getSpinTheWheelCode(e, t) {
        const o = [];
        o.push((e + 15) % 360);
        o.push((e + 45) % 360);
        o.push((e + 75) % 360);
        o.push((e + 105) % 360);
        o.push((e + 135) % 360);
        o.push((e + 165) % 360);
        o.push((e + 195) % 360);
        o.push((e + 225) % 360);
        o.push((e + 255) % 360);
        o.push((e + 285) % 360);
        o.push((e + 315) % 360);
        o.push((e + 345) % 360);
        for (let e = 0; e < 12; e++)
          if (o[e] > 300 && o[e] < 330) {
            String(6);
            return (
              (e %= t.data.length),
              {
                code: t.data[e].discountCode,
                text: t.data[e].text,
              }
            );
          }
      }
  
      function spin(e) {
        const t = [];
        let o;
        const i = `${e + 15}deg`;
        t.push((e + 15) % 360);
        const r = `${e + 45}deg`;
        t.push((e + 45) % 360);
        const a = `${e + 75}deg`;
        t.push((e + 75) % 360);
        const l = `${e + 105}deg`;
        t.push((e + 105) % 360);
        const s = `${e + 135}deg`;
        t.push((e + 135) % 360);
        const n = `${e + 165}deg`;
        t.push((e + 165) % 360);
        const p = `${e + 195}deg`;
        t.push((e + 195) % 360);
        const d = `${e + 225}deg`;
        t.push((e + 225) % 360);
        const f = `${e + 255}deg`;
        t.push((e + 255) % 360);
        const c = `${e + 285}deg`;
        t.push((e + 285) % 360);
        const h = `${e + 315}deg`;
        t.push((e + 315) % 360);
        const u = `${e + 345}deg`;
        t.push((e + 345) % 360);
        const m = `${e}deg`;
        for (let e = 0; e < 12; e++)
          if (t[e] > 300 && t[e] < 330) {
            const t = String(6);
            setTimeout(() => {
              document.getElementById("offerMessage").innerHTML =
                popups[t].props.data[e].discountCode;
            }, 3e3),
              (o = e + 1);
          }
        (document.getElementById(
          "dash-1"
        ).style.webkitTransform = `rotateZ(${i})`),
          (document.getElementById(
            "dash-2"
          ).style.webkitTransform = `rotateZ(${r})`),
          (document.getElementById(
            "dash-3"
          ).style.webkitTransform = `rotateZ(${a})`),
          (document.getElementById(
            "dash-4"
          ).style.webkitTransform = `rotateZ(${l})`),
          (document.getElementById(
            "dash-5"
          ).style.webkitTransform = `rotateZ(${s})`),
          (document.getElementById(
            "dash-6"
          ).style.webkitTransform = `rotateZ(${n})`),
          (document.getElementById(
            "dash-7"
          ).style.webkitTransform = `rotateZ(${p})`),
          (document.getElementById(
            "dash-8"
          ).style.webkitTransform = `rotateZ(${d})`),
          (document.getElementById(
            "dash-9"
          ).style.webkitTransform = `rotateZ(${f})`),
          (document.getElementById(
            "dash-10"
          ).style.webkitTransform = `rotateZ(${c})`),
          (document.getElementById(
            "dash-11"
          ).style.webkitTransform = `rotateZ(${h})`),
          (document.getElementById(
            "dash-12"
          ).style.webkitTransform = `rotateZ(${u})`),
          (document.getElementById(
            "dash-act"
          ).style.webkitTransform = `rotateZ(${m})`),
          (document.getElementById(
            "wheelLogo"
          ).style.webkitTransform = `rotateZ(${m})`);
      }
  
      function wheelLoad(e, t) {
        const { length: o } = e[t].data;
        let i = 0;
        for (let r = 0; r < 12; r++) {
          i === o && (i = 0);
          const a = document.createElement("div");
          a.className = `dash dash${r + 1}`;
          const l = `dash-${r + 1}`;
          (a.id = l),
            document.getElementById("wheelContainer").appendChild(a),
            (document.getElementById(l).style.fontFamily =
              e[t].open.props.offerFont),
            e[t].dashColorLight &&
              (document.getElementById(l).style.color =
                (r + 1) % 2 == 0 ? e[t].dashColorLight : e[t].dashColorDark);
          const s = document.createElement("div");
          (s.innerHTML = `${e[t].data[i].text}`),
            (s.className = "dashInner"),
            document.getElementById(l).appendChild(s),
            window.innerWidth < 767
              ? ((document.getElementById(l).style.top = "85%"),
                (document.getElementById(l).style.left = "12.5vh"))
              : ((document.getElementById(l).style.top = "80%"),
                (document.getElementById(l).style.left = "19vh")),
            (i += 1);
        }
      }
      window.addEventListener("message", (e) => {
        try {
          let o;
          if (e.detail && e.detail.EUCustomer) o = JSON.parse(e.detail.data);
          else if (e.detail && e.detail.isWA) {
            o = JSON.parse(e.detail.data);
            axios.post("https://app.bitespeed.co/fbWebhook", {
              object: "page",
              channel: "WA",
              entry: [
                {
                  id: globalWAPageId[0],
                  time: new Date().getTime(),
                  messaging: [
                    {
                      recipient: {
                        id: globalWAPageId[0],
                      },
                      timestamp: new Date().getTime(),
                      sender: {
                        id: e.detail.phoneNo,
                      },
                      optin: {
                        ref: o.join("."),
                      },
                    },
                  ],
                },
              ],
            }),
              axios.post(
                "https://app.bitespeed.co/database/api/optinTools/conversions",
                {
                  id: o[0],
                }
              );
          } else o = JSON.parse(e.data);
          try {
            let e = $(`.${o[1]}`).find("#intlPhoneNoContainer");
            e &&
              e.css({
                opacity: 0,
              });
          } catch (e) {}
          if (o[0] && globalPopup[o[0]] && "customerChatWidget" != o[1]) {
            var t = new Date();
            if (
              (t.setFullYear(t.getFullYear() + 1),
              e.detail && e.detail.isWA
                ? (document.cookie =
                    "bitespeedOptedInWA=true;expires=" +
                    t.toUTCString() +
                    ";domain=" +
                    shopDomainStripped +
                    ";path=/")
                : (document.cookie =
                    "bitespeedOptedIn=true;expires=" +
                    t.toUTCString() +
                    ";domain=" +
                    shopDomainStripped +
                    ";path=/"),
              ("masterContainerImageAtTopPhill" != o[1] &&
                "masterContainerImageBehindPhill" != o[1]) ||
                setCookie("displayedPopups", (noRepeat = noRepeat + "+" + o[0])),
              "spinTheWheelContainer" == o[1])
            ) {
              let e = globalPopup[o[0]].completed.props.title.text;
              -1 !== e.indexOf("{OFFER WON}")
                ? setTimeout(() => {
                    let t =
                      e.substr(0, e.indexOf("{OFFER WON}")) +
                      discountText +
                      e.substr(e.indexOf("{OFFER WON}") + 11);
                    $(`#${o[1]}title`).html(t),
                      $(`#${o[1]}title`).css({
                        color: globalPopup[o[0]].completed.props.title.color,
                        "font-family":
                          globalPopup[o[0]].completed.props.title.fontFamily,
                      });
                  }, 3e3)
                : ($(`#${o[1]}title`).html(
                    globalPopup[o[0]].completed.props.title.text
                  ),
                  $(`#${o[1]}title`).css({
                    color: globalPopup[o[0]].completed.props.title.color,
                    "font-family":
                      globalPopup[o[0]].completed.props.title.fontFamily,
                  })),
                setTimeout(() => {
                  $(`#${o[1]}text`).html("Discount Code - " + discountCode);
                }, 3e3),
                $(`#${o[1]}text`).css({
                  color: globalPopup[o[0]].completed.props.text.color,
                  "font-family":
                    globalPopup[o[0]].completed.props.text.fontFamily,
                }),
                $(`#${o[1]}wheelLogo`).attr(
                  "src",
                  globalPopup[o[0]].completed.props.wheelLogoUrl
                ),
                $(`#${o[1]}heroLogo`).attr(
                  "src",
                  globalPopup[o[0]].completed.props.heroLogo
                ),
                spin(globalDegree);
            } else
              $(`#${o[1]}title`).html(
                globalPopup[o[0]].completed.props.title.text
              ),
                $(`#${o[1]}title`).css({
                  color: globalPopup[o[0]].completed.props.title.color,
                  "font-family":
                    globalPopup[o[0]].completed.props.title.fontFamily,
                }),
                "Yes" == globalPopup[o[0]].discountOption
                  ? ($(`#${o[1]}subtitle`).html(
                      globalPopup[o[0]].generalSettings.discountCode
                    ),
                    $(`#${o[1]}subtitle`).css({
                      "font-size":
                        globalPopup[o[0]].completed.props.subtitle.fontSize +
                        "vh",
                    }))
                  : $(`#${o[1]}subtitle`).html(
                      globalPopup[o[0]].completed.props.subtitle.text
                    ),
                $(`#${o[1]}subtitle`).css({
                  color: globalPopup[o[0]].completed.props.subtitle.color,
                  "font-family":
                    globalPopup[o[0]].completed.props.subtitle.fontFamily,
                }),
                $(`#${o[1]}text`).html(
                  globalPopup[o[0]].completed.props.text.text
                ),
                $(`#${o[1]}text`).css({
                  color: globalPopup[o[0]].completed.props.text.color,
                  "font-family":
                    globalPopup[o[0]].completed.props.text.fontFamily,
                  "font-size":
                    globalPopup[o[0]].completed.props.text.fontSize + "vh",
                }),
                $(`#${o[1]}mainImage`).css({
                  "background-image": `url(${
                    globalPopup[o[0]].completed.props.imageUrl
                  })`,
                }),
                $(`#${o[1]}popupDiv`).css({
                  "background-image": `url(${
                    globalPopup[o[0]].completed.props.imageUrl
                  })`,
                }),
                "masterContainerImageBehindPhill" == o[1] &&
                  $("#popupImageAtPillClick").css({
                    "background-image": `url(${
                      globalPopup[o[0]].completed.props.imageUrl
                    })`,
                  }),
                $(`#${o[1]}textContainer`).css({
                  "background-color":
                    globalPopup[o[0]].completed.props.content.backgroundColor,
                });
            try {
              axios.post("https://app.bitespeed.co/redis/conversionFBStatus", {
                fbLoggedInStatus: fbLoggedInStatus,
              });
            } catch (e) {
              console.log("Error posting FB status on s");
            }
          }
        } catch (e) {}
      });
    };
    console.log("worked", isFb)
    if (isFb) return FacebookFunc;
    else return whatsappFunc;
  };
  
  (async function () {
    loadScript(
      "https://unpkg.com/axios/dist/axios.min.js",
      async () => {
    const isFb = await getIsFb();
    const script = pickScript(isFb);
    script();
      })
  })();