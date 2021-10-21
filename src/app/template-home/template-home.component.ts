import { Component, OnInit, ViewChild, ViewChildren, AfterViewInit, ElementRef, QueryList } from '@angular/core';
import { MatDialog } from '@angular/material';

import { FormControl } from '@angular/forms';
import { ConsultantService } from '../services/consultant.service';

import { Router } from '@angular/router';
import { QualiteService } from '../services/qualite.service';
import { DisponibiliteService } from '../services/disponibilite.service';
import { CommunicationService } from '../services/communication.service';
import { Consultant } from '../Model/Consultant';
import { NgxSpinnerService } from 'ngx-spinner';
import { Title } from "@angular/platform-browser";
import { TokenStorageService } from '../services/token-storage.service';
import { ProgressSpinnerDialogComponent } from '../progress-spinner-dialog/progress-spinner-dialog.component';



export interface Dispo {
  value: string;
  name: string;
}

export interface Quali {
  value: string;
  name: string;
}



@Component({
  selector: 'app-template-home',
  templateUrl: './template-home.component.html',
  styleUrls: ['./template-home.component.scss']
})
export class TemplateHomeComponent implements OnInit {
  consultants: any = [];
  newArray: any = [];
  test: string = "";
  total: string = "";

  Dispo: Dispo[] = [
    { value: "", name: "Tout" },
    { value: "NR", name: "N.R" }
  ];
  showfilter = false

  Quali: Quali[] = [
    { value: "", name: "Tout" }
  ];
  Clients = [];
  TagTech = [];
  TagMetier = [];
  TagFonc = [];
  Tech = [];
  currentItemsToShow: Element[] = [];
  shownext = false;
  showprevious = false
  showlastpage = false;
  showfirstpage = false
  filtest: boolean = false;

  constructor(public us: ConsultantService, public communicationService: CommunicationService,
    private router: Router, private titleService: Title, public ts: QualiteService, public ds: DisponibiliteService,
    private SpinnerService: NgxSpinnerService, public dialog: MatDialog, private tokenStorageService: TokenStorageService) {

    this.communicationService.Broadcast('OnChild8', 'Accueil');
  }

  //Variable pour les couleurs d'une colonne
  isquali = false;
  isnom = false;
  isprenom = false;
  istitre = false;
  istech = false;
  isdispo = false;
  isclient = false;
  isexp = false;
  isobservation = false;
  isdmaj = false;
  isemail = false;
  iscode_postal = false;
  istelephone_principal = false;

  //Couleur 
  isQualiteFilter = false;
  isNomFilter = false;
  isPrenomFilter = false;
  isTitreFilter = false;
  isTechFilter = false;
  isExpFilter = false;
  isDispoFilter = false;
  isClientFilter = false;
  isObsFilter = false;
  idDateFilter = false;



  //Variable pour les tris sur la table
  titredesc = false
  clientdesc = false
  postaldesc = false
  emaildesc = false
  nomdesc = false
  prenomdesc = false
  qualitedesc = false
  teldesc = false
  dispodesc = false
  modifdesc = false
  obsdesc = false
  expdesc = false
  techdesc = false

  nbrfilter = 0;



  //Tri Par default lors du chargement de la page
  //desc pour un tri desc mettre le nom de la colonne dans la variable orderdesc et mettre null dans la variable orderasc
  //asc processus inverse de desc
  orderdesc = "dateDerniereMaj";
  orderasc = "null";



  //Variable pour la récuperation des données du formulaire pour le filtre
  dispoFilter = new FormControl();
  qualiFilter = new FormControl();
  clientFilter = new FormControl("");
  tagtechFilter = new FormControl("");
  tagmetierFilter = new FormControl("");
  tagfoncFilter = new FormControl("");
  observationFilter = new FormControl("");
  techFilter = new FormControl("");
  expFilter = new FormControl();
  nameFilter = new FormControl("");
  prenomFilter = new FormControl("");
  titreFilter = new FormControl("");
  emailFilter = new FormControl("");
  telephone_principalFilter = new FormControl("");
  code_postalFilter = new FormControl("");
  date_derniere_majFilter = new FormControl("");



  globalFilter = '';

  //
  pagination = 0;

  // Structure des données de QualitéCV lors de la séléction 
  qualitecv: any = { value: "", name: "" };

  // Structure des données de Expérience lors de la séléction 
  exp: any = { value: "", name: "" };

  // Structure des données de Disponibilité lors de la séléction 
  disponibilite: any = { value: "", name: "" };


  filteredValues = {
    _id: '',
    nom: '',
    prenom: '',
    titre: '',
    code_dispo: '',
    code_qualite: '',
    tjm: '',
    telephone_principal: '',
    email: '',
    linkedin: '',
    code_postal: '',
    ville: '',
    cv: '',
    dateDerniereMaj: '',
    tech: '',
    client: '',
    observation: '',
    tagtech: '',
    tagmetier: '',
    tagfonc: '',
    exp: ''
  };


  //Le pas de la pagination par default
  pageSizeElement = [30, 86, 120]

  //Nombre d'élément par page par default
  pageSize = 30;
  width = 0;
  height = 0;


  dispos = [{ value: "", name: "Tout" }, { value: "^(?!.*(ans)).*$", name: "N.R" }]
  suivantConsultant = 0;
  regex: string = "";
  sizeConsultant: number = 100;
  totalPage: number = 0;
  totalSize: number = 0;
  currentPage: number = 1;
  ConsultantPageUpdate: Consultant[] = [];
  ConsultantFilter: Consultant[] = [];
  styleState = false;
  title: string = "";

  ngOnInit(): void {
    //Récupération de la largeur et la hauteur de l'écran
    let { width, height } = window.screen
    this.width = width;
    this.height = height;
  

    //changement du nom d'élément par page ainsi que de la liste des éléments par page 
    //en fonction de la taille de l'écran
    if ((width >= 1366 * 0.9 && width <= 1366 * 1.1) && (height >= 768 * 0.9 && height <= 768 * 1.1)) {
      this.pageSizeElement = [25, 50, 100]
      this.pageSize = 25
    }
    else if ((width >= 1920 * 0.9 && width <= 1920 * 1.1) && (height >= 1080 * 0.9 && height <= 1080 * 1.1)) {
      this.pageSizeElement = [30, 60, 120]
      this.pageSize = 30
    }

    window.scroll(0, 0);
    this.loader()

    this.titleService.setTitle("Portail RH")

    //Récupération des données en base  (liste des consultants)
    this.Search();

    //Récupératon de la liste des disponibilté
    //this.getDisponibilite();

    //Récupération de la liste des qualités Cvs
    //his.getQualite();

    //Récupération de la liste des expériences
    //this.getexp()
  }

  /**
 * Fonction qui fait appel au Loader  pour le chargement des données
 * Désactivation 
 */
  loader() {
    this.dialog.open(ProgressSpinnerDialogComponent, {
      data: {

        message: `
         Chargement en cours`

      },
      disableClose: true,
    });
  }

  sort(e: string) {
    if (e === "postal") {
      this.postaldesc = !this.postaldesc
      if (this.postaldesc) {
        this.orderasc = 'postakl';
        this.orderdesc = 'postal'
        this.SearchTriFiltrage()
      } else {
        this.orderasc = 'postal';
        this.orderdesc = 'po5stal'
        this.SearchTriFiltrage()
      }
      this.titredesc = false
      this.clientdesc = false
      this.expdesc = false
      this.emaildesc = false
      this.nomdesc = false
      this.prenomdesc = false
      this.teldesc = false
      this.dispodesc = false
      this.modifdesc = false
      this.dispodesc = false
      this.obsdesc = false
      this.techdesc = false
      this.qualitedesc = false

    }
    if (e === "email") {
      this.emaildesc = !this.emaildesc
      if (this.emaildesc) {
        this.orderasc = 'ema5il';
        this.orderdesc = 'email'
        this.SearchTriFiltrage()
      } else {
        this.orderasc = 'email';
        this.orderdesc = 'ema5il'
        this.SearchTriFiltrage()
      }
      this.titredesc = false
      this.clientdesc = false
      this.expdesc = false
      this.postaldesc = false
      this.nomdesc = false
      this.teldesc = false
      this.prenomdesc = false
      this.qualitedesc = false
      this.dispodesc = false
      this.modifdesc = false
      this.dispodesc = false
      this.obsdesc = false
      this.techdesc = false
    }
    if (e === "nom") {
      this.nomdesc = !this.nomdesc
      if (this.nomdesc) {
        this.orderasc = 'nokm';
        this.orderdesc = 'nom'
        this.SearchTriFiltrage()
      } else {
        this.orderasc = 'nom';
        this.orderdesc = 'nomm'
        this.SearchTriFiltrage()
      }
      this.titredesc = false
      this.clientdesc = false
      this.emaildesc = false
      this.expdesc = false
      this.postaldesc = false
      this.prenomdesc = false
      this.dispodesc = false
      this.modifdesc = false
      this.dispodesc = false
      this.obsdesc = false
      this.techdesc = false
      this.teldesc = false
      this.qualitedesc = false

    }
    if (e === "prenom") {
      this.prenomdesc = !this.prenomdesc
      if (this.prenomdesc) {
        this.orderasc = 'postakl';
        this.orderdesc = 'prenom'
        this.SearchTriFiltrage()
      } else {
        this.orderasc = 'prenom';
        this.orderdesc = 'po5stal'
        this.SearchTriFiltrage()
      }
      this.titredesc = false
      this.clientdesc = false
      this.expdesc = false
      this.emaildesc = false
      this.nomdesc = false
      this.postaldesc = false
      this.teldesc = false
      this.qualitedesc = false
      this.dispodesc = false
      this.modifdesc = false
      this.dispodesc = false
      this.obsdesc = false
      this.techdesc = false

    }
    if (e === "client") {
      this.clientdesc = !this.clientdesc
      if (this.clientdesc) {
        this.orderasc = 'nokm';
        this.orderdesc = 'listClient'
        this.SearchTriFiltrage()
      } else {
        this.orderasc = 'listClient';
        this.orderdesc = 'listClientm'
        this.SearchTriFiltrage()
      }
      this.titredesc = false
      this.expdesc = false
      this.emaildesc = false
      this.postaldesc = false
      this.qualitedesc = false
      this.dispodesc = false
      this.modifdesc = false
      this.dispodesc = false
      this.obsdesc = false
      this.techdesc = false
      this.teldesc = false

    }
    if (e === "titre") {
      this.titredesc = !this.titredesc
      if (this.titredesc) {
        this.orderasc = 'titre5';
        this.orderdesc = 'titre'
        this.SearchTriFiltrage()
      } else {
        this.orderasc = 'titre';
        this.orderdesc = 'qua55lite'
        this.SearchTriFiltrage()
      }

      this.clientdesc = false
      this.dispodesc = false
      this.expdesc = false
      this.modifdesc = false
      this.dispodesc = false
      this.obsdesc = false
      this.techdesc = false
      this.postaldesc = false
      this.nomdesc = false
      this.prenomdesc = false
      this.qualitedesc = false
      this.teldesc = false

    }
    if (e === "qualitecv") {
      this.qualitedesc = !this.qualitedesc
      if (this.qualitedesc) {
        this.orderasc = 'null';
        this.orderdesc = 'qualitecv.ordre'
        this.SearchTriFiltrage()
      } else {
        this.orderasc = 'qualitecv.ordre';
        this.orderdesc = 'null'
        this.SearchTriFiltrage()
      }
      this.titredesc = false
      this.expdesc = false
      this.clientdesc = false
      this.emaildesc = false
      this.nomdesc = false
      this.prenomdesc = false
      this.teldesc = false
      this.dispodesc = false
      this.modifdesc = false
      this.dispodesc = false
      this.obsdesc = false
      this.techdesc = false
      this.postaldesc = false

    }
    if (e === "tel") {
      this.teldesc = !this.teldesc
      if (this.teldesc) {
        this.orderasc = 'postakl';
        this.orderdesc = 'telephone_pricipal'
        this.SearchTriFiltrage()
      } else {
        this.orderasc = 'telephone_principal';
        this.orderdesc = 'po5stal'
        this.SearchTriFiltrage()
      }
      this.titredesc = false
      this.expdesc = false
      this.clientdesc = false
      this.emaildesc = false
      this.nomdesc = false
      this.prenomdesc = false
      this.qualitedesc = false
      this.dispodesc = false
      this.modifdesc = false
      this.dispodesc = false
      this.obsdesc = false
      this.techdesc = false

    }
    if (e === "obs") {
      this.obsdesc = !this.obsdesc
      if (this.obsdesc) {
        this.orderasc = 'postakl';
        this.orderdesc = 'derniereObs'
        this.SearchTriFiltrage()
      } else {
        this.orderasc = 'derniereObs';
        this.orderdesc = 'po5stal'
        this.SearchTriFiltrage()
      }
      this.titredesc = false
      this.expdesc = false
      this.clientdesc = false
      this.emaildesc = false
      this.nomdesc = false
      this.prenomdesc = false
      this.qualitedesc = false
      this.teldesc = false
      this.dispodesc = false
      this.dispodesc = false
      this.modifdesc = false
      this.dispodesc = false

      this.techdesc = false


    }
    if (e === "tech") {
      this.techdesc = !this.techdesc
      if (this.techdesc) {
        this.orderasc = 'postakl';
        this.orderdesc = 'tech'
        this.SearchTriFiltrage()
      } else {
        this.orderasc = 'tech';
        this.orderdesc = 'po5stal'
        this.SearchTriFiltrage()
      }
      this.titredesc = false
      this.expdesc = false
      this.clientdesc = false
      this.emaildesc = false
      this.nomdesc = false
      this.prenomdesc = false
      this.qualitedesc = false
      this.teldesc = false
      this.dispodesc = false
      this.modifdesc = false
      this.dispodesc = false
      this.obsdesc = false


    }

    if (e === "modif") {
      this.modifdesc = !this.modifdesc
      if (this.modifdesc) {
        this.orderasc = 'postakl';
        this.orderdesc = 'dateDerniereMaj'
        this.SearchTriFiltrage()
      } else {
        this.orderasc = 'dateDerniereMaj';
        this.orderdesc = 'po5stal'
        this.SearchTriFiltrage()
      }
      this.titredesc = false
      this.clientdesc = false
      this.emaildesc = false
      this.expdesc = false
      this.nomdesc = false
      this.prenomdesc = false
      this.qualitedesc = false
      this.techdesc = false
      this.teldesc = false


      this.dispodesc = false
      this.obsdesc = false
      this.techdesc = false


    }

    if (e === "dispo") {
      this.dispodesc = !this.dispodesc
      if (this.dispodesc) {
        this.orderasc = 'postakl';
        this.orderdesc = 'codedispo.ordre'
        this.SearchTriFiltrage()
      } else {
        this.orderasc = 'codedispo.ordre';
        this.orderdesc = 'po5stal'
        this.SearchTriFiltrage()
      }
      this.titredesc = false
      this.clientdesc = false
      this.emaildesc = false
      this.nomdesc = false
      this.prenomdesc = false
      this.expdesc = false
      this.qualitedesc = false
      this.techdesc = false
      this.teldesc = false

      this.modifdesc = false
      this.obsdesc = false


    }
    if (e === "exp") {
      this.expdesc = !this.expdesc
      if (this.expdesc) {
        this.orderasc = 'postakl';
        this.orderdesc = 'exp'
        this.SearchTriFiltrage()
      } else {
        this.orderasc = 'exp';
        this.orderdesc = 'po5stal'
        this.SearchTriFiltrage()
      }
      this.titredesc = false
      this.clientdesc = false
      this.emaildesc = false
      this.nomdesc = false
      this.prenomdesc = false

      this.qualitedesc = false
      this.techdesc = false
      this.teldesc = false

      this.modifdesc = false
      this.obsdesc = false


    }

  }



  Select(row: Consultant) {
    //this.router.navigate(['/fichec'], { queryParams: { id: row._id } });
    window.open("http://portail.rh.itns-tn.com/fichec?id=" + row._id, "_blank")
  }

  /**
   * Chargement de la liste des consulatnts dans le tableau
   * 
   * @param  {Consultant[]} data2 Paramètre de récupération des tags en fonction du nombre d'élément et du mot de la recherche
   * @return {void} 
   */


  getByName(
    nom: string,
    prenom: string,
    dispo: string,
    qualite: string,
    email: string,
    postal: string,
    titre: string,
    client: string,
    tel: string,
    datamodif: string,
    observation: string,
    tech: string,
    exp: string,
    page: number) {
    const user = this.tokenStorageService.getUser()

    this.consultants = [];





    if (dispo !== "NR") {
      dispo = "(?i:.*" + dispo + ".*)";

    } else {
      dispo = "^(?![a-zA-Z0-9><;.?,+=/*£%°!]+)"
    }

    this.us.getLimitConsultants(nom, prenom, dispo, qualite, email, postal, titre, tel, client, page - 1, this.pageSize, datamodif, observation, tech, exp, this.orderdesc, this.orderasc, "user.trigramme"
    ).subscribe((data2) => {

      this.getUsers(data2)

    });
  }


  getUsers(data2: any) {
    this.consultants = [];


    this.consultants = data2.consultants;


    for (const i in data2.consultants) {
      let cli = new Array();
      let techno = new Array();
      let obsrv = new Array();
      for (const j in data2.consultants[i].client) {
        cli.push(data2.consultants[i].client[j].libelle);
      }
      for (const j in data2.consultants[i].tech) {
        techno.push(data2.consultants[i].tech[j].libelle);
      }
      for (const j in data2.consultants[i].observation) {
        obsrv.push(data2.consultants[i].observation[j].libelleObs);
      }

      let cl = "";
      let tech = "";
      let obs = "";
      cl = cli.join(", ");
      tech = techno.join(", ");
      obs = obsrv.join(",");



      this.consultants[i].client = cl;
      this.consultants[i].tech = tech;
      this.consultants[i].observation = obs;
      this.test = this.consultants.length;
      this.total = this.consultants.length;
    }
    this.dialog.closeAll()

    this.totalSize = data2.total;

    this.totalPage = data2.totalPage

    this.changeColor();


  }



  setdata(e: string, event: any) {
    let k = document.getElementById(event.path[0].id)

    this.title = e;
    if (k) {

      if (k.scrollWidth > k.clientWidth) {
        event.path[0].bgColor = "#FFFFCC";

        k.setAttribute("title", e)
        //this.open(event);
      }
    }
  }

  open(e: any) {

    const ele = document.getElementById('element');

    const menu = document.getElementById('menu');
    if (ele != null && menu != null) {
      e.preventDefault();

      const rect = ele.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Set the position for menu
      menu.style.top = `${y + 300}px`;
      menu.style.left = `${x}px`;

      // Show the menu
      menu.classList.remove('hidden');
    }
  }
  hover() {
    const ele = document.getElementById('element');
    const menu = document.getElementById('menu');
    if (ele != null && menu != null) {
      ele.addEventListener('context', function (e: any) {
        e.preventDefault();

        const rect = ele.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Set the position for menu
        menu.style.top = `${y + 40}px`;
        menu.style.left = `${x}px`;

        // Show the menu
        menu.classList.remove('hidden');

        document.addEventListener('click', documentClickHandler);
      });

      // Hide the menu when clicking outside of it
      const documentClickHandler = function (e: any) {
        const isClickedOutside = !menu.contains(e.target);
        if (isClickedOutside) {
          menu.classList.add('hidden');
          document.removeEventListener('click', documentClickHandler);
        }
      };
    }
  }

  close(e: any) {
    e.path[0].bgColor = "transparent";

    const menu = document.getElementById('menu');
    if (menu != null) {
      const isClickedOutside = !menu.contains(e.target);
      if (isClickedOutside) {
        menu.classList.add('hidden');
      }
    }
  }

  changeColor() {
    if (this.nameFilter.value === "") {
      this.isNomFilter = false;
    } else {
      this.isNomFilter = true;
    }
    if (this.prenomFilter.value === "") {
      this.isPrenomFilter = false;
    } else {
      this.isPrenomFilter = true;
    }
    if (this.titreFilter.value === "") {
      this.isTitreFilter = false;
    } else {
      this.isTitreFilter = true;
    }
    if (this.techFilter.value === "") {
      this.isTechFilter = false;
    } else {
      this.isTechFilter = true;
    }

    if (this.exp.value === "") {
      this.isExpFilter = false;
    } else {
      this.isExpFilter = true;
    }
    if (this.disponibilite.value === "") {
      this.isDispoFilter = false;
    } else {
      this.isDispoFilter = true;
    }
    if (this.clientFilter.value === "") {
      this.isClientFilter = false;
    } else {
      this.isClientFilter = true;
    }
    if (this.observationFilter.value === "") {
      this.isObsFilter = false;
    } else {
      this.isObsFilter = true;
    }
    if (this.date_derniere_majFilter.value === "") {
      this.idDateFilter = false;
    } else {
      this.idDateFilter = true;
    }


  }


  Search() {
    //this.loader()
    this.styleState = true
    this.getByName(
      this.nameFilter.value,
      this.prenomFilter.value,
      this.disponibilite.value ? this.disponibilite.value : "",
      this.qualitecv.value ? this.qualitecv.value : "",

      this.emailFilter.value,
      this.code_postalFilter.value,
      this.titreFilter.value,
      this.clientFilter.value,

      this.telephone_principalFilter.value,
      this.date_derniere_majFilter.value,
      this.observationFilter.value,
      this.techFilter.value,
      this.exp.value ? this.exp.value : "",
      this.currentPage
    )
  }

  SearchTriFiltrage() {

    this.showfilter = true
    this.currentPage = 1
    this.styleState = true
    this.getByName(
      this.nameFilter.value,
      this.prenomFilter.value,
      this.disponibilite.value ? this.disponibilite.value : "",
      this.qualitecv.value ? this.qualitecv.value : "",
      this.emailFilter.value,
      this.code_postalFilter.value,
      this.titreFilter.value,
      this.clientFilter.value,

      this.telephone_principalFilter.value,
      this.date_derniere_majFilter.value,
      this.observationFilter.value,
      this.techFilter.value,
      this.exp.value ? this.exp.value : "",
      1
    )
  }


  resetFilter() {
    this.qualitecv = { value: "", name: "" };
    this.exp = { value: "", name: "" };
    this.disponibilite = { value: "", name: "" };
    this.dispoFilter = new FormControl();
    this.qualiFilter = new FormControl();
    this.clientFilter = new FormControl("");
    this.tagtechFilter = new FormControl("");
    this.tagmetierFilter = new FormControl("");
    this.tagfoncFilter = new FormControl("");
    this.observationFilter = new FormControl("");
    this.techFilter = new FormControl("");
    this.nameFilter = new FormControl("");
    this.prenomFilter = new FormControl("");
    this.titreFilter = new FormControl("");
    this.emailFilter = new FormControl("");
    this.expFilter = new FormControl();
    this.telephone_principalFilter = new FormControl("");
    this.code_postalFilter = new FormControl("");
    this.date_derniere_majFilter = new FormControl("");
    this.filteredValues.nom = ""
    this.filteredValues.prenom = ""
    this.filteredValues.code_dispo = ""
    this.filteredValues.code_qualite = ""
    this.filteredValues.email = ""
    this.filteredValues.code_postal = ""
    this.filteredValues.titre = ""
    this.filteredValues.client = ""

    this.filteredValues.telephone_principal = ""
    this.filteredValues.dateDerniereMaj = ""
    this.filteredValues.observation = ""
    this.filteredValues.tech = ""
    this.isquali = false;
    this.isnom = false;
    this.isprenom = false;
    this.istitre = false;
    this.istech = false;
    this.isexp = false;
    this.isdispo = false;
    this.isclient = false;
    this.isobservation = false;
    this.isdmaj = false;
    this.isemail = false;
    this.iscode_postal = false;
    this.istelephone_principal = false;
    this.showfilter = false
    this.Search()
  }



  goto(page: number) {
    if (page - 1 <= this.totalPage) {

      this.currentPage = page
      this.Search()

    }
    else {
      alert("il n'existe que " + this.totalPage + " pages")
    }
  }

  NexPage() {
    this.currentPage = this.currentPage - 1
    this.currentPage = this.currentPage + 2
    this.Search()
  }
  previousPage() {
    this.currentPage = this.currentPage - 1
    this.Search()
  }
  FirstPage() {
    this.currentPage = 1
    this.showprevious = false;
    this.showfirstpage = false;

    this.shownext = true;
    this.showlastpage = true;
    this.Search()
  }
  LastPage() {
    this.currentPage = this.totalPage + 1
    this.shownext = true;
    this.showlastpage = true;
    this.showprevious = false;
    this.showfirstpage = false;
    if (this.totalPage + 1 === this.currentPage) {
      this.shownext = false
      this.showlastpage = false
    }
    this.Search()
  }

  getNext() {
    if (this.currentPage < this.totalPage + 1) {
      return true
    } return false
  }
  getpreviousMove() {
    if (this.currentPage > 1) {
      return true
    } return false
  }
  getPrevious() {
    if (this.currentPage > 1) {
      return true
    } return false
  }

  getlastpage() {
    if (this.currentPage < this.totalPage + 1) {
      return true
    } return false
  }
  ChangeItemPerPage(e: number) {
    this.pageSize = e
    this.SearchTriFiltrage()
  }

  renderDispo(item:any){
    return item? item.libelle : ''
  }
  renderPrenom(prenom:string){
    return prenom[0].toUpperCase()+prenom.slice(1).toLowerCase()
  }

}
