  //משתמש חדש
  function register() {
    var firstName = document.getElementById('firstName');
    var lastName = document.getElementById('lastName');
    var email = document.getElementById('email');
    var pw = document.getElementById('pw');
    var number = document.getElementById('tel');
    var flag = true, emailFlag = false;
    var i;
    //בדיקות תקינות
    if (firstName.value.length == 0 || email.value.length == 0 || pw.value.length == 0) {
        alert('שדות חובה ריקים');
        flag = false;
        event.preventDefault();
    }
    else if (pw.value.length < 8 || pw.value.length > 16) {
        alert('חובה סיסמה באורך שמונה תווים');
        flag = false;
        event.preventDefault();
    }
    else {
        for (i = 0; i < email.value.length && !emailFlag; i++) {
            if (email.value[i] == '@')
                emailFlag = true;
        }
           if (!emailFlag) {
            alert('כתובת מייל אינה תקינה');
            flag = false;
            event.preventDefault();
        }
        if (number.value.length != 10) {
            alert('מספר טלפון לא תקין');
            flag = false;
            event.preventDefault();
        }
    }
    //אם הנתונים תקינים - מכניס את המידע למערך
    if (flag) {
        var users = JSON.parse(localStorage.getItem('Users')) || [];
        //בדיקת האם כבר קיימת כתובת מייל כזאת
        for (i = 0; i < users.length; i++) {
            if (users[i].email == email.value) {
                flag = false;
                alert('כתובת מייל בשימוש');
                event.preventDefault();
                break;
            }
        if (users[i].pw == pw.value) {
                    flag = false;
                    alert('הסיסמא כבר שמורה במערכת');
                    event.preventDefault();
                    break;
                }
        }
        var userData = {
            firstName:firstName.value,
            lastName:lastName.value,
            email: email.value,
            pw: pw.value,
        };
        users.push(userData);
        localStorage.name = email.value;// שמור את שם המשתמש בדף המשחק
        if (flag) {
            localStorage.setItem('Users', JSON.stringify(users));
            alert("Welcome, " +users[i].firstName +" "+ users[i].lastName+"!");
            window.location.href ="../html/levels.html";
        }
    }
}

