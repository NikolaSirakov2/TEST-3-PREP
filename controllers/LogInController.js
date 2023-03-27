class LogInController {

    constructor(userManager) {
        this.userManager = userManager;
    }

    render = () => {
        
        let link = getEl("link")
        let header = document.getElementById("headerText");
        let userManag = getEl("userManag");

        link.innerText = "";
        header.innerText = "";
        userManag.innerText = "Register";
        userManag.href = "#register";
        
        let form = getEl("loginForm");

        form.onsubmit = (event) => {
                event.preventDefault();

                const {username: {value: username}, 
                    password: {value: password}, 
                    } = event.currentTarget;

                console.log(username, password);

                this.userManager.logIn(username, password)
                .then(data => {
                    link.innerText = "Heroes of STAR WARS";
                    userManag.innerText = "LogOut";
                    location.hash = 'people';
                    header.innerText = `Hi, ${username}! Welcome to STAR WARS!`;
                })
                .catch(error => {
                    alert(error)
                })

                form.reset();
        }
    }
}