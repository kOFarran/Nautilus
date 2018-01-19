<!DOCTYPE html>
<html>
    <head id="pageHead">
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
        <link id="shtyle" rel="stylesheet" href="light_theme.css">
        <script id='lvl' src=""></script>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.0/jquery.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
        <script>


            function message(msg){
                document.getElementById("msg").innerHTML = msg;
            }
            function loadDoc(type) {
                document.getElementById("content").innerHTML = "";
                var xhttp = new XMLHttpRequest();
                document.getElementById("msg").innerHTML = 
                    '<div class="alert alert-info alert-dismissable"><a href="#" class="close" data-dismiss="alert" aria-label="close">×</a><strong>Loading!</strong> Please wait...</div>';
                xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    console.log (this.responseText);
                    document.getElementById("content").innerHTML = this.responseText;
                    document.getElementById("msg").innerHTML = '<div class="alert alert-success alert-dismissable"><a href="#" class="close" data-dismiss="alert" aria-label="close">×</a>Content <strong>Successfully</strong> loaded!</div>';
                }else if (this.readyState == 4 && this.status == 403){
                    document.getElementById("msg").innerHTML = 
                    '<div class="alert alert-warning alert-dismissable"><a href="#" class="close" data-dismiss="alert" aria-label="close">×</a>Content <strong>failed</strong> to load. Reason given by server: <strong>Forbidden</strong></div>';
                   
                }
            };
            xhttp.open("GET", type, true);
            xhttp.send();
            }
            function switch_content(con){
                switch(con){
                    case 'lvl2':                        
                        document.getElementById("lvl").remove();
                        var pageHead = document.getElementById("pageHead");
                        var scriptSource = document.createElement ("script");
                        scriptSource.setAttribute ("src", "nautilus_lvl2.js");
                        scriptSource.setAttribute ("id", "lvl");
                        pageHead.appendChild (scriptSource);
                        loadDoc ("lvl2.txt");
                        console.log (document.getElementById("lvl").getAttribute ("src"));                        
                        $("#lvl2canvas").css("background-image", "url(Underwater2.jpg)");
                        message('<div class="alert alert-info alert-dismissable"><a href="#" class="close" data-dismiss="alert" aria-label="close">×</a><strong>Level 2</strong> selected</div>');
                        break;
                    case 'lvl3':                        
                        document.getElementById("lvl").remove();
                        var pageHead = document.getElementById("pageHead");
                        var scriptSource = document.createElement ("script");
                        scriptSource.setAttribute ("src", "nautilus_lvl3.js");
                        scriptSource.setAttribute ("id", "lvl");
                        pageHead.appendChild (scriptSource);
                        loadDoc ("lvl3.txt");
                        console.log (document.getElementById("lvl").getAttribute ("src"));                        
                        $("#lvl3canvas").css("background-image", "url(Underwater3.jpeg)");
                        message('<div class="alert alert-info alert-dismissable"><a href="#" class="close" data-dismiss="alert" aria-label="close">×</a><strong>Level3</strong> selected</div>');
                        break;
                    default:                        
                        document.getElementById("lvl").remove();
                        var pageHead = document.getElementById("pageHead");
                        var scriptSource = document.createElement ("script");
                        scriptSource.setAttribute ("src", "nautilus_lvl1.js");
                        scriptSource.setAttribute ("id", "lvl");
                        pageHead.appendChild (scriptSource);
                        loadDoc ("lvl1.txt");
                        console.log (document.getElementById("lvl").getAttribute ("src"));                        
                        $("#lvl1canvas").css("background-image", "url(Underwater1.jpg)");
                        message('<div class="alert alert-info alert-dismissable"><a href="#" class="close" data-dismiss="alert" aria-label="close">×</a><strong>Level 1</strong> selected</div>');
                        break;
                }
                

            }
        </script>
    </head>
    <body>
        <!--<div class="jumbotron text-center">
            <h1>CMS 2</h1>
        </div> -->
        <div class="container">
            <div class="mainContent">
                <div class="row">
                    <div class="col-sm-4">
                        <div class="lvl1">
                            <button type="button" class="btn btn-primary" onclick="switch_content('lvl1')">Level 1</button>
                        </div>
                    </div>
                    <div class="col-sm-4">
                        <div class="lvl2">
                            <button type="button" class="btn btn-primary" onclick="switch_content('lvl2')">Level 2</button>
                        </div>
                    </div>
                    <div class="col-sm-4">
                        <div class="lvl3">
                            <button type="button" class="btn btn-primary" onclick="switch_content('lvl3')">Level 3</button>
                        </div>
                    </div>
                        
                </div>
                <div class="contentbox" id="content">
                        <canvas width="1400" height="650"></canvas>
                    </div>
                <!-- <div class="row"><br>
                    <div class="col-sm-4">
                        <div class="lighttheme">
                            <button type="button" class="btn btn-primary" onclick="switch_css('light')">Light Theme</button>
                        </div>
                    </div>
                    <div class="col-sm-4">
                        <div class="darktheme">
                            <button type="button" class="btn btn-primary" onclick="switch_css('dark')">Dark Theme</button>
                        </div>
                    </div>
                    <div class="col-sm-4">
                        <div class="printtheme">
                            <button type="button" class="btn btn-primary" onclick="switch_css('print')">Print Layout</button>
                        </div>
                    </div>
                </div>-->
                <div class="row">
                    <div class="col-sm-12">
                        <div class="message">
                            <p id="msg">Message</p>
                        </div>
                    </div>
                </div>
                <form method="post">
                    <input type="text" name="username" placeholder="username" placeholder="username">
                    <input name="score" id="score" disabled>
                    <input type="submit" value="Submit">
                </form>
                <?php $conn_id = mysql_connect ('', '', '');//Passwords etc. to connect to the database
                    if ($conn_id === false) {
                    die("Connection Failed:" . mysql_connect_error());
                    }
                    echo "Connected Successfully<br>";
                    mysql_select_db ('', $conn_id);//add the name of the selected database
                    
                    if(isset($_REQUEST['username'])&&isset($_REQUEST['score'])){
                    $FNAME= $_REQUEST['username'];
                    $LNAME= $_REQUEST['score'];
                    
                    $Query = "INSERT INTO users (username, score)"//assuming the db is called 'users'
                        ."Values ('".$USRNM."', '".$SCORE."' )";
                            
                    if( mysql_query ($Query)){
                    echo "Score added!";
                    } else{
                    echo "ERROR: Unable to execute $Query" . mysql_error($conn_id);//or print("Cannot Execute");
                    }
                    mysql_close($conn_id);
                    }

                ?>
            </div>
        <div>
    </body>
</html> 
