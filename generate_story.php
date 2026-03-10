<!-- Берёт имя персонажа из POST.
Отправляет запрос к Gemini API.
Получает сгенерированный текст.
Возвращает JSON с полем text. -->


<?php
header('Content-Type: application/json');

// Подключаем ключ
require 'config.php';

// Получаем данные с запроса (можно передать имя персонажа и т.д.)
$characterName = $_POST['character_name'] ?? 'Hero';

// Ссылка на Gemini API
$url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" . $GEMINI_API_KEY;

// Формируем запрос к API
$data = [
    "prompt" => [
        [
            "content" => "Create a Skyrim character backstory for a hero named $characterName. Make it interesting, detailed, and in a few sentences."
        ]
    ],
    "temperature" => 0.7,
    "candidate_count" => 1
];

$options = [
    "http" => [
        "header" => "Content-Type: application/json\r\n",
        "method" => "POST",
        "content" => json_encode($data)
    ]
];

$context = stream_context_create($options);
$result = file_get_contents($url, false, $context);

if ($result === FALSE) {
    echo json_encode(["text" => "Error generating story"]);
    exit;
}

$json = json_decode($result, true);
$generatedText = $json['candidates'][0]['content'] ?? "No story generated";

echo json_encode(["text" => $generatedText]);
