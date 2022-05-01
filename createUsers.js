export function createUsers(){

    let username = req.body.username;
    let email = req.body.email;
    let age = req.body.age;
    let avatar = 'https://ui-avatars.com/api/?name=' + username
    db.collection("users").insertOne({
        
        username: username,
        email: email,
        age: age,
        avatar: avatar
    }, function(err) {
        if (err) throw err;
        console.log("User created successfully : " + username);
        //db.close();
        res.redirect('/');
      });

    }