document.addEventListener('DOMContentLoaded', function() {
    const menu = document.getElementById('menu_burger');
    const menu_deroulant = document.getElementById('menu_deroulant');
    
    menu.addEventListener('click', () => {
        menu.classList.toggle('ouvert');
        menu_deroulant.classList.toggle('menu_deroulant');
    });
    })

    function exporterExcel() {
        var table = document.getElementById("table"); 
        var wb = XLSX.utils.table_to_book(table); 

        // Créer un fichier Excel et le télécharger
        var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'binary' });
        function s2ab(s) {
            var buf = new ArrayBuffer(s.length);
            var view = new Uint8Array(buf);
            for (var i = 0; i < s.length; i++) {
                view[i] = s.charCodeAt(i) & 0xFF;
            }
            return buf;
        }
        var fileName = "tableau_excel.xlsx";
        saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), fileName);
    }

    function confirmerSuppression(id) {
        const deleteElement = document.getElementById(id);
        const name = deleteElement.cells[2].innerHTML;
        const firstName = deleteElement.cells[3].innerHTML;
    
        if (confirm("Voulez-vous vraiment supprimer l'élément " + firstName + " " + name + " ?")) {
            // Supprimer l'élément du tableau HTML
            deleteElement.parentNode.removeChild(deleteElement);
        }
    }

function recherche() {
    // Sélectionne les éléments HTML 
    const saisie = document.getElementById("searchInput").value.toUpperCase();
    const table = document.getElementById("table");
    const lignes = table.getElementsByTagName("tr");
    // Boucle à travers chaque ligne du tableau à partir de la deuxième ligne pour ne pas supprimer l'en-tête 
    for (let i = 1; i < lignes.length; i++) {
        // Sélectionne toutes les cellules de la ligne actuelle
        const cellules = lignes[i].getElementsByTagName("td");
        // Initialise le booléen pour indiquer l'état de la ligne
        let ligneTrouvee = false;
        // Boucle à travers chaque cellule de la ligne actuelle
        for (let j = 0; j < cellules.length; j++) {
            // Sélectionne la cellule actuelle
            const cellule = cellules[j];
            if (cellule) {
                // Récupère le contenu textuel de la cellule en majuscules pour la comparaison
                const contenu = cellule.textContent.toUpperCase();
                // Vérifie si la saisie 
                if (contenu.includes(saisie)) {
                    // true = affichage
                    ligneTrouvee = true;
                    break;
                }
            }
        }
        // Affiche ou cache la ligne selon la valeur du booléen
        lignes[i].style.display = ligneTrouvee ? "" : "none";
    }
    }


    function ajouterElement() {

        const id = document.getElementById("id").value; 
        const ipp = document.getElementById("ipp").value;
        const name = document.getElementById("name").value; 
        const firstName = document.getElementById("firstName").value; 
        const ddn = document.getElementById("ddn").value; 
        


        if (id === "" || ipp === "" || name === "" || firstName === "" || ddn === "") {
            alert("Veuillez remplir tous les champs."); 
            return false; 
        }

        const table = document.getElementById("table"); 
        const prefixedId = "EGP_" + id;

        const bouton = document.createElement("button");
        bouton.innerHTML = "Supprimer";
        bouton.onclick = function() {
            confirmerSuppression(prefixedId);
          };

        const row = table.insertRow(table.rows.length - 1);// Insérer une nouvelle ligne à la fin du tableau
        row.id = prefixedId;
        const cell1 = row.insertCell(0); // Insérer une nouvelle cellule dans la nouvelle ligne à la première colonne
        const cell2 = row.insertCell(1); 
        const cell3 = row.insertCell(2);
        const cell4 = row.insertCell(3);
        const cell5 = row.insertCell(4); 
        const cell6 = row.insertCell(5);

        
        var dateObj = new Date(ddn);
        var day = String(dateObj.getDate()).padStart(2, '0');
        var month = String(dateObj.getMonth() + 1).padStart(2, '0');
        var year = dateObj.getFullYear();
        var date = day + '/' + month + '/' + year;

        cell1.innerHTML = prefixedId //Défini le contenu de la première cellule avec l'id saisi
        cell2.innerHTML = ipp; 
        cell3.innerHTML = name; 
        cell4.innerHTML = firstName;
        cell5.innerHTML = date;
        cell6.appendChild(bouton);
        cell6.className ="suppr";

        // Réinitialiser les champs de saisie du formulaire
        document.getElementById("id").value = "";
        document.getElementById("ipp").value = "";
        document.getElementById("name").value = "";
        document.getElementById("firstName").value = "";
        document.getElementById("ddn").value = "";


        return false; 
    }


    window.onload = () => { 
    // Données tableau
    var data = [
        { id: "EGP_0001", ipp: "8000000", nom: "HORSH", prenom: "August", ddn: "10/02/1988" },
        { id: "EGP_0002", ipp: "", nom: "JELLINEK", prenom: "Emil", ddn: "23/02/1999" },
        { id: "EGP_0003", ipp: "", nom: "FRITZ", prenom: "Max", ddn: "01/09/1998" },
        { id: "EGP_0004", ipp: "8002300", nom: "KITA", prenom: "Kenji", ddn: "30/04/1967" },
        { id: "EGP_0005", ipp: "8067400", nom: "PORSCHE", prenom: "Ferdinand", ddn: "27/06/1978" },
        { id: "EGP_0006", ipp: "", nom: "BUGATTI", prenom: "Ettore", ddn: "09/09/1989" },
        { id: "EGP_0007", ipp: "8673200", nom: "FERRARI", prenom: "Enzo", ddn: "12/11/1959" },
        { id: "EGP_0008", ipp: "8010205", nom: "LAMBO", prenom: "Ferruccio", ddn: "24/10/1987" },
        { id: "EGP_0009", ipp: "", nom: "WILKS", prenom: "Maurice", ddn: "31/01/1994" },
        { id: "EGP_0010", ipp: "8472949", nom: "WIKS", prenom: "Spencer", ddn: "19/03/1986" }

    ];

    // Tableau dynamique
    const table = document.getElementById("table");
    const id = document.getElementById("id"); 
  
    for (let i = 0; i < data.length; i++) {
        const row = table.insertRow(i + 1);
        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);
        const cell3 = row.insertCell(2);
        const cell4 = row.insertCell(3);
        const cell5 = row.insertCell(4);
        const cell6 = row.insertCell(5);

        const bouton = document.createElement("button");
        bouton.innerHTML = "Supprimer";
        bouton.onclick = function() {
            const nom = this.parentNode.parentNode.querySelector("td[data-nom]").getAttribute("data-nom");
            const prenom = this.parentNode.parentNode.querySelector("td[data-prenom]").getAttribute("data-prenom");
                if (confirm("Voulez-vous vraiment supprimer l'élément " + prenom + " " + nom + " ?")){ 
                this.parentNode.parentNode.remove();
                }
        };
        
        cell1.innerHTML = data[i].id;
        cell2.innerHTML = data[i].ipp;
        cell3.innerHTML = data[i].nom;
        cell3.setAttribute("data-nom", data[i].nom);
        cell4.innerHTML = data[i].prenom;
        cell4.setAttribute("data-prenom", data[i].prenom);
        cell5.innerHTML = data[i].ddn;
        cell6.appendChild(bouton);
        cell6.className ="suppr";
    }
    };
