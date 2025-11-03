import { gql } from '@apollo/client';

// ============ PROFILE QUERIES ============
export const GET_PROFIL = gql`
  query GetProfil {
    getProfil {
      id
      nom
      prenom
      titre
      bio
      email
      telephone
      photo
      cv
      reseauxSociaux {
        linkedin
        github
        twitter
        website
      }
      adresse {
        ville
        pays
      }
      createdAt
      updatedAt
    }
  }
`;

// ============ PORTFOLIO QUERY ============
export const GET_PORTFOLIO = gql`
  query GetPortfolio {
    getPortfolio {
      profil {
        id
        nom
        prenom
        titre
        bio
        email
        telephone
        photo
        cv
        reseauxSociaux {
          linkedin
          github
          twitter
          website
        }
        adresse {
          ville
          pays
        }
      }
      projets {
        id
        titre
        description
        descriptionLongue
        technologies {
          id
          nom
          niveau
          categorie
          icone
        }
        images
        lienGithub
        lienDemo
        statut
        dateDebut
        dateFin
        ordre
        createdAt
        updatedAt
      }
      competences {
        id
        nom
        niveau
        categorie
        pourcentage
        icone
        createdAt
        updatedAt
      }
      experiences {
        id
        entreprise
        poste
        type
        description
        competences {
          id
          nom
          niveau
          categorie
          icone
        }
        dateDebut
        dateFin
        enCours
        lieu
        logo
        ordre
        createdAt
        updatedAt
      }
    }
  }
`;

// ============ PROJECTS QUERIES ============
export const GET_PROJETS = gql`
  query GetProjets($statut: StatutProjet) {
    getProjets(statut: $statut) {
      id
      titre
      description
      descriptionLongue
      technologies {
        id
        nom
        niveau
        categorie
        icone
      }
      images
      lienGithub
      lienDemo
      statut
      dateDebut
      dateFin
      ordre
      createdAt
      updatedAt
    }
  }
`;

export const GET_PROJET = gql`
  query GetProjet($id: ID!) {
    getProjet(id: $id) {
      id
      titre
      description
      descriptionLongue
      technologies {
        id
        nom
        niveau
        categorie
        icone
      }
      images
      lienGithub
      lienDemo
      statut
      dateDebut
      dateFin
      ordre
      createdAt
      updatedAt
    }
  }
`;

// ============ COMPETENCES QUERIES ============
export const GET_COMPETENCES = gql`
  query GetCompetences($categorie: CategorieCompetence) {
    getCompetences(categorie: $categorie) {
      id
      nom
      niveau
      categorie
      pourcentage
      icone
      createdAt
      updatedAt
    }
  }
`;

export const GET_COMPETENCE = gql`
  query GetCompetence($id: ID!) {
    getCompetence(id: $id) {
      id
      nom
      niveau
      categorie
      pourcentage
      icone
      createdAt
      updatedAt
    }
  }
`;

// ============ EXPERIENCES QUERIES ============
export const GET_EXPERIENCES = gql`
  query GetExperiences {
    getExperiences {
      id
      entreprise
      poste
      type
      description
      competences {
        id
        nom
        niveau
        categorie
        icone
      }
      dateDebut
      dateFin
      enCours
      lieu
      logo
      ordre
      createdAt
      updatedAt
    }
  }
`;

export const GET_EXPERIENCE = gql`
  query GetExperience($id: ID!) {
    getExperience(id: $id) {
      id
      entreprise
      poste
      type
      description
      competences {
        id
        nom
        niveau
        categorie
        icone
      }
      dateDebut
      dateFin
      enCours
      lieu
      logo
      ordre
      createdAt
      updatedAt
    }
  }
`;