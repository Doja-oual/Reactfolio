import { gql } from '@apollo/client';

// AUTH MUTATIONS
export const LOGIN = gql `
mutation Login($email: String!, $password: String!) {
 login(email: $email,password: $password) {
 token
 user{
 id
 email
 firstName
 lastName
}
}
}
`;

export const REGISTER = gql `
mustation Register($input:registerInput !) {
 register(input:$input!) {
 token
 user{
 id
 email
 firstName
 lastName
  }
}
}
`;
export const UPDATE_PROFILE = gql`
  mutation UpdateProfile($input: ProfileInput!) {
    updateProfile(input: $input) {
      id
      firstName
      lastName
      email
      title
      bio
      avatar
      phone
      location
      github
      linkedin
      twitter
      website
    }
  }
`;

export const CREATE_PROJECT = gql`
  mutation CreateProject($input: ProjectInput!) {
    createProject(input: $input) {
      id
      title
      description
      shortDescription
      image
      images
      technologies
      githubUrl
      liveUrl
      featured
      order
    }
  }
`;


export const UPDATE_PROJECT = gql`
  mutation UpdateProject($id: ID!, $input: ProjectInput!) {
    updateProject(id: $id, input: $input) {
      id
      title
      description
      shortDescription
      image
      images
      technologies
      githubUrl
      liveUrl
      featured
      order
    }
  }
`;

export const DELETE_PROJECT = gql`
  mutation DeleteProject($id: ID!) {
    deleteProject(id: $id) {
      id
      title
    }
  }
`;


export const CREATE_SKILL = gql`
  mutation CreateSkill($input: SkillInput!) {
    createSkill(input: $input) {
      id
      name
      category
      level
      icon
      order
    }
  }
`;

export const UPDATE_SKILL = gql`
  mutation UpdateSkill($id: ID!, $input: SkillInput!) {
    updateSkill(id: $id, input: $input) {
      id
      name
      category
      level
      icon
      order
    }
  }
`;

export const DELETE_SKILL = gql`
  mutation DeleteSkill($id: ID!) {
    deleteSkill(id: $id) {
      id
      name
    }
  }
`;

// ============ EXPERIENCE MUTATIONS ============
export const CREATE_EXPERIENCE = gql`
  mutation CreateExperience($input: ExperienceInput!) {
    createExperience(input: $input) {
      id
      company
      position
      description
      startDate
      endDate
      current
      location
      technologies
      order
    }
  }
`;

export const UPDATE_EXPERIENCE = gql`
  mutation UpdateExperience($id: ID!, $input: ExperienceInput!) {
    updateExperience(id: $id, input: $input) {
      id
      company
      position
      description
      startDate
      endDate
      current
      location
      technologies
      order
    }
  }
`;

export const DELETE_EXPERIENCE = gql`
  mutation DeleteExperience($id: ID!) {
    deleteExperience(id: $id) {
      id
      company
    }
  }
`;
