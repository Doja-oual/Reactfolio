import { gql } from '@apollo/client';

// ============ AUTH MUTATIONS ============
export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        username
        email
        role
      }
    }
  }
`;

export const REGISTER = gql`
  mutation Register($username: String!, $email: String!, $password: String!) {
    register(username: $username, email: $email, password: $password) {
      token
      user {
        id
        username
        email
        role
      }
    }
  }
`;

// ============ PROFIL MUTATIONS ============
export const CREATE_PROFIL = gql`
  mutation CreateProfil($input: ProfilInput!) {
    createProfil(input: $input) {
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
  }
`;

export const UPDATE_PROFIL = gql`
  mutation UpdateProfil($id: ID!, $input: ProfilInput!) {
    updateProfil(id: $id, input: $input) {
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
  }
`;

export const DELETE_PROFIL = gql`
  mutation DeleteProfil($id: ID!) {
    deleteProfil(id: $id)
  }
`;

// ============ PROJECT MUTATIONS ============
export const CREATE_PROJET = gql`
  mutation CreateProjet($input: ProjetInput!) {
    createProjet(input: $input) {
      id
      titre
      description
      descriptionLongue
      technologies {
        id
        nom
      }
      images
      lienGithub
      lienDemo
      statut
      dateDebut
      dateFin
      ordre
    }
  }
`;

export const UPDATE_PROJET = gql`
  mutation UpdateProjet($id: ID!, $input: ProjetInput!) {
    updateProjet(id: $id, input: $input) {
      id
      titre
      description
      descriptionLongue
      technologies {
        id
        nom
      }
      images
      lienGithub
      lienDemo
      statut
      dateDebut
      dateFin
      ordre
    }
  }
`;

export const DELETE_PROJET = gql`
  mutation DeleteProjet($id: ID!) {
    deleteProjet(id: $id)
  }
`;

// ============ COMPETENCE MUTATIONS ============
export const CREATE_COMPETENCE = gql`
  mutation CreateCompetence($input: CompetenceInput!) {
    createCompetence(input: $input) {
      id
      nom
      niveau
      categorie
      pourcentage
      icone
    }
  }
`;

export const UPDATE_COMPETENCE = gql`
  mutation UpdateCompetence($id: ID!, $input: CompetenceInput!) {
    updateCompetence(id: $id, input: $input) {
      id
      nom
      niveau
      categorie
      pourcentage
      icone
    }
  }
`;

export const DELETE_COMPETENCE = gql`
  mutation DeleteCompetence($id: ID!) {
    deleteCompetence(id: $id)
  }
`;

// ============ EXPERIENCE MUTATIONS ============
export const CREATE_EXPERIENCE = gql`
  mutation CreateExperience($input: ExperienceInput!) {
    createExperience(input: $input) {
      id
      entreprise
      poste
      type
      description
      competences {
        id
        nom
      }
      dateDebut
      dateFin
      enCours
      lieu
      logo
      ordre
    }
  }
`;

export const UPDATE_EXPERIENCE = gql`
  mutation UpdateExperience($id: ID!, $input: ExperienceInput!) {
    updateExperience(id: $id, input: $input) {
      id
      entreprise
      poste
      type
      description
      competences {
        id
        nom
      }
      dateDebut
      dateFin
      enCours
      lieu
      logo
      ordre
    }
  }
`;

export const DELETE_EXPERIENCE = gql`
  mutation DeleteExperience($id: ID!) {
    deleteExperience(id: $id)
  }
`;
