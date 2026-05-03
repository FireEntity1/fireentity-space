<!DOCTYPE html>

<html lang="en">
<head>
    <link rel="stylesheet" href="index.css">
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Kalnia+Glaze:wdth@102.2&family=Tektur:wght@400..900&display=swap" rel="stylesheet">
    <title>fireentity.space</title>
</head>
<body>
    <h1 class="font">fireentity.space</h1>
    <p class="tektur">Welcome to my site!</p>
    <div class="container">
    <?php for ($i = 0; $i < 5; $i++) { ?>
        <?php for ($j = 0; $j < $i; $j++) { ?>
            <?php include "box.php"; ?>
        <?php } ?>
    <?php } ?>
</div>
</body>
</html>
