<?php
$host = 'localhost';
$username = 'lab5_user';
$password = 'password123';
$dbname = 'world';

$conn = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password);

//$context= filter_input(INPUT_GET,"context",FILTER_SANITIZE_STRING);

$context = $_GET['context'];
$countryName = htmlspecialchars($_GET['countryName']);

$stmt = $conn->query("SELECT * FROM countries");

if($context =="cities"){
  $stmt = $conn->prepare("SELECT ci.name, ci.district, ci.population FROM cities ci INNER JOIN countries co ON ci.country_code = co.code WHERE co.name = :countryName");
}
else{
  $stmt = $conn->prepare("SELECT name, continent,independence_year, head_of_state FROM countries WHERE name LIKE :countryName");
}

$countryName = $context == "cities" ? $countryName : "%$countryName%";
$stmt->bindParam(":countryName", $countryName);
$stmt->execute();

$results = $stmt->fetchAll(PDO::FETCH_ASSOC);

exit(json_encode($results));
?>
<ul>
<?php foreach ($results as $row): ?>
  <li><?= $row['name'] . ' is ruled by ' . $row['head_of_state']; ?></li>
<?php endforeach; ?>
</ul>
