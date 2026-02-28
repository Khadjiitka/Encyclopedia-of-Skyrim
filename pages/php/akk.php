<?php
session_start();

if (!isset($_SESSION["user"])) {
    header("Location: ../index.html");
    exit();
}
?>

<!DOCTYPE html>
<html>

<head>
    <title>Your Account</title>
</head>

<body>

    <h1>Welcome to Skyrim, <?php echo $_SESSION["user"]; ?>!</h1>

    <a href="../php/logout.php">Logout</a>

</body>

</html>