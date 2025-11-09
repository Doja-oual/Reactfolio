import { gql } from '@apollo/client';

// ============ PROFILE QUERIES ============
export const GET_PROFILE = gql`
  query GetProfile {
    profile {
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
      createdAt
      updatedAt
    }
  }
`;

// ============ PROJECTS QUERIES ============
export const GET_PROJECTS = gql`
  query GetProjects {
    projects {
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
      createdAt
      updatedAt
    }
  }
`;

export const GET_PROJECT = gql`
  query GetProject($id: ID!) {
    project(id: $id) {
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
      createdAt
      updatedAt
    }
  }
`;

// ============ SKILLS QUERIES ============
export const GET_SKILLS = gql`
  query GetSkills {
    skills {
      id
      name
      category
      level
      icon
      order
      createdAt
      updatedAt
    }
  }
`;

export const GET_SKILLS_BY_CATEGORY = gql`
  query GetSkillsByCategory {
    skillsByCategory {
      category
      skills {
        id
        name
        level
        icon
        order
      }
    }
  }
`;

// ============ EXPERIENCES QUERIES ============
export const GET_EXPERIENCES = gql`
  query GetExperiences {
    experiences {
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
      createdAt
      updatedAt
    }
  }
`;

export const GET_EXPERIENCE = gql`
  query GetExperience($id: ID!) {
    experience(id: $id) {
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
      createdAt
      updatedAt
    }
  }
`;