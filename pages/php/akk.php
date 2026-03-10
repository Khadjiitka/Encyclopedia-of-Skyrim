<?php

$email = $_POST['email'] ?? '';
$name = $_POST['character_name'] ?? 'Unknown Hero';
$gender = $_POST['gender'] ?? '';
$race = $_POST['race'] ?? '';
$stone = $_POST['standing_stone'] ?? '';
$city = $_POST['city'] ?? '';
$weapon_class = $_POST['weapon_class'] ?? '';
$weapon_type = $_POST['weapon_type'] ?? '';
$weapon_material = $_POST['weapon_material'] ?? '';
$backstory = $_POST['backstory'] ?? '';

$guilds = $_POST['guilds'] ?? [];

$avatar = "/pic/ava.png";

if (isset($_FILES['avatar']) && $_FILES['avatar']['name'] != "") {
    $target = "../../pic/" . basename($_FILES["avatar"]["name"]);
    move_uploaded_file($_FILES["avatar"]["tmp_name"], $target);
    $avatar = $target;
}

?>

<!DOCTYPE html>
<html>

<head>

    <title>Character Profile</title>

    <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&family=IM+Fell+English+SC&display=swap"
        rel="stylesheet">

    <style>
        body {
            background: url("/pic/BgGener.jpg") no-repeat center center/cover;
            font-family: 'Cinzel', serif;
            color: white;
            text-align: center;
            padding-top: 50px;
        }

        body::before {
            content: "";
            position: fixed;
            inset: 0;
            background: rgba(0, 0, 0, 0.75);
            z-index: -1;
        }

        .card {
            width: 550px;
            margin: auto;
            background: rgba(20, 20, 20, 0.85);
            border: 1px solid #777;
            border-radius: 10px;
            padding: 30px;
        }

        .avatar {
            width: 160px;
            height: 160px;
            border-radius: 50%;
            border: 3px solid #aaa;
            object-fit: cover;
            margin-bottom: 20px;
        }

        h1 {
            font-family: "IM Fell English SC", serif;
            letter-spacing: 3px;
        }

        .info {
            margin-top: 15px;
            font-size: 18px;
            text-align: left;
        }

        .section {
            margin-top: 20px;
        }

        .section-title {
            font-family: "IM Fell English SC", serif;
            font-size: 22px;
            margin-bottom: 8px;
            border-bottom: 1px solid #777;
            padding-bottom: 4px;
        }

        .backstory {
            font-style: italic;
            line-height: 1.6;
        }

        .buttons {
            margin-top: 30px;
            display: flex;
            justify-content: center;
            gap: 15px;
            flex-wrap: wrap;
        }

        button {
            padding: 12px 20px;
            background: linear-gradient(to right, #aaa, #ddd);
            border: none;
            border-radius: 6px;
            font-size: 15px;
            cursor: pointer;
        }

        button:hover {
            transform: scale(1.05);
        }
    </style>

</head>

<body>

    <div class="card">

        <img src="<?php echo $avatar; ?>" class="avatar">

        <h1><?php echo htmlspecialchars($name); ?></h1>

        <div class="info">

            <div class="section">
                <div class="section-title">Basic Info</div>

                <p><b>Email:</b> <?php echo htmlspecialchars($email); ?></p>
                <p><b>Race:</b> <?php echo $race; ?></p>
                <p><b>Gender:</b> <?php echo $gender; ?></p>
                <p><b>City:</b> <?php echo $city; ?></p>
                <p><b>Standing Stone:</b> <?php echo $stone; ?></p>

            </div>

            <div class="section">
                <div class="section-title">Weapon</div>

                <p><b>Class:</b> <?php echo $weapon_class; ?></p>
                <p><b>Type:</b> <?php echo $weapon_type; ?></p>
                <p><b>Material:</b> <?php echo $weapon_material; ?></p>

            </div>

            <?php if (!empty(array_filter($guilds))): ?>

                <div class="section">
                    <div class="section-title">Guilds</div>

                    <?php
                    foreach ($guilds as $g) {
                        if ($g != "") {
                            echo "<p>$g</p>";
                        }
                    }
                    ?>

                </div>

            <?php endif; ?>

            <div class="section">
                <div class="section-title">Backstory</div>

                <div class="backstory">
                    <?php echo nl2br(htmlspecialchars($backstory)); ?>
                </div>

            </div>

        </div>


        <div class="buttons">

            <form action="/index.html">
                <button>Main Page</button>
            </form>

            <button>Edit Character</button>

            <button>Delete Character</button>

        </div>

    </div>

</body>

</html>