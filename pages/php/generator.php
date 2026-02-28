<?php
session_start();

// Проверяем, что форма отправлена методом POST
if ($_SERVER["REQUEST_METHOD"] === "POST") {

    // Проверяем существование полей
    if (isset($_POST["email"]) && isset($_POST["password"])) {

        $email = trim($_POST["email"]);
        $password = trim($_POST["password"]);

        // Простая проверка email
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            die("Invalid email format");
        }

        // Минимальная длина пароля
        if (strlen($password) < 6) {
            die("Password must be at least 6 characters");
        }

        /*
        Здесь обычно проверка из базы данных.
        Но пока сделаем простую проверку:
        */

        $correctEmail = "admin@skyrim.com";
        $correctPassword = "dragonborn123";

        if ($email === $correctEmail && $password === $correctPassword) {

            // Сохраняем пользователя в сессию
            $_SESSION["user"] = $email;

            // Перенаправление
            header("Location: ../pages/akk.html");
            exit();

        } else {
            echo "Incorrect email or password";
        }

    } else {
        echo "Form fields missing";
    }

} else {
    echo "Access denied";
}
?>