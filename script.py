import threading
import socket
import time
import pyodbc

# Configuración de las básculas
scales = [
    {"id": "Scale 1", "ip": "192.168.1.10", "port": 4001},
    {"id": "Scale 2", "ip": "192.168.1.11", "port": 4001},
]

# Configuración de la base de datos
db_config = {
    "server": "SERVER_IP",
    "database": "NombreBD",
    "username": "Usuario",
    "password": "Contraseña",
}

# Función para conectarse a la base de datos
def connect_to_db():
    conn_str = (
        f"DRIVER={{ODBC Driver 17 for SQL Server}};"
        f"SERVER={db_config['server']};"
        f"DATABASE={db_config['database']};"
        f"UID={db_config['username']};"
        f"PWD={db_config['password']};"
    )
    return pyodbc.connect(conn_str)

# Función para guardar los datos en la base de datos
def save_to_db(scale_id, weight):
    conn = connect_to_db()
    cursor = conn.cursor()
    timestamp = time.strftime("%Y-%m-%d %H:%M:%S")
    query = "INSERT INTO weights (scale_id, timestamp, weight) VALUES (?, ?, ?)"
    cursor.execute(query, (scale_id, timestamp, weight))
    conn.commit()
    conn.close()

# Función para manejar la comunicación con cada báscula
def handle_scale_connection(scale):
    try:
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as sock:
            sock.connect((scale["ip"], scale["port"]))
            print(f"Conexión establecida con {scale['id']} ({scale['ip']}:{scale['port']})")
            
            while True:
                # Comando para solicitar el peso (sin ID)
                command = "S\n"
                sock.sendall(command.encode("utf-8"))
                
                # Recibir respuesta
                response = sock.recv(1024).decode("utf-8")
                print(f"{scale['id']} respondió: {response}")
                
                # Parsear el peso desde la respuesta
                weight = parse_weight(response)
                
                if weight is not None:
                    print(f"{scale['id']} - Peso: {weight} kg")
                    save_to_db(scale["id"], weight)
                
                # Esperar antes de la siguiente solicitud
                time.sleep(1)
    except Exception as e:
        print(f"Error con {scale['id']}: {e}")

# Función para parsear el peso desde la respuesta
def parse_weight(response):
    try:
        # Asume que el peso está después de un espacio y termina con '\n'
        parts = response.strip().split(" ")
        if len(parts) >= 2:
            return float(parts[-1])  # Última parte de la respuesta
        return None
    except ValueError:
        return None

# Crear y lanzar hilos para cada báscula
threads = []
for scale in scales:
    thread = threading.Thread(target=handle_scale_connection, args=(scale,))
    threads.append(thread)
    thread.start()

# Esperar a que todos los hilos terminen (si es necesario)
for thread in threads:
    thread.join()
