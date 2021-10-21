import { makeExecutableSchema } from "@graphql-tools/schema";

const typeDefs = /* GraphQL */ `
  type Company {
    id: Int!
    name: String
    """
    the list of products by this company
    """
    products: [Product]
  }

  type Product {
    id: Int!
    name: String
    description: String
    company: Company
  }

  # the schema allows the following query:
  type Query {
    products: [Product]
    company(id: Int!): Company
  }
`;

// example data
const companies = [
  { id: 1, name: "Nike" },
  { id: 2, name: "Vans" },
  { id: 3, name: "Etnies" },
];

const products = [
  { id: 1, companyId: 1, name: "Nyjahs" },
  { id: 2, companyId: 1, name: "Janoski" },
  { id: 3, companyId: 2, name: "Old School Pro" },
  { id: 4, companyId: 2, name: "Sk8 Hi" },
  { id: 5, companyId: 3, name: "Joslin" },
];

const resolvers = {
  Query: {
    products: () => products,
    company: (_, { id }) => companies.find((company) => company.id === id),
  },
  Company: {
    products: (company) =>
      products.filter((product) => product.companyId === company.id),
  },
  Product: {
    company: (product) =>
      companies.find((company) => company.id === product.companyId),
  },
};

export default makeExecutableSchema({
  typeDefs,
  resolvers,
});
