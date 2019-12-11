var axios = require('axios');

const getsyn = (words) => {
    return words[Math.floor(Math.random() * words.length)]
}

const index = (req, res) => {
    res.render('index', { title: "Babbs Generator" });
};

const BHL_KEY = process.env.BHL_KEY;

const nickname = (req, res) => {

    let randPSyn = "";
    let randNSyn = "";

    axios.all([
        axios.get("https://words.bighugelabs.com/api/2/" + BHL_KEY + "/" + req.body.ptraits + "/json"),
        axios.get("https://words.bighugelabs.com/api/2/" + BHL_KEY + "/" + req.body.ntraits + "/json")
    ]).then((responses) => {

        randPSyn = getsyn(responses[0].data.adjective.syn);
        console.log(req.body.fname + ", the " + randPSyn.toUpperCase());

        randNSyn = getsyn(responses[1].data.adjective.syn);
        console.log(req.body.fname + ", the " + randNSyn.toUpperCase());

        res.render('results', {
            title: "Nickname Results",
            nickname: req.body.fname +", the " + randPSyn.toUpperCase() +
                ", " + randNSyn.toUpperCase() + " " + req.body.lname
        });
    })
        .catch((error) => {
            console.log(error);
        })
}

module.exports = {
    index,
    nickname
}
