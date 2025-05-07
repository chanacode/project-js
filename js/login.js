 //משתמש קייים
 function check() {
    var exist = false;
    var userName = document.getElementById('userName');//name of user
    var userPw = document.getElementById('userPw');//name of password
    var users = JSON.parse(localStorage.getItem('Users')) || [];//users -keep in local storage
    for (var i = 0; i < users.length; i++) {//goes through the array
        if (users[i].email == userName.value && users[i].pw == userPw.value) {//check if the user is in the game
            localStorage.name = userName.value;//save user name to game page
            exist = true;
            break;
        }
    }
    if (exist == false) {//
        alert("פרטים לא מזוהים");//if one of the details not correct
        event.preventDefault();
    }
    else {
        alert("Welcome, " +users[i].firstName +" "+ users[i].lastName+"!");
        window.location.href = "../html/levels.html";
    }
}

 ///כאשר המשתמש לוחץ על התחברות
// פןנקציה שבודקת האם המשתמש נכנס כבר בעבר למערכת
function login() {
    sound();
    var User_name = document.getElementById("txt-input").value;
    var password = document.getElementById("pwd").value;
    //אם המתשמש לא הכניס שם וסיסמה שולח אותו לפונקצית התחברות מחדש
    if (User_name == '' || password == '') {
        alert("את/ה צריכ/ה להכניס שם משתמש וסיסמה");
        return;
    }
    //בודק האם המשתמש קיים כבר במערכת 
    var retrievedObject = localStorage.getItem('object');
    var exsist_user = false;
    if (retrievedObject != null) {
        var retrievedObjectJSON = JSON.parse(retrievedObject);
        retrievedObjectJSON.forEach(element => {
            if (element.userName == User_name && element.pass ==password) {
                exsist_user = true;
                alert(`שלום לך`);
                window.location.href = "../html/levels.html"; 
                return;
            }
        });
    }
    if (!exsist_user)
        alert(`אינך מחובר למערכת , אנא התחבר קודם`)
}

//כאשר המשתמש לוחץ על רישום למערכת
function signUp() {
    sound();
    var User_name = document.getElementById("txt-input").value;
    var Password = document.getElementById("pwd").value;
    var item = { "userName": User_name, "pass": Password };

    var retrievedObject = localStorage.getItem('object');
    //אם המתשמש לא הכניס שם וסיסמה שולח אותו לפונקצית התחברות מחדש
    if (User_name == '' || Password == '') {
        alert("את/ה צריכ/ה להכניס שם משתמש וסיסמה");
        return;
    }
    //נרשמת בהצלחה למערכת!
    if (retrievedObject == null) {
        localStorage.setItem('object', JSON.stringify([item]));
        alert(`נרשמת בהצלחה`);
        var url = "../html/game.html";
        window.location = url;
    }
    //למקרה שהמשתמש הינו הראשון שנרשם
    else {
        var not_unique = false;
        var retrievedObjectJSON = JSON.parse(retrievedObject);
        retrievedObjectJSON.forEach(element => {

            //בדיקה האם קיים משתמש בשם זה
            if (element.userName == User_name) {
                not_unique = true;
                alert(`שם המשתמש כבר קיים במערכת`)
                return;
            }
        });
        //אם לא קיים משתמש באותו השם
        if (!not_unique) {
            retrievedObjectJSON.push(item);
            localStorage.setItem('object', JSON.stringify(retrievedObjectJSON));
            alert(`נרשמת בהצלחה`);
            var url = "../משחק/4line.html";
            window.location = url;
        }
    }
}
function sound(){
    var audio_click = new Audio('../מוזיקה/VideoEditor_20230713_055930.mp3');
    audio_click.play();
}

