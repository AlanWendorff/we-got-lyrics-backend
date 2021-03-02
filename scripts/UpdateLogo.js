const FirebaseConfig  = require('../config/FirebaseConfig');

const updateLogo = (data) =>{
    const database = FirebaseConfig();
    let pathsDatabase = database.ref('paths').once('value').then(function (snapshot) {
        let responseOfDatabase = snapshot.val();
        let pathsDatabase = Object.values(responseOfDatabase);
        return pathsDatabase;
    }); 

    pathsDatabase.then(pathsDatabase => {
        data.map(match => {
            let {opponents} = match;
            if (opponents.length !== 0) {
                opponents.map(opponent => {
                    let {image_url, name} = opponent.opponent;
                    if (name) {
                        const teamDatabase = pathsDatabase.find(element => element.name === name);
                        if (teamDatabase !== undefined) {
                            if (image_url !== null) {
                                if (teamDatabase.img !== image_url) {
                                    let query = database.ref().child('paths').orderByChild("name").equalTo(name);
                                        query.once("child_added", function(snapshot) {
                                        snapshot.ref.update({ img: image_url })
                                    });
                                }
                            }
                        }
                    }
                })
            }
        }) 
    });
}

module.exports = updateLogo;