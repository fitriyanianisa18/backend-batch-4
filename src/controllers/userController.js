exports.getUser = (req, res, next) => {
    const user1 = {
        nama: "Anisa",
        asal: "Bandung",
        pekerjaan: "admin"
    }
    res.send(user1);
};

exports.createUser = (req, res, next) => {
    const data = req.body
    
    data.umur = 23

    res.send(data)
}