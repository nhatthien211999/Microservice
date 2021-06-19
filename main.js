    // Your web app's Firebase configuration
    const firebaseConfig = {
        apiKey: "AIzaSyBLYty07Sjrku__ysTND6HbuB5MVhesAt4",
        authDomain: "ktpm-4a77d.firebaseapp.com",
        databaseURL: "https://ktpm-4a77d-default-rtdb.asia-southeast1.firebasedatabase.app",
        projectId: "ktpm-4a77d",
        storageBucket: "ktpm-4a77d.appspot.com",
        messagingSenderId: "415093263193",
        appId: "1:415093263193:web:40fc16b3cb85b4b3a91a48"
      };
      // Initialize Firebase
      firebase.initializeApp(firebaseConfig);
  /* helper methods */

const dbRef = firebase.database().ref();

const btnLogin_click = async () =>{
    const user = {
        'email': document.getElementById('txtEmail').value,
        'password': document.getElementById('txtPassword').value
    }
    if(await check_login(user)){
        window.location="http://127.0.0.1:5500/Bird.html";
    }
    else{
        document.getElementById("err").innerHTML = "<b>Đăng Nhập Thất Bại</b>";
    }
}

const btnRegister_click = () =>{
    const user = {
        'email': document.getElementById('txtEmail').value,
        'password': document.getElementById('txtPassword').value
    }

    console.log(user);
    addNew(user);
}

const addNew = async (newUser) => {

    if(await check_email(newUser.email)){
        try{
            document.getElementById("err").innerHTML = "";
            document.getElementById("success").innerHTML = "<b>Đăng ký thành công</b>";
            dbRef.child("users").push(newUser);
        }
        catch(err){
            console.log(err);
            document.getElementById("success").innerHTML = "";
            document.getElementById("err").innerHTML = "<b>Đăng ký thất bại</b>";
        }
    }else{
        document.getElementById("success").innerHTML = "";
        document.getElementById("err").innerHTML = "<b>Đăng ký thất bại</b>";
    }
}

const check_email = async (email) => {
    let key = '';
    await dbRef.child("users").once("value", (snapshot) => {
      snapshot.forEach(element => {
        let user = element.val();
        if(user.email === email){
            key = element.key;
            // console.log('for: ' + key);
        }
      });
    });
    
    // console.log('after ' + key);

    if(key !== ''){
        // console.log(key);
        return false;
    }else{
        return true;
    }   
}

const check_login = async (userLogin) => {
    let key = '';
    await dbRef.child("users").once("value", (snapshot) => {
      snapshot.forEach(element => {
        let user = element.val();
        if(user.email === userLogin.email && user.password === userLogin.password){
            key = element.key;
            // console.log('for: ' + key);
        }
      });
    });
    
    // console.log('after ' + key);

    if(key === ''){
        
        return false;
    }else{

        return true;
    }   
   
}

