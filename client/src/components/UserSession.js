var UserSession = (function () {
    var data = {
        userId: '',
        firstName: '',
        lastName: '',
        isHost: false
    };

    var isSet = false;

    var getData = function () {
        return data;
    };

    var setData = function (newUser) {
        data = newUser;
        isSet = true;
    };

    var unSetData = function () {
        data = {
            userId: '',
            firstName: '',
            lastName: '',
            isHost: false
        };
        isSet = false;
    };

    var isSessionSet = function () {
        return isSet;
    }

    return {
        getData: getData,
        setData: setData,
        unSetData: unSetData,
        isSessionSet: isSessionSet
    }

})();

export default UserSession;