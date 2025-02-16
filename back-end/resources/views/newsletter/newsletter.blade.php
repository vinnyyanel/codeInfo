<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nouveau Poste - Newsletter</title>
    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f8f9fa;
            padding: 20px;
        }
        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .email-header {
            text-align: center;
            margin-bottom: 20px;
        }
        .email-header h1 {
            color: #007bff;
            font-size: 24px;
            font-weight: bold;
        }
        .email-body {
            margin-bottom: 20px;
        }
        .email-body p {
            font-size: 16px;
            line-height: 1.6;
            color: #333333;
        }
        .email-footer {
            text-align: center;
            margin-top: 20px;
            font-size: 14px;
            color: #666666;
        }
        .btn-primary {
            background-color: #007bff;
            border-color: #007bff;
            padding: 10px 20px;
            font-size: 16px;
            border-radius: 5px;
            text-decoration: none;
            color: #ffffff;
        }
        .btn-primary:hover {
            background-color: #0056b3;
            border-color: #0056b3;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <!-- En-tête -->
        <div class="email-header">
            <h1>Nouveau Poste</h1>
        </div>

        <!-- Corps de l'email -->
        <div class="email-body">
            <p>{{ $titre }}</p>
            <p>Découvrez plus de détails en visitant notre site.</p>
            <a href="http://localhost:4200/post/{{ $id }}" class="btn btn-primary">Voir le poste</a>
        </div>

        <!-- Pied de page -->
        <div class="email-footer">
            <p>Merci de faire partie de notre communauté !</p>
            <p>Code <b class="text-info">I</b>nfo</p>
         </div>
    </div>

    <!-- Bootstrap JS (optionnel, si tu as besoin de fonctionnalités JS) -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
