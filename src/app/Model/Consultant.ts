import { Qualite } from "./Qualite";

export interface Consultant {
    _id: string;
    nom: string;
    prenom: string;
    titre: string;
    code_dispo: string;
    code_qualite: string;
    tjm: string;
    telephone_principal: string;
    email: string;
    linkedin: string;
    code_postal: string;
    ville: string;
    cv: string;
    observation: string;
    dateDerniereMaj: string;
    tech: string;
    client: string;
    tagtech: string;
    tagmetier: string;
    tagfonc: string;
    qualitecv: Qualite;
  }