document.addEventListener('DOMContentLoaded', () => {
    fetch('data.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al cargar el archivo JSON');
            }
            return response.json();
        })
        .then(data => {
            // Función para renderizar la tabla
            const renderTable = () => {
                // Ordenar los datos por puntos de mayor a menor
                data.sort((a, b) => b.pts - a.pts);

                const tableBody = document.querySelector('#positions-table tbody');
                tableBody.innerHTML = ''; // Limpiar el contenido actual

                // Iterar sobre cada equipo en el JSON
                data.forEach((item, index) => {
                    const row = document.createElement('tr');

                    row.innerHTML = `
                        <td>${index + 1}</td> <!-- Posición -->
                        <td>${item.equipo}</td> <!-- Nombre del equipo -->
                        <td>${item.pts}</td> <!-- Puntos -->
                        <td>${item.pj}</td> <!-- Partidos jugados -->
                        <td>${item.g}</td> <!-- Ganados -->
                        <td>${item.e}</td> <!-- Empatados -->
                        <td>${item.p}</td> <!-- Perdidos -->
                        <td>${item.gf}</td> <!-- Goles a favor -->
                        <td>${item.gc}</td> <!-- Goles en contra -->
                        <td>${item.dg}</td> <!-- Diferencia de goles -->
                        <td>
                            <button class="edit-btn" data-index="${index}">Editar</button>
                        </td> <!-- Botón para editar -->
                    `;

                    tableBody.appendChild(row);
                });

                // Añadir eventos a los botones de edición
                document.querySelectorAll('.edit-btn').forEach(button => {
                    button.addEventListener('click', handleEdit);
                });
            };

            // Función para manejar la edición
            const handleEdit = (event) => {
                const index = event.target.dataset.index;
                const item = data[index];

                // Solicitar nuevos valores al usuario
                const nuevoPts = prompt('Ingresa nuevos puntos:', item.pts);
                const nuevoPj = prompt('Ingresa nuevos partidos jugados:', item.pj);
                const nuevoG = prompt('Ingresa nuevos partidos ganados:', item.g);
                const nuevoE = prompt('Ingresa nuevos empates:', item.e);
                const nuevoP = prompt('Ingresa nuevos partidos perdidos:', item.p);
                const nuevoGf = prompt('Ingresa nuevos goles a favor:', item.gf);
                const nuevoGc = prompt('Ingresa nuevos goles en contra:', item.gc);
                const nuevoDg = prompt('Ingresa nueva diferencia de goles:', item.dg);

                // Actualizar los valores
                item.pts = parseInt(nuevoPts);
                item.pj = parseInt(nuevoPj);
                item.g = parseInt(nuevoG);
                item.e = parseInt(nuevoE);
                item.p = parseInt(nuevoP);
                item.gf = parseInt(nuevoGf);
                item.gc = parseInt(nuevoGc);
                item.dg = parseInt(nuevoDg);

                // Reordenar y volver a renderizar la tabla
                renderTable();
            };

            // Renderizar la tabla inicialmente
            renderTable();
        })
        .catch(error => console.error('Error al cargar los datos:', error));
});
