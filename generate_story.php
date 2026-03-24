<?php
header('Content-Type: application/json');
// На время отладки можно оставить, но если вылетает ошибка HTML, 
// эти стфроки добавят текст ошибки ПЕРЕД json, что и ломает JS.
error_reporting(0);

require 'config.php'; // Подключаем ключ
// Получаем данные с запроса 
$characterName = $_POST['character_name'] ?? 'Hero';
// Ссылка на Gemini API
$url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" . $GEMINI_API_KEY;

// Формируем запрос к API
$data = [
    "contents" => [
        [
            "parts" => [
                ["text" => "Create a Skyrim character backstory for a hero named $characterName. In English, brief, immersive."]
            ]
        ]
    ]
];

$options = [
    "http" => [
        "header" => "Content-Type: application/json\r\n",
        "method" => "POST",
        "content" => json_encode($data),
        "ignore_errors" => true // Позволяет прочитать текст ошибки от API
    ]
];

$context = stream_context_create($options);
$result = file_get_contents($url, false, $context);

if ($result === FALSE) {
    echo json_encode(["text" => "Server Error"]);
    exit;
}

$json = json_decode($result, true);

// Путь к тексту в ответе Gemini 1.5
$generatedText = $json['candidates'][0]['content']['parts'][0]['text'] ?? "Could not forge a story...";

echo json_encode(["text" => $generatedText]);
