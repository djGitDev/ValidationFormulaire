const moisA31Jours = [1, 3, 5, 7, 8, 10, 12];
const moisA30Jours = [4, 6, 9, 11];
const moisA28Jours = 2;

function formaterDate(date) {
  date = date.replace(/\D/g, "");

  if (date.length == 8) {
    date = date.slice(0, 4) + "-" + date.slice(4, 6) + "-" + date.slice(6);
  }
  return date;
}

function estAnneeValid(value) {
  let anneeValide =
    parseInt(value.slice(0, 4)) < 2023 && parseInt(value.slice(0, 4)) > 1900;
  return anneeValide;
}
function estMoisValid(value) {
  let moisValid =
    parseInt(value.slice(5, 7)) <= 12 && parseInt(value.slice(5, 7)) > 0;
  return moisValid;
}
function estJourValid(value) {
  return (
    estJourValidCas31jours(value) ||
    estJourValidCas30jours(value) ||
    estJourValidCas28jours(value)
  );
}
function estJourValidCas31jours(value) {
  let mois31 =
    moisA31Jours.includes(parseInt(value.slice(5, 7))) &&
    parseInt(value.slice(8, 10)) <= 31 &&
    parseInt(value.slice(8, 10)) > 0;
  return mois31;
}

function estJourValidCas30jours(value) {
  let mois30 =
    moisA30Jours.includes(parseInt(value.slice(5, 7))) &&
    parseInt(value.slice(8, 10)) <= 30 &&
    parseInt(value.slice(8, 10)) > 0;
  return mois30;
}
function estJourValidCas28jours(value) {
  let mois28 =
    moisA28Jours == parseInt(value.slice(5, 7)) &&
    parseInt(value.slice(8, 10)) <= 28 &&
    parseInt(value.slice(8, 10)) > 0;
  return mois28;
}
function estDateDeNaissanceValide(value) {
  return estAnneeValid(value) && estMoisValid(value) && estJourValid(value);
}
function validerDateDeNaissance(input) {
  input.value = formaterDate(input.value);
  if (input.value.length == 10) {
    activerNotification(
      estDateDeNaissanceValide(input.value),
      "approuver_date",
      "erreur_date"
    );
  }
}
function validerValeurVehicule(input) {
  input.value = input.value.replace(/\D/g, "");
  if (input.value.length > 3) {
    switch (input.value.length) {
      case 4:
        input.value = input.value.slice(0, 1) + " " + input.value.slice(1, 5);
        break;
      case 5:
        input.value = input.value.slice(0, 2) + " " + input.value.slice(2, 6);
        break;
      case 6:
        input.value = input.value.slice(0, 3) + " " + input.value.slice(3, 7);
    }
  }
  if (input.value.length >= 1)
    activerNotification(
      estValeurVehiculeValid(input.value),
      "approuver_valeurVehicule",
      "erreur_valeurVehicule"
    );
}
function estValeurVehiculeValid(valeur) {
  let valide = parseInt(valeur.replace(/\s/g, "")) <= 100000;
  return valide;
}
function validerAnneeVehicule(input) {
  input.value = input.value.replace(/\D/g, "");
  if (input.value.length > 0) {
    activerNotification(
      estAnneeVehiculeValid(input.value),
      "approuver_anneeVehicule",
      "erreur_anneeVehicule"
    );
  }
}
function estAnneeVehiculeValid(anneeSaisie) {
  let anneeVehicule = parseInt(anneeSaisie);
  let dateActuelle = new Date();
  let anneeActuelle = dateActuelle.getFullYear();

  return anneeActuelle - anneeVehicule <= 25 && anneeVehicule <= anneeActuelle;
}

function validerKilometrage(input) {
  input.value = input.value.replace(/\D/g, "");
  if (input.value.length > 3) {
    switch (input.value.length) {
      case 4:
        input.value = input.value.slice(0, 1) + " " + input.value.slice(1, 5);
        break;
      case 5:
        input.value = input.value.slice(0, 2) + " " + input.value.slice(2, 6);
        break;
      case 6:
        input.value = input.value.slice(0, 3) + " " + input.value.slice(3, 7);
    }
  }
  if (input.value.length > 0) {
    activerNotification(
      estKilometrageValide(input.value),
      "approuver_kilometrageVehicule",
      "erreur_kilometrageVehicule"
    );
  }
}

function estKilometrageValide(kilometrageSaisie) {
  let kilometrageVehicule = parseInt(kilometrageSaisie.replace(/\s/g, ""));
  return kilometrageVehicule <= 50000 && kilometrageVehicule > 0;
}

function validerNombreReclamations(input) {
  afficherReclamations(input);
  activerNotification(
    estNombreReclamationsValide(input.value),
    "approuver_NombreReclamations",
    "erreur_NombreReclamations"
  )
  if(input.value == 0)
  document.getElementById("approuver_NombreReclamations").style.display = "none";
}
function estNombreReclamationsValide(nombreReclamationsSaisie) {
  return parseInt(nombreReclamationsSaisie) !== 5;
}

function afficherReclamations(input) {
  for (var i = 0; i < input.length; i++) {
    input[i].style.display = "block";
  }
}
function masquerReclamations(input) {
  for (let i = 0; i < input.length; i++) {
    input[i].style.display = "none";
  }
}

function activerNotification(fonctionValidation, idApprouver, idErreur) {
  if (fonctionValidation) {
    document.getElementById(idApprouver).style.display = "block";
    document.getElementById(idErreur).style.display = "none";
  } else {
    document.getElementById(idErreur).style.display = "block";
    document.getElementById(idApprouver).style.display = "none";
  }
}

function masquerNotification(idApprouver) {
  document.getElementById(idApprouver).style.display = "none";
}

function afficherCasesMontantReclamations(input) {
  switch (parseInt(input.value)) {
    case 4:
      afficherReclamations(document.getElementsByClassName("#4"));
      afficherReclamations(document.getElementsByClassName("#3"));
      afficherReclamations(document.getElementsByClassName("#2"));
      afficherReclamations(document.getElementsByClassName("#1"));
      break;
    case 3:
      afficherReclamations(document.getElementsByClassName("#3"));
      afficherReclamations(document.getElementsByClassName("#2"));
      afficherReclamations(document.getElementsByClassName("#1"));
      masquerReclamations(document.getElementsByClassName("#4"));
      break;
    case 2:
      afficherReclamations(document.getElementsByClassName("#2"));
      afficherReclamations(document.getElementsByClassName("#1"));
      masquerReclamations(document.getElementsByClassName("#4"));
      masquerReclamations(document.getElementsByClassName("#3"));
      break;
    case 1:
      afficherReclamations(document.getElementsByClassName("#1"));
      masquerReclamations(document.getElementsByClassName("#4"));
      masquerReclamations(document.getElementsByClassName("#3"));
      masquerReclamations(document.getElementsByClassName("#2"));
      break;
    default:
      masquerReclamations(document.getElementsByClassName("#4"));
      masquerReclamations(document.getElementsByClassName("#3"));
      masquerReclamations(document.getElementsByClassName("#2"));
      masquerReclamations(document.getElementsByClassName("#1"));
  }
}
