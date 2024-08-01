<?php
// Configurações de conexão com o banco de dados
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "jogodb";

// Cria conexão
$conn = new mysqli($servername, $username, $password, $dbname);

// Verifica a conexão
if ($conn->connect_error) {
    die("Conexão falhou: " . $conn->connect_error);
}

// Função para gerar um ID aleatório de 10 números
function generateUniqueID($conn)
{
    do {
        $id = str_pad(rand(0, 9999999999), 10, '0', STR_PAD_LEFT);
        $sql = "SELECT id FROM alunos WHERE id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("s", $id);
        $stmt->execute();
        $result = $stmt->get_result();
        $exists = $result->num_rows > 0;
        $stmt->close();
    } while ($exists);

    return $id;
}

// Obtém os dados do formulário
$idade = $_POST['idade'];
$usuario = $_POST['usuario'];
$municipio = $_POST['municipio'];
$estado = $_POST['estado'];
$escola = $_POST['escola'];
$ano = $_POST['ano'];

// Verifica se o nome de usuário já existe
$sql = "SELECT id FROM alunos WHERE usuario = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $usuario);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    echo "<script>
        alert('Nome de usuário já está sendo usado. Por favor, escolha outro.');
        window.location.href = '../html/registro.html';
      </script>";
} else {
    // Gera um ID único
    $id = generateUniqueID($conn);

    // Insere os dados no banco de dados
    $sql = "INSERT INTO alunos (id, idade, usuario, municipio, estado, escola, ano) VALUES (?, ?, ?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("iisssss", $id, $idade, $usuario, $municipio, $estado, $escola, $ano);

    if ($stmt->execute()) {
        echo "<script>
        alert('Conta criada com sucesso!');
        window.location.href = '../index.html';
      </script>";
    } else {
        echo "Erro ao inserir registro: " . $stmt->error;
    }

    $stmt->close();
}

$conn->close();
