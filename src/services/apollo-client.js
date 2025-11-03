import { ApolloClient,InMemoryCache,createHttpLink,from  }  from "@apollo/client";
import { setContext } from '@apollo/client/link/context';
import { onError } from "@apollo/client/link/error";

// configuration du lien http vers le api Graphql

const httpLink=createHttpLink({
  uri: import.meta.env.VITE_API_URL || "http://localhost:4000/graphql",

});

// midleware pour ajouter le token d'authentification dans les headers des requetes

const authLink= setContext((_,{headers})=>{
  const token = localStorage.getItem('token'); //prendre token du navigateur
  return {
    // headers des information envoyees avec la requete coté serveur
    headers:{
      ...headers,
      authorization:token ? `Bearer ${token}` : "",
    },
  };
});

// gestion des erreurs

 const errorLink= onError(({graphQLErrors,networkError})=>{
  if(graphQLErrors){
    graphQLErrors.forEach(({message,locations,path})=>{
      console.error(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      );
      // Si errure d'authentification, redeiriger vers la page de login

      if(message.includes("Unauthorized") || message.includes("Authentication")){
        localStorage.removeItem("token");
        window.location.href='/admin/login';
      }
    });
  }
    if(networkError){
        console.error(`[Network error]: ${networkError}`);
      }
 });

 // configuration du cache

 const cache = new InMemoryCache(
  // stockege des donne donne RAM
  {
    typePolicies:{ // comment apllo gerie le cache pour chaque type de donnees
      Query:{
        fields:{
          projects:{
            merge(existing= [] ,incoming){
              return incoming;
            },
          },
          skills:
          {
                   merge(existing = [], incoming) {
            return incoming;

          },
        },
         experiences: {
          merge(existing = [], incoming) {
            return incoming;
          },
        },
      },
    },
  },
 });

 const client =new ApolloClient({
  link:from([errorLink,authLink,httpLink]),
  cache,
  defaultOptions:{
    watchQuery:{
      fetchPolicy:'cache-and-network',
      errorPolicy:'all',
    },
     query: {
      fetchPolicy: 'network-only',
      errorPolicy: 'all',
    },
    mutate: {
      errorPolicy: 'all',
    },

  },
 });

    export default client;
  
