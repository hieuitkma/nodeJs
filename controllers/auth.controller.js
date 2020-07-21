const db = require('../db');
const { values } = require('../db');

// DN login
module.exports.login = (req, res) => {
    res.render('auth/login');
};

// kiem tra thong tin gui di POST
module.exports.postLogin = (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    let user = db.get('users').find({ email: email }).value();  // Kiem tra xem co email hay chua

    // Neu chua co user, render lai trang kem theo loi
    if(!user) {
        res.render('auth/login', {  
            errors: [
                'User does not exist.'
            ],
            values: req.body
        });
        return;
    }

    // Neu co ID nhung dien sai mk
    if(password !== user.password) {
        res.render('auth/login', {
            errors: [
                'Wrong password.'
            ],
            values: req.body
        });
        return;
    }

    //set cookie
    res.cookie('userId', user.id);
    res.redirect('/users');
};