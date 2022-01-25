document.getElementById("sign-out").onclick = function () {
    //Delete cookie
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    location.href = "signin";
};
