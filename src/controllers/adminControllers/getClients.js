const getClients = (req, res) => {
    res.render("clients.ejs", {
        data: {
            page: "clients",
            title: "Khách thuê",
            // admin_avatar: userInfo.avatar_url
        }
    });
}

export default getClients; // export to adminControllers/