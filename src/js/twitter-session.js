
function TwitterSession(infoURL,authURL,completeAuthURL,logoutURL) {
    this._state = ""; // Current session state ["", "NONE", "AUTHORIZING", "VALID"]
    

    this.infoURL = infoURL || null;
    this.authURL = authURL || null;
    this.logoutURL = logoutURL || null;
    this.completeAuthURL = completeAuthURL || null;

    this.reactThis = null;
    this.noneCallback = null;

    this.getState = function() {
        return this._state;
    }
}

TwitterSession.prototype._setState = function (state,callback,param) {
    if(this._state === state) {
        return;
    }
    // Can check what previous state was in callback before it is overwritten
    if(callback && typeof callback === "function") {
        console.log("TwitterSession - calling callback function before changing state");
        callback(this.reactThis,param);
    }
    console.log("TwitterSession - State changed to: " + state);
    this._state = state;
}

// Call this method after creating a new Twitter session object and setting any options
// It will set state to the proper twitter session state
// If can't get data, but the params on URL are there for step 2 of authentication it will do that and then once again return state
TwitterSession.prototype.init = function (reactThis,validCallback,authCallback,noneCallback) {
    this.noneCallback = noneCallback;
    this.reactThis = reactThis;
    var self = this;
    var xhr = new XMLHttpRequest();
    xhr.open('GET', this.infoURL || 'php/twitterinfo.php');
    xhr.onload = function() {
        if (xhr.status === 200) {
            if(xhr.responseText === "" || xhr.responseText[0] === "<") {
                console.log("TwitterSession - init - No session info");
                // No twitter info in session, proceed to check if we are being called back from twitter API
                if(getParameterByName("oauth_token") && getParameterByName("oauth_verifier")) {
                    self._setState("AUTHORIZING",authCallback);
                    completeAuth(self);
                } else {
                    self._setState("NONE",noneCallback);
                }
            } else {
                console.log("TwitterSession - init - Session exists");
                // TODO: Check json validity?
                var response = JSON.parse(xhr.responseText);
                if(response.errors) {
                    self._setState("NONE",noneCallback);
                } else {
                    self._setState("VALID",validCallback,response);
                }
            }
        }
        else {
            console.log('TwitterSession - init - AJAX Request failed.  Returned status of ' + xhr.status);
            self._setState("NONE",noneCallback);
        }
    };
    xhr.send();

    // Taken from: https://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
    function getParameterByName(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }

    function completeAuth(self) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', (self.completeAuthURL || 'php/twittercompleteauth.php') + '?oauth_token=' + getParameterByName("oauth_token") + "&oauth_verifier=" + getParameterByName("oauth_verifier"));
        xhr.onload = function() {
            if (xhr.status === 200) {
                if(xhr.responseText === "" || xhr.responseText[0] === "<") {
                    console.log("TwitterSession - completeAuth - Checked URL params but they are irrelevant");
                    self._setState("NONE",noneCallback);
                } else {
                    // TODO: Json parse validity
                    var response = JSON.parse(xhr.responseText);
                    if(response.errors) {
                        console.log("TwitterSession - completeAuth - Checked URL params but they are irrelevant");
                        self._setState("NONE",noneCallback);
                    } else {
                        console.log("TwitterSession - completeAuth - Authorization completed successfully");
                        self._setState("VALID",validCallback,response);
                    }
                }
            }
            else {
                console.log('TwitterSession - completeAuth - AJAX Request failed.  Returned status of ' + xhr.status);
                self._setState("NONE",noneCallback);
            }
        };
        xhr.send();
    }
}


TwitterSession.prototype.authorize = function (failCallback) {
    var self = this;
    var xhr = new XMLHttpRequest();
    xhr.open('GET', this.authURL || 'php/twitterauth.php');
    xhr.onload = function() {
        if (xhr.status === 200) {
            if((xhr.responseText !== "") && xhr.responseText[0] !== "<") {
                window.open(xhr.responseText,'_self');
            // } else if (xhr.responseText === "X" || xhr.responseText[0] === "<") {
            //     console.log("TwitterSession - authorize - Can't authorize, there's a server error");
            //     failCallback();
            } else {
                console.log("TwitterSession - authorize - No need to authorize, or can't");
                failCallback(self.reactThis);
            }
        }
        else {
            console.log('TwitterSession - authorize - AJAX Request failed.  Returned status of ' + xhr.status);
        }
    };
    xhr.send();
};

TwitterSession.prototype.logout = function() {
    var self = this;
    var xhr = new XMLHttpRequest();
    xhr.open('GET', this.logoutURL || 'php/twitterlogout.php');
    xhr.onload = function() {
        if (xhr.status === 200) {
            console.log("TwitterSession - logout - Logged out successfully");
            // Don't depend on set state callback argument in case none -> none
            self._setState("NONE", self.noneCallback);
        }
        else {
            console.log('TwitterSession - logout - AJAX Request failed.  Returned status of ' + xhr.status);
        }
    };
    xhr.send();
};

export default TwitterSession;
